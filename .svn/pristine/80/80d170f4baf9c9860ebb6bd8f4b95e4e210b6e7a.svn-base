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
    /// FinishMaintain 的摘要说明
    /// </summary>
    public class FinishMaintain : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var id = context.Request["id"];
            var code = context.Request["code"];
            var cost = context.Request["cost"];
            

            dynamic json = new JObject();
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                
                var costRegister = cms.carcostregister.FirstOrDefault(s => s.Id == id);
                if (costRegister == null)
                {
                    json.state = "此车未在维修保养状态，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == costRegister.CarNumber && s.CarState == 3);
                if (car == null)
                {
                    json.state = "此车未在维修保养状态，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                costRegister.MaintenanceEndDate = DateTime.Now;
                costRegister.UseTime = (costRegister.MaintenanceEndDate - costRegister.MaintenanceStartDate).ToString();
                costRegister.Code = code;
                costRegister.Cost =Convert.ToDecimal(cost);
                car.CarState = 0;
                car.CarStateDetial = 0;
                
                //给到期的赋值时间
                if (costRegister.Type != 1)
                {
                   
                    switch (costRegister.Type)
                    {
                        case 2:
                            var mtMileOrdate = context.Request["mtMileOrdate"];
                            car.MtMileOrDate = mtMileOrdate;
                            if (mtMileOrdate.Contains("时间"))
                            {
                                car.MaintenanceStartDate = Convert.ToDateTime(context.Request["start"]);
                                car.MaintenanceEndDate = Convert.ToDateTime(context.Request["end"]);
                            }
                            else
                            {
                                car.MtMile = context.Request["mtMile"];
                            }
                            break;
                        case 3:
                            var start = Convert.ToDateTime(context.Request["start"]);
                            var end = Convert.ToDateTime(context.Request["end"]);
                            car.AnnualStartDate = start;
                            car.AnnualEndDate = end;
                            break;
                        case 4:
                            var start1 = Convert.ToDateTime(context.Request["start"]);
                            var end1 = Convert.ToDateTime(context.Request["end"]);
                            car.InsuranceStartDate = start1;
                            car.InsuranceEndDate = end1;
                            break;
                        default:
                            break;
                    }
                }
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