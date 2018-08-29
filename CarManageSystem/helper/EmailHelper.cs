using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace CarManageSystem.helper
{
    public class EmailHelper
    {
        static string address = System.Configuration.ConfigurationManager.ConnectionStrings["emailServer"].ConnectionString;
        static string[] strs = address.Split(':');
        static string ip = strs[0];
        static int port = Convert.ToInt32(strs[1]);
        /// Send email without attachments
        /// </summary>
        /// <param name="ToMail">收件人邮箱地址</param>
        /// <param name="FromMail">发件人邮箱地址</param>
        /// <param name="Cc">抄送</param>
        /// <param name="Bcc">密送</param>
        /// <param name="Body">邮件正文</param>
        /// <param name="Subject">邮件标题</param>
        /// <returns></returns>
        public static string SendMail(string ToMail, string FromMail, string Cc, string Bcc, string Body, string Subject)
        {
            SmtpClient client = new SmtpClient();
            MailMessage message = new MailMessage
            {
                From = new MailAddress(FromMail)
            };
            message.To.Add(ToMail);
            if (Cc != "")
            {
                message.CC.Add(Cc);
            }
            message.Body = Body;
            message.Subject = Subject;
            message.IsBodyHtml = true;
            client.UseDefaultCredentials = true;
            message.Priority = MailPriority.High;
            client.Host = ip;//此处应该改为上面设置的服务器IP地址
            client.Port = port;
            try
            {
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Send(message);
                message.Dispose();
                return "1";
            }
            catch (Exception exception)
            {
                return ("0" + exception);
            }
        }
    }
}