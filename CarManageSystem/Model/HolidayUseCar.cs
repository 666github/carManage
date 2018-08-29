using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarManageSystem.Model
{
    public class HolidayUseCar
    {
        public string start { get; set; }
        public string end { get; set; }
        public List<string> cars { get; set; }
    }

    public class RemoveUseCar
    {
        public List<string> cars { get; set; }
    }
}