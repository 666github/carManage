using CarManageSystem.helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// AudoQueryLimit 的摘要说明
    /// </summary>
    public class AudoQueryLimit : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //先重置所有车辆
            if (context.Request.Params.AllKeys.Contains("key"))
            {
                var key = context.Request["key"];
                if (key == "mztkn")
                {
                    using (cmsdbEntities cms = new cmsdbEntities())
                    {
                        var allCar = cms.carinfo.ToList();
                        allCar.ForEach(s => s.islimit = 0);
                        cms.SaveChanges();
                        cms.Dispose();
                        context.Response.Write("success");
                    }
                }
                else
                {
                    context.Response.Write("error");
                }
                return;
            }



            var number = context.Request["number"];
            var date = DateTime.Now;
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                //已有的信息过滤
                var tempLimit = cms.limitcarnumber.ToList().FirstOrDefault(s => s.LimitDate.Date == date.Date);
                if(tempLimit==null)
                {
                    var limit = new limitcarnumber()
                    {
                        LimitDate = date.Date,
                        LimitNumber = number
                    };
                    cms.limitcarnumber.Add(limit);

                    var carlist = cms.carinfo.ToList();
                    var numberlist = ConvertHelper.ConvertLimitNumberStr(number);
                    foreach(var car in carlist)
                    {
                        if(numberlist.Contains(car.CarNumber[car.CarNumber.Length-1].ToString()))
                        {
                            car.islimit = 1;
                        }
                    }
                    cms.SaveChanges();
                }
                cms.Dispose();
                context.Response.Write("success");
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