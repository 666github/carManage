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
    /// HandleIllegalUseCar 的摘要说明
    /// </summary>
    public class HandleIllegalUseCar : IHttpHandler, IRequiresSessionState
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

            var id = context.Request["id"];
            var user = context.Request["user"];
            var cause = context.Request["cause"];
            //var state = context.Request["state"];

            //iuc.State = Convert.ToInt16(state);
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var iuc = cms.illegalusecar.FirstOrDefault(s => s.id == id);
                if (iuc == null)
                {
                    json.state = "此违法用车已处理，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                iuc.User = user;
                iuc.Cause = cause;
                iuc.State = 0;
                var realName = cms.user.FirstOrDefault(s => s.Account == user).RealName;
                //更改非法用车状态 8  到 0   用不到了。
                //var tempCar_ill = cms.carinfo.FirstOrDefault(s => s.CarNumber == iuc.CarNumber);
                //if(tempCar_ill!=null)
                //{
                //    tempCar_ill.CarState = 0;
                //}

                //删除内存车辆表里的数据 (state 改为 -1  等待 websocket去删除)
                //using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
                //{
                //    lock(MyGlobal.locker)
                //    {
                //        var carList = redisClient.Get<CarList>("carList");
                //        if(carList!=null)
                //        {
                //            var car_ill = carList.carList.FirstOrDefault(s => s.id == iuc.CarNumber);
                //            if (car_ill != null)
                //            {
                //                car_ill.state = -1;
                //            }
                //            redisClient.Set<CarList>("carList", carList);
                //        }
                //    }
                //}

                //判断是非法回来了 还是 非法在路上 
                using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
                {
                    lock (MyGlobal.locker)
                    {
                        var carList = redisClient.Get<CarList>("carList");
                        if (carList != null)
                        {
                            var car_ill = carList.carList.FirstOrDefault(s => s.uniqueCode == iuc.id);
                            //找不到 说明非法已经进入围栏回来了
                            if (car_ill == null)
                            {
                                //把轨迹赋值给此人
                                var trajects = cms.trajectorylog.Where(x => x.UniqueCode == iuc.id)
                                    .ToList();
                                trajects.ForEach(x => x.User = realName);
                            }
                            //如果有 ，说明还在路上，需要对整个行程的uniqueCode 处理,需要处理成外出的状态
                            else
                            {
                                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == car_ill.id);
                                if (car != null)
                                {
                                    car.CarState = 2; //处理成外出的状态
                                }
                                //把之前的轨迹赋值给此人
                                var trajects = cms.trajectorylog.Where(x => x.UniqueCode == iuc.id)
                                    .ToList();
                                trajects.ForEach(x => x.User = realName);
                                //把状态改成中途已处理，并添加上人名
                                car_ill.isillegal = 9;
                                car_ill.userName = realName;
                            }
                            redisClient.Set<CarList>("carList", carList);
                        }
                    }
                }

                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());

                //推送
                //Task.Factory.StartNew(() =>
                //{
                try
                {
                    var msg = "您有一个非法用车，" + iuc.CarNumber;
                    PushHelper.PushToUser(user, "非法用车提醒", msg);
                }
                catch (Exception ex)
                {

                }

                //});

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