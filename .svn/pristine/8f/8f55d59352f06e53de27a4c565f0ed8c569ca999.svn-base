using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.CarManage.CarQuery
{
    /// <summary>
    /// ChangeCarInfo 的摘要说明
    /// </summary>
    public class ChangeCarInfo : IHttpHandler,IRequiresSessionState
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
            var simId = context.Request["simId"];
            var carNumber = context.Request["carNumber"];
            var firBrandDet = context.Request["firBrandDet"];
            var buydayDet = context.Request["buydayDet"];
            var modelDet = context.Request["modelDet"];
            var typeDet = context.Request["typeDet"];
            var safeStart = context.Request["safeStart"];
            var safeEnd = context.Request["safeEnd"];
            var enginDet = context.Request["enginDet"];
            var priceDet = context.Request["priceDet"];
            var yearStart = context.Request["yearStart"];
            var yearEnd = context.Request["yearEnd"];
            var mileDet = context.Request["mileDet"];
            var depart = context.Request["department"];
            var path1 = ImageHelper.SaveImage(context.Request.Files["topPhoto"]);

            var mtMileOrdate = context.Request["mtMileOrdate"];
            var mtMile = "";
            var mtStartDet = "";
            var mtEndDet = "";
            if (mtMileOrdate.Contains("时间"))
            {
                mtStartDet = context.Request["mtStartDet"].Trim();
                mtEndDet = context.Request["mtEndDet"].Trim();
            }
            else
            {
                mtMile = context.Request["mtMile"].Trim();
            }


            depart = ConvertHelper.ConvertDepartment(depart);

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(c => c.CarNumber == carNumber);
                if(car == null)
                {
                    json.state = "没有查询到此车的信息，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                car.CarPhoto = path1=="-1"? car.CarPhoto: path1;
                car.SimId = simId;
                car.DepartmentId = Convert.ToInt32(ConvertHelper.ConvertDepartment(depart));
                car.CarBrand = firBrandDet;
                car.BuyDate = Convert.ToDateTime(buydayDet);
                car.CarModel = modelDet;
                car.CarType = typeDet;
                car.EngineNumber = enginDet;
                car.CarPrice = Convert.ToDecimal(priceDet);
                car.InsuranceStartDate = Convert.ToDateTime(safeStart);
                car.InsuranceEndDate = Convert.ToDateTime(safeEnd);
                car.AnnualStartDate = Convert.ToDateTime(yearStart);
                car.AnnualEndDate = Convert.ToDateTime(yearEnd);
                car.MtMileOrDate = mtMileOrdate;
                car.Mileage = mileDet;
                if (mtMileOrdate.Contains("时间"))
                {
                    car.MaintenanceStartDate = Convert.ToDateTime(mtStartDet);
                    car.MaintenanceEndDate = Convert.ToDateTime(mtEndDet);
                }
                else
                {
                    car.MtMile = mtMile;
                }
                cms.SaveChanges();
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