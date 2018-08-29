﻿using CarManageSystem.Extension;
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
    /// ViewCard 的摘要说明
    /// </summary>
    public class ViewCard : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            json.state = "success";

            var department = CheckHelper.GetDepartmentId(currentUser, context);

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var cards = cms.mainfuelingcard
                    .Where(s => department==-1?true:s.DepartmentId == department)
                    .LeftJoin(cms.departmentmanage,c=>c.DepartmentId,d=>d.Id,(c,d)=>new { c,d.Name})
                    .Select(item => new
                    {
                        gasNumf=item.c.MainCardId,
                        gasNums=item.c.AssociateCardId,
                        gasLicence=item.c.CarNumber,
                        gasState=item.c.Cardholder,
                        department=item.Name
                    }).ToList();
                json.secondCardInf = JArray.FromObject(cards);
                json.gasSum = cards.Count();
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