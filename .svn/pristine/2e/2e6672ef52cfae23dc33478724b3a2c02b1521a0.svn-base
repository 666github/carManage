using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// CheckUserRole 的摘要说明
    /// </summary>
    public class CheckUserRole : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;
            dynamic json = new JObject();
            json.state = "success";

            var role = context.Request["user"];
            var Srole = currentUser.UserType;
            if (Srole > 0)//管理员
            {
                if (role != "1")
                {
                    json.state = "1";
                }
            }
            else if (Srole == 0)//司机
            {
                if (role != "0")
                {
                    json.state = "1";
                }
            }
            else
            {
                json.state = "1";
            }
            context.Response.Write(json.ToString());
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