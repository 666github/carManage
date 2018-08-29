using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.CarManage.CarMaintain
{
    /// <summary>
    /// CancelApply 的摘要说明
    /// </summary>
    public class CancelApply : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var carNumber = context.Request["carNumber"];
            var account = currentUser.Account;

            dynamic json = new JObject();
            using (cmsdbEntities cms = new cmsdbEntities())
            {

                var car = cms.carinfo
                    .ToList()
                    .FirstOrDefault(s => s.CarNumber == carNumber);
                if (car.CarState != 0)
                {
                    json.state = "此车不是空闲状态，不可维修";
                    context.Response.Write(json.ToString());
                    return;
                }

                car.NeedMaintain = 0;
                //更改到期和维修单子审核信息
                var temp = cms.msg_maintain.Where(s => s.Car == carNumber && (s.IsAudit == 0 || s.IsAudit == null)).ToList();
                if (temp != null)
                {
                    temp.ForEach(x =>
                    {
                        x.IsAudit = 2;
                    });
                }
                cms.SaveChanges();
                cms.Dispose();
                json.state = "success";
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