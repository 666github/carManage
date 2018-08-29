﻿using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.handler
{
    /// <summary>
    /// ViewOutReturn 的摘要说明    已经抛弃了。
    /// </summary>
    public class ViewOutReturn : IHttpHandler
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
                var outReturn = cms.returnregister
                    .Where(r => r.ReturnState == 1)
                    .LeftJoin(cms.user, o => o.user, u => u.Account, (o, u) => new { o, u })
                    .Select(item => new
                    {
                        item.u.RealName,
                        item.o.CarNumber,
                        item.o.ReturnTime
                    });
                json.outReturn = JArray.FromObject(outReturn);
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