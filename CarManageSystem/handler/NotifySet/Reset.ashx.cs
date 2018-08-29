using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.NotifySet
{
    /// <summary>
    /// Reset 的摘要说明
    /// </summary>
    public class Reset : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var p = context.Request["p"];
            if(p!="1")
            {
                context.Response.Write("fail param is not correct");
                return;
            }

            var str = NotifyHelper.ResetNotify();

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.user.ToList();
                temp.ForEach(x => x.NotifySet = str);
                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write("OK");
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