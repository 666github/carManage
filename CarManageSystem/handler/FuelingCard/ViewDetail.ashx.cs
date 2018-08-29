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
    /// ViewDetail 的摘要说明
    /// </summary>
    public class ViewDetail : IHttpHandler,IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            var associateCardId = context.Request["associateCardId"];
            dynamic json = new JObject();
            json.state = "success";

            var start = context.Request["start"];
            var end = context.Request["end"];

            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var cardinfo = cms.associatecardinfo
                    .Where(s => s.AssociateCardId == associateCardId)
                    .ToList()
                    .Where(s=> (string.IsNullOrEmpty(start)?true:Convert.ToDateTime(start)<=s.TradeTime)
                    && (string.IsNullOrEmpty(end) ? true : Convert.ToDateTime(end) > s.TradeTime))
                    .OrderByDescending(x => x.TradeTime)
                    .Select(item => new
                    {
                        list1=item.AssociateCardId,
                        list2=item.CardHolder,
                        list3 = item.TradeTime.ToShortDateString()+" "+ item.TradeTime.ToShortTimeString(),
                        list4=item.TradeType,
                        list5=item.Amount,
                        list6=item.OilProduct,
                        list7=item.Count,
                        list8=item.Price,
                        list9=item.BonusPoints,
                        list10=item.Balance,
                        list11=item.Place
                    });

                json.gasCardInf = JArray.FromObject(cardinfo);
                json.quancun = cardinfo.Where(s => s.list4 == "圈存").Sum(x => x.list5);
                json.quanti= cardinfo.Where(s => s.list4 == "圈提").Sum(x => x.list5);
                json.jiayou = cardinfo.Where(s => s.list4 == "加油").Sum(x => x.list5);
                json.count = cardinfo.Where(s => s.list4 == "加油").Sum(x=>x.list7);
                json.bonus = cardinfo.Sum(x => x.list9);
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