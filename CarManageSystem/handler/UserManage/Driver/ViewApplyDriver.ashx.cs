using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.UserManage.Driver
{
    /// <summary>
    /// AccessDriver 的摘要说明
    /// </summary>
    public class ViewApplyDriver : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;


            var viewType = Convert.ToInt32(context.Request["viewType"]);

            var currentRole = Convert.ToString(currentUser.UserType);
            dynamic json = new JObject();
            json.state = "success";

            if(Convert.ToInt32(currentRole)< viewType)
            {
                json.state = "没有权限";
                context.Response.Write(json.ToString());
                return;
            }

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                
                var department = CheckHelper.GetDepartmentId(currentUser,context);

                var users = cms.user
                    .Where(s => s.ApplyRole == viewType && s.ApplyState == 0 &&(department==-1?true: s.Department == department))
                    .LeftJoin(cms.departmentmanage, u => u.Department, d => d.Id, (u, d) => new { u, d }).ToList()
                    .Select(item => new
                    {
                        userid = item.u.Account,
                        pictureUrl = ImageHelper.GetImagePath(item.u.UserPhoto),
                        driverName = item.u.RealName,
                        departMent = item.d.Name,
                        typeInfo = item.u.DriverType == 0 ? "兼职" : "专职",
                        licenseInfo = item.u.AllowModel,
                        telInfo = item.u.Phone,
                        mailNumInfo = item.u.Email,
                        effectDate = item.u.EffecDateStart.Value.ToShortDateString() + "-" + item.u.EffecDateEnd.Value.ToShortDateString()
                    });
                json.driversTotal = users.Count();
                json.driversInfo = JArray.FromObject(users);
                context.Response.Write(json);
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