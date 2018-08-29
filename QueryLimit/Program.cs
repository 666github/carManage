using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace QueryLimit
{
    class Program
    {
        static void Main(string[] args)
        {
            var postIp = ConfigurationManager.AppSettings.Get("postIp");


            // http://v.juhe.cn/xianxing/index?key=&city=beijing&type=1
            // {
            //     "reason": "查询成功",
            //     "result": {
            //         "date": "2015-08-04", /*日期*/
            //         "week": "星期二", /*星期*/
            //         "city": "beijing", /*城市代码*/
            //         "cityname": "北京", /*城市名称*/
            //         "des": [ /*限行描述*/
            //             {
            //                 "time": "私家车：限行时间段为周一至五的早7时至晚20时(法定节假日和公休日不限行)", /*限行时间*/
            //                 "place": "限行范围为五环路以内（不包括五环路主路）", /*限行区域*/
            //                 "info": "" /*其他说明*/
            //             },
            //             {
            //                 "time": "公务车：停驶时间为0时至24时",
            //                 "place": "停驶范围为本市行政区域内所有道路",
            //                 "info": ""
            //             }
            //         ],
            //         "fine": "京牌罚100块，不扣分。非京牌罚100块，扣3分。", /*处罚事项*/
            //         "remarks": "临时号牌按号牌尾号数字限行。机动车车尾号为英文字母的按0号管理", /*其他说明*/
            //         "isxianxing": 1, /*今日是否限行，1:是 0:否*/
            //         "xxweihao": [ /*限行尾号*/
            //             1,
            //             6
            //         ],
            //         "holiday": "" /*节假日信息*/
            //     },
            //     "error_code": 0 /*返回吗*/
            // }

            //先重置限号
            var url = postIp + "/handler/CarManage/AudoQueryLimit.ashx";
            var result = Request(url, "key=mztkn");
            if (result == "success")
            {
                Console.WriteLine("重置限号成功");
                Write("重置限号成功");
            }
            else
            {
                Console.WriteLine(result);
                Write(result);
            }


            var appkey = ConfigurationManager.AppSettings.Get("appkey");
            var uri = "http://v.juhe.cn/xianxing/index";
            var key = "key=" + appkey;
            var city = "&city=beijing";

            try
            {
                var data = Request(uri, key + city);
                var resObj = JsonConvert.DeserializeObject<dynamic>(data);
                if (resObj.result.isxianxing == 1)
                {
                    var number = resObj.result.xxweihao;
                    var number1 = "";
                    foreach (var i in number)
                    {
                        number1 += ((int)i + ",");
                    }
                    number1 = number1.TrimEnd(',');
                    //var number1 = "";
                    //var limitNumber = LimitHelper.GetLimitList(DateTime.Now);
                    //foreach (var i in limitNumber)
                    //{
                    //    number1 += (i + ",");
                    //}
                    //number1 = number1.TrimEnd(',');
                    var postUri = postIp + "/handler/CarManage/AudoQueryLimit.ashx";
                    var postRes = Request(postUri, "number=" + number1);
                    if (postRes == "success")
                    {
                        Console.WriteLine("设置限号成功");
                        Write("设置限号成功");
                    }
                    else
                    {
                        Console.WriteLine(postRes);
                        Write(postRes);
                    }

                    //清除用车状态
                    string uri5 = postIp + "/handler/CarManage/AutoClearUC.ashx";
                    string text6 = Program.Request(uri5, "clear=123456");
                    bool flag5 = text6 == "success";
                    if (flag5)
                    {
                        Console.WriteLine("清除用车状态成功");
                        //Write("清除用车状态成功");
                    }
                    else
                    {
                        Console.WriteLine(text6);
                        //Write(text6);
                    }


                    //自动更新需要维修保养的状态
                    var postUri1 = postIp + "/handler/CarManage/CarMaintain/ViewNeedMaintain.ashx";
                    var postRes1 = Request(postUri1, "auto=" + number1);
                    if (postRes1 == "success")
                    {
                        Console.WriteLine("状态更新成功");
                    }
                    else
                    {
                        Console.WriteLine(postRes1);
                    }

                    Console.WriteLine("5s 后关闭");
                    System.Threading.Thread.Sleep(5000);
                }
            }
            catch (Exception ex)
            {
                return;
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

        public static void Write(string msg)
        {
            DateTime now = DateTime.Now;
            string path = "D:\\log\\" + now.ToString("yyyyMMdd") + ".txt";
            FileStream fileStream = new FileStream(path, FileMode.OpenOrCreate);
            fileStream.Flush();
            fileStream.Close();
            msg = now + ":" + msg;
            StreamWriter streamWriter = File.AppendText(path);
            streamWriter.WriteLine(msg);
            streamWriter.Close();
        }
    }
}
