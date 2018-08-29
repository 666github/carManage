using CarManageSystem.Extension;
using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Index
{
    /// <summary>
    /// IndexMessage 的摘要说明
    /// </summary>
    public class IndexMessage : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 0);
            if (currentUser == null)
                return;
            List<string> nullList = new List<string>();
            var account = currentUser.Account;
            var nowMinus30 = DateTime.Now.AddDays(-30);
            var info = context.Request["info"];
            var depart = CheckHelper.GetDepartmentId(currentUser, context);
            dynamic json = new JObject();
            json.state = "success";

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                //司机
                if (currentUser.UserType == 0)
                {
                    var department = currentUser.Department;
                    //借车信息
                    var audit = cms.msg_borrowcar
                        .Where(s => s.AccessUser == currentUser.Account && (s.DIsLook == 0)) 
                        .OrderByDescending(x => x.AccessTime)
                        .ToList();

                    //用户申请信息
                    var auditUser = cms.msg_userapply
                        .Where(s => s.AccessUser == currentUser.Account && (s.DIsLook == 0)) 
                        .OrderByDescending(x => x.AccessTime)
                        .ToList();

                    //违章信息
                    var breakRule = cms.illegalstatistic
                        .Where(s => s.User == currentUser.Account && (s.Time > nowMinus30)) 
                        .OrderByDescending(x => x.Time)
                        .ToList();

                    //违法用车
                    var illegal = cms.illegalusecar
                        .Where(s => s.User == currentUser.Account && (s.Time > nowMinus30)) 
                        .OrderByDescending(x => x.Time)
                        .ToList();

                    //还车信息 ，用老方法判断。 司机没有院外还车提醒
                    var returnCar = cms.borrowregister
                        //.Where(b => b.User == account && b.BorrowState == 1)
                        .LeftJoin(cms.returnregister, b => b.UniqueCode, r => r.UniqueCode, (b, r) => new { b, r })
                        .Where(s => s.b.User == account && s.b.BorrowState == 1 &&  s.r.UniqueCode ==null && DateTime.Now >= s.b.ExpectReturnTime)
                        .OrderByDescending(x => x.b.ExpectReturnTime)
                        .ToList();

                    var carList = cms.carinfo.Select(x => new {x.CarNumber,x.DepartmentId,x.CarBrand }).ToList();
                    var departs = cms.departmentmanage.ToList();

                    //分类返回信息
                    switch (info)
                    {
                        case "1":
                            //概括信息
                            json.remindNum1 = audit.Count() + auditUser.Count();
                            json.remindNum2 = illegal.Count();
                            json.remindNum3 = returnCar.Count();
                            json.remindNum4 = breakRule.Count();
                            json.redpoint2 = illegal.Count(s => s.Dredpoint == 0);
                            json.redpoint3 = returnCar.Count();
                            json.redpoint4 = breakRule.Count(s => s.Dredpoint == 0);
                            //详细信息
                            var auditInfo = audit
                                .Select(item => new
                                {
                                    auditState = (item.IsAudit == 0 || item.IsAudit == null) ? "审核中" : (item.IsAudit == 1 ? "审核通过" : "被拒绝"),
                                    auditSummary = departs.FirstOrDefault(s => s.Id == (carList.FirstOrDefault(ss => ss.CarNumber == item.AccessCar).DepartmentId)).Name,
                                    carLicence = item.AccessCar,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.AccessCar).CarBrand,
                                    applyTime = item.AccessTime.Value.ToShortDateString() + " " + item.AccessTime.Value.ToShortTimeString()
                                });
                            var auditUserInfo = auditUser
                                .Select(item => new
                                {
                                    auditState = (item.IsAudit == 0 || item.IsAudit == null) ? "审核中" : (item.IsAudit == 1 ? "审核通过" : "被拒绝"),
                                    auditSummary = item.AccessRole == 2 ? "院级管理员" : (item.AccessRole == 1 ? departs.FirstOrDefault(d => d.Id == department).Name + "管理员" : departs.FirstOrDefault(d => d.Id == department).Name + "司机"),
                                });
                            json.audit = JArray.FromObject(auditInfo);
                            json.auditUser = JArray.FromObject(auditUserInfo);
                            //更改状态
                            audit.ForEach(x => x.DIsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.DIsLook));
                            auditUser.ForEach(x => x.DIsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.DIsLook));
                            break;
                        case "2":
                            //详细信息
                            var illegalInfo = illegal
                                .Select(item => new
                                {
                                    item.IsAdd,
                                    item.id,
                                    illegaTitle = "您有非法用车记录",
                                    auditSummary = departs.FirstOrDefault(d => d.Id == department).Name,
                                    carLicence = item.CarNumber,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.CarNumber).CarBrand,
                                    specificTime = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                });
                            json.illegal = JArray.FromObject(illegalInfo);
                            //更改状态
                            illegal.ForEach(x => x.DIsLook = (x.State == 0 ? 1 : x.DIsLook));
                            illegal.ForEach(x => x.Dredpoint = 1);
                            break;

                        case "3":
                            //详细信息
                            var returnCarInfo = returnCar
                                .Select(item => new
                                {
                                    returnTitle = "您已到达还车时间",
                                    auditSummary = departs.FirstOrDefault(d => d.Id == department).Name,
                                    carLicence = item.b.CarNumber,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.b.CarNumber).CarBrand,
                                    returnTime = item.b.ExpectReturnTime.Value.ToShortDateString() + " " + item.b.ExpectReturnTime.Value.ToShortTimeString()
                                });
                            json.returnCar = JArray.FromObject(returnCarInfo);
                            //更改状态
                            break;
                        case "4":
                            //详细信息
                            var breakRuleInfo = breakRule
                                .Select(item => new
                                {
                                    breakRuleTitle = "您有违章驾驶记录",
                                    carLicence = item.CarNumber,
                                    ruleReason = item.Type,
                                    breakRulePlace = item.Place,
                                    breakRuleTime = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                });
                            json.breakRule = JArray.FromObject(breakRuleInfo);
                            //更改状态
                            breakRule.ForEach(x => x.DIsLook = (x.User != "" ? 1 : x.DIsLook));
                            breakRule.ForEach(x => x.Dredpoint = 1);
                            break;
                    }
                    context.Response.Write(json.ToString());
                    cms.SaveChanges();
                    cms.Dispose();
                }

                //管理员页面
                else if (currentUser.UserType == 1 || currentUser.UserType == 2)
                {
                    var userList = cms.user.Select(x => new { x.Account, x.RealName }).ToList();
                    var carList = cms.carinfo.Select(x => new { x.CarNumber, x.CarBrand,x.DepartmentId }).ToList();
                    var departs = cms.departmentmanage.ToList();
                    var returnList = cms.returnregister.Select(x=>new { x.UniqueCode,x.ReturnDetail}).ToList();

                    //audit 人员审核
                    var IsHaveAudit = NotifyHelper.CheckNotify(currentUser, "人员审核");
                    var currentDepart = currentUser.Department.ToString();
                    var audit = cms.msg_userapply
                        .Where(s => IsHaveAudit && (currentUser.UserType == 2 ? s.AccessRole == 2 : s.AccessRole <= currentUser.UserType)
                                && (currentUser.UserType == 2 ? true : s.UserDepartment == currentDepart)
                                && (s.IsAudit == 0 || s.IsAudit == null))
                        .ToList()
                        .OrderByDescending(x =>x.AccessTime)
                        .ToList();

                    //auditCar 跨天跨院借车审核
                    var departmentCarList = carList.Where(s => currentUser.UserType == 2 ? true : s.DepartmentId == currentUser.Department).Select(item => item.CarNumber).ToList();
                    var IsHaveAudit1 = NotifyHelper.CheckNotify(currentUser, "借车审核");
                    var auditCar = cms.msg_borrowcar
                        //.Where(s => IsHaveAudit1 && s.type != 0 && departmentCarList.Contains(s.AccessCar)) 
                        .LeftJoin(cms.carinfo, m => m.AccessCar, c => c.CarNumber, (m, c) => new { m, c.CarBrand })
                        .Where(s => IsHaveAudit1 && s.m.type != 0 && departmentCarList.Contains(s.m.AccessCar) && (s.m.IsAudit == 0 || s.m.IsAudit == null))
                        .ToList()
                        .OrderByDescending(x => x.m.AccessTime)
                        .ToList();

                    //myaudit 自己的人员审核
                    var myaudit = cms.msg_userapply
                        .Where(s => IsHaveAudit && s.AccessUser == currentUser.Account && (s.DIsLook==0))
                        .ToList()
                        .OrderByDescending(x => x.AccessTime)
                        .ToList();

                    //myauditCar 自己的用车审核
                    var myauditCar = cms.msg_borrowcar
                        .Where(s => IsHaveAudit1 && s.AccessUser == currentUser.Account && (s.DIsLook == 0))
                        .ToList()
                        .OrderByDescending(x => x.AccessTime)
                        .ToList();

                    //remindIlleCar 非法用车提醒，
                    var IsHaveAudit2 = NotifyHelper.CheckNotify(currentUser, "非法用车提醒");

                    var remindIlleCar = cms.illegalusecar.Where(s=> IsHaveAudit2 && (s.Time > nowMinus30)).ToList()
                        .Where(s =>(currentUser.UserType == 2 ? true : (carList.FirstOrDefault(c => c.CarNumber == s.CarNumber)==null?false: carList.FirstOrDefault(c => c.CarNumber == s.CarNumber).DepartmentId == currentUser.Department)))
                        .OrderByDescending(x => x.Time)
                        .ToList();

                    //remindOut  院外还车提醒  
                    var remindOut = cms.msg_outreturncar
                        .Where(s => depart == -1 ? true : s.CarDepartment == currentUser.Department && (s.IsLook == 0||s.Time> nowMinus30))
                        .ToList()
                        .OrderByDescending(x => x.Time)
                        .ToList();

                    //remindIlle  违章提醒
                    var IsHaveAudit3 = NotifyHelper.CheckNotify(currentUser, "违章提醒");
                    var peccancy = cms.illegalstatistic.Where(s=> IsHaveAudit3).ToList()
                        .Where(s => (currentUser.UserType == 2 ? true : (carList.FirstOrDefault(c => c.CarNumber == s.CarNumber).DepartmentId == currentUser.Department))
                                && (s.Time> nowMinus30))
                        .OrderByDescending(x => x.Time)
                        .ToList();

                    //myremindIlleCar 自己的非法用车提醒，
                    var myremindIlleCar = cms.illegalusecar
                       .Where(s => IsHaveAudit2 && s.User == currentUser.Account && (s.Time> nowMinus30))
                       .ToList()
                       .OrderByDescending(x => x.Time)
                       .ToList();

                    //myremindOut  自己的违章提醒
                    var myremindOut = cms.illegalstatistic
                         .Where(i => IsHaveAudit3 && i.User == account && (i.Time> nowMinus30))
                         .ToList()
                         .OrderByDescending(x => x.Time)
                         .ToList();

                    //dueNotice 到期提醒
                    var IsHaveAudit4 = NotifyHelper.CheckNotify(currentUser, "到期提醒");
                    var dueNotice = cms.msg_expire
                        .Where(s => IsHaveAudit4 && (s.IsAudit == 0 || s.IsAudit == null) && (currentUser.UserType == 2 ? true : s.CarDepartment == currentUser.Department))
                        .ToList();


                    //maintenance 维修申请
                    var IsHaveAudit5 = NotifyHelper.CheckNotify(currentUser, "维修申请");
                    var maintenance = cms.msg_maintain
                        .Where(s => IsHaveAudit5 && (s.IsAudit == 0 || s.IsAudit == null) && (currentUser.UserType == 2 ? true : s.CarDepartment == currentUser.Department))
                        .ToList();

                    

                    //分类返回信息
                    switch (info)
                    {
                        case "1":
                            //概括信息
                            json.remindNum1 = audit.Count() + auditCar.Count() + myaudit.Count() + myauditCar.Count();
                            json.remindNum2 = remindIlleCar.Count() + remindOut.Count() + peccancy.Count() + myremindIlleCar.Count() + myremindOut.Count();
                            json.remindNum3 = dueNotice.Count();
                            json.remindNum4 = maintenance.Count();
                            json.redpoint2 = remindIlleCar.Count(s => s.redpoint == 0) + remindOut.Count(s => s.redpoint == 0) + peccancy.Count(s => s.redpoint == 0) + myremindIlleCar.Count(s => s.Dredpoint == 0) + myremindOut.Count(s => s.Dredpoint == 0);
                            json.redpoint3 = dueNotice.Count(s => s.redpoint == 0);
                            json.redpoint4 = maintenance.Count(s => s.redpoint == 0);

                            //详细信息
                            var auditInfo = audit
                                .Select(item => new
                                {
                                    needApply = (item.IsAudit==null||item.IsAudit==0)?"1":(item.IsAudit==1?"已通过":"已拒绝"),
                                    item.IsLook,
                                    id = item.Id,
                                    applyid = item.AccessUser,
                                    fast = "[紧急]",
                                    applyfor = item.AccessRole == 0 ? "向您申请成为司机" : (item.AccessRole == 1 ? "向您申请成为部门级管理员" : "向您申请成为院级管理员"),
                                    applybody = item.RealName,
                                    sendtime = item.AccessTime.Value.ToShortDateString() + " " + item.AccessTime.Value.ToShortTimeString()
                                }).ToList();

                            var auditCarInfo = auditCar
                                .Select(item => new
                                {
                                    needApply = (item.m.IsAudit == null || item.m.IsAudit == 0) ? "1" : (item.m.IsAudit == 1 ? "已通过" : "已拒绝"),
                                    item.m.IsLook,
                                    id = item.m.Id,
                                    applyfor = "向您申请借车 ",
                                    applybody = item.m.RealName,
                                    sendtime = item.m.AccessTime.Value.ToShortDateString() + " " + item.m.AccessTime.Value.ToShortTimeString(),
                                    brand = item.CarBrand,
                                    carLicence = item.m.AccessCar,
                                    applyid = item.m.AccessUser,
                                    type = item.m.type == 1 ? "[跨院借车]" : (item.m.type == 2 ? "[跨天借车]" : "[跨院+跨天借车]")
                                }).ToList();

                            var myauditInfo = myaudit
                                 .Select(item => new
                                 {
                                     item.DIsLook,
                                     auditState = (item.IsAudit == 0 || item.IsAudit == null) ? "审核中" : (item.IsAudit == 1 ? "审核通过" : "被拒绝"),
                                     auditSummary = item.AuditUserRole == 1 ? "部门级管理员" : "院级管理员"
                                 }).ToList();

                            var myauditCarInfo = myauditCar
                                .Select(item => new
                                {
                                    item.DIsLook,
                                    auditState = (item.IsAudit == 0 || item.IsAudit == null) ? "审核中" : (item.IsAudit == 1 ? "审核通过" : "被拒绝"),
                                    auditSummary = departs.FirstOrDefault(s => s.Id == Convert.ToInt32(item.UserDepartment)).Name,
                                    carLicence = item.AccessCar,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.AccessCar)==null?"已删除此车辆": carList.FirstOrDefault(s => s.CarNumber == item.AccessCar).CarBrand,
                                    applyTime = item.AccessTime.Value.ToShortDateString() + " " + item.AccessTime.Value.ToShortTimeString(),
                                    auditJumpBorrow = item.type == 0 ? "" : (item.type == 3 ? "[跨天+跨院借车]" : (item.type == 2 ? "[跨天借车]" : "[跨院借车]"))
                                }).ToList();

                            json.audit = JArray.FromObject(auditInfo);
                            json.auditCar = JArray.FromObject(auditCarInfo);
                            json.myaudit = JArray.FromObject(myauditInfo);
                            json.myauditCar = JArray.FromObject(myauditCarInfo);
                            //更改状态
                            audit.ForEach(x => x.IsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.IsLook));
                            auditCar.ForEach(x => x.m.IsLook = ((x.m.IsAudit != 0 && x.m.IsAudit != null) ? 1 : x.m.IsLook));
                            myaudit.ForEach(x => x.DIsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.DIsLook));
                            myauditCar.ForEach(x => x.DIsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.DIsLook));
                            break;
                        case "2":
                            //详细信息
                            
                            var remindIlleCarInfo = remindIlleCar
                                .Select(item => new
                                {
                                    needApply = string.IsNullOrEmpty(item.User) ? "1" : "已处理给"+ (userList.FirstOrDefault(s => s.Account == item.User)==null?"": userList.FirstOrDefault(s=>s.Account == item.User).RealName),
                                    item.IsLook,
                                    id = item.id,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.CarNumber)==null?"": carList.FirstOrDefault(s => s.CarNumber == item.CarNumber).CarBrand,
                                    carLicence = item.CarNumber,
                                    time = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                }).ToList();
                            var remindOutInfo = remindOut
                                 .Select(item => new
                                 {
                                     item.IsLook,
                                     personName = userList.FirstOrDefault(s => s.Account == item.User).RealName,
                                     brand = carList.FirstOrDefault(s => s.CarNumber == item.Car).CarBrand,
                                     carLicence = item.Car,
                                     reason1 = returnList.FirstOrDefault(s => s.UniqueCode == item.Id) == null ? "" : returnList.FirstOrDefault(s => s.UniqueCode == item.Id).ReturnDetail
                                 }).ToList();
                            var peccancyInfo = peccancy
                                 .Select(item => new
                                 {
                                     needApply = string.IsNullOrEmpty(item.User) ? "1" : "已处理给"+ userList.FirstOrDefault(s => s.Account == item.User).RealName,
                                     item.IsLook,
                                     id = item.Id,
                                     personName = string.IsNullOrEmpty(item.User) ? "" : userList.FirstOrDefault(x => x.Account == item.User).RealName,
                                     carLicence = item.CarNumber,
                                     reason = item.Type,
                                     place = item.Place,
                                     time = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                 }).ToList();
                            var myremindIlleCarInfo = myremindIlleCar
                                .Select(item => new
                                {
                                    item.IsAdd,
                                    item.id,
                                    item.DIsLook,
                                    carLicence = item.CarNumber,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.CarNumber).CarBrand,
                                    time = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                }).ToList();
                            var myremindOutInfo = myremindOut
                                .Select(item => new
                                {
                                    item.DIsLook,
                                    personName = "您有违章驾驶记录",
                                    carLicence = item.CarNumber,
                                    reason = item.Type,
                                    place = item.Place,
                                    time = item.Time.Value.ToShortDateString() + " " + item.Time.Value.ToShortTimeString()
                                }).ToList();

                            json.remindIlleCar = JArray.FromObject(remindIlleCarInfo);
                            json.remindOut = JArray.FromObject(remindOutInfo);
                            json.peccancy = JArray.FromObject(peccancyInfo);
                            json.myremindIlleCar = JArray.FromObject(myremindIlleCarInfo);
                            json.myremindOut = JArray.FromObject(myremindOutInfo);
                            //更改状态
                            remindIlleCar.ForEach(x => x.IsLook = (x.State == 0 ? 1 : x.IsLook));
                            remindOut.ForEach(x => x.IsLook = 1);
                            peccancy.ForEach(x => x.IsLook = (x.User != "" ? 1 : x.IsLook));
                            myremindIlleCar.ForEach(x => x.DIsLook = (x.State == 0 ? 1 : x.DIsLook));
                            myremindOut.ForEach(x => x.DIsLook = (x.User != "" ? 1 : x.DIsLook));

                            remindIlleCar.ForEach(x => x.redpoint = 1);
                            remindOut.ForEach(x => x.redpoint = 1);
                            peccancy.ForEach(x => x.redpoint = 1);
                            myremindIlleCar.ForEach(x => x.Dredpoint = 1);
                            myremindOut.ForEach(x => x.Dredpoint = 1);
                            break;
                        case "3":
                            //详细信息
                            var dueNoticeInfo = dueNotice
                                .Select(item => new
                                {
                                    item.IsLook,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.Car).CarBrand,
                                    carLicence = item.Car,
                                    department = departs.FirstOrDefault(s => s.Id == item.CarDepartment).Name,
                                    expireType = item.Type == 2 ? "保养到期" : (item.Type == 3 ? "年检到期" : "保险到期"),
                                    time = item.ApplyTime.Value.ToShortDateString() + " " + item.ApplyTime.Value.ToShortTimeString()
                                }).ToList();
                            json.dueNotice = JArray.FromObject(dueNoticeInfo);
                            //更改状态
                            dueNotice.ForEach(x => x.IsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.IsLook));
                            dueNotice.ForEach(x => x.redpoint = 1);
                            break;
                        case "4":
                            //详细信息
                            var maintenanceInfo = maintenance
                                .Select(item => new
                                {
                                    item.IsLook,
                                    brand = carList.FirstOrDefault(s => s.CarNumber == item.Car).CarBrand,
                                    carLicence = item.Car,
                                    department = departs.FirstOrDefault(s => s.Id == item.CarDepartment).Name,
                                    personName = userList.FirstOrDefault(s => s.Account == item.User).RealName,
                                    time = item.ApplyTime.Value.ToShortDateString() + " " + item.ApplyTime.Value.ToShortTimeString()
                                }).ToList();
                            json.maintenance = JArray.FromObject(maintenanceInfo);
                            //更改状态
                            maintenance.ForEach(x => x.IsLook = ((x.IsAudit != 0 && x.IsAudit != null) ? 1 : x.IsLook));
                            maintenance.ForEach(x => x.redpoint = 1);
                            break;
                    }
                    cms.SaveChanges();
                    cms.Dispose();
                    context.Response.Write(json.ToString());
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