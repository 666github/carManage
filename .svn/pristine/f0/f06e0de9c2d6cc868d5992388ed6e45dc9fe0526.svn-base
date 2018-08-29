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
    /// GetIdentifyingCode 的摘要说明
    /// </summary>
    public class GetIdentifyingCode : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var userName = context.Request["userName"];
            dynamic json = new JObject();
            json.state = "success";
            if(string.IsNullOrEmpty(userName))
            {
                json.state = "用户名不可为空";
                context.Response.Write(json.ToString());
                return;
            }
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var user = cms.user.FirstOrDefault(s => s.Account == userName);
                if(user==null)
                {
                    json.state = "用户不存在";
                    context.Response.Write(json.ToString());
                    return;
                }
                var email = user.Email;

                //生成验证码
                var random = new Random();
                var code = random.Next(100000,999999);
                var datetime = DateTime.Now;
                //保持一个验证码和用户名的对应状态，限时10分钟
                var dic = MyGlobal.IdentyList.FirstOrDefault(s => s.userName == userName);
                if(dic==null)
                {
                    lock(MyGlobal.IdentyList)
                    {
                        MyGlobal.IdentyList.Add(new IdentifyingCode { userName=userName,code=code,datetime= datetime });
                    }
                }
                else
                {
                    lock (MyGlobal.IdentyList)
                    {
                        dic.code = code;
                        dic.datetime = datetime;
                    }
                }
                
                //发送验证码
                var res = EmailHelper.SendMail(email, "cms@bism.cn", "","", "您已申请修改密码,验证码为：" + code+ " ,验证码10分钟内有效", "【车辆管理系统】密码修改");
                if(res=="1")
                {
                    json.email = "验证码已发送到：" + email;
                    context.Response.Write(json.ToString());
                }
                else
                {
                    json.state = "发送失败，请重试";
                    context.Response.Write(json.ToString());
                }
                cms.Dispose();
                return;
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