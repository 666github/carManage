using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// ReturnCar 的摘要说明
    /// </summary>
    public class ReturnCar : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var travMileage = context.Request["travMileage"].Trim();

            

            var carRepair=context.Request["carRepair"].Trim();
            var carRepairDetail = context.Request["carRepairDetail"].Trim();
            var returnAtOut = context.Request["returnAtOut"].Trim();
            var returnDetail = context.Request["returnDetail"].Trim();
            var uniqueCode = context.Request["uniqueCode"].Trim();
            var gasL = context.Request["gasL"].Trim();
            string uAccount = currentUser.Account;
            var now = DateTime.Now;
            dynamic json = new JObject();

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var br = cms.borrowregister.FirstOrDefault(s => s.UniqueCode == uniqueCode);
                if (br == null)
                {
                    json.state = "用户没有此借车记录！";
                    context.Response.Write(json.ToString());
                    return;
                }
                if (uAccount != br.User)
                {
                    json.state = "用户没有此借车记录！";
                    context.Response.Write(json.ToString());
                    return;
                }
                var re = cms.returnregister.FirstOrDefault(s => s.UniqueCode == uniqueCode);
                if (re != null)
                {
                    json.state = "此车已还！";
                    context.Response.Write(json.ToString());
                    return;
                }
                //更改车辆状态
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == br.CarNumber);

                if(Convert.ToInt64(travMileage)<=Convert.ToInt64(car.Mileage)) //|| (Convert.ToInt32(travMileage)-500 )>= Convert.ToInt32(car.Mileage)
                {
                    json.state = "输入的公里数有误，请检查";
                    context.Response.Write(json.ToString());
                    return;
                }

                if (carRepair == "1")
                {
                    if (car.NeedMaintain == 1)
                    {
                        json.state = "此车已被他人报修，请不要再次报修！";
                        context.Response.Write(json.ToString());
                        return;
                    }
                    car.NeedMaintain = 1;

                    //车辆维修消息
                    var _msg_maintain = new msg_maintain()
                    {
                        Id = Guid.NewGuid().ToString(),
                        IsLook=0,
                        DIsLook=0,
                        User=currentUser.Account,
                        Car=car.CarNumber,
                        ApplyTime= now,
                        UserDepartment=Convert.ToString(currentUser.Department),
                        redpoint=0,
                        Dredpoint=0,
                        CarDepartment= Convert.ToInt32(car.DepartmentId)
                    };
                    cms.msg_maintain.Add(_msg_maintain);
                }

                var returnState = 0;
                if (returnAtOut == "院外")//如果院外还车
                {
                    returnState = 1;
                    car.IsOut = 1;
                    //院外还车消息
                    var _msg_outreturn = new msg_outreturncar()
                    {
                        Id = uniqueCode,
                        IsLook=0,
                        DIsLook=0,
                        User=currentUser.Account,
                        Car=car.CarNumber,
                        Place="院外",
                        CarDepartment=car.DepartmentId,
                        Time= now,
                        redpoint=0,
                        Dredpoint=0
                    };
                    cms.msg_outreturncar.Add(_msg_outreturn);
                }
                else
                {
                    car.IsOut = 0;
                }

                var re1 = new returnregister()
                {
                    user = uAccount,
                    ReturnTime = now,
                    ReturnPlace = returnAtOut,
                    TravelMileage = Convert.ToDouble(travMileage) - Convert.ToDouble(car.Mileage),
                    CarRepair = Convert.ToInt16(carRepair),
                    RepairDetail = carRepairDetail,
                    ReturnDetail = returnDetail,
                    CarNumber = br.CarNumber,
                    UniqueCode = uniqueCode,
                    ReturnState = returnState,
                };
                car.Site = returnAtOut;
                car.CarState = 0;
                car.Mileage = travMileage;
                car.CurrentUser = "";
                car.GasL = gasL;
                var usr = cms.user.FirstOrDefault(s => s.Account == uAccount);
                usr.state = 0;
                cms.returnregister.Add(re1);
                cms.SaveChanges();

                //还车 改变 车数据表 中 车的发送状态
                using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
                {
                    lock(MyGlobal.locker)
                    {
                        var carList = redisClient.Get<CarList>("carList");
                        if(carList!=null)
                        {
                            var temoCar = carList.carList.FirstOrDefault(s => s.id == car.CarNumber);
                            if (temoCar != null)
                            {
                                temoCar.state = -1;
                            }
                            redisClient.Set<CarList>("carList", carList);
                        }
                    }
                }
                   
                //同时改变数据库中的状态
                //var tempCarItem = cms.carlist.FirstOrDefault(s => s.id == car.CarNumber);
                //if(tempCarItem!=null)
                //{
                //    tempCarItem.state = -1;
                //}
                //cms.SaveChanges();


                json.state = "success";
                context.Response.Write(json.ToString());


                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    if (returnAtOut == "院外")
                    {
                        var msg = currentUser.RealName + "将" + car.CarNumber + "院外还车";
                        PushHelper.PushToDepartCtrl(car.CarNumber, "", msg);
                    }
                    if (carRepair == "1")
                    {
                        var msg = car.CarNumber + "需要维修";
                        PushHelper.PushToDepartCtrlByCarNumber(car.CarNumber, "维修申请", msg);
                    }
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