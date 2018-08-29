using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.NotifySet
{
    /// <summary>
    /// Set 的摘要说明
    /// </summary>
    public class Set : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            var resJson = context.Request["res"];
            if(string.IsNullOrEmpty(resJson))
            {
                json.state = "fail";
                context.Response.Write(json.ToString());
                return;
            }
            var list = JsonConvert.DeserializeObject<List<NotifyProperty>>(resJson);
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.user.FirstOrDefault(s => s.Account == currentUser.Account);
                if(temp==null)
                {
                    json.state = "fail";
                    context.Response.Write(json.ToString());
                    return;
                }
                temp.NotifySet = JArray.FromObject(list).ToString();
                cms.SaveChanges();

                //更新一下登陆中的状态
                currentUser.NotifySet = JArray.FromObject(list).ToString();

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