$(function(){
	//xuyao
	$(".a1").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a1").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").addClass("Mnone");
	});
	$(".a2").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a2").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").removeClass("Mnone");
	});
	$(".a3").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a3").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").addClass("Mnone");
	});
	lookTapbars();
	$.each($(".ocheck"), function() {
		console.log($(this))
	});
	function lookTapbars(){
		//查看需要维修
		$.ajax({
				type:"get",
				url:"http://192.168.1.111:2238/handler/CarManage/CarMaintain/ViewNeedMaintain.ashx",
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						var maintInf=data.maintInf;//
						for(var i=0;i<maintInf.length;i++){
							if(maintInf[i].stateInf==1){
								maintInf[i].stateInf="维修申请";
							}else if(maintInf[i].stateInf==2){
								maintInf[i].stateInf="保养到期";
							}else if(maintInf[i].stateInf==3){
								maintInf[i].stateInf="年检到期";
							}else{
								maintInf[i].stateInf="保险到期";
							}
							$("#maintainNeed").append($('<ul class="maintInf"><li class="choice">'+
								'<li class="carImg"><img src="'+maintInf[i].carImg+'"/></li><li class="brand" id="brandM"><span class="firBrand">'+maintInf[i].brand+'</span></li>'+
								'<li class="licence" id="licenceM"><span class="carLicence1">车牌:</span><span class="carLicence2">'+maintInf[i].carLicence+'</span><span class="carSpace">'+maintInf[i].carSpace+'</span></li>'+
								'<li class="safe"><span class="safe1">保险到期时间：</span><span class="safe2">'+maintInf[i].safe+'</span></li>'+
								'<li class="lastMaint"><span class="lastMaint1">上次保养日期：</span><span class="lastMaint2">'+maintInf[i].lastMaint+'</span></li>'+
								'<li class="endMaint"><span class="endMaint1">年检到期日：</span><span class="endMaint2">'+maintInf[i].endMaint+'</span></li>'+
								'<li><div class="stateInfN">'+maintInf[i].stateInf+'</div><div class="agree">同意</div></li>'						
								+'</ul>'));				
						}
						agree();
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="login.html"
					}else{
						alert(data.state);
					}				
				}			
			});
		//查看维修中
			$.ajax({
				type:"get",
				url:"http://192.168.1.111:2238/handler/CarManage/CarMaintain/ViewMaintaining.ashx",
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						var maintIngul=data.maintIngul;					
						for(var i=0;i<maintIngul.length;i++){
							if(maintIngul[i].stateInf==1){
								maintIngul[i].stateInf="维修申请";
							}else if(maintIngul[i].stateInf==2){
								maintIngul[i].stateInf="保养到期";
							}else if(maintIngul[i].stateInf==3){
								maintIngul[i].stateInf="年检到期";
							}else{
								maintIngul[i].stateInf="保险到期";
							}
							$("#maintainIng").append($('<ul class="maintIngul noCheck"><li class="choice"><input type="radio" name="delinput" id="delinput" value="" class="ocheck" /></li>'+
								'<li class="carImg"><img src="'+maintIngul[i].carImg+'"/></li><li class="brand" id="brandM"><span class="firBrand">'+maintIngul[i].brand+'</span></li>'+
								'<li class="licence" id="licenceM"><span class="carLicence1">车牌:</span><span class="carLicence2">'+maintIngul[i].carLicence+'</span><span class="carSpace">'+maintIngul[i].carSpace+'</span></li>'+
								'<li class="safe"><span class="safe1">保险到期时间：</span><span class="safe2">'+maintIngul[i].safe+'</span></li>'+
								'<li class="lastMaint"><span class="lastMaint1">上次保养日期：</span><span class="lastMaint2">'+maintIngul[i].lastMaint+'</span></li>'+
								'<li class="endMaint"><span class="endMaint1">年检到期日：</span><span class="endMaint2">'+maintIngul[i].endMaint+'</span></li>'+
								'<li class="stateInfM">'+maintIngul[i].stateInf+'</li>'
								+'</ul>'));				
							}
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="login.html"
					}else{
						alert(data.state);
					}				
				}
			});
		//查看完成维修
		page("http://192.168.1.111:2238/handler/CarManage/CarMaintain/ViewFinishMaintain.ashx");

	}	
	//选择同意保养的  加载保养中
	function agree(){
		$(".agree").on("click",".maintainNeed",function(){
			var carLicence=$(this).parents('.maintInf').find('.carLicence2').text();
			var carState=$(this).parents('.maintInf').find('.stateInf').text();
			if(carState=="维修申请"){
				var needState=1;
			}else{
				var needState=0;
			}
			$(this).parents('.maintInf').remove();
//				$(this).parents('.maintInf').css("display",'none');
			$.ajax({
				type:"get",
				url:"http://192.168.1.111:2238/handler/CarManage/CarMaintain/AccessMaintain.ashx",
				data:{"carNumber":carLicences,"needState":needState},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						$("#maintainIng").html("");
						var maintIngul=data.maintIngul;					
						for(var i=0;i<maintIngul.length;i++){
							if(maintIngul[i].stateInf==1){
								maintIngul[i].stateInf="维修申请";
							}else if(maintIngul[i].stateInf==2){
								maintIngul[i].stateInf="保养到期";
							}else if(maintIngul[i].stateInf==3){
								maintIngul[i].stateInf="年检到期";
							}else{
								maintIngul[i].stateInf="保险到期";
							}
							$("#maintainIng").append($('<ul class="maintIngul noCheck"><li class="choice"><input type="radio" name="delinput" id="delinput" value="" class="ocheck" /></li>'+
								'<li class="carImg"><img src="'+maintIngul[i].carImg+'"/></li><li class="brand" id="brandM"><span class="firBrand">'+maintIngul[i].brand+'</span></li>'+
								'<li class="licence" id="licenceM"><span class="carLicence1">车牌:</span><span class="carLicence2">'+maintIngul[i].carLicence+'</span><span class="carSpace">'+maintIngul[i].carSpace+'</span></li>'+
								'<li class="safe"><span class="safe1">保险到期时间：</span><span class="safe2">'+maintIngul[i].safe+'</span></li>'+
								'<li class="lastMaint"><span class="lastMaint1">上次保养日期：</span><span class="lastMaint2">'+maintIngul[i].lastMaint+'</span></li>'+
								'<li class="endMaint"><span class="endMaint1">年检到期日：</span><span class="endMaint2">'+maintIngul[i].endMaint+'</span></li>'+
								'<li class="stateInfM">'+maintIngul[i].stateInf+'</li>'
								+'</ul>'));				
							}
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="login.html"
					}else{
						alert(data.state);
					}				
				}
			});
		})
	}
//选择需要结束保养的 加载保养最终结束
	function page(_url){
////		$(".page").prepend('<div class="pageDiv clearfix"></div>')
		$(".pageBox").pageFun({  
		interFace:_url,  /*接口*/
		displayCount:10,  /*每页显示总条数*/
		maxPage:5,/*每次最多加载多少页*/
		dataFun:function(data){
	//  				var dataHtml = '<li>'+data.dataNum+'</li>';					
			var dataHtml = '<ul class="maintEndul"><li class="Elist1">'+data.Elist1+'</li>'+
						//'<li class="Elist2"><input type="radio" name="list2" id="" value="" class="ocheck"/></li>'+
						'<li class="Elist3">'+data.Elist3+'</li><li class="Elist4">'+data.Elist4+'</li><li class="Elist5">'+data.Elist5+'</li>'+
						'<li class="Elist6">'+data.Elist6+'</li><li class="Elist7">'+data.Elist7+'</li><li class="Elist8">'+data.Elist8+'</li>'+
						'<li class="Elist9">'+data.Elist9+'</li><li class="Elist10">'+data.Elist10+'</li>'
						'</ul>'
				return dataHtml;
		},
		pageFun:function(i){
			var pageHtml = '<li class="pageNum">'+i+'</li>';
				return pageHtml;
		}
	
		})
	}
	$(".Mend").click(function(){							
		$(".orderBgM").removeClass("hideBg");			
		$(".quitSure #quit").hover(function(){
			$(".quitSure #quit").css('background','#4375f8');
			$(".quitSure #sure").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quit").css('background','#FFFFFF');
			$(".quitSure #sure").css('background','#4375f8');
		})
		$(".quitSure #quit").click(function(){
			$(".orderBgM").addClass("hideBg");
		});
	//选择项
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var carLicence="";
		var stateInf="";
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
				break;					
			}
		};			
		$.each(ocheck, function() {		
			carLicence=$(this).parents('.maintIngul').find('.carLicence2').text();
			stateInf=$(this).parents('.maintIngul').find('.stateInfM').text();
			$(this).parents('.maintIngul').remove();
////			$(this).parents('.maintIngul').css("display",'none');
			if(stateInf=="保养到期"){
				$(".safeNext").addClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","保养起始时间");
				$(".infListM #nextMaint").attr("placeholder","保养结束时间");
			}else if(stateInf=="年检到期"){
				$(".safeNext").addClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","年检起始时间");
				$(".infListM #nextMaint").attr("placeholder","年检结束时间");
			}else if(stateInf=="保险到期"){
				$(".safeNext").addClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","保险起始时间");
				$(".infListM #nextMaint").attr("placeholder","保险结束时间");
			}else{
				$(".safeNext").removeClass("ohide");
				$(".infListM #safeEnd").val("此项不填写");
				$(".infListM #nextMaint").val("此项不填写");
			}
		});
		$(".quitSure #sure").click(function(){
			var safeEnd=$(".infListM #safeEnd").val();
			var nextMaint=$(".infListM #nextMaint").val();
			var priceMaint=$(".infListM #priceMaint").val();
			var numMaint=$(".infListM #numMaint").val();
			var mFourLengths=$(".infListM .mFourLength").val();	
			for(var i=0;i<mFourLengths.length;i++){
				if(mFourLengths[i].length==0){return;}
			}
			$.each(ocheck, function() {		
				$(this).parents('.maintIngul').remove();
////				$(this).parents('.maintIngul').css("display",'none');
			});			
				//执行ajax
			$.ajax({
				type:"get",
				url:"http://192.168.1.111:2238/handler/CarManage/CarMaintain/FinishMaintain.ashx",
				data:{"carNumber":carLicences,
					  "needState":stateInf,
					  "safeEnd":safeEnd,//接口中没写
					  "nextMaint":nextMaint,//接口中没写
					  "cost":priceMaint,
					  "code":numMaint
					},
				dataType:"json",
				async:true,
				success:function(data){								
					if(data.state=="success"){
						$(".orderBgM").addClass("hideBg");
						$(".pageDiv").html("");//清空列表	
						page("http://192.168.1.111:2238/handler/CarManage/CarMaintain/FinishMaintain.ashx");				
					}else if(data.state=="1"){
						alert("请重新登录");
						loacation.href="login.html";
					}else{
						alert(data.state);
					}
				}	
			});			
		})			
	})

})

		