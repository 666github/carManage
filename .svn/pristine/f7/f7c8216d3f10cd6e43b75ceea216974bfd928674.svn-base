using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Statistics
{
    /// <summary>
    /// ViewDriverStatistics 的摘要说明
    /// </summary>
    public class ViewDriverStatistics : IHttpHandler,IRequiresSessionState
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

                var drivers = cms.user.ToList()
                    .Where(s => (department==-1 ? true : department == s.Department)&&s.UserType!=-1)
                    .Select(item => new
                    {
                        driverImg = ImageHelper.GetImagePath(item.UserPhoto),
                        driverName = item.RealName,
                        driverBranch = cms.departmentmanage.FirstOrDefault(s => s.Id == item.Department).Name,
                        driverType = item.DriverType==0?"兼职":"专职",
                        driverLicenseInfo = item.AllowModel,
                        driverNumInfo = cms.returnregister.ToList().Count(s => s.user == item.Account
                        && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= s.ReturnTime)
                        && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > s.ReturnTime)),
                        milesNum = cms.returnregister.ToList().Where(s => s.user == item.Account
                        && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= s.ReturnTime)
                        && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > s.ReturnTime)).Sum(x =>x.TravelMileage),
                        illegalNumInfo = cms.illegalstatistic.ToList().Count(s=>s.User==item.Account
                        && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= s.Time)
                        && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > s.Time)),
                        illeaglUCNumInfo=cms.illegalusecar.ToList().Count(s => s.User == item.Account
                        && (string.IsNullOrEmpty(startDate) ? true : Convert.ToDateTime(startDate) <= s.Time)
                        && (string.IsNullOrEmpty(endDate) ? true : Convert.ToDateTime(endDate) > s.Time))
                    });
                if(context.Request.Params.AllKeys.Contains("export"))
                {
                    //导出表格
                    var dt = new DataTable();
                    dt.Columns.Add("用户姓名");
                    dt.Columns.Add("部门名称");
                    dt.Columns.Add("司机类型");
                    dt.Columns.Add("驾驶类型");
                    dt.Columns.Add("驾驶次数");
                    dt.Columns.Add("行驶里程");
                    dt.Columns.Add("违章次数");
                    dt.Columns.Add("非法用车次数");

                    foreach(var temp in drivers)
                    {
                        var row = dt.NewRow();
                        row[0] = temp.driverName;
                        row[1] = temp.driverBranch;
                        row[2] = temp.driverType;
                        row[3] = temp.driverLicenseInfo;
                        row[4] = temp.driverNumInfo;
                        row[5] = temp.milesNum;
                        row[6] = temp.illegalNumInfo;
                        row[7] = temp.illeaglUCNumInfo;

                        dt.Rows.Add(row);
                    }
                    ExcelHelper.ExportByWeb(dt, "司机统计记录", "司机统计记录.xls");
                }
                else
                {
                    json.partTimeDriCount = drivers.Count(s => s.driverType == "兼职");
                    json.fullTimeDriCount = drivers.Count(s => s.driverType == "专职");
                    json.c1Count = drivers.Sum(s => s.illegalNumInfo); //违章
                    json.c2Count = drivers.Sum(s => s.illeaglUCNumInfo);  //非法用车
                    json.driversInfo = JArray.FromObject(drivers);
                    for (var i = 0; i < json.driversInfo.Count; i++)
                    {
                        if (json.driversInfo[i].milesNum == null)
                        {
                            json.driversInfo[i].milesNum = 0;
                        }
                    }
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