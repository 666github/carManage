$(function(){
	$.ajax({						
			type:"get",
			url:"http://192.168.1.111:2238/handler/CarManage/CarQuery/GetCarDetails.ashx",
			dataType:"json",			
			data:{
				"carNumber":g_carNumber,			
			},
			success:function(data){
//				//车辆信息详情
				$("#container").load("html/carManage/holidayDetails.html");
				var carInf_det=data.carInf_det;
				$(".top_branch").text(carInf_det.top_branch);
				$(".topInf img").attr("src",carInf_det.imgSrc);
				$(".firBrandDet").text(carInf_det.firBrandDet);
				$(".licenceDet").text(carInf_det.licenceDet);
				$(".buydayDet").text(carInf_det.buydayDet);
				$(".modelDet").text(carInf_det.modelDet);
				$(".typeDet").text(carInf_det.typeDet);
				$(".safeStartDet").text(carInf_det.safeStartDet);
				$(".safeEndDet").text(carInf_det.safeEndDet);
				$(".enginDet").text(carInf_det.enginDet);
				$(".priceDet").text(carInf_det.priceDet);
				$(".annualStartDet").text(carInf_det.annualStartDet);
				$(".annuaEndDet").text(carInf_det.annuaEndDet);
				$(".mileDet").text(carInf_det.mileDet);
				$(".outnumDet").text(carInf_det.outnumDet);
				$(".mtStartDet").text(carInf_det.mtStartDet);
				$(".mtEndDet").text(carInf_det.mtEndDet);
				$(".mtMoneyDet").text(carInf_det.mtMoneyDet);
				$(".mtNumDet").text(carInf_det.mtNumDet);							
			},
			error:function(){
				alert('暂无详情可查看！')
			}
		});
		
		$(".back_title").click(function(){
				$("#container").load("html/carManage/holidays.html");
			});
})