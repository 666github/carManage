using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
namespace CarManageSystem.handler
{
    /// <summary>
    /// AccessBorrow 的摘要说明
    /// </summary>
    public class AccessBorrow : IHttpHandler, IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            //是否有部门管理员权限
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            dynamic json = new JObject();
            var uniqueCode = context.Request["uniqueCode"].Trim();
            var access = context.Request["access"].Trim();
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var borrow = cms.borrowregister.FirstOrDefault(s => s.UniqueCode == uniqueCode);
                if (borrow.BorrowState != 0)
                {
                    json.state = "此车已通过审核，请刷新重试！";
                    context.Response.Write(json.ToString());
                    return;
                }

                var tempCar = cms.carinfo.FirstOrDefault(c => c.CarNumber == borrow.CarNumber);
                if (tempCar.CarState != 0)
                {
                    json.state = "此车不是空闲状态，不可通过审批！";
                    context.Response.Write(json.ToString());
                    return;
                }



                if (Convert.ToInt16(access) == 1) //0拒绝  1 通过跨院借车  2 通过跨天借车    ——————>当前逻辑为只有 （通过  1）和  （拒绝  0）状态
                {
                    //if (borrow.pushtype != -1)
                    //{
                    //    var ul = cms.jijian.FirstOrDefault(s => s.user == borrow.nodeUser);
                    //    if (ul != null)
                    //    {
                    //        if (ul.level == 0)
                    //        {
                    //            //创建新单子，并推送，更改borrow的状态
                    //            var _msg_borrowcar = new msg_borrowcar()
                    //            {
                    //                Id = borrow.UniqueCode,
                    //                IsLook = 0,
                    //                DIsLook = 0,
                    //                //IsAudit=brinfo.BorrowState==1?1:0,
                    //                AccessCar = borrow.CarNumber,
                    //                AccessUser = currentUser.Account,
                    //                AccessTime = DateTime.Now,
                    //                UserDepartment = currentUser.Department.ToString(),
                    //                RealName = currentUser.RealName,
                    //                type = borrow.BorrowStateOD,
                    //                redpoint = 0,
                    //                Dredpoint = 0,
                    //                pushtype = borrow.pushtype,
                    //                nodeLevel = 1
                    //            };
                    //            cms.msg_borrowcar.Add(_msg_borrowcar);

                    //            var nodeUser = cms.jijian.FirstOrDefault(s => s.department == ul.department);
                    //            if (nodeUser != null)
                    //            {
                    //                var msg = cms.departmentmanage.FirstOrDefault(s => s.Id == currentUser.Department).Name + "部门的" + currentUser.RealName + "向您申请" + (_msg_borrowcar.pushtype == 0 ? "夜间" : (_msg_borrowcar.pushtype == 1 ? "节假日" : "周末")) + "用车，请审核";
                    //                PushHelper.PushToUser(nodeUser.user, "借车审核", msg);
                    //                PushHelper.PushToUser(_msg_borrowcar.AccessUser, "借车审核", "您的借车已被部门纪检员审核，等待院级纪检员审核");
                    //            }
                    //            borrow.BorrowStateOD = 0;
                    //            borrow.nodeUser = nodeUser.user;
                    //            borrow.BorrowState = 1;
                    //            cms.SaveChanges();
                    //        }
                    //        else
                    //        {
                    //            PushHelper.PushToUser(borrow.User, "借车审核", "您的借车已被院级纪检员审核");
                    //            borrow.BorrowStateOD = 0;
                    //            borrow.BorrowState = 1;
                    //            var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == borrow.CarNumber);
                    //            car.CarState = 1;
                    //            car.CurrentUser = borrow.User;
                    //        }
                    //    }
                    //}
                    //else
                    //{
                        borrow.BorrowStateOD = 0;
                        borrow.BorrowState = 1;
                        var car = cms.carinfo.FirstOrDefault(s => s.CarNumber == borrow.CarNumber);
                        car.CarState = 1;
                        car.CurrentUser = borrow.User;
                    //}
                }
                else if (Convert.ToInt32(access) == 0)
                {
                    //if (borrow.pushtype != -1)
                    //{
                    //    var ul = cms.jijian.FirstOrDefault(s => s.user == borrow.nodeUser);
                    //    if (ul != null)
                    //    {
                    //        PushHelper.PushToUser(borrow.User, "借车审核", "您的借车已被拒绝");
                    //    }
                    //}
                    borrow.BorrowState = 3;
                }

                //更改借车消息
                var _msg = cms.msg_borrowcar
                    .FirstOrDefault(s => s.Id == uniqueCode);
                if (_msg != null)
                {
                    _msg.type = borrow.BorrowStateOD;
                    _msg.IsAudit = borrow.BorrowState == 3 ? 2 : 1;
                }

                cms.SaveChanges();
                cms.Dispose();
                json.state = "success";

                //推送
                //Task.Factory.StartNew(() =>
                //{
                //if (borrow.pushtype == -1)
                //{
                    try
                    {
                        var msg = "您申请的" + _msg.AccessCar;
                        if (Convert.ToInt16(access) == 1)
                        {
                            msg += "已通过审核";
                        }
                        else
                        {
                            msg += "已被管理员拒绝";
                        }
                        PushHelper.PushToUser(_msg.AccessUser, "借车审核", msg);
                    }
                    catch (Exception ex)
                    {

                    }
                //}
                //});
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