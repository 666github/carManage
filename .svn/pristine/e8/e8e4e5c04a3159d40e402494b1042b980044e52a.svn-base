using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// GetCurrentUser 的摘要说明
    /// </summary>
    public class GetCurrentUser : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var account = currentUser.Account;
            var dtime = DateTime.Now;
            var now = dtime.ToShortDateString()+" "+ dtime.ToShortTimeString();
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var user = cms.user
                    .Where(s => s.Account == account)
                    .LeftJoin(cms.departmentmanage, u => u.Department, d => d.Id, (u, d) => new { u, d.Name })
                    .ToList()
                    .Select(i => new
                    {
                        imgsrc = ImageHelper.GetImagePath(i.u.UserPhoto),
                        imgDri = ImageHelper.GetImagePath(i.u.DriverLicensePhoto),
                        username = i.u.Account,
                        myname = i.u.RealName,
                        branch = i.Name,
                        myphone = i.u.Phone,
                        myemail = i.u.Email,
                        driverType = i.u.DriverType,
                        driType = i.u.AllowModel,
                        effecStart = i.u.EffecDateStart.Value.ToShortDateString(),
                        effecEnd = i.u.EffecDateEnd.Value.ToShortDateString(),
                        usertype = i.u.UserType,
                        LastLoginDate = i.u.LastLoginDate.Split('|')[0],
                        regulation = i.u.Regulation
                    }).FirstOrDefault();

                dynamic json = new JObject();
                json.info = JObject.FromObject(user);
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