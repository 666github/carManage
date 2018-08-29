using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// AutoQueryIllegal 的摘要说明
    /// </summary>
    public class AutoQueryIllegal : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var reset = context.Request["reset"];
            //是否重置数据为已缴费
            if (reset=="1")
            {
                using (cmsdbEntities cms = new cmsdbEntities())
                {
                    dynamic json = new JObject();
                    json.state = "success";
                    var temp = cms.illegalstatistic.Where(s => s.Handled == 0).ToList();
                    temp.ForEach(x => x.Handled = 1);
                    cms.SaveChanges();
                    context.Response.Write(json.ToString());
                    cms.Dispose();
                }
                return;
            }

            var carnumber = context.Request["carnumber"];
            var date = context.Request["date"];
            var area = context.Request["area"];
            var act = context.Request["act"];
            var money = context.Request["money"];
            var fen = context.Request["fen"];
            var handled = context.Request["handled"];
            var userAccount = "";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                dynamic json = new JObject();
                json.state = "success";
                var datatime = Convert.ToDateTime(date);

                //已有的信息过滤掉
                var order = cms.illegalstatistic.FirstOrDefault(s => s.CarNumber == carnumber && s.Time == datatime);
                if(order!=null)
                {
                    if(handled=="1")
                    {
                        order.Handled = 1;
                    }
                    else if(handled=="0")
                    {
                        order.Handled = 0;
                    }
                    cms.SaveChanges();
                    context.Response.Write(json.ToString());
                    return;
                }
                
                var orders = cms.borrowregister
                    .Where(s => s.CarNumber == carnumber&&s.BorrowState==1)
                    .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new {b.User, b.BorrowTime,b.ExpectReturnTime, b.BorrowStateOD, r.ReturnTime })
                    .ToList();
                //通过时间找对应的人
                //先找还车单子和借车单子时间之内的人，//没有则空着。
                if (orders!=null)
                {
                    var user = orders.FirstOrDefault(s => s.BorrowTime <= datatime && s.ReturnTime >= datatime);
                    if (user == null)
                    {
                        //找不到就去查借车单子和预计换车时间的人，
                        var user1 = orders.FirstOrDefault(s => s.BorrowTime <= datatime && s.ExpectReturnTime >= datatime);
                        if (user1 != null)
                        {
                            userAccount = user1.User;
                        }
                    }
                    else
                    {
                        userAccount = user.User;
                    }
                }

                var illegal = new illegalstatistic()
                {
                    Time = datatime,
                    User = userAccount,
                    Place = area,
                    Type = act,
                    CarNumber = carnumber,
                    Id = Guid.NewGuid().ToString(),
                    fen = fen,
                    money = Convert.ToDecimal(money),
                    IsLook = 0,
                    DIsLook = 0,
                    redpoint = 0,
                    Dredpoint=0,
                    Handled = handled=="1"?1:0
                };
                cms.illegalstatistic.Add(illegal);
                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    var msg = illegal.CarNumber + "于" + illegal.Time + "在" + illegal.Place + "有违章，请处理";
                    PushHelper.PushToDepartCtrlByCarNumber(illegal.CarNumber, "违章提醒", msg);
                }
                catch(Exception ex)
                {

                }
                    
                //});
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}