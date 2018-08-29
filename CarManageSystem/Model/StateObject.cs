using CarManageSystem.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace CarManageSystem.Model
{
    public class StateObject
    {
        public string id { get; set; }
        public carinfo car { get; set; }
        public string socketid { get; set; }
        public HttpWebRequest request { get; set; }
        public DateTime datetime { get; set; }
    }
}