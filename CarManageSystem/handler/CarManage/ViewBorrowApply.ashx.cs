﻿using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler
{
    /// <summary>
    /// ViewBorrowApply 的摘要说明     已经抛弃了。
    /// </summary>
    public class ViewBorrowApply : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;
            dynamic json = new JObject();
            json.state = "success";
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var cars = cms.borrowregister
                    .Where(b => b.BorrowState == 0)
                    .LeftJoin(cms.carinfo, b => b.CarNumber, c => c.CarNumber, (b, c) => new { b, c })
                    .LeftJoin(cms.user,bc=>bc.b.User,u=>u.Account,(bc,u)=>new {bc,u })
                    .Select(item => new
                    {
                        item.u.RealName,
                        item.bc.c.CarNumber,
                        item.bc.b.BorrowTime,
                        item.bc.b.UniqueCode
                    });

                json.infos = JArray.FromObject(cars);
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