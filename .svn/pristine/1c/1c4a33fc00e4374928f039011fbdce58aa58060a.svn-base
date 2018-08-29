using CarManageSystem.Model;
using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static CarManageSystem.Model.MyGlobal;

namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// AutoClearUC 的摘要说明
    /// </summary>
    public class AutoClearUC : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var clear = context.Request["clear"];
            using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
            {
                if(clear== "123456")
                {
                    lock (MyGlobal.nightUCLocker)
                    {
                        redisClient.Set<List<UseCarPush>>("nightList", new List<UseCarPush>());
                    }
                    lock (MyGlobal.holidayUCLocker)
                    {
                        redisClient.Set<List<UseCarPush>>("weekendList", new List<UseCarPush>());
                    }
                    lock (MyGlobal.weekendUCLocker)
                    {
                        redisClient.Set<List<UseCarPush>>("holidayList", new List<UseCarPush>());
                    }
                    context.Response.Write("success");
                }
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