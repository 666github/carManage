using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Drawing;
using System.Text.RegularExpressions;

namespace CarManageSystem.helper
{
    public class ConvertHelper
    {
        static Regex r = new Regex("^[0-9]*$");
        /// <summary>
        /// 图片转二进制
        /// </summary>
        /// <param name="img"></param>
        /// <returns></returns>
        static public byte[] ImgToByt(Image img)
        {
            MemoryStream ms = new MemoryStream();
            byte[] bytes = null;
            img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            bytes = ms.GetBuffer();
            return bytes;
        }

        /// <summary>
        /// 二进制转图片
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        static public Image BytToImg(byte[] bytes)
        {
            MemoryStream ms = new MemoryStream(bytes);
            Image img = Image.FromStream(ms);
            return img;
        }

        /// <summary>
        /// 流转二进制
        /// </summary>
        /// <param name="stream"></param>
        /// <returns></returns>
        static public byte[] StreamToBytes(Stream stream)
        {
            byte[] bytes = new byte[stream.Length];
            stream.Read(bytes, 0, bytes.Length);
            stream.Seek(0, SeekOrigin.Begin);
            return bytes;
        }

        /// <summary>
        /// 二进制转流
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        static public Stream BytesToStream(byte[] bytes)
        {
            Stream stream = new MemoryStream(bytes);
            return stream;
        }

        /// <summary>
        /// 删除Entity实体类转Json后的默认属性
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        static public dynamic DelAttrForJson(dynamic json)
        {
            foreach (var j in json)
            {
                j.Remove("$id");
                j.Remove("EntityKey");
            }
            return json;
        }

        /// <summary>
        /// 删除Entity实体类转Json后的指定属性
        /// </summary>
        /// <param name="json"></param>
        /// <param name="strs"></param>
        /// <returns></returns>
        static public dynamic DelAttrForJson(dynamic json,params string[] strs)
        {
            json = DelAttrForJson(json);
            foreach (var j in json)
            {
                foreach (var str in strs)
                {
                    j.Remove(str);
                }
            }
            return json;
        }

        /// <summary>
        /// 部门为汉字的话，转成数字值
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        static public string ConvertDepartment(string  department)
        {
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                if (!string.IsNullOrEmpty(department))
                {
                    if (!(r.Match(department).Success))
                    {
                        department = cms.departmentmanage.FirstOrDefault(s => s.Name == department).Id.ToString();
                    }
                }
                cms.Dispose();
            }
            return department;
        }

        /// <summary>
        /// 转换限号string 为 list
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        static public List<string> ConvertLimitNumberStr(string str)
        {
            var list = str.Split(',').ToList();
            return list;
        }

        //static public string ConvertImagePath(string str)
        //{

        //}
    }
}