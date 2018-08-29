using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarManageSystem.helper;
using System.Drawing;
using System.Web.SessionState;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace CarManageSystem.handler
{
    /// <summary>
    /// register 的摘要说明
    /// </summary>
    public class Register : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var account = context.Request["regUserName"].Trim();
            var realName = context.Request["regmyName"].Trim();
            var allowModel = context.Request["regCarType"].Trim();
            var password = context.Request["regPwd"].Trim();
            var rpassword = context.Request["rpassword"].Trim();
            var mail = context.Request["regEmail"].Trim();
            var effecDateStart = context.Request["effDateStart"].Trim();
            var effecDateEnd = context.Request["effDateEnd"].Trim();
            var phone = context.Request["regPhone"].Trim();
            var department = context.Request["regBranch"].Trim();
            var driverType = context.Request["driverType"].Trim();
            var path1 = ImageHelper.SaveImage(context.Request.Files["userPhoto"]);
            var path2 = ImageHelper.SaveImage(context.Request.Files["drivePhoto"]);

            dynamic json = new JObject();
            var now = DateTime.Now;
            //空检查
            if (CheckHelper.HasNull(account, realName, allowModel, password, mail, effecDateStart, effecDateEnd, phone, department, driverType)|| path1=="-1"|| path2=="-1")
            {
                json.state = "有空值，请检查！";
                context.Response.Write(json.ToString());
                return;
            }

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                //查询是否已经注册过
                var usr = cms.user.FirstOrDefault(s => s.Account == account);
                if (usr != null)
                {
                    //if(usr.ApplyState!=-1)
                    //{
                    json.state = "已存在此账号";
                    context.Response.Write(json.ToString());
                    return;
                    //}
                    //else
                    //{
                    //    //之前删除过的账号

                    //}
                }

                if (rpassword != password)
                {
                    json.state = "两次输入密码不一致";
                    context.Response.Write(json.ToString());
                    return;
                }

                //插入新数据
                user u = new user()
                {
                    Account = account,
                    Password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(password, "MD5"),
                    RealName = realName,
                    Department = Convert.ToInt16(ConvertHelper.ConvertDepartment(department)),
                    AllowModel = allowModel,
                    DriverType = Convert.ToInt16(driverType),
                    Email = mail,
                    UserPhoto = path1,
                    DriverLicensePhoto = path2,
                    Phone = phone,
                    UserType = -1,
                    EffecDateStart = Convert.ToDateTime(effecDateStart),
                    EffecDateEnd = Convert.ToDateTime(effecDateEnd),
                    ApplyRole = 0, //申请的角色， 0 司机  1管理员  2院级管理员
                    ApplyLevel = 0,//申请的紧急程度 0 一般 1紧急
                    ApplyState = 0,//申请是否通过的状态 0审核中  1通过  -1拒绝
                    ApplyDate = now,//申请的时间
                    state = 0,//司机的状态
                    //Enable = 0//账户是否可用
                    Regulation=0,
                    NotifySet= NotifyHelper.ResetNotify()
            };
                cms.user.Add(u);

                //申请用户消息
                var _msg_userapply = new msg_userapply()
                {
                    Id = Guid.NewGuid().ToString(),
                    IsLook = 0,
                    DIsLook = 0,
                    AccessUser = account,
                    UserDepartment = ConvertHelper.ConvertDepartment(department),
                    AccessTime = now,
                    AccessRole = 0,
                    RealName = realName,
                    redpoint = 0,
                    Dredpoint = 0
                };
                cms.msg_userapply.Add(_msg_userapply);

                cms.SaveChanges();
                cms.Dispose();
                json.state = "success";

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    var msg = "新注册用户" + _msg_userapply.RealName + "向您申请成为司机";
                    PushHelper.PushToDepartCtrl(_msg_userapply.AccessUser, "人员审核", msg);
                }
                catch(Exception ex)
                {

                }
                    
                //});

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