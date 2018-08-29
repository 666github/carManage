using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.AppVersion
{
    /// <summary>
    /// Set 的摘要说明
    /// </summary>
    public class Set : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var version = context.Request["version"];
            var platform = context.Request["platform"];

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.appversion.FirstOrDefault(s=>s.platform== platform.Trim());
                temp.version = version.Trim();
                cms.SaveChanges();
                context.Response.Write("success");
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