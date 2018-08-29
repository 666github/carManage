using CarManageSystem.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler.CarManage.HolidayUse
{
    /// <summary>
    /// AutoHolidaySet 的摘要说明
    /// </summary>
    public class AutoHolidaySet : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var data = context.Request["data"].ToString().Replace("\\","");
            //var data="[{\"name\":\"元旦\",\"festival\":\"2015-1-1\",\"desc\":\"1月1日至3日放假调休，共3天。1月4日（星期日）上班。\",\"list\":[{\"date\":\"2015-1-1\",\"status\":\"1\"},{\"date\":\"2015-1-2\",\"status\":\"1\"},{\"date\":\"2015-1-3\",\"status\":\"1\"},{\"date\":\"2015-1-4\",\"status\":\"2\"}],\"list#num#\":4},{\"name\":\"除夕\",\"festival\":\"2015-2-18\",\"desc\":\"除夕\",\"list\":[{\"date\":\"2015-2-18\",\"status\":\"1\"}],\"list#num#\":1},{\"name\":\"春节\",\"festival\":\"2015-2-19\",\"desc\":\"2月18日至24日放假调休，共7天。2月15日（星期日）、2月28日（星期六）上班。\",\"list\":[{\"date\":\"2015-2-15\",\"status\":\"2\"},{\"date\":\"2015-2-18\",\"status\":\"1\"},{\"date\":\"2015-2-19\",\"status\":\"1\"},{\"date\":\"2015-2-20\",\"status\":\"1\"},{\"date\":\"2015-2-21\",\"status\":\"1\"},{\"date\":\"2015-2-22\",\"status\":\"1\"},{\"date\":\"2015-2-23\",\"status\":\"1\"},{\"date\":\"2015-2-24\",\"status\":\"1\"},{\"date\":\"2015-2-28\",\"status\":\"2\"}],\"list#num#\":9}]";
            var carsObj = JsonConvert.DeserializeObject<List<HolidayData>>(data);

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                foreach (var temp in carsObj)
                {
                    var tempList = temp.list.Where(s => s.status == "1").ToList();
                    var start = tempList[0].date;
                    var end = tempList[tempList.Count - 1].date;
                    //已有的信息过滤
                    var info = cms.holidaydata
                        .ToList()
                        .FirstOrDefault(s => Convert.ToDateTime(s.start) == Convert.ToDateTime(start) && Convert.ToDateTime(s.end) == Convert.ToDateTime(end));
                    if(info==null)
                    {
                        var holidaydata = new holidaydata()
                        {
                            name = start + "_" + temp.name,
                            start = Convert.ToDateTime(start),
                            end = Convert.ToDateTime(end),
                            isAlreadySet = 0
                        };
                        cms.holidaydata.Add(holidaydata);
                    }
                }
                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write("success");
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