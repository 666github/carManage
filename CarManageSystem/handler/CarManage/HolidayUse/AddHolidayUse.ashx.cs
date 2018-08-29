﻿using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// SetHolidayUse 的摘要说明 
    /// 在HolidayUse的时间段内的话，是不可用状态
    /// </summary>
    public class AddHolidayUse : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            //json格式 
            //          {
            //              "start": "2017-05-01",
            //              "end": "2017-05-03",
            //              "cars": [
            //                  "京A12350",
            //                  "京A12350"
            //               ]
            //          }
            var tempJson = context.Request["reqJson"].Trim();
            var carsObj = JsonConvert.DeserializeObject<HolidayUseCar>(tempJson);
            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                if (CheckHelper.HasNull(carsObj.start, carsObj.end))
                {
                    json.state = "起止时间不能为空值";
                    context.Response.Write(json.ToString());
                    return;
                }
                
                var startDate = Convert.ToDateTime(carsObj.start);
                var endDate = Convert.ToDateTime(carsObj.end);

                //设置所有选中的车辆的holidayuse时间段
                var cars = cms.carinfo
                    .Where(c=> !carsObj.cars.Contains(c.CarNumber));
                foreach (var car in cars)
                {
                    car.HolodayStart = startDate;
                    car.HolodayEnd = endDate;
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