﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.CarManage.HolidayUse
{
    /// <summary>
    /// AutoUpdateHolidayUse 的摘要说明
    /// </summary>
    public class AutoUpdateHolidayUse : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var now = Convert.ToDateTime(DateTime.Now.ToShortDateString());
                var holiday = cms.holidaydata
                    .Where(s => s.end >= now)
                    .OrderBy(x => x.start)
                    .FirstOrDefault();
                if(holiday!=null)
                {
                    //如果已经设置过，则略过
                    if (holiday.isAlreadySet == 0)
                    {
                        var carList = cms.carinfo.ToList();
                        foreach (var car in carList)
                        {
                            car.HolodayStart = holiday.start;
                            car.HolodayEnd = holiday.end;
                        }
                        holiday.isAlreadySet = 1;
                    }
                    cms.SaveChanges();
                   
                }
                context.Response.Write("success");
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