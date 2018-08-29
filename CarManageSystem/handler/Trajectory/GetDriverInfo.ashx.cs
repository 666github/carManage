using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Trajectory
{
    /// <summary>
    /// GetDriverInfo 的摘要说明
    /// </summary>
    public class GetDriverInfo : IHttpHandler,IRequiresSessionState
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
            var carNumber = context.Request["carNumber"];
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carNumber);
                var user = cms.user.FirstOrDefault(s => s.Account == car.CurrentUser);

                //找不到用户，非法用车
                if(user==null)
                {
                    json.state = "warning";
                    context.Response.Write(json.ToString());
                    return;
                }

                var info = cms.borrowregister
                    .Where(b => b.CarNumber == carNumber&&b.User==user.Account&&b.BorrowState==1)
                    .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b.CarNumber, b.User, b.Purposes, b.Destination, b.BorrowTime, r.UniqueCode })
                    .ToList()
                    .Where(s => string.IsNullOrEmpty(s.UniqueCode))
                    .Select(item => new
                    {
                        carNumber = carNumber,
                        user = user.RealName,
                        purpose = item.Purposes,
                        destination = item.Destination,
                        phoneNumber = user.Phone,
                        department = cms.departmentmanage.FirstOrDefault(s=>s.Id==user.Department).Name,
                        time = item.BorrowTime.Value.ToShortDateString()+" "+ item.BorrowTime.Value.ToShortTimeString()
                    }).FirstOrDefault();

                json.userInfo = JObject.FromObject(info);
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