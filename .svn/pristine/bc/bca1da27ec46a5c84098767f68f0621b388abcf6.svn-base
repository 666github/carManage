using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// DirectMaintain 的摘要说明
    /// </summary>
    public class DirectMaintain : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var carNumber = context.Request["carNumber"];
            var type = context.Request["type"];
            var account = currentUser.Account;
            dynamic json = new JObject();

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carNumber && s.CarState == 0);
                if(car.DepartmentId!=currentUser.Department&&currentUser.UserType<2)
                {
                    json.state = "此车与当前用户部门不匹配，不可发起维修保养！";
                    context.Response.Write(json.ToString());
                    return;
                }
                if (car == null)
                {
                    json.state = "此车不是空闲状态，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                if (car.CarState == 3)
                {
                    var str = "";
                    switch (car.CarStateDetial)
                    {
                        case 1:
                            str = "维修";
                            break;
                        case 2:
                            str = "保养";
                            break;
                        case 3:
                            str = "年检";
                            break;
                        case 4:
                            str = "续保";
                            break;
                    }
                    json.state = "此车正在[" + str + "]状态中，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                car.CarState = 3;
                car.NeedMaintain = 0;
                car.MaintainUser = account;
                car.CarStateDetial = Convert.ToInt16(type);

                var costRegister = new carcostregister()
                {
                    Id = Guid.NewGuid().ToString(),
                    Type = Convert.ToInt16(type),
                    CarNumber = carNumber,
                    AccessUser = account,
                    MaintenanceStartDate = DateTime.Now,
                    Code = ""
                };
                cms.carcostregister.Add(costRegister);
                cms.SaveChanges();
                json.state = "success";
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