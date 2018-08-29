using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// DeleteCar 的摘要说明
    /// </summary>
    public class DeleteCar : IHttpHandler,IRequiresSessionState
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

            var inJson = context.Request["cars"];
            var carsObj = JsonConvert.DeserializeObject<RemoveUseCar>(inJson);

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                
                var cars = cms.carinfo.Where(s => carsObj.cars.Contains(s.CarNumber)).ToList();
                foreach (var car in cars)
                {
                    if(car.CarState!=0)
                    {
                        json.state = "包含不是空闲状态的车辆，删除失败";
                        context.Response.Write(json.ToString());
                        return;
                    }
                    //把跟车牌相关的表中的数据也一起删掉
                    cms.borrowregister.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x=> cms.borrowregister.Remove(x));
                    cms.carcostregister.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x => cms.carcostregister.Remove(x));
                    cms.illegalstatistic.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x => cms.illegalstatistic.Remove(x));
                    cms.illegalusecar.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x => cms.illegalusecar.Remove(x));
                    cms.returnregister.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x => cms.returnregister.Remove(x));
                    cms.trajectorylog.Where(s => s.CarNumber == car.CarNumber).ToList().ForEach(x => cms.trajectorylog.Remove(x));
                    cms.msg_borrowcar.Where(s => s.AccessCar == car.CarNumber).ToList().ForEach(x => cms.msg_borrowcar.Remove(x));
                    cms.msg_expire.Where(s => s.Car == car.CarNumber).ToList().ForEach(x => cms.msg_expire.Remove(x));
                    cms.msg_maintain.Where(s => s.Car == car.CarNumber).ToList().ForEach(x => cms.msg_maintain.Remove(x));
                    cms.msg_outreturncar.Where(s => s.Car == car.CarNumber).ToList().ForEach(x => cms.msg_outreturncar.Remove(x));

                    cms.carinfo.Remove(car);

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