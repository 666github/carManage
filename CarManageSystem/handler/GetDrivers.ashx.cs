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
    /// GetDrivers 的摘要说明
    /// </summary>
    public class GetDrivers : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            var department = CheckHelper.GetDepartmentId(currentUser, context);

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var drivers = cms.user
                    .Where(s=> (department==-1?true:s.Department==department)&&s.UserType!=-1)
                    .Select(i => new
                    {
                        i.Account,
                        i.RealName
                    });
                json.users = JArray.FromObject(drivers);
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