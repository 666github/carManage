using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.AppVersion
{
    /// <summary>
    /// Get 的摘要说明
    /// </summary>
    public class Get : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var platform = context.Request["platform"];
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.appversion.FirstOrDefault(s=>s.platform== platform.Trim());
                context.Response.Write(temp.version);
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