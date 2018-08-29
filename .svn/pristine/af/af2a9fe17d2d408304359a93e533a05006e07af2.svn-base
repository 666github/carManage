using cn.jpush.api;
using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.Model
{
    public class MyGlobal
    {
        static public List<ExportExcelObj> excelList = new List<ExportExcelObj>();

        static public List<Car> carsList = new List<Car>(); // 已同步到数据库

        static public List<illegalusecar> illegalUseList = new List<illegalusecar>();

        public static Dictionary<string, CarManageSystem.user> userInfo = new Dictionary<string, CarManageSystem.user>();

        public static List<IdentifyingCode> IdentyList = new List<IdentifyingCode>();

        public static PooledRedisClientManager CreateManager(string[] readWriteHosts, string[] readOnlyHosts)
        {
            //支持读写分离，均衡负载
            return new PooledRedisClientManager(readWriteHosts, readOnlyHosts, new RedisClientManagerConfig
            {
                MaxWritePoolSize = 10000,//“写”链接池链接数
                MaxReadPoolSize = 10000,//“读”链接池链接数
                AutoStart = true,
            });
        }
        public static PooledRedisClientManager prcm = CreateManager(new string[] { "127.0.0.1:6379" }, new string[] { "127.0.0.1:6379" });

        public static string locker = "";

        public static string userLocker = "";

        public static string webSocketLocaker = "";

        public static string nightUCLocker = "";
        public static string holidayUCLocker= "";
        public static string weekendUCLocker = "";


        public class UseCarPush
        {
            public string CarNumber { get;set;}
            public int State { get; set; }
        }

    }
}