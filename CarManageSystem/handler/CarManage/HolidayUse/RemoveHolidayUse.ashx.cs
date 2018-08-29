using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// RemoveHolidayUse 的摘要说明
    /// </summary>
    public class RemoveHolidayUse : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var inJson = context.Request["inJson"];
            var carsObj = JsonConvert.DeserializeObject<RemoveUseCar>(inJson);

            using(cmsdbEntities cms=new cmsdbEntities())
            {
                var cars = cms.carinfo.Where(s => carsObj.cars.Contains(s.CarNumber));
                foreach (var car in cars)
                {
                    car.HolodayStart = null;
                    car.HolodayEnd = null;
                }
                cms.SaveChanges();
                dynamic json = new JObject();
                json.state = "success";
                context.Response.Write(json.ToString());
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