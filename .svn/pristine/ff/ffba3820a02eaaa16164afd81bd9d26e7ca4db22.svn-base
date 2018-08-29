using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.FuelingCard
{
    /// <summary>
    /// AddNewCard 的摘要说明
    /// </summary>
    public class AddNewCard : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            var mainCardId = context.Request["mainCardId"];
            var associateCardId = context.Request["associateCardId"];
            var CarNumber = context.Request["CarNumber"];

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var card = new mainfuelingcard()
                {
                    MainCardId=mainCardId,
                    AssociateCardId=associateCardId,
                    CarNumber=CarNumber,
                    //如果是院级管理员添加的卡，那就去找这辆车的部门信息添加在这里。
                    DepartmentId= currentUser.UserType==2?cms.carinfo.FirstOrDefault(s=>s.CarNumber==CarNumber).DepartmentId : currentUser.Department 
                };
                cms.mainfuelingcard.Add(card);
                cms.SaveChanges();
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