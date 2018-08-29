using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// ViewCarsMileage 的摘要说明
    /// </summary>
    public class ViewCarsMileage : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            //查询
            var department = CheckHelper.GetDepartmentId(currentUser,context);
            var startDate = context.Request["startDate"].Trim();
            var endDate = context.Request["endDate"].Trim();

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                dynamic json = new JObject();
                
                var carList = cms.carinfo.ToList()
                    .Where(s=> department==-1 ? true : department == s.DepartmentId)
                    .Select(item => new
                    {
                        carsImg = ImageHelper.GetImagePath(item.CarPhoto),
                        firstBrand = item.CarBrand,
                        plateNum = item.CarNumber,
                        seat = item.CarModel+"座",
                        miles = cms.returnregister.ToList()
                               .Where(r => r.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= r.ReturnTime)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > r.ReturnTime))
                               .Sum(s => s.TravelMileage),
                        count = cms.returnregister.ToList()
                               .Count(r => r.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= r.ReturnTime)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > r.ReturnTime))
                    }).ToList();

                if (context.Request.Params.AllKeys.Contains("export"))
                {
                    //导出表格
                    var dt = new DataTable();
                    dt.Columns.Add("车辆品牌");
                    dt.Columns.Add("车牌号");
                    dt.Columns.Add("车座数");
                    dt.Columns.Add("车辆被使用公里数");
                    dt.Columns.Add("车辆外出次数");

                    foreach (var temp in carList)
                    {
                        var row = dt.NewRow();
                        row[0] = temp.firstBrand;
                        row[1] = temp.plateNum;
                        row[2] = temp.seat;
                        row[3] = temp.miles;
                        row[4] = temp.count;

                        dt.Rows.Add(row);
                    }
                    ExcelHelper.ExportByWeb(dt, "车辆里程统计", "车辆里程统计.xls");
                }
                else
                {
                    //转Json
                    json.totalNum = carList.Count();
                    json.mileNum = carList.Sum(s => Convert.ToDouble(s.miles));
                    json.travelNum = carList.Sum(s => Convert.ToInt16(s.count));
                    var carJson = JArray.FromObject(carList);
                    json.mileageInfo = carJson;
                    json.state = "success";
                    context.Response.Write(json.ToString());
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