using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.SessionState;
namespace CarManageSystem.handler.CarManage.Illegal
{
    /// <summary>
    /// ViewIllegal 的摘要说明
    /// </summary>
    public class ViewIllegal : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            //根据车牌来搜的，车牌已经被限制到本部门了。
            var carLicence = context.Request["carLicence"];

            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var list = cms.illegalstatistic
                    .Where(s =>string.IsNullOrEmpty(carLicence)?false: s.CarNumber == carLicence)
                    .LeftJoin(cms.user, i => i.User, u => u.Account, (i, u) => new { i, u.RealName })
                    .ToList()
                    .Select(item => new
                    {
                        person = item.RealName==null?"未指定人员":item.RealName,
                        act = item.i.Type,
                        area = item.i.Place,
                        date = item.i.Time.Value.ToShortDateString()+" "+item.i.Time.Value.ToShortTimeString(),
                        fen = item.i.fen,
                        handled = (item.i.Handled==0)?"未处理":"已处理",
                        money=item.i.money
                    });
                json.brearule = JArray.FromObject(list);
                context.Response.Write(json.ToString());
                cms.Dispose();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}