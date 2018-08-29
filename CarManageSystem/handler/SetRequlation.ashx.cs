using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// SetRequlation 的摘要说明
    /// </summary>
    public class SetRequlation : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var regulation = context.Request["regulation"];
            dynamic json = new JObject();
            json.state = "success";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.user.FirstOrDefault(s => s.Account == currentUser.Account);
                if (temp == null)
                {
                    json.state = "fail";
                    context.Response.Write(json.ToString());
                    return;
                }
                temp.Regulation = Convert.ToInt32(regulation);

                if (regulation == "1")
                {
                    var list = JsonConvert.DeserializeObject<List<NotifyProperty>>(temp.NotifySet);
                    list.ForEach(x => 
                    {
                        if(x.key== "借车审核"|| x.key == "人员审核" || x.key == "违章提醒" || x.key == "到期提醒" || x.key == "维修申请")
                        {
                            x.value = 0;
                        }
                    });
                    temp.NotifySet = JArray.FromObject(list).ToString();
                }
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