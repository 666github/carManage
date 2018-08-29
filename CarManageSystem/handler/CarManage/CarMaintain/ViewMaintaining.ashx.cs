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
    /// Maintaining 的摘要说明
    /// </summary>
    public class ViewMaintaining : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;
            var department = CheckHelper.GetDepartmentId(currentUser,context);
            dynamic json = new JObject();

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var tempCars = cms.carcostregister
                    .Where(s => string.IsNullOrEmpty(s.Code)&&s.Type!=5)
                    .LeftJoin(cms.carinfo,r=>r.CarNumber,c=>c.CarNumber,(r,c)=>new { r.Id,r.Type,c})
                    .Where(s=> department==-1?true:s.c.DepartmentId==department)
                    .ToList()
                    .Select(i => new
                    {
                        id=i.Id,
                        carImg = ImageHelper.GetImagePath(i.c.CarPhoto),
                        brand = i.c.CarBrand,
                        carLicence = i.c.CarNumber,
                        carSpace = i.c.CarModel + "座",
                        safe = i.c.InsuranceEndDate.Value.ToShortDateString(),
                        lastMaint = i.c.MaintenanceEndDate==null?"":i.c.MaintenanceEndDate.Value.ToShortDateString(),
                        endMaint = i.c.AnnualEndDate.Value.ToShortDateString(),
                        stateInf = i.Type
                    }).OrderBy(s=>s.stateInf);
                json.maintIngul = JArray.FromObject(tempCars);
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