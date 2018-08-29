using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.FuelingCard
{
    /// <summary>
    /// GetCardList 的摘要说明
    /// </summary>
    public class GetCardList : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            var department = CheckHelper.GetDepartmentId(currentUser,context);
                
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var list = cms.mainfuelingcard
                    .Where(s => department == -1 ? true : s.DepartmentId == department)
                    .Select(item => new
                    {
                        item.MainCardId
                    })
                    .Distinct()
                    .ToList();
                json.list = JArray.FromObject(list);
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