using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.helper
{
    public class NullCheckHelper
    {
        /// <summary>
        /// 输入字段空检查
        /// </summary>
        /// <param name="strs"></param>
        /// <returns></returns>
        static public bool HasNull(params object[] objs)
        {
            var hasNull = false;
            foreach (var obj in objs)
            {
                switch (obj.GetType().ToString())
                {
                    case "System.String":
                        hasNull = string.IsNullOrEmpty((obj as String)) ? true : hasNull;
                        break;
                    case "System.Byte[]":
                        hasNull = (obj as Byte[]).Length == 0 ? true : hasNull;
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

        
    }
}