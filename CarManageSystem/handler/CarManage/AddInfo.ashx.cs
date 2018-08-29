using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.CarManage
{
    /// <summary>
    /// AddInfo 的摘要说明
    /// </summary>
    public class AddInfo : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var id = context.Request["id"];
            var blReturnTimeReason = context.Request["blReturnTimeReason"]; //借车原因
            var blReturnTimeInput = context.Request["blReturnTimeInput"];  //还车时间
            var blReturnTimeSelect = context.Request["blReturnTimeSelect"];  //用途
            var blReturnTimeDes = context.Request["blReturnTimeDes"];  //目的地

            dynamic json = new JObject();
            json.state = "success";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var temp = cms.illegalusecar.FirstOrDefault(s => s.id == id);
                if (temp == null)
                {
                    json.state = "没有此记录，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                if(temp.IsAdd!=0)
                {
                    json.state = "此记录已经补录过，请刷新重试";
                    context.Response.Write(json.ToString());
                    return;
                }
                var borrowR = new borrowregister()
                {
                    BorrowState = 1,
                    BorrowStateOD = 0,
                    BorrowTime = temp.Time,
                    CarNumber = temp.CarNumber,
                    Cause = blReturnTimeReason,
                    Department = cms.carinfo.FirstOrDefault(s => s.CarNumber == temp.CarNumber).DepartmentId,
                    Destination = blReturnTimeDes,
                    ExpectReturnTime = Convert.ToDateTime(blReturnTimeInput),
                    Purposes = blReturnTimeSelect,
                    UniqueCode = temp.id,
                    UseCarTime = temp.Time,
                    User = currentUser.Account
                };

                cms.borrowregister.Add(borrowR);

                var returnR = new returnregister()
                {
                    CarNumber = temp.CarNumber,
                    CarRepair = 0,
                    RepairDetail = "",
                    ReturnDetail = "",
                    ReturnPlace = "",
                    ReturnState = 0,
                    ReturnTime = Convert.ToDateTime(blReturnTimeInput),
                    TravelMileage = 0,
                    UniqueCode = temp.id,
                    user = currentUser.Account
                };

                cms.returnregister.Add(returnR);
                temp.IsAdd = 1;
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