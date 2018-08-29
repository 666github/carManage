using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.UserManage.Driver
{
    /// <summary>
    /// DeleteDriver 的摘要说明
    /// </summary>
    public class DeleteDriver : IHttpHandler,IRequiresSessionState
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

            var driver = context.Request["drivers"];
            var driverArry= JsonConvert.DeserializeObject<Users>(driver);
            
            using(cmsdbEntities cms=new cmsdbEntities())
            {
                var dri = cms.user.Where(u => driverArry.Ids.Contains(u.Account)).ToList();
                dri.ForEach(item => item.UserType=-1);
                dri.ForEach(item => item.ApplyState = -1);
                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());
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