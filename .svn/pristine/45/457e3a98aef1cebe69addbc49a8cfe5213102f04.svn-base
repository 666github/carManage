using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.Statistics
{
    /// <summary>
    /// ViewProperty 的摘要说明              被抛弃了。               
    /// 
    /// </summary>
    public class ViewProperty : IHttpHandler,IRequiresSessionState
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
            var department = Convert.ToString(currentUser.Department);
            using(cmsdbEntities cms =new cmsdbEntities())
            {
                var cars = cms.carinfo.ToList()
                    .Where(s => string.IsNullOrEmpty(department) ? true : department == s.DepartmentId.ToString())
                    .Select(item => new
                    {
                        carsImg = ImageHelper.GetImagePath(item.CarPhoto),
                        firstBrand = item.CarBrand,
                        plateNum=item.CarNumber,
                        seat=item.CarType,
                        carMoney=item.CarPrice
                    });
                json.carsAssetsInfo = JArray.FromObject(cars);
                json.sumNum = cars.Count();
                json.carAmount = cars.Sum(x => x.carMoney);
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