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
    /// ChangeName 的摘要说明
    /// </summary>
    public class ChangeName : IHttpHandler,IRequiresSessionState
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

            var id = Convert.ToInt32(context.Request["id"]);
            var name = context.Request["name"];
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var dpm = cms.departmentmanage.FirstOrDefault(d => id == d.Id);
                
                if (dpm==null)
                {
                    json.state = "当前所选部门不存在，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                if (dpm.Name == name)
                {
                    json.state = "当前部门已存在，请换个名称";
                    context.Response.Write(json.ToString());
                    return;
                }
                dpm.Name = name;
                cms.SaveChanges();
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