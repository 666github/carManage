using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using ServiceStack.Redis;
using SuperSocket.WebSocket;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace CarManageSystem.Service
{
    public class WebSocketService
    {
        static List<WebSocketSession> allSockets = new List<WebSocketSession>();
        static System.Threading.Timer timer;
        static int timerPeriod = 0;

        public static void WSStart(int port)
        {
            WebSocketServer webSocketServer = new WebSocketServer();
            webSocketServer.Setup(port);
            webSocketServer.NewSessionConnected += WebSocketServer_NewSessionConnected;
            webSocketServer.SessionClosed += WebSocketServer_SessionClosed;
            webSocketServer.Start();

            Debug.WriteLine("websocket服务已开启...");
            timer = new System.Threading.Timer(new System.Threading.TimerCallback(TimeDo), null, 1, 2000);
            Debug.WriteLine("定时器开启，定时发送数据...");
        }

        private static void WebSocketServer_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            try
            {
                lock (MyGlobal.webSocketLocaker)
                {
                    if (allSockets.Contains(session))
                    {
                        allSockets.Remove(session);

                    }
                }
            }
            catch (Exception ex)
            {

            }
        }

        private static void WebSocketServer_NewSessionConnected(WebSocketSession session)
        {
            Debug.WriteLine("websocketSession："+session.SessionID);
            
            try
            {
                lock (MyGlobal.webSocketLocaker)
                {
                    allSockets.Add(session);
                }
            }
            catch (Exception ex)
            {

            }
        }

        private static void TimeDo(object sender)
        {
            try
            {
                Debug.WriteLine("定时器j计数" + timerPeriod++);

                using (IRedisClient rc = MyGlobal.prcm.GetClient())
                {
                    lock (MyGlobal.locker)
                    {
                        var carList = rc.Get<CarList>("carList");
                        if (carList.carList != null)
                        {
                            dynamic json = JArray.FromObject(carList.carList);
                            if(allSockets.Count>0)
                            {
                                allSockets.ToList().ForEach(s => s.Send(json.ToString()));
                            }
                            //把state为-1的清除掉
                            for (var i = carList.carList.Count - 1; i >= 0; i--)
                            {
                                if (carList.carList[i].state == -1)
                                {
                                    var tempId = carList.carList[i].id;
                                    carList.carList.Remove(carList.carList[i]);
                                }
                            }
                            rc.Set<CarList>("carList", carList);
                            string res = json.ToString();
                            Debug.WriteLine(res);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return;
            }
        }
    }
}