using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler
{
    /// <summary>
    /// NeedMaintain 的摘要说明
    /// </summary>
    public class ViewNeedMaintain : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var msgList = new List<string>();

            var department = 0;
            if(context.Request.Params.AllKeys.Contains("auto"))
            {
                department = -1;
            }
            else
            {
                //是否有部门管理员权限
                var currentUser = CheckHelper.RoleCheck(context, 1);
                if (currentUser == null)
                    return;
                department = CheckHelper.GetDepartmentId(currentUser, context);
            }

            dynamic json = new JObject();
            //state 1 维修 2保养 3年检
            //维修
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var date = DateTime.Now.AddDays(14).Date;
                var cars = cms.carinfo
                    .ToList()
                    .Where(s => s.NeedMaintain == 1&&s.CarStateDetial != 1&&(department==-1?true:s.DepartmentId== department))
                    .Select(i => new
                    {
                        i.DepartmentId,
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        carLicence = i.CarNumber,
                        carSpace = i.CarModel + "座",
                        safe = i.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.MaintenanceEndDate == null ? "" : i.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = "1",
                        maintReason=cms.returnregister.Where(s=>s.CarNumber==i.CarNumber&&s.CarRepair==1).OrderByDescending(s=>s.ReturnTime).FirstOrDefault().RepairDetail
                    }).ToList();
                //按里程保养
                var byCars1 = cms.carinfo.Where(s => s.MtMileOrDate.Contains("里程") && (department == -1 ? true : s.DepartmentId == department))
                    .ToList()
                    .Where(s => Convert.ToInt32(s.Mileage) >= Convert.ToInt32(s.MtMile))
                    .Select(i => new
                    {
                        i.DepartmentId,
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        carLicence = i.CarNumber,
                        carSpace = i.CarModel + "座",
                        safe = i.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.MaintenanceEndDate == null ? "" : i.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = "2",
                        maintReason = ""
                    }).ToList();
                //按时间保养
                var byCars = cms.carinfo.Where(s => s.MtMileOrDate.Contains("时间"))
                    .ToList()
                    .Where(s => date >= s.MaintenanceEndDate && s.CarStateDetial != 2 && (department == -1 ? true : s.DepartmentId == department))
                    .Select(i => new
                    {
                        i.DepartmentId,
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        carLicence = i.CarNumber,
                        carSpace = i.CarModel + "座",
                        safe = i.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.MaintenanceEndDate == null ? "" : i.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = "2",
                        maintReason = ""
                    }).ToList();
                //年检
                var anCars =cms.carinfo
                    .ToList()
                    .Where(s=> date >= s.AnnualEndDate && s.CarStateDetial != 3 && (department == -1 ? true : s.DepartmentId == department))
                    .Select(i => new
                    {
                        i.DepartmentId,
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        carLicence = i.CarNumber,
                        carSpace = i.CarModel + "座",
                        safe = i.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.MaintenanceEndDate == null ? "" : i.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = "3",
                        maintReason = ""
                    }).ToList();
                //保险
                var inCars = cms.carinfo
                    .ToList()
                    .Where(s => date >= s.InsuranceEndDate && s.CarStateDetial != 4 && (department == -1 ? true : s.DepartmentId == department))
                    .Select(i => new
                    {
                        i.DepartmentId,
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        brand = i.CarBrand,
                        carLicence = i.CarNumber,
                        carSpace = i.CarModel + "座",
                        safe = i.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.MaintenanceEndDate == null ? "" : i.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = "4",
                        maintReason = ""
                    }).ToList();

                
                byCars.ForEach(i => cars.Add(i));
                byCars1.ForEach(i => cars.Add(i));
                anCars.ForEach(i => cars.Add(i));
                inCars.ForEach(i => cars.Add(i));

                //到期消息提醒
                var _msg_expires = cms.msg_expire.Where(s => s.IsAudit == 0 || s.IsAudit == null).ToList();
                var now = DateTime.Now;
                foreach(var _car in cars.Where(s=>s.stateInf!="1"))
                {
                    if(_msg_expires.FirstOrDefault(s=>s.Car== _car.carLicence&&s.Type.ToString()==_car.stateInf&&(s.IsAudit == 0 || s.IsAudit == null))!=null)
                    {
                        continue;
                    }
                    var _msg_expire = new msg_expire()
                    {
                        Id = Guid.NewGuid().ToString(),
                        IsLook = 0,
                        DIsLook = 0,
                        Car = _car.carLicence,
                        Type = Convert.ToInt16(_car.stateInf),
                        CarDepartment=_car.DepartmentId,
                        redpoint=0,
                        Dredpoint=0,
                        ApplyTime = now
                    };
                    cms.msg_expire.Add(_msg_expire);
                    msgList.Add(_car.carLicence +"|"+ (_car.stateInf=="2"?"保养到期":( _car.stateInf == "3"?"年检到期":"保险到期")));
                }
                cms.SaveChanges();
                json.maintInf = JArray.FromObject(cars);
                json.state = "success";
                context.Response.Write(json.ToString());

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    msgList.ForEach(x => {
                        var temp = x.Split('|');
                        PushHelper.PushToDepartCtrlByCarNumber(temp[0], "到期提醒", temp[0] + temp[1]);
                    });
                }
                catch(Exception ex)
                {

                }
                    
                //});

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