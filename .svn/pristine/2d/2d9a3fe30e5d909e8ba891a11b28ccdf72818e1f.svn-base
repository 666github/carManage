using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Trajectory
{
    /// <summary>
    /// GetUseData 的摘要说明
    /// </summary>
    public class GetUseData : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登录
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            if(currentUser.UserType==0)
            {
                using (cmsdbEntities cms = new cmsdbEntities())
                {
                    var date = cms.trajectorylog.Where(x => x.User == currentUser.Account).ToList()
                         .Select(x => x.Time.Value.ToString("yyyy-MM-dd")).Distinct();
                    dynamic json = JArray.FromObject(date);
                    context.Response.Write(json);
                    cms.Dispose();
                }
            }
            else
            {
                var carNumber = context.Request["carNumber"];
                using (cmsdbEntities cms = new cmsdbEntities())
                {
                    var date = cms.trajectorylog.Where(x => x.CarNumber == carNumber).ToList()
                        .Select(x => x.Time.Value.ToString("yyyy-MM-dd")).Distinct();
                    dynamic json = JArray.FromObject(date);
                    context.Response.Write(json);
                    cms.Dispose();
                }
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