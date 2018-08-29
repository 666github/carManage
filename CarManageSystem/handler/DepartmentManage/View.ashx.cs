using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.DepartmentManage
{
    /// <summary>
    /// View 的摘要说明
    /// </summary>
    public class View : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 2);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            using(cmsdbEntities cms=new cmsdbEntities())
            {
                var departments = cms.departmentmanage
                    .ToList()
                    .Select(item => new
                    {
                        id=item.Id,
                        bmInf11 = item.Name,
                        bmInf2 = item.CreateDate.Value.ToShortDateString(),
                        driNum = cms.user.ToList().Count(u => Convert.ToInt16(u.Department) == item.Id&&u.UserType!=-1),
                        carNum = cms.carinfo.ToList().Count(c => Convert.ToInt16(c.DepartmentId) == item.Id)
                    }).ToList();
                json.branchNum = departments.Count();
                json.bmInf = JArray.FromObject(departments);
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