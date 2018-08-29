using CarManageSystem.helper;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using TaskScheduler;

namespace CarManageSystem.Service
{
    public class QueryHolidayService
    {
        public void Start()
        {
            var date = DateTime.Now.AddDays(7 - Convert.ToInt32(DateTime.Now.DayOfWeek)).ToString("yyyy-MM-dd");

            //创建者
            var creator = "jzht";
            //计划任务名称
            var taskName = "QueryHoliday";
            //执行的程序路径
            var path = PathHelper.GetRootPath() + @"\TaskSchedulerApp\QueryHoliday\QueryHoliday.exe"; //这个程序请求的数据通过http接口传到本系统。1 建个定时获取程序,生成目录在web程序中，2 建个接口获取并处理数据
            //开始时间 请遵循 yyyy-MM-ddTHH:mm:ss 格式
            var startBoundary = date + "T0:01:00";
            var startBoundary1 = date + "T0:02:00";
            var description = "QueryHoliday";
            _TASK_STATE state = helper.TaskScheduler.CreateTaskScheduler(creator, taskName, path, 4, startBoundary, description);
            if (state == _TASK_STATE.TASK_STATE_RUNNING)
            {
                Debug.WriteLine("计划任务部署成功!");
            }

            //启动更替节假日
            var taskName1 = "UpdateHoliday";
            var description1 = "UpdateHoliday";
            var path1 = PathHelper.GetRootPath() + @"\TaskSchedulerApp\UpdateHolidayUse\UpdateHolidayUse.exe";
            _TASK_STATE state1 = helper.TaskScheduler.CreateTaskScheduler(creator, taskName1, path, 2, startBoundary1, description1);
            if (state1 == _TASK_STATE.TASK_STATE_RUNNING)
            {
                Debug.WriteLine("计划任务部署成功!");
            }
        }
    }
}