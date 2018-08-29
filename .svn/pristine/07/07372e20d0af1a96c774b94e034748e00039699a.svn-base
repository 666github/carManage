using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using CarManageSystem.helper;
using System.Web.SessionState;
using System.Diagnostics;

namespace CarManageSystem.handler
{
    /// <summary>
    /// getdepartmemt 的摘要说明
    /// 获取部门列表
    /// </summary>
    public class GetDepartment : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Debug.WriteLine(context.Session.SessionID);
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var list = cms.departmentmanage.Select(i => new
                {
                    i.Id,
                    i.Name
                }).ToList();
                dynamic json = JArray.FromObject(list);
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