using CarManageSystem.Model;
using Fleck;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace CarManageSystem.Service
{
    public class LocationService
    {
        static List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();
        static WebSocketServer server;
        static System.Threading.Timer timer;
        static int timerPeriod = 0;
        public LocationService(string ip, int port)
        {
            FleckLog.Level = LogLevel.Debug;
            server = new WebSocketServer(string.Format("ws://{0}:", ip) + port);
        }

        public void Start()
        { 
            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    try
                    {
                        Debug.WriteLine(socket.ConnectionInfo.Id + "已连接");
                        allSockets.Add(socket);
                    }
                    catch(Exception ex)
                    {
                        return;
                    }
                };
                socket.OnClose = () =>
                {
                    try
                    {
                        Debug.WriteLine(socket.ConnectionInfo.Id + "已断开");
                        allSockets.Remove(socket);
                    }
                    catch(Exception ex)
                    {
                        return;
                    }
                };
                socket.OnMessage = message =>
                {
                    try
                    {
                        Debug.WriteLine("接收到：" + socket.ConnectionInfo.Id + "的消息：" + message);
                    }
                    catch(Exception ex)
                    {
                        return;
                    }
                };
            });

            Debug.WriteLine("websocket服务已开启...");
            timer = new System.Threading.Timer(new System.Threading.TimerCallback(TimeDo), null, 1, 6000);
            Debug.WriteLine("定时器开启，定时发送数据...");
        }

        private void TimeDo(object sender)
        {
            try
            {
                Debug.WriteLine("定时器j计数" + timerPeriod++);
                if (MyGlobal.carsList.Count > 0)
                {
                    lock (MyGlobal.carsList)
                    {
                        dynamic json = JArray.FromObject(MyGlobal.carsList);
                        allSockets.ToList().ForEach(s => s.Send(json.ToString()));
                        //把state为-1的清除掉
                        for (var i = MyGlobal.carsList.Count - 1; i >= 0; i--)
                        {
                            if (MyGlobal.carsList[i].state == -1)
                            {
                                var tempId = MyGlobal.carsList[i].id;
                                MyGlobal.carsList.Remove(MyGlobal.carsList[i]);
                                //同时清除数据库中数据
                                using(cmsdbEntities cms = new cmsdbEntities())
                                {
                                    var tempCarItem = cms.carlist.FirstOrDefault(s => s.id == tempId);
                                    if(tempCarItem!=null)
                                    {
                                        cms.carlist.Remove(tempCarItem);
                                        cms.SaveChanges();
                                    }
                                    cms.Dispose();
                                }
                            }
                        }
                        
                        string res = json.ToString();
                        Debug.WriteLine(res);
                    }
                }
            }
            catch(Exception ex)
            {
                return;
            }
        }
    }
}