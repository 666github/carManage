using CarManageSystem.helper;
using CarManageSystem.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.Statistics
{
    /// <summary>
    /// ExportExcelForDriverTrajectory 的摘要说明
    /// </summary>
    public class ExportExcelForDriverTrajectory : IHttpHandler,IRequiresSessionState
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

            var temp = MyGlobal.excelList.FirstOrDefault(s=>s.user==currentUser.Account);
            if (temp==null)
            {
                json.state = "请先查询出想要导出的数据";
                context.Response.Write(json.ToString());
                return;
            }
            var id = context.Request["id"];
            if (temp.id!=id)
            {
                json.state = "请先查询出想要导出的数据";
                context.Response.Write(json.ToString());
                return;
            }
            var source = (dynamic)temp.value;
            var dt = new DataTable();
            dt.Columns.Add("用户名");
            dt.Columns.Add("真实姓名");
            dt.Columns.Add("车牌号");
            dt.Columns.Add("用途");
            dt.Columns.Add("目的地");
            dt.Columns.Add("备注");
            dt.Columns.Add("用车时间");
            dt.Columns.Add("还车时间");
            dt.Columns.Add("本次里程");

            foreach (var row in source)
            {
                var dtRow = dt.NewRow();
                dtRow[0] = row.list1;
                dtRow[1] = row.list2;
                dtRow[2] = row.list3;
                dtRow[3] = row.list4;
                dtRow[4] = row.list5;
                dtRow[5] = row.list6;
                dtRow[6] = row.list7;
                dtRow[7] = row.list8;
                dtRow[8] = row.list9;
                dt.Rows.Add(dtRow);
            }
            ExcelHelper.ExportByWeb(dt,"司机行程记录", "司机行程记录.xls");
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