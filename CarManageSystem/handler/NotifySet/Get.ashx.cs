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
    /// Get 的摘要说明
    /// </summary>
    public class Get : IHttpHandler,IRequiresSessionState
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
            
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.user.FirstOrDefault(s=>s.Account==currentUser.Account);
                if(temp==null)
                {
                    json.state = "fail";
                    context.Response.Write(json.ToString());
                    return;
                }
                var list = JsonConvert.DeserializeObject<List<NotifyProperty>>(temp.NotifySet);
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