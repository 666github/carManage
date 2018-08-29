using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace CarManageSystem.helper
{
    public class ImageHelper
    {
        /// <summary>
        /// 保存图片
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        static public string SaveImage(HttpPostedFile  file)
        {
            var rpath = "";
            if (file != null)
            {
                if(string.IsNullOrEmpty(file.FileName))
                {
                    return "-1";
                }
                
                rpath = @"\image\" + Guid.NewGuid().ToString() + file.FileName;

                if (file.FileName.LastIndexOf(".jpg")!= file.FileName.Length-4)
                {
                    rpath += ".jpg";
                }
                var apath = PathHelper.GetRootPath() + rpath;
                Compress(file.InputStream, apath, 10);
                //file.SaveAs(PathHelper.GetRootPath()+path);
                //压缩图片
                return rpath;
            }
            else
                return "-1";
        }

        /// <summary>
        /// 获取图片链接
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        static public string GetImagePath(string path)
        {
            path = PathHelper.GetRootURI() + path;
            path = path.Replace("\\","/");
            return path;
        }

        /// <summary>
        /// 保存图片文件 并且返回文件的物理路径
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        static public string GetFullPath(HttpPostedFile file)
        {
            var path = "";
            if (file != null)
            {
                path = @"\image\" + Guid.NewGuid().ToString() + file.FileName;
                path = PathHelper.GetRootPath() + path;
                Compress(file.InputStream, path, 50);
                //file.SaveAs(path);
                return path;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 保存文件，返回物理路径
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static string GetFullFilePath(HttpPostedFile file)
        {
            var path = "";
            if (file != null)
            {
                path = @"\image\" + Guid.NewGuid().ToString() + file.FileName;
                path = PathHelper.GetRootPath() + path;
                //Compress(file.InputStream, path, 50);
                file.SaveAs(path);
                return path;
            }
            else
            {
                return null;
            }
        }

        #region 图片压缩(降低质量)Compress
        private static ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            int j;
            ImageCodecInfo[] encoders;
            encoders = ImageCodecInfo.GetImageEncoders();
            for (j = 0; j < encoders.Length; ++j)
            {
                if (encoders[j].MimeType == mimeType)
                    return encoders[j];
            }
            return null;
        }
        /// <summary>
        /// 图片压缩(降低质量以减小文件的大小)
        /// </summary>
        /// <param name="srcBitmap">传入的Bitmap对象</param>
        /// <param name="destStream">压缩后的Stream对象</param>
        /// <param name="level">压缩等级，0到100，0 最差质量，100 最佳</param>
        public static void Compress(Bitmap srcBitmap, Stream destStream, long level)
        {
            ImageCodecInfo myImageCodecInfo;
            Encoder myEncoder;
            EncoderParameter myEncoderParameter;
            EncoderParameters myEncoderParameters;

            // Get an ImageCodecInfo object that represents the JPEG codec.
            myImageCodecInfo = GetEncoderInfo("image/jpeg");

            // Create an Encoder object based on the GUID

            // for the Quality parameter category.
            myEncoder = Encoder.Quality;

            // Create an EncoderParameters object.
            // An EncoderParameters object has an array of EncoderParameter
            // objects. In this case, there is only one

            // EncoderParameter object in the array.
            myEncoderParameters = new EncoderParameters(1);

            // Save the bitmap as a JPEG file with 给定的 quality level
            myEncoderParameter = new EncoderParameter(myEncoder, level);
            myEncoderParameters.Param[0] = myEncoderParameter;
            srcBitmap.Save(destStream, myImageCodecInfo, myEncoderParameters);
        }
        /// <summary>
        /// 图片压缩(降低质量以减小文件的大小)
        /// </summary>
        /// <param name="srcBitMap">传入的Bitmap对象</param>
        /// <param name="destFile">压缩后的图片保存路径</param>
        /// <param name="level">压缩等级，0到100，0 最差质量，100 最佳</param>
        public static void Compress(Bitmap srcBitMap, string destFile, long level)
        {
            Stream s = new FileStream(destFile, FileMode.Create);
            Compress(srcBitMap, s, level);
            s.Close();
        }
        /// <summary>
        /// 图片压缩(降低质量以减小文件的大小)
        /// </summary>
        /// <param name="srcFile">传入的Stream对象</param>
        /// <param name="destFile">压缩后的图片保存路径</param>
        /// <param name="level">压缩等级，0到100，0 最差质量，100 最佳</param>
        public static void Compress(Stream srcStream, string destFile, long level)
        {
            Bitmap bm = new Bitmap(srcStream);
            Compress(bm, destFile, level);
            bm.Dispose();
        }
        /// <summary>
        /// 图片压缩(降低质量以减小文件的大小)
        /// </summary>
        /// <param name="srcFile">传入的Image对象</param>
        /// <param name="destFile">压缩后的图片保存路径</param>
        /// <param name="level">压缩等级，0到100，0 最差质量，100 最佳</param>
        public static void Compress(Image srcImg, string destFile, long level)
        {
            Bitmap bm = new Bitmap(srcImg);
            Compress(bm, destFile, level);
            bm.Dispose();
        }
        /// <summary>
        /// 图片压缩(降低质量以减小文件的大小)
        /// </summary>
        /// <param name="srcFile">待压缩的BMP文件名</param>
        /// <param name="destFile">压缩后的图片保存路径</param>
        /// <param name="level">压缩等级，0到100，0 最差质量，100 最佳</param>
        public static void Compress(string srcFile, string destFile, long level)
        {
            // Create a Bitmap object based on a BMP file.
            Bitmap bm = new Bitmap(srcFile);
            Compress(bm, destFile, level);
            bm.Dispose();
        }

        #endregion 图片压缩(降低质量)
    }
}