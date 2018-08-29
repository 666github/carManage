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
    /// Add 的摘要说明
    /// </summary>
    public class Add : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var deviceId = context.Request["deviceId"];
            dynamic json = new JObject();
            json.state = "success";
            using(cmsdbEntities cms = new cmsdbEntities())
            {
                var user = cms.user.FirstOrDefault(s => s.Account == currentUser.Account);
                if (user == null)
                {
                    return;
                }
                user.DeviceID = deviceId;
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