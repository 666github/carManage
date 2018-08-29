using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler
{
    /// <summary>
    /// ApplyToUser 的摘要说明
    /// </summary>
    public class ApplyToUser : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登录
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;
            dynamic json = new JObject();
            json.state = "success";
            var account = currentUser.Account;
            var now = DateTime.Now;
            var applyType = context.Request["applyType"];
            using(cmsdbEntities cms=new cmsdbEntities())
            {
                var user = cms.user.FirstOrDefault(u => u.Account == account);
                if(user.UserType!=Convert.ToInt16(applyType)-1)
                {
                    json.state = "不可申请，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                if(user.ApplyState==0)
                {
                    json.state = "您已提交申请，不可重复申请";
                    context.Response.Write(json.ToString());
                    return;
                }
                user.ApplyDate = now;
                user.ApplyRole = user.UserType + 1;
                user.ApplyState = 0;

                //申请用户消息\
                var temprole = user.UserType + 1;
                var temp = cms.msg_userapply.FirstOrDefault(s => s.AccessUser == account && s.AccessRole == temprole && s.IsAudit == null);
                if(temp==null)
                {
                    var _msg_userapply = new msg_userapply()
                    {
                        Id = Guid.NewGuid().ToString(),
                        IsLook = 0,
                        DIsLook = 0,
                        AccessUser = account,
                        UserDepartment = currentUser.Department.ToString(),
                        AccessTime = now,
                        AccessRole = user.UserType + 1,
                        RealName = currentUser.RealName,
                        redpoint=0,
                        Dredpoint=0
                    };
                    cms.msg_userapply.Add(_msg_userapply);
                }

                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    var msg = currentUser.RealName + "向您申请成为";
                    if (currentUser.UserType == 0)
                    {
                        msg += "部门管理员";
                        PushHelper.PushToDepartCtrl(currentUser, "人员审核", msg);
                    }
                    else if (currentUser.UserType == 1)
                    {
                        msg += "院级管理员";
                        PushHelper.PushToYuanCtrl("人员审核", msg);
                    }
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