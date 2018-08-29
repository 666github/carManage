using CarManageSystem.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.helper
{
    public class NotifyHelper
    {
        /// <summary>
        /// 根据用户实体检测用户是否开启此提醒
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="notifyName"></param>
        /// <returns></returns>
        public static bool CheckNotify(user currentUser,string notifyName)
        {
            if(currentUser.UserType==0)
            {
                return true;
            }
            var list = JsonConvert.DeserializeObject<List<NotifyProperty>>(currentUser.NotifySet);
            var value = list.FirstOrDefault(s => s.key == notifyName).value;
            if(value==1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 根据用户名检测用户是否开启此提醒
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="notifyName"></param>
        /// <returns></returns>
        public static bool CheckNotify(string userName, string notifyName)
        {
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var user = cms.user.FirstOrDefault(s => s.Account == userName);
                if(user==null)
                {
                    return false;
                }
                cms.Dispose();
                return CheckNotify(user, notifyName);
            }
        }

        /// <summary>
        /// 获取初始的消息提醒配置
        /// </summary>
        /// <returns></returns>
        public static string ResetNotify()
        {
            var list = new List<NotifyProperty>();
            list.Add(new NotifyProperty { key = "借车审核", value = 1 });
            list.Add(new NotifyProperty { key = "人员审核", value = 1 });
            list.Add(new NotifyProperty { key = "非法用车提醒", value = 1 });
            list.Add(new NotifyProperty { key = "违章提醒", value = 1 });
            list.Add(new NotifyProperty { key = "到期提醒", value = 1 });
            list.Add(new NotifyProperty { key = "维修申请", value = 1 });
            list.Add(new NotifyProperty { key = "周末用车", value = 1 });
            list.Add(new NotifyProperty { key = "夜间用车", value = 1 });
            list.Add(new NotifyProperty { key = "节假日用车", value = 1 });
            list.Add(new NotifyProperty { key = "非法用车", value = 1 });
            //list.Add(new NotifyProperty { key = "北京市外用车", value = 1 });

            var json = JArray.FromObject(list);

            return json.ToString();
        }

    }
}