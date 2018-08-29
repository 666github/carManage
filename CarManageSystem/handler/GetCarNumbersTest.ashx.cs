using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler
{
    /// <summary>
    /// GetCarNumbersTest 的摘要说明
    /// </summary>
    public class GetCarNumbersTest : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var carnumbers = cms.carinfo.Select(s => s.CarNumber).ToList();
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