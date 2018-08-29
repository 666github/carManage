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

namespace QueryHoliday
{
    class Program
    {
        static void Main(string[] args)
        {
            var appkey = ConfigurationManager.AppSettings.Get("appkey");
            var postIp = ConfigurationManager.AppSettings.Get("postIp");
            var uri = "http://v.juhe.cn/calendar/month";
            var key = "key="+ appkey;
            var year_month = "&year-month="+DateTime.Now.ToString("yyyy-MM");
            try
            {
                var result = Request(uri, key + year_month);
                if (string.IsNullOrEmpty(result))
                {
                    return;
                }

                var resObj = JsonConvert.DeserializeObject<dynamic>(result);
                var data = ((string)resObj.result.data.holiday).Replace("\\", "");

                var uri1 = postIp + "/handler/Carmanage/HolidayUse/AutoHolidaySet.ashx";
                var result1 = Request(uri1, "data=" + data);
                if (result1 == "success")
                {

                }
            }
            catch(Exception ex)
            {
                //异常记录

                return;
            }
        }

        static string Request(string uri,string param)
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(uri);
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
                byte[] bs = Encoding.UTF8.GetBytes(param);
                using (var requestStream = request.GetRequestStream())
                {
                    requestStream.Write(bs,0,bs.Length);
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
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
