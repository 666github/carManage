using CarManageSystem.helper;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.SessionState;

namespace CarManageSystem.handler.FuelingCard
{
    /// <summary>
    /// InputTable 的摘要说明
    /// </summary>
    public class InputTable : IHttpHandler,IRequiresSessionState
    {
        static Regex number = new Regex("^[0-9]*$");
        public void ProcessRequest(HttpContext context)
        {
            var currentUser = CheckHelper.RoleCheck(context, 1);
            if (currentUser == null)
                return;

            context.Response.ContentType = "text/plain";
            var path = ImageHelper.GetFullFilePath(context.Request.Files["gasInf"]);

            dynamic json = new JObject();
            json.state = "success";

            //处理表格数据 保存到数据库
            //读入所有数据，
            var dt = ExcelHelper.Import(path);
            var rows = dt.AsEnumerable().Where(s => number.Match(s[0].ToString()).Success);
            //查找详细信息 ， 已存在的不保存
            //0 卡号  1持卡人 2交易时间  3交易类型 4金额 5油品 6数量 7单价  8奖励积分 9余额  10 地点
            using (cmsdbEntities cms = new cmsdbEntities())
            {
                var dbMainCard = cms.mainfuelingcard.ToList();
                var dbAssociate = cms.associatecardinfo.ToList();
                foreach (var row in rows)
                {
                    var mainCard = dbMainCard.FirstOrDefault(s => s.AssociateCardId == row[0].ToString());
                    //如果主卡中没有绑定此副卡信息，略过
                    if(mainCard==null)
                    {
                        continue;
                    }
                    //如果主卡信息的持卡人为空，则增加持卡人信息
                    if (string.IsNullOrEmpty(mainCard.Cardholder))
                    {
                        mainCard.Cardholder = row[1].ToString();
                    }
                    var associate = dbAssociate.FirstOrDefault(s => s.AssociateCardId == row[0].ToString() && Convert.ToDateTime(s.TradeTime) == Convert.ToDateTime(row[2]));
                    //如果副卡信息中已存在此条记录，略过
                    if (associate!=null)
                    {
                        continue;
                    }

                    //新增记录
                    var Associate = new associatecardinfo()
                    {
                        AssociateCardId = row[0].ToString(),
                        CardHolder = row[1].ToString(),
                        TradeTime = Convert.ToDateTime(row[2]),
                        TradeType = row[3].ToString(),
                        Amount = Convert.ToDecimal(row[4]),
                        OilProduct = row[5].ToString(),
                        Count = Convert.ToDouble(row[6]),
                        Price = Convert.ToDecimal(row[7]),
                        BonusPoints = Convert.ToDouble(row[8]),
                        Balance = Convert.ToDecimal(row[9]),
                        Place = row[10].ToString(),
                        guid=Guid.NewGuid().ToString()
                    };


                    cms.associatecardinfo.Add(Associate);

                    //type 为5 代表加油花费
                    var cost = new carcostregister()
                    {
                        Type = 5,
                        CarNumber = cms.mainfuelingcard.FirstOrDefault(s => s.AssociateCardId == Associate.AssociateCardId).CarNumber,
                        Cost = Associate.Amount, 
                        Id = Associate.guid
                    };
                    cms.carcostregister.Add(cost);
                }
                cms.SaveChanges();
                cms.Dispose();
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