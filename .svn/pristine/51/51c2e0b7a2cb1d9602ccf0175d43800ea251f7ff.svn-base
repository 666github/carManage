using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Net.Mail;
using SuperSocket.WebSocket;
using System.Net;
using System.IO;
using System.Data;

namespace testCode
{
    class Program
    {
        static void Main(string[] args)
        {
            var now = DateTime.Now;
            var dt = ExcelHelper.Import(@"d:\车辆管理\司机信息表12.20.xls");
            var cardt = ExcelHelper.Import(@"d:\车辆管理\车辆信息表12.20.xls");
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                foreach (DataRow row in dt.Rows)
                {
                    var user = new user()
                    {
                        Account = Convert.ToString(row[0]),
                        AllowModel = Convert.ToString(row[2]).Split('，')[0],
                        ApplyDate = now,
                        ApplyLevel = 0,
                        ApplyRole = 0,
                        ApplyState = 1,
                        Department = 13,
                        DriverLicensePhoto = @"\image\基础测绘院驾照照片\" + Convert.ToString(row[1]) + ".jpg",
                        DriverType = Convert.ToString(row[9]).Contains("专职") ? 1 : 0,
                        EffecDateStart = Convert.ToDateTime(row[5]),
                        EffecDateEnd = Convert.ToDateTime(row[6]),
                        Email = Convert.ToString(row[4]),
                        Enable = 1,
                        Password = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile("123456", "MD5"),
                        Phone = Convert.ToString(row[7]),
                        RealName = Convert.ToString(row[1]),
                        state = 0,
                        UserPhoto = @"\image\基础测绘院司机照片\" + Convert.ToString(row[1]) + ".jpg",
                        UserType = 0,
                        LastLoginDate = "2017-12-29 15:05:29|2017-12-29 15:05:29"
                    };
                    cms.user.Add(user);
                }

                foreach (DataRow row in cardt.Rows)
                {
                    
                    if (row[0].GetType().ToString() == "System.DBNull")
                    {
                        break;
                    }
                    var car = new carinfo()
                    {
                        CarBrand = Convert.ToString(row[0]),
                        CarNumber = Convert.ToString(row[1]),
                        CarType = Convert.ToString(row[2]),
                        CarModel = Convert.ToString(row[3]),
                        BuyDate = now,
                        CarPrice = 10,
                        EngineNumber = Convert.ToString(row[6]),
                        DepartmentId = 13,
                        Mileage = Convert.ToString(row[8]),
                        AnnualStartDate = Convert.ToDateTime(row[9]),
                        AnnualEndDate = Convert.ToDateTime(row[10]),
                        MaintenanceStartDate = now,
                        MaintenanceEndDate = now,
                        MtMile = "10000",
                        MtMileOrDate = "按里程保养",
                        InsuranceStartDate = Convert.ToDateTime(row[15]).AddYears(-1),
                        InsuranceEndDate = Convert.ToDateTime(row[15]),
                        CarState = 0,
                        CarPhoto = @"\image\基础测绘院车辆照片\" + Convert.ToString(row[1]) + ".jpg",
                        CarStateDetial = 0,
                        CurrentUser = "",
                        GasL = "50%~70%",
                        islimit = 0,
                        NeedMaintain = 0,
                        SimId = "",
                        Site = "楼前",
                        CarPassword = "",
                        HolodayStart = Convert.ToDateTime("2017-12-30"),
                        HolodayEnd = Convert.ToDateTime("2018-1-1"),
                        IsOut = 0,
                        LoginAdmin = "nitingwei",
                        MaintainUser = ""
                    };
                    cms.carinfo.Add(car);
                }
                cms.SaveChanges();
                cms.Dispose();
            }

            Console.WriteLine("完成");
            Console.ReadLine();
        }
    }
}
