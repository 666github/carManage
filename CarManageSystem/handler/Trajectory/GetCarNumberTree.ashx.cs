using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Trajectory
{
    /// <summary>
    /// GetCarNumberTree 的摘要说明
    /// </summary>
    public class GetCarNumberTree : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var carTree = cms.departmentmanage.ToList()
                    .Select(item => new
                    {
                        department = item.Name,
                        carNum = JArray.FromObject(cms.carinfo.Where(s=>s.DepartmentId==item.Id).Select(x=>x.CarNumber).ToList())
                    });
                json.maplist = JArray.FromObject(carTree);
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