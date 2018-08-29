using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace QueryIllegalInfo
{
    class Program
    {
        static void Main(string[] args)
        {
            var appkey = ConfigurationManager.AppSettings.Get("appkey");
            var postIp = ConfigurationManager.AppSettings.Get("postIp");
            var carsInfo = Request(postIp+"/handler/GetAllCarsInfo.ashx", "pwd=qwerdf");
            var test = JsonConvert.DeserializeObject<dynamic>(carsInfo);

            //首先重置所有违章状态为已处理
            var uri2 = postIp + "/handler/Carmanage/AutoQueryIllegal.ashx";
            var reset2 = "reset=1";
            var result2 = Request(uri2, reset2);
            if (result2 == "success")
            {

            }


            var carList = JsonConvert.DeserializeObject<List<dynamic>>(test.cars.ToString());
            foreach(var car in carList)
            {
                var uri = "http://v.juhe.cn/wz/query";
                var key = "key="+ appkey;
                var city = "&city=BJ";
                var hphm = "&hphm="+ car.CarNumber.ToString();
                var engineno = "&engineno="+ car.EngineNumber.ToString();
                var classno = "&classno="+car.CarType.ToString();

                try
                {
                    var result = Request(uri, key + city + hphm + engineno + classno);
                    if (string.IsNullOrEmpty(result))
                    {
                        return;
                    }

                    //{
                    //    "resultcode": "200",
                    //    "reason": "查询成功",
                    //    "result": {
                    //        "province": "BJ",
                    //        "city": "BJ",
                    //        "hphm": "京L51696",
                    //        "hpzl": "02",
                    //        "lists": [
                    //              {
                    //                "date": "2017-06-05 15:16:00",                       违章时间
                    //                "area": "北京市石景山区莲石东路北辅路莲石东路北辅路东口至莲石东路北辅路西口段",            违章地点
                    //                "act": "机动车违反停车规定的",                                      违章行为
                    //                "code": "",
                    //                "fen": "0",
                    //                "money": "200",
                    //                "handled": "0"
                    //              }
                    //        ]
                    //    },
                    //     "error_code": 0
                    //}
                    var resObj = JsonConvert.DeserializeObject<dynamic>(result);
                    foreach (var resobj in resObj.result.lists)
                    {
                        var carnumber = "carnumber=" + car.CarNumber.ToString();
                        var date = "&date=" + (string)resobj.date;
                        var area = "&area=" + (string)resobj.area;
                        var act = "&act=" + (string)resobj.act;
                        var fen = "&fen=" + (string)resobj.fen;
                        var money = "&money=" + (string)resobj.money;
                        var handled = "&handled" + (string)resobj.handled;
                        var reset1 = "&reset=0";
                        var uri1 = postIp + "/handler/Carmanage/AutoQueryIllegal.ashx";
                        var result1 = Request(uri1, carnumber + date + area + act + fen + money+ reset1);
                        if (result1 == "success")
                        {

                        }
                    }
                }
                catch(Exception ex)
                {
                    return;
                }
            }
        }




        static string Request(string uri, string param)
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(uri);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
                byte[] bs = Encoding.UTF8.GetBytes(param);
                using (var requestStream = request.GetRequestStream())
                {
                    requestStream.Write(bs, 0, bs.Length);
                    requestStream.Close();
                }
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    var stream = response.GetResponseStream();
                    var streamReader = new StreamReader(stream);
                    var result = streamReader.ReadToEnd();
                    return result;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
