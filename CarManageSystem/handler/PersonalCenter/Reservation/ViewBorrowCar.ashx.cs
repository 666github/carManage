using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.PersonalCenter
{
    /// <summary>
    /// ViewBorrowCar 的摘要说明
    /// </summary>
    public class ViewBorrowCar : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            var account = currentUser.Account;
            dynamic json = new JObject();
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var orders = cms.borrowregister
                    .Where(s => s.User == account)
                    .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b.ExpectReturnTime, b.BorrowState, b.CarNumber, b.UniqueCode, b.UseCarTime, b.Destination, b.BorrowTime, b.Purposes, r.ReturnTime, ru = r.UniqueCode })
                    .LeftJoin(cms.carinfo, b => b.CarNumber, c => c.CarNumber, (b, c) => new { b, c.CarBrand, c.CarModel, c.CarState })
                    .OrderByDescending(s => s.b.BorrowTime)
                    .ToList()
                    .Select(i => new
                    {
                        uniqueCode=i.b.UniqueCode,
                        state = (!string.IsNullOrEmpty(i.b.ru)) ? 3 : (i.b.BorrowState == 0 ? 0 : (i.b.BorrowState==2?-1:(i.b.BorrowState==3?4: (i.CarState == 2 ? 2 : 1)))),
                        brand1=i.CarBrand,
                        licence=i.b.CarNumber,
                        model=i.CarModel+"座",
                        usetime=i.b.UseCarTime.Value.ToShortDateString(),
                        returntime = !string.IsNullOrEmpty(i.b.ru) ? i.b.ReturnTime.Value.ToShortDateString() : i.b.ExpectReturnTime.Value.ToShortDateString(),
                        destination=i.b.Destination,
                        effect=i.b.Purposes,
                        ordertime=i.b.BorrowTime.Value.ToShortDateString()
                    });
                Debug.WriteLine(orders.ToString());
                json.state = "success";
                json.car_inf = JArray.FromObject(orders);
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