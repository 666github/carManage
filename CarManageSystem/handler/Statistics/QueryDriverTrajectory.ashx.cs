using CarManageSystem.Extension;
using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Statistics
{
    /// <summary>
    /// QueryDriverTrajectory 的摘要说明
    /// </summary>
    public class QueryDriverTrajectory : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var personnelName = context.Request["personnelName"];
            var usedTime1 = context.Request["usedTime1"];
            var usedTime2 = context.Request["usedTime2"];
            var carNumber = context.Request["carNumber"];
            var department  = CheckHelper.GetDepartmentId(currentUser, context);
            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var personList = new List<string>();
                if(string.IsNullOrEmpty(personnelName))
                {
                    var pl = cms.user.Where(s => department == -1 ? true : s.Department == department).Select(i=>i.Account).ToList();
                    pl.ForEach(x => personList.Add(x));
                }
                else
                {
                    personList.Add(personnelName);
                }

                var info = cms.borrowregister
                           .Where(s => personList.Contains(s.User)&&(carNumber==""?true:s.CarNumber==carNumber))
                           .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b, r })
                           .Where(s =>s.r.UniqueCode != null)
                           .LeftJoin(cms.user, b => b.b.User, u => u.Account, (b, u) => new { b, u })
                           .ToList()
                           .OrderBy(x=>x.b.b.UseCarTime)
                           .Where(s=> (usedTime1==""?true : (Convert.ToDateTime(usedTime1) < s.b.b.UseCarTime)) && (usedTime2 == "" ? true : (Convert.ToDateTime(usedTime2) > s.b.r.ReturnTime)))
                           .Select(item
                           => new
                           {
                               list1 = item.u.Account,
                               list2 = item.u.RealName,
                               list3 = item.b.b.CarNumber,
                               list4 = item.b.b.Purposes,
                               list5 = item.b.b.Destination,
                               list6 = item.b.b.Cause,
                               list7 = item.b.b.UseCarTime.Value.ToShortDateString()+" "+ item.b.b.UseCarTime.Value.ToShortTimeString(),
                               list8 = item.b.r.ReturnTime.Value.ToShortDateString() + " " + item.b.r.ReturnTime.Value.ToShortTimeString(),
                               list9 = item.b.r.TravelMileage
                           }).ToList();
                json.usedInfs = JArray.FromObject(info);
                json.id = Guid.NewGuid();
                context.Response.Write(json.ToString());

                //保存内容 
                var temp = MyGlobal.excelList.FirstOrDefault(s => s.user == currentUser.Account);
                if (temp!=null)
                {
                    MyGlobal.excelList.Remove(temp);
                }
                MyGlobal.excelList.Add(new ExportExcelObj()
                {
                     user = currentUser.Account,
                     id = Convert.ToString(json.id),
                     value = info
                });
                cms.Dispose();
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