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
    /// GetCarNumbers 的摘要说明
    /// </summary>
    public class GetCarNumbers : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var department = CheckHelper.GetDepartmentId(currentUser, context);
                var carnumbers = cms.carinfo.Where(s=> department==-1?true:s.DepartmentId == department).Select(s => s.CarNumber).ToList();
                dynamic json = JArray.FromObject(carnumbers);
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