using CarManageSystem.helper;
using CarManageSystem.Service;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Configuration;
using Newtonsoft.Json.Linq;
using ServiceStack.Redis;
using CarManageSystem.Model;
using SuperSocket.WebSocket;
using static CarManageSystem.Model.MyGlobal;

namespace CarManageSystem
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

            System.Threading.Tasks.Task.Factory.StartNew(() =>
            {
                //初始化 redis 中的状态
                using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
                {
                    lock(MyGlobal.locker)
                    {
                        if (!redisClient.ContainsKey("carList"))
                        {
                            redisClient.Set<CarList>("carList", new CarList() { carList = new List<Car>() });
                        }
                        if (!redisClient.ContainsKey("userList"))
                        {
                            redisClient.Set<List<UserInfo>>("userList", new List<UserInfo>());
                        }
                        if (!redisClient.ContainsKey("nightList"))
                        {
                            redisClient.Set<List<UseCarPush>>("nightList", new List<UseCarPush>());
                        }
                        if (!redisClient.ContainsKey("weekendList"))
                        {
                            redisClient.Set<List<UseCarPush>>("weekendList", new List<UseCarPush>());
                        }
                        if (!redisClient.ContainsKey("holidayList"))
                        {
                            redisClient.Set<List<UseCarPush>>("holidayList", new List<UseCarPush>());
                        }
                    }
                }

                string runService = System.Configuration.ConfigurationManager.ConnectionStrings["runService"].ConnectionString;
                string gpsPort = System.Configuration.ConfigurationManager.ConnectionStrings["gpsPort"].ConnectionString;
                string locationPort = System.Configuration.ConfigurationManager.ConnectionStrings["locationPort"].ConnectionString;

                string[] strs = runService.Split(',');
                if (strs[0] == "1")
                {
                    GPSServiceNew.GPSStart(Convert.ToInt32(gpsPort));
                }
                if (strs[1] == "1")
                {
                    WebSocketService.WSStart(Convert.ToInt32(locationPort));
                }
                if (strs[2] == "1")
                {
                    IlleagalInfoService illeagalInfoService = new IlleagalInfoService();
                    illeagalInfoService.Start();
                }
                if (strs[3] == "1")
                {
                    QueryHolidayService queryHolidayService = new QueryHolidayService();
                    queryHolidayService.Start();
                }
                if (strs[4] == "1")
                {
                    QueryLimit queryLimit = new QueryLimit();
                    queryLimit.Start();
                }

                Debug.WriteLine("服务已启动！");
            });
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpRuntimeSection runTime = (HttpRuntimeSection)WebConfigurationManager.GetSection("system.web/httpRuntime");
            int maxRequestLength = (runTime.MaxRequestLength) * 1024;
            if(Request.ContentLength>maxRequestLength)
            {
                dynamic json = new JObject();
                json.state = "图片容量超过限制，请求内容最大为4M";
                Response.Write(json.ToString());
                Response.End();
            }

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            
        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}