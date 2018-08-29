using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.ResetPassword
{
    /// <summary>
    /// ResetPassword 的摘要说明
    /// </summary>
    public class ResetPassword : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var userName = context.Request["userName"];
            var code = context.Request["code"];
            var password = context.Request["password"];

            dynamic json = new JObject();
            json.state = "success";

            if(CheckHelper.HasNull(userName,code,password))
            {
                json.state = "有空值,请检查";
                context.Response.Write(json.ToString());
                return;
            }

            var user = MyGlobal.IdentyList.FirstOrDefault(s => s.userName == userName);
            if (user == null)
            {
                json.state = "用户名错误";
                context.Response.Write(json.ToString());
                return;
            }

            var now = DateTime.Now;
            if(user.datetime.AddMinutes(10)<now)
            {
                json.state = "验证码已超时，请重新发送";
                context.Response.Write(json.ToString());
                return;
            }

            if(Convert.ToString(user.code)!=code)
            {
                json.state = "验证码错误，请检查";
                context.Response.Write(json.ToString());
                return;
            }
            //修改密码
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var usr = cms.user.FirstOrDefault(s => s.Account == user.userName);
                usr.Password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(password, "MD5");
                cms.SaveChanges();
                cms.Dispose();
                MyGlobal.IdentyList.Remove(user); //删除内存中记录
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