using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.PersonalCenter.Reservation
{
    /// <summary>
    /// GetCarMileage 的摘要说明
    /// </summary>
    public class GetCarMileage : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var carNumber = context.Request["carNumber"];
            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carNumber);
                if(car==null)
                {
                    json.state = "车辆不存在";
                    context.Response.Write(json.ToString());
                    return;
                }
                json.mileage = car.Mileage;
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