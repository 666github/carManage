﻿using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.PersonalCenter.Reservation
{
    /// <summary>
    /// CancelBorrow 的摘要说明
    /// </summary>
    public class CancelBorrow : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否登陆
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            var account = currentUser.Account;
            var uniquecode = context.Request["uniqueCode"];

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var car = cms.borrowregister.FirstOrDefault(s => s.UniqueCode == uniquecode);
                if (car == null)
                {
                    json.state = "没有此借车记录，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }
                var tempCar = cms.carinfo.FirstOrDefault(s => s.CarNumber == car.CarNumber);
                var usr = cms.user.FirstOrDefault(s => s.Account == account);
                switch (car.BorrowState)
                {
                    case 0:
                        car.BorrowState = 2;
                        var _msg = cms.msg_borrowcar.Where(s => s.AccessUser == currentUser.Account && s.AccessCar == car.CarNumber && (s.IsAudit == 0 || s.IsAudit == null)).OrderByDescending(x=>x.AccessTime).FirstOrDefault();
                        if(_msg!=null)
                        {
                            cms.msg_borrowcar.Remove(_msg);
                        }
                        break;
                    case 1:
                        car.BorrowState = 2;
                        tempCar.CarState = 0;
                        tempCar.CurrentUser = "";
                        usr.state = 0;
                        var _msg1 = cms.msg_borrowcar.Where(s => s.AccessUser == currentUser.Account && s.AccessCar == car.CarNumber && s.IsAudit == 1).OrderByDescending(x=>x.AccessTime).FirstOrDefault();
                        if (_msg1 != null)
                        {
                            cms.msg_borrowcar.Remove(_msg1);
                        }
                        break;
                    case 2:
                        json.state = "此借车记录已被取消，请刷新重试！";
                        context.Response.Write(json.ToString());
                        return;
                    case 3:
                        json.state = "此借车记录已被管理员拒绝，请刷新重试！";
                        context.Response.Write(json.ToString());
                        return;
                }

                cms.SaveChanges();
                cms.Dispose();
                context.Response.Write(json.ToString());
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