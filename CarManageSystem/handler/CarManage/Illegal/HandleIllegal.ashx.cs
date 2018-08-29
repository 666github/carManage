using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.CarManage.Illegal
{
    /// <summary>
    /// HandleIllegal 的摘要说明
    /// </summary>
    public class HandleIllegal : IHttpHandler,IRequiresSessionState
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
            var user = context.Request["user"];
            var id = context.Request["id"];

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var info = cms.illegalstatistic
                    .FirstOrDefault(s => s.Id == id);
                if(info==null)
                {
                    json.state = "信息已处理，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                info.User = user;
                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    var msg = "您有一个违章," + info.CarNumber + "于" + info.Time + "在" + info.Place;
                    PushHelper.PushToUser(user, "违章提醒", msg);
                }
                catch(Exception ex)
                {

                }
                    
                //});
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