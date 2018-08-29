using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler
{
    /// <summary>
    /// Gaizhuangtai 的摘要说明
    /// </summary>
    public class Gaizhuangtai : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var carNumber = context.Request["carNumber"];
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carNumber);
                if(car != null)
                {
                    if(car.CarState==1)
                    {
                        car.CarState = 2;
                        var tempUser = cms.user.FirstOrDefault(s => s.Account == car.CurrentUser);
                        tempUser.state = 1;
                        cms.SaveChanges();
                        context.Response.Write("修改成功");
                    }
                    else
                    {
                        context.Response.Write("修改失败：车辆当前不是已预约状态");
                    }
                }
                else
                {
                    context.Response.Write("修改失败：系统没有此车辆");
                }
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