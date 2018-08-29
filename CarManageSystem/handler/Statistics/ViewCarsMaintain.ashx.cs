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
    /// ViewCarsMaintain 的摘要说明
    /// </summary>
    public class ViewCarsMaintain : IHttpHandler,IRequiresSessionState
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
            var state = context.Request["status"].Trim();
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                dynamic json = new JObject();

                var carList = cms.carinfo.ToList()
                    .Where(s=> department==-1 ? true : department == s.DepartmentId)
                    .Select(item => new
                    {
                        carImg = ImageHelper.GetImagePath(item.CarPhoto),
                        firstBrand = item.CarBrand,
                        carMode = item.CarType,
                        licence = item.CarNumber,
                        seat = item.CarModel+"座",
                        price = cms.carcostregister.ToList()
                               .Where(c => c.CarNumber == item.CarNumber
                               &&(string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > c.MaintenanceStartDate)
                               &&(string.IsNullOrEmpty(state)?true:Convert.ToInt32(state)==c.Type))
                               .Sum(x => x.Cost),
                        count = cms.carcostregister.ToList()
                               .Count(c => c.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(state) ? true : Convert.ToInt32(state) == c.Type)&&c.Type!=5),

                        maintenanceCosts = cms.carcostregister.ToList()
                               .Where(c => c.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > c.MaintenanceStartDate)
                               && (c.Type==1))
                               .Sum(x => x.Cost),
                        serviceCosts= cms.carcostregister.ToList()
                               .Where(c => c.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > c.MaintenanceStartDate)
                               && (c.Type == 2||c.Type==3||c.Type==4))
                               .Sum(x => x.Cost),
                        refuelingFee = cms.carcostregister.ToList()
                               .Where(c => c.CarNumber == item.CarNumber
                               && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= c.MaintenanceStartDate)
                               && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > c.MaintenanceStartDate)
                               && (c.Type == 5))
                               .Sum(x => x.Cost)
                    });

                if (context.Request.Params.AllKeys.Contains("export"))
                {
                    //导出表格
                    var dt = new DataTable();
                    dt.Columns.Add("车辆品牌");
                    dt.Columns.Add("车牌号");
                    dt.Columns.Add("车座数");
                    dt.Columns.Add("总花费");
                    dt.Columns.Add("维修保养次数");
                    dt.Columns.Add("维修费用");
                    dt.Columns.Add("到期保养费用");
                    dt.Columns.Add("加油费用");


                    foreach (var temp in carList)
                    {
                        var row = dt.NewRow();
                        row[0] = temp.firstBrand;
                        row[1] = temp.licence;
                        row[2] = temp.seat;
                        row[3] = temp.price;
                        row[4] = temp.count;
                        row[5] = temp.maintenanceCosts;
                        row[6] = temp.serviceCosts;
                        row[7] = temp.refuelingFee;

                        dt.Rows.Add(row);
                    }
                    ExcelHelper.ExportByWeb(dt, "费用统计", "费用统计.xls");
                }
                else
                {
                    //转Json
                    json.maintenanceCosts = carList.Sum(s => Convert.ToDecimal(s.maintenanceCosts));    //维修费用
                    json.serviceCosts = carList.Sum(s => Convert.ToDecimal(s.serviceCosts));            //保养费用
                    json.maintenanceCount = carList.Sum(s => Convert.ToInt16(s.count));                 //维修保养次数
                    json.refuelingFee = carList.Sum(s => Convert.ToDecimal(s.refuelingFee));            //加油费用
                    json.maintenanceInfo = JArray.FromObject(carList);
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