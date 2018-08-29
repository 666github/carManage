using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;


namespace CarManageSystem.helper
{
    public class CheckHelper
    {
        /// <summary>
        /// 输入需要检查的各个字段进行检查
        /// </summary>
        /// <param name="strs"></param>
        /// <returns></returns>
        static public bool HasNull(params object[] objs)
        {
            var hasNull = false;
            foreach (var obj in objs)
            {
                hasNull = obj == null ? true : hasNull;
                switch (obj.GetType().ToString())
                {
                    case "System.String":
                        hasNull = string.IsNullOrEmpty((string)obj) ? true : hasNull;
                        break;
                    case "System.Byte[]":
                        hasNull = ((Byte[])obj).Length == 0 ? true : hasNull;
                        break;
                    default:
                        break;
                }
                if (hasNull)
                {
                    break;
                }
            }
            return hasNull;
        }


        /// <summary>
        /// 角色检查
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static user RoleCheck(HttpContext context, int role)
        {
            CarManageSystem.user userInfo = ReadUserInfo(context);
            if (userInfo == null)
            {
                ConsoleJson(context, "1");
                return null;
            }

            if (Convert.ToInt32(userInfo.UserType) >= role)
            {
                return userInfo;
            }
            else
            {
                ConsoleJson(context, "没有权限");
                return null;
            }
        }


        /// <summary>
        /// 角色检查
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static user RoleCheck(HttpContext context, int role, int isCheck)
        {
            CarManageSystem.user userInfo = ReadUserInfo(context);
            if (userInfo == null)
            {
                ConsoleJson(context, "1");
                return null;
            }
            return userInfo;
        }

        /// <summary>
        /// 登录时保存用户信息，session  token
        /// </summary>
        /// <param name="context"></param>
        /// <param name="user"></param>
        public static string LoginRole(HttpContext context, CarManageSystem.user user)
        {
            using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
            {
                lock (MyGlobal.userLocker)
                {
                    var userList = redisClient.Get<List<UserInfo>>("userList");
                    //先删除已存在的值
                    var tempUser = userList.FirstOrDefault(s => s.user.Account == user.Account);
                    if (tempUser != null)
                    {
                        userList.Remove(tempUser);
                    }
                    var tempSession = userList.FirstOrDefault(s => s.id == context.Session.SessionID);
                    if (tempSession != null)
                    {
                        userList.Remove(tempSession);
                    }

                    var from = context.Request["from"];
                    if (from == "0")
                    {
                        userList.Add(new UserInfo() { id = context.Session.SessionID, user = user });
                        redisClient.Set<List<UserInfo>>("userList", userList);
                        return "";
                    }
                    else if (from == "1")
                    {
                        string token = Guid.NewGuid().ToString().Replace("-", "");
                        userList.Add(new UserInfo() { id = token, user = user });
                        redisClient.Set<List<UserInfo>>("userList", userList);
                        return token;
                    }
                    else
                    {
                        ConsoleJson(context, "错误，请重新登录");
                        return null;
                    }

                }
            }
        }

        /// <summary>
        /// 退出时注销用户
        /// </summary>
        /// <param name="context"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static bool ExitRole(HttpContext context)
        {
            using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
            {
                lock (MyGlobal.userLocker)
                {
                    var userList = redisClient.Get<List<UserInfo>>("userList");
                    var id = GetKey(context);
                    var temp = userList.FirstOrDefault(s => s.id == id);
                    if (temp != null)
                    {
                        userList.Remove(temp);
                        redisClient.Set<List<UserInfo>>("userList", userList);
                    }
                    return true;
                }
            }
        }

        /// <summary>
        /// 读取用户信息
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static CarManageSystem.user ReadUserInfo(HttpContext context)
        {
            var id = GetKey(context);
            if (id == null)
            {
                return null;
            }
            using (IRedisClient redisClient = MyGlobal.prcm.GetClient())
            {
                lock (MyGlobal.userLocker)
                {
                    var userList = redisClient.Get<List<UserInfo>>("userList");
                    var temp = userList.FirstOrDefault(s => s.id == id);
                    if (temp!=null)
                    {
                        return temp.user;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }

        /// <summary>
        /// 获取dic中的key
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string GetKey(HttpContext context)
        {
            var from = context.Request["from"];
            var id = "";
            if (from == "0")
            {
                id = context.Session.SessionID;
            }
            else if (from == "1")
            {
                id = context.Request["token"];
            }
            else
            {
                return null;
            }
            return id;
        }

        /// <summary>
        /// 输出json 的state
        /// </summary>
        /// <param name="context"></param>
        /// <param name="str"></param>
        public static void ConsoleJson(HttpContext context, string str)
        {
            dynamic json = new JObject();
            json.state = str;
            context.Response.Write(json.ToString());
        }

        //是否在围栏内
        public static bool IsInFence(double x, double y, string fence)
        {
            string[] fences = fence.Split(';');
            foreach (var temp_fence in fences)
            {
                if (!string.IsNullOrEmpty(temp_fence))
                {
                    string[] xy = temp_fence.Split(',');
                    var x1 = Convert.ToDouble(xy[0]);
                    var y1 = Convert.ToDouble(xy[1]);
                    var x2 = Convert.ToDouble(xy[2]);
                    var y2 = Convert.ToDouble(xy[3]);

                    //计算
                    if (x >= x1 && x <= x2 && y >= y1 && y <= y2)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        /// <summary>
        /// 按角色权限返回部门id   -1就代表所有部门，需要在用的地方判断是否为-1。
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static int GetDepartmentId(user currentUser, HttpContext context)
        {
            if (currentUser.UserType == 2)
            {
                //如果包含部门字段，就判断是全部的还是自己部门的，不包含，就默认是自己部门字段
                if (context.Request.Params.AllKeys.Contains("department"))
                {
                    if (!string.IsNullOrEmpty(context.Request["department"].Trim()))
                    {
                        return Convert.ToInt32(ConvertHelper.ConvertDepartment(context.Request["department"].Trim()));
                    }
                    else
                        return -1;
                }
                else if (context.Request.Params.AllKeys.Contains("allBranch"))
                {
                    if (!string.IsNullOrEmpty(context.Request["allBranch"].Trim()))
                    {
                        return Convert.ToInt32(ConvertHelper.ConvertDepartment(context.Request["allBranch"].Trim()));
                    }
                    else
                        return -1;
                }
                else
                    return -1;
            }
            else
                return Convert.ToInt32(currentUser.Department);
        }

        /// <summary>
        /// 按照查询返回门id  -1就代表所有部门，需要在用的地方判断是否为-1。
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static int GetDepartmentIdForQuery(user currentUser, HttpContext context)
        {
            if (context.Request.Params.AllKeys.Contains("department"))
            {
                if (!string.IsNullOrEmpty(context.Request["department"].Trim()))
                {
                    return Convert.ToInt32(ConvertHelper.ConvertDepartment(context.Request["department"].Trim()));
                }
                else
                    return -1;
            }
            else if (context.Request.Params.AllKeys.Contains("allBranch"))
            {
                if (!string.IsNullOrEmpty(context.Request["allBranch"].Trim()))
                {
                    return Convert.ToInt32(ConvertHelper.ConvertDepartment(context.Request["allBranch"].Trim()));
                }
                else
                    return -1;
            }
            else
                return -1;
        }

        /// <summary>
        /// 检查GPS是否偏移
        /// </summary>
        /// <param name="oldx"></param>
        /// <param name="oldy"></param>
        /// <param name="newx"></param>
        /// <param name="newy"></param>
        /// <param name="oldt"></param>
        /// <param name="newt"></param>
        /// <returns></returns>
        public static bool CheckPoint(double oldx, double oldy, double newx, double newy, DateTime oldt, DateTime newt)
        {
            TimeSpan timeSpan;
            //按正常时间顺序传值
            if (oldt <= newt)
            {
                timeSpan = newt - oldt;
            }
            else  // 回传的补传坐标信息判断
            {
                timeSpan = oldt - newt;
            }

            var distance = DistanceHelper.GetShortDistance(oldx, oldy, oldx, newy) + DistanceHelper.GetShortDistance(oldx, newy, newx, newy);
            var shisu = distance / (1000 * timeSpan.TotalHours);
            //if (shisu > 150)
            //{
            //    return false;
            //}
            return true;
        }

        
    }
}
