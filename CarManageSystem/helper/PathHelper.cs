using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace CarManageSystem.helper
{
    public class PathHelper
    {
        /// <summary>
        /// 取得网站的根目录URL
        /// </summary>
        /// <returns></returns>
        public static string GetRootURI()
        {
            string AppPath = "";
            HttpContext httpCurrent = HttpContext.Current;
            HttpRequest Req;
            if (httpCurrent != null)
            {
                Req = httpCurrent.Request;
                string UrlAuthority = Req.Url.GetLeftPart(UriPartial.Authority);
                if (Req.ApplicationPath == null || Req.ApplicationPath == "/")
                    AppPath = UrlAuthority;
                else
                    AppPath = UrlAuthority + Req.ApplicationPath;
            }
            return AppPath;
        }

        /// <summary>
        /// 取得网站根目录的物理路径
        /// </summary>
        /// <returns></returns>
        public static string GetRootPath()
        {
            string AppPath = "";
            HttpContext httpCurrent = HttpContext.Current;
            if (httpCurrent != null)
            {
                AppPath = httpCurrent.Server.MapPath("~");
            }
            else
            {
                AppPath = AppDomain.CurrentDomain.BaseDirectory;
                if (Regex.Match(AppPath, @"\\$", RegexOptions.Compiled).Success)
                    AppPath = AppPath.Substring(0, AppPath.Length - 1);
            }
            return AppPath;
        }
    }
}