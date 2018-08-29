using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.JPush
{
    /// <summary>
    /// Remove 的摘要说明
    /// </summary>
    public class Remove : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var user = cms.user.FirstOrDefault(s => s.Account == currentUser.Account);
                if (user == null)
                {
                    return;
                }
                user.DeviceID = "";
                cms.SaveChanges();
                cms.Dispose();
            }
            context.Response.Write(json.ToString());
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