using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler
{
    /// <summary>
    /// GetAllCarsInfo 的摘要说明
    /// 用于 自动查询违章时使用。
    /// </summary>
    public class GetAllCarsInfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var pwd = context.Request["pwd"];
            if(!string.IsNullOrEmpty(pwd))
            {
                if(pwd=="qwerdf")
                {
                    using (cmsdbEntities cms = new cmsdbEntities())
                    {
                        var cars = cms.carinfo.ToList();
                        dynamic json = new JObject();
                        json.cars = JArray.FromObject(cars);
                        context.Response.Write(json.ToString());
                        cms.Dispose();
                    }
                }
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