using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.helper
{
    public class LimitHelper
    {
        //限号数据
        static List<List<int>> limitList = new List<List<int>>()
        {
            new List<int>(){1,6 },
            new List<int>(){2,7 },
            new List<int>(){3,8 },
            new List<int>(){4,9 },
            new List<int>(){5,0 }
        };

        //基准日期
        static DateTime time = Convert.ToDateTime("2017-10-09");

        public static List<int> GetLimitList(DateTime dateTime)
        {
            var days = Convert.ToInt32((Convert.ToDateTime(dateTime.ToShortDateString()) - time).TotalDays);
            var differ = days / (13 * 7);
            var list = new List<List<int>>();
            for (var i = 0; i < 5; i++)
            {
                var temp = i - differ;
                if (temp < 0)
                {
                    temp = 5 + temp;
                    list.Add(limitList[temp]);
                }
                else
                {
                    list.Add(limitList[temp]);
                }
            }
            var differDay = days % (13 * 7);
            var day = differDay % 7;
            if (day > 4)
            {
                return null;
            }
            else
            {
                return list[day];
            }
        }
    }
}