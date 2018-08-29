using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System.Web.SessionState;
using System.Data.Objects.SqlClient;
using System.Text.RegularExpressions;
using CarManageSystem.Extension;

namespace CarManageSystem.handler
{
    /// <summary>
    /// ViewCars 的摘要说明
    /// </summary>
    public class ViewCars : IHttpHandler, IRequiresSessionState
    {
        static Regex r = new Regex("^[0-9]*$");
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            //查询
            var  department = CheckHelper.GetDepartmentIdForQuery(currentUser,context);
            

            var state = context.Request["status"].Trim();
            var account = currentUser.Account;
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var bo = cms.borrowregister.FirstOrDefault(s => s.User == currentUser.Account && s.BorrowState == 0);
                var usersList = cms.user.Select(item=>new { item.Account,item.RealName}).ToList();
                var returnList = cms.returnregister.OrderByDescending(x => x.ReturnTime).ToList();
                dynamic json = new JObject();
                var now = DateTime.Now;
                int IntState = -1;
                if(!string.IsNullOrEmpty(state))
                {
                    IntState = Convert.ToInt32(state);
                }
                var carList = cms.carinfo
                    .Where(c => (department == -1 ? true : c.DepartmentId == department)
                    && (IntState == -1 ? true : (IntState == 2?(c.CarState== 2 || c.CarState == 8): c.CarState == IntState) ))
                    .ToList()
                    .Select(i => new
                    {
                        carImg = ImageHelper.GetImagePath(i.CarPhoto),
                        lastperson = (returnList.FirstOrDefault(s=>s.CarNumber==i.CarNumber)==null?"无": usersList.FirstOrDefault(s=>s.Account== (returnList.FirstOrDefault(ss => ss.CarNumber == i.CarNumber).user)).RealName),
                        brand1 =i.CarBrand,
                        licence=i.CarNumber,
                        space=i.CarModel+"座",
                        oilMass=i.GasL,
                        site=string.IsNullOrEmpty(i.Site)?"":i.Site,
                        //限号的状态 不可用，跟节假日一样就可以了。
                        state= ( i.CarState==0&&(i.HolodayStart <= now.Date && i.HolodayEnd > now.Date))?4:((i.islimit==1) ? 9:(i.CarState == 0&&i.NeedMaintain==1?5:(i.CurrentUser== account?6:(bo==null ? i.CarState :( bo.CarNumber==i.CarNumber?7: i.CarState))))),
                    }).ToList();

                //查询用户是否预约过
                var my = cms.borrowregister.Where(s => s.User == currentUser.Account && (s.BorrowState == 0 || s.BorrowState == 1))
                    .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { r.UniqueCode })
                    .Where(s => s.UniqueCode == null).ToList();
                if (my.Count == 0)
                {
                    json.accessed = 0;
                }
                else
                {
                    json.accessed = 1;
                }

                //转Json
                json.sumNum = carList.Count();
                json.used = carList.Count(s => s.state == 1 || s.state == 2 || s.state == 6);
                json.unUsed = carList.Count(s => s.state == 0);
                var carJson = JArray.FromObject(carList);
                json.car_inf = carJson;
                json.state = "success";
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