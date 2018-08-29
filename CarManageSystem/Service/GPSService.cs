using CarManageSystem.Extension;
using CarManageSystem.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Web;

namespace CarManageSystem.helper
{
    public class GPSService
    {
        static string fence = System.Configuration.ConfigurationManager.ConnectionStrings["fence"].ConnectionString;
        static string ak=  System.Configuration.ConfigurationManager.ConnectionStrings["baiduMapAK"].ConnectionString;
        static AsyncTCPServer ats;
        static List<CarConnect> carConnList = new List<CarConnect>();
        
        public GPSService(string ip,int port)
        {
            try
            {
                //先从数据库读出保存的状态
                using (cmsdbEntities cms = new cmsdbEntities())
                {
                    //用车内存表
                    MyGlobal.carsList.Clear();
                    var carLists = cms.carlist.ToList();
                    carLists.ForEach(x => 
                    {
                        MyGlobal.carsList.Add(new Car()
                        {
                            id=x.id,
                            state=(int)x.state,
                            isillegal=(int)x.isillegal,
                            userName=x.userName,
                            position= new Position()
                            {
                                x=(double)x.x,
                                y=(double)x.y
                            }
                        });
                    });


                    //非法用用车内存表
                    MyGlobal.illegalUseList.Clear();
                    var illegalUses = cms.illegalusecar.Where(s => s.State == 1).ToList();
                    illegalUses.ForEach(x =>
                    {
                        MyGlobal.illegalUseList.Add(new illegalusecar()
                        {
                            CarNumber=x.CarNumber,
                            State=x.State,
                            id = x.id,
                            Time =x.Time,
                            IsLook =x.IsLook,
                            DIsLook = x.DIsLook,
                            redpoint = x.redpoint,
                            Dredpoint = x.Dredpoint
                        });
                    });
                    cms.Dispose();
                }
                


                ats = new AsyncTCPServer(IPAddress.Any, port);
                ats.DataReceived += Ats_DataReceived;
                ats.ClientConnected += Ats_ClientConnected;
                ats.ClientDisconnected += Ats_ClientDisconnected;
                ats.NetError += Ats_NetError;
                ats.OtherException += Ats_OtherException;
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return;
            }
        }

        /// <summary>
        /// 网络错误事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private static void Ats_NetError(object sender, AsyncEventArgs e)
        {
            Debug.WriteLine("网络错误事件"+e._msg);
            return;
        }
        /// <summary>
        /// 异常事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private static void Ats_OtherException(object sender,AsyncEventArgs e)
        {
            Debug.WriteLine("异常事件"+e._msg);
            return;
        }


        //断开事件
        private static void Ats_ClientDisconnected(object sender, AsyncEventArgs e)
        {
            try
            {
                Debug.WriteLine("已断开");
                //carConnList.FirstOrDefault(s => s.tcpClientState == e._state).timer.Dispose();
                var car = carConnList.FirstOrDefault(s => s.tcpClientState == e._state);
                //var dataCar=MyGlobal.carsList.FirstOrDefault(s => s.id == car.id);
                //dataCar.state = 0;
                carConnList.Remove(car);

            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return;
            }
        }

        //连接事件
        private static void Ats_ClientConnected(object sender, AsyncEventArgs e)
        {
            try
            {
                Debug.WriteLine("有新连接");
                //Timer t = new Timer((o) =>
                //{
                //    ats.Send(e._state.TcpClient, heartDate);
                //}, null, 1, 1000);

                carConnList.Add(new CarConnect() { id = "", tcpClientState = e._state });
            }
            catch(Exception ex )
            {
                Debug.WriteLine(ex.Message);
                return;
            }
        }

        //数据接收事件
        private static void Ats_DataReceived(object sender, AsyncEventArgs e)
        {
            try
            {
                //传输过来的GPS数据格式      GPS|898600690117f0111523|3954.0711|11618.8139|085405.000
                var str = Encoding.UTF8.GetString(e._buff);
                var strs = str.Split('|');
                switch (strs[0])
                {
                    case "login": //暂时不用了
                        //判断是不是系统内的车，不是就强制断开。 （userError|	TRUE	FALSE）
                        var carId = strs[1];
                        var pwd = strs[2];
                        using (cmsdbEntities cms = new cmsdbEntities())
                        {
                            var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carId && s.CarPassword == pwd);
                            if (car == null)
                            {
                                ats.Close(e._state);
                                return;
                            }
                            //var carconn=carConnList.FirstOrDefault(s => s.tcpClientState == e._state);
                            //carconn.id = strs[1];
                            //carconn.user = car.CurrentUser;
                            //carconn.carState = Convert.ToInt16(car.CarState);
                            //carconn.uniqueCode = cms.borrowregister
                            //    .Join(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b, r })
                            //    .FirstOrDefault(r => string.IsNullOrEmpty(r.r.UniqueCode)).b.UniqueCode;
                            //ats.Send(e._state.TcpClient, successStr);
                            //Debug.WriteLine("车辆登录\t" + "id:" + strs[1] + "\tpwd:" + strs[2]);
                            cms.Dispose();
                        }
                        break;
                    case "start": //暂时不用了
                        //车辆启动 暂时好像没什么作用
                        using (cmsdbEntities cms=new cmsdbEntities())
                        {
                            var car = cms.carinfo.FirstOrDefault(c => c.CarNumber == strs[1]);
                            if (car.CarState == 1)
                            {
                                car.CarState = 2;
                            }
                            cms.SaveChanges();
                            cms.Dispose();
                        }
                        
                        break;
                    case "GPS":
                        //接收gps  存到数组 
                        //开车 停车 都得经过 这个判断了。
                        //ats.Send(e._state.TcpClient, successStr);
                        using (cmsdbEntities cms = new cmsdbEntities())
                        {
                            string temp = Convert.ToString(strs[1]);
                            var car = cms.carinfo.FirstOrDefault(s=>s.SimId== temp);
                            if(car==null)
                            {
                                return;
                            }
                            var id = car.CarNumber;
                            if(strs[2]=="0"&&strs[3]=="0")
                            {
                                return;
                            }
                            var y = Convert.ToDouble(strs[2]);
                            var x = Convert.ToDouble(strs[3]);
                            
                            Debug.WriteLine("GPS信号\t" + "x:" + x + "\ty:" + y);

                            //补齐连接信息
                            var carconn = carConnList.FirstOrDefault(s => s.tcpClientState == e._state && string.IsNullOrEmpty(s.id));
                            if (carconn != null)
                            {
                                if(string.IsNullOrEmpty(carconn.id))
                                {
                                    carconn.id = id;
                                    carconn.user = car.CurrentUser;
                                    carconn.carState = Convert.ToInt16(car.CarState);
                                    carconn.uniqueCode = cms.borrowregister.Where(s => s.CarNumber == car.CarNumber && s.BorrowState == 1)
                                        .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b, r })
                                        .FirstOrDefault(r => string.IsNullOrEmpty(r.r.UniqueCode)).b.UniqueCode;
                                }
                            }

                            //根据百度接口 处理数据为百度地图坐标
                            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(string.Format("http://api.map.baidu.com/geoconv/v1/?coords={0},{1}&from=1&to=5&ak={2}", x, y,ak));
                            request.Method = "GET";
                            StateObject stateObj = new StateObject();
                            stateObj.id = id;
                            stateObj.request = request;
                            request.BeginGetResponse(new AsyncCallback(RequestStreamCallBack), stateObj);
                            cms.Dispose();
                            break;
                        }
                    default:
                        break;
                }
                Debug.WriteLine("发送过来了" + str);
            }
            catch (Exception exc)
            {
                //var bytes = Encoding.UTF8.GetBytes("error|" + exc.Message);
                //ats.Send(e._state.TcpClient, bytes);
                Debug.WriteLine(exc.Message);
                return;
            }
        }

        public static void RequestStreamCallBack(IAsyncResult asynchronousResult)
        {
            try
            {
                var stateObj = (StateObject)asynchronousResult.AsyncState;
                var request = stateObj.request;
                var response = (HttpWebResponse)request.EndGetResponse(asynchronousResult);
                using (var streamReader = new StreamReader(response.GetResponseStream()))
                {
                    var resultString = streamReader.ReadToEnd();
                    var obj = JsonConvert.DeserializeObject<dynamic>(resultString);
                    if (obj.status != 0)
                    {
                        return;
                    }
                    double x = obj.result[0].x;
                    double y = obj.result[0].y;
                    var id = stateObj.id;

                    //如果车的连接集合里有此车，就往数据集合里保存数据，数据集合里没有此车 就创建。
                    var tempcar = carConnList.FirstOrDefault(s => s.id == id);
                    if (tempcar != null)
                    {
                        var carinfo = MyGlobal.carsList.FirstOrDefault(s => s.id == id);
                        if (carinfo == null)
                        {
                            var tempnewCar = new Car()
                            {
                                id = id,
                                state = 1,
                                position = new Position()
                                {
                                    x = x,
                                    y = y
                                },
                                isillegal = tempcar.carState,
                                userName = GetUser(tempcar.id)
                            };
                            lock (MyGlobal.carsList)
                            {
                                MyGlobal.carsList.Add(tempnewCar);
                            }

                            //存到数据库里
                            using (cmsdbEntities cms = new cmsdbEntities())
                            {
                                var carListItem = new carlist()
                                {
                                    id = tempnewCar.id,
                                    state = tempnewCar.state,
                                    isillegal = tempnewCar.isillegal,
                                    userName = tempnewCar.userName,
                                    x = tempnewCar.position.x,
                                    y = tempnewCar.position.y
                                };
                                cms.carlist.Add(carListItem);
                                cms.SaveChanges();
                                cms.Dispose();
                            }

                        }
                        else
                        {
                            //判断gps点是否偏移，如果偏移就不记录了。
                            if(carinfo.position.x-x>0.01|| carinfo.position.x - x < -0.01||carinfo.position.y-y>0.01||carinfo.position.y-y<-0.01)
                            {
                                return;
                            }

                            carinfo.state = 1;
                            carinfo.position.x = x;
                            carinfo.position.y = y;

                            using (cmsdbEntities cms = new cmsdbEntities())
                            {
                                var tempCarItem = cms.carlist.FirstOrDefault(s => s.id == id);
                                if(tempCarItem!=null)
                                {
                                    tempCarItem.state = 1;
                                    tempCarItem.x = x;
                                    tempCarItem.y = y;
                                }
                                cms.SaveChanges();
                                cms.Dispose();
                            }
                        }

                        if (tempcar.carState == 0)//空闲状态
                        {
                            var illcar = MyGlobal.illegalUseList.FirstOrDefault(s => s.CarNumber == id);
                            if (illcar == null)
                            {
                                //判断是否在围栏中,
                                if (!CheckHelper.IsInFence(x, y, fence))//出了围栏
                                {
                                    //开始报警,发送手机短信之类的
                                    Debug.WriteLine("报警");
                                    
                                    using (cmsdbEntities cms = new cmsdbEntities())
                                    {
                                        //更改车辆状态 为不可用
                                        var tempCar_ill = cms.carinfo.FirstOrDefault(s=>s.CarNumber==id);
                                        if(tempCar_ill!=null)
                                        {
                                            tempCar_ill.CarState = 8;
                                            cms.SaveChanges();

                                            //车辆列表里车状态改为违法用车
                                            var setIllCar = MyGlobal.carsList.FirstOrDefault(s => s.id == id);
                                            if(setIllCar!=null)
                                            {
                                                setIllCar.isillegal = 8;
                                            }
                                            var setIllCarItem = cms.carlist.FirstOrDefault(s => s.id == id);
                                            if(setIllCarItem!=null)
                                            {
                                                setIllCarItem.isillegal = 8;
                                            }
                                            cms.SaveChanges();
                                        }

                                        //更改内存车辆状态为非法用车
                                        tempcar.carState = 8;

                                        //记录警告
                                        illegalusecar iuc = new illegalusecar()
                                        {
                                            id = Guid.NewGuid().ToString(),
                                            Time = DateTime.Now,
                                            CarNumber = tempcar.id,
                                            State = 1,
                                            IsLook = 0,
                                            DIsLook = 0,
                                            redpoint=0,
                                            Dredpoint=0
                                        };
                                        cms.illegalusecar.Add(iuc);
                                        cms.SaveChanges();
                                        cms.Dispose();
                                        lock (MyGlobal.illegalUseList)
                                        {
                                            MyGlobal.illegalUseList.Add(iuc);
                                        }
                                    }
                                }
                            }
                            //else
                            //{
                            //    if (illcar.State == 1)
                            //    {
                            //        if (CheckHelper.IsInFence(x, y, fence))//进了围栏
                            //        {
                            //            lock (MyGlobal.illegalUseList)
                            //            {
                            //                MyGlobal.illegalUseList.Remove(illcar);
                            //            }
                            //            //var iucp = MyGlobal.carsList.FirstOrDefault(s => s.id == illcar.CarNumber);
                            //            //if (iucp != null)
                            //            //{
                            //            //    lock (MyGlobal.carsList)
                            //            //    {
                            //            //        MyGlobal.carsList.Remove(iucp);
                            //            //    }
                            //            //}
                            //        }
                            //    }
                            //}
                        }
                        else if(tempcar.carState == 1) //已预约 改为外出
                        {
                            using (cmsdbEntities cms = new cmsdbEntities())
                            {
                                var thisCar = cms.carinfo.FirstOrDefault(s => s.CarNumber == id);
                                if (thisCar.CarState == 1)
                                {
                                    thisCar.CarState = 2;
                                    tempcar.carState = 2; //改为外出
                                    var tempUser = cms.user.FirstOrDefault(s => s.Account == thisCar.CurrentUser);
                                    tempUser.state = 1;
                                    cms.SaveChanges();
                                    cms.Dispose();
                                }
                            }
                        }
                        
                        
                        

                        //存储 gps 数据到数据库
                        using (cmsdbEntities cms = new cmsdbEntities())
                        {
                            var traject = new trajectorylog()
                            {
                                CarNumber = tempcar.id,
                                User = string.IsNullOrEmpty(tempcar.user) ? null : tempcar.user,
                                Time = DateTime.Now,
                                Longitude = x,
                                Latitude = y,
                                UniqueCode = string.IsNullOrEmpty(tempcar.user) ? MyGlobal.illegalUseList.FirstOrDefault(s => s.CarNumber == tempcar.id).id : tempcar.uniqueCode,
                                guid = Guid.NewGuid().ToString()
                            };
                            cms.trajectorylog.Add(traject);
                            cms.SaveChanges();
                            cms.Dispose();
                        }
                    }

                }
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return;
            }
                
        }

        public void Start()
        {
            ats.Start();
        }

        public static string GetUser(string carNumber)
        {
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == carNumber);
                var user = cms.user.FirstOrDefault(s => s.Account == car.CurrentUser);
                cms.Dispose();
                //找不到用户，非法用车
                if (user == null)
                {
                    return "";
                }
                return user.RealName;
            }
        }
    }
}