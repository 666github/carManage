using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.UserManage.Driver
{
    /// <summary>
    /// AccessDriver 的摘要说明
    /// </summary>
    public class AccessDriver : IHttpHandler,IRequiresSessionState
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

            var ids = new List<string>();
            Model.Users driverArry=new Users() { Ids= ids };
            //先看是在首页通过的，还是在人员管理处进行通过的。
            if (context.Request.Params.AllKeys.Contains("drivers")) //人员管理
            {
                var driver = context.Request["drivers"];
                driverArry=JsonConvert.DeserializeObject<Users>(driver);
            }
            else if(context.Request.Params.AllKeys.Contains("uniqueCode")) //首页
            {
                var uniqueCode = context.Request["uniqueCode"];
                using (cmsdbEntities cms = new cmsdbEntities())
                {
                    var _msg = cms.msg_userapply.FirstOrDefault(s => s.Id == uniqueCode&&s.IsAudit==null);
                    if(_msg==null)
                    {
                        json.state = "错误:用户已被审核，请刷新重试";
                        context.Response.Write(json.ToString());
                        return;
                    }
                    var tempRole = Convert.ToInt32(_msg.AccessRole);
                    var tempUser = cms.user.FirstOrDefault(s => s.Account == _msg.AccessUser && s.ApplyRole == tempRole&&s.ApplyState==0);
                    if(tempUser==null)
                    {
                        json.state = "错误:用户已被审核，请刷新重试";
                        context.Response.Write(json.ToString());
                        return;
                    }
                    driverArry.Ids.Add(tempUser.Account);
                    cms.Dispose();
                }
            }

            var access = context.Request["access"];
            var now = DateTime.Now;

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var dri = cms.user.Where(u => driverArry.Ids.Contains(u.Account)).ToList();
                if(Convert.ToInt16(access)==1)
                {
                    foreach (var d in dri)
                    {
                        var temprole = d.ApplyRole;
                        var _msg = cms.msg_userapply
                           .FirstOrDefault(s => s.AccessUser == d.Account && ((s.IsAudit == 0 || s.IsAudit == null) && s.AccessRole == temprole));
                        _msg.IsAudit = 1;
                        _msg.AuditTime = now;
                        _msg.AuditUser = currentUser.Account;

                        var tempRole = d.ApplyRole;
                        d.UserType = tempRole;
                        
                        d.ApplyState = 1;//通过

                        //推送
                        //Task.Factory.StartNew(() =>
                        //{
                        try
                        {
                            var msg = "您申请的";
                            if (d.UserType == 0)
                            {
                                msg += "司机";
                            }
                            else if (d.UserType == 1)
                            {
                                msg += "部门管理员";
                            }
                            else if (d.UserType == 2)
                            {
                                msg += "院级管理员";
                            }
                            msg += "已通过审核";
                            PushHelper.PushToUser(d, "人员审核", msg);
                        }
                        catch(Exception ex)
                        {

                        }
                           
                        //});
                    }
                }
                else
                {
                    foreach (var d in dri)
                    {
                        var temprole = d.ApplyRole;
                        var _msg = cms.msg_userapply
                           .FirstOrDefault(s => s.AccessUser == d.Account && ((s.IsAudit == 0 || s.IsAudit == null) && s.AccessRole == temprole));
                        _msg.IsAudit = 2;
                        _msg.AuditTime = now;
                        _msg.AuditUser = currentUser.Account;
                        
                        d.ApplyState = 2;//拒绝
                    }
                }
                
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