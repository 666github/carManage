using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// ViewHolidayCars 的摘要说明
    /// </summary>
    public class ViewHolidayCars : IHttpHandler,IRequiresSessionState
    {
        static Regex r = new Regex("^[0-9]*$");
        public void ProcessRequest(HttpContext context)
        {
            
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            var department = CheckHelper.GetDepartmentId(currentUser,context);
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var cars = cms.carinfo
                    .ToList()
                    .Where(c=>(department==-1 ? true : c.DepartmentId == department))
                    .Select(i => new
                    {
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        licence = i.CarNumber,
                        space = i.CarModel + "座",
                        otime = (i.HolodayStart == null|| i.HolodayEnd == null) ? "" : (i.HolodayEnd > DateTime.Now.Date ? i.HolodayStart.Value.ToString("MM/dd")+"-"+ i.HolodayEnd.Value.ToString("MM/dd") : ""),
                    });
                json.car_inf = JArray.FromObject(cars);
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