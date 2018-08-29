$(document).ready(function() {
    
	$(".lastTime").text(lastTime);
	checkMessage();
//	getAllMessage();
	getAllMessage1();
});

//模块切换
function checkMessage(){	
	$('.warningMessage ').click(function(){
		$('.breakRuleFrame').removeClass("hide")
		$('.breakRuleInfo').addClass("animated zoomIn");
		$('.breakRuleFrame').siblings("div").addClass("hide");
		getAllMessage1();
	});
	$('.illegalCar').click(function(){
		$('.auditFrame').removeClass("hide")
		$('.auditInfo').addClass("animated zoomIn");
		$('.auditFrame').siblings("div").addClass("hide");
		getAllMessage2();
	});
	$('.dueRemind').click(function(){
		$('.illegalFrame').removeClass("hide")
		$('.illegalInfo').addClass("animated zoomIn");
		$('.illegalFrame').siblings("div").addClass("hide");
		getAllMessage3();
	});
	$('.maintenanceRemind ').click(function(){
		$('.returnFrame').removeClass("hide")
		$('.returnInfo').addClass("animated zoomIn");
		$('.returnFrame').siblings("div").addClass("hide");
		getAllMessage4();
	});	
}

//获取所有的提醒信息
function getAllMessage1(){
	var content = this;
	//消息提醒
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=1",///handler/Index/MessageRemind.ashx
		xhrFields:{withCredentials:true},
		data:{'from':0},
		dataType:"json",
		success: function (data) {
			if(data.state=="success"){
				$(".remindNum1").text(data.remindNum1);
				$(".remindNum2").text(data.remindNum2);
				$(".remindNum3").text(data.remindNum3);
				$(".remindNum4").text(data.remindNum4);
				data.redpoint2==0?($(".remindTag2").addClass("ohide")):($(".remindTag2").removeClass("ohide"));
				data.redpoint3==0?($(".remindTag3").addClass("ohide")):($(".remindTag3").removeClass("ohide"));
				data.redpoint4==0?($(".remindTag4").addClass("ohide")):($(".remindTag4").removeClass("ohide"));
				//debugger;
				content.getAudit(data.audit, data.auditUser);
//				content.getIllegal(data.illegal);
//				content.getReturnCar(data.returnCar);
//				content.getBreakRule(data.breakRule);
				
			}else if(data.state=="1"){
				alert("请重新登录");
				window.location.href="./login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	this.getAudit = function (_data,_data1) {
	    var auditNode = "";
	    for (var i = 0; i < _data1.length; i++) {
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditFinish">' + _data1[i].auditState + '</span>您申请的<span class="auditSummary">' + _data1[i].auditSummary + '</span>'
			    + '</div></div>';
	    }
		for (var i = 0; i < _data.length; i++) {
		    
		        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditFinish">' + _data[i].auditState + '</span>您申请使用<span class="auditSummary">' + _data[i].auditSummary + '</span>车牌为<span>' + _data[i].carLicence + '</span>的<span>' + _data[i].brand + '</span> </div>' +
				'<div class="auditIcon">' +
					'<div>提交于<span class="applyTime">' + _data[i].applyTime + '</span></div>' +
				'</div>' +
			'</div>';
		}
		$(".auditNode").remove();
		$(".auditInfo").html(auditNode);
		$(".auditInfo>div:nth-child(odd)").addClass("rowBgCar");
  	};
}
function getAllMessage2(){
	var content = this;
	//非法用车
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=2",///handler/Index/MessageRemind.ashx
		xhrFields:{withCredentials:true},
		data:{'from':0},
		dataType:"json",
		success: function (data) {
			if(data.state=="success"){
				content.getIllegal(data.illegal);				
			}else if(data.state=="1"){
				alert("请重新登录");
				window.location.href="./login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	this.getIllegal = function (_data){
		var illegalNode = "";
		for (var i = 0; i<_data.length;i++) {
			illegalNode += '<div class="illegalNode">'+
				'<div class="illegaTitle">'+_data[i].illegaTitle+'</div>'+
				'<div class="illegalCarInfo">'+
					'<p>品牌：<span>'+_data[i].brand+'</span></p><p>车牌号：<span>'+_data[i].carLicence+'</span></p>'+
				'</div>'+
				'<div class="illegalTime">'+
					'<p>部门：<span>'+_data[i].auditSummary+'</span></p><p class="transportTime">用车时间：<span class="specificTime">'+_data[i].specificTime+'</span></p>'+
				'</div>'+
			'</div>';
		}
		$(".illegalNode").remove();
		$(".illegalInfo").html(illegalNode);
		$(".illegalInfo>div:nth-child(odd)").addClass("rowBgColor");
   	};
}
function getAllMessage3(){
	var content = this;
	//还车提醒
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=3",///handler/Index/MessageRemind.ashx
		xhrFields:{withCredentials:true},
		data:{'from':0},
		dataType:"json",
		success: function (data) {
			if(data.state=="success"){
				content.getReturnCar(data.returnCar);	
			}else if(data.state=="1"){
				alert("请重新登录");
				window.location.href="./login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	this.getReturnCar = function(_data){
   		var returnNode = "";
   		for (var i = 0; i<_data.length;i++) {
   			returnNode += '<div class="returnNode">'+
				'<div class="returnTitle">'+_data[i].returnTitle+'</div>'+
				'<div class="returnCarInfo">'+
					'<p>品牌：<span>'+_data[i].brand+'</span></p><p>车牌号：<span>'+_data[i].carLicence+'</span></p>'+
				'</div>'+
				'<div class="returnCarTime">'+
					'<p>部门：<span>'+_data[i].auditSummary+'</span></p><p class="transportTime">还车时间：<span class="returnTime">'+_data[i].returnTime+'</span></p>'+
				'</div>'+
			'</div>';
   		}
   		$(".returnNode").remove();
   		$(".returnInfo").append(returnNode);
   		$(".returnInfo>div:nth-child(odd)").addClass("rowBgColor");
   	};
}
function getAllMessage4(){
	var content = this;
	//违章信息
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=4",///handler/Index/MessageRemind.ashx
		xhrFields:{withCredentials:true},
		data:{'from':0},
		dataType:"json",
		success: function (data) {
			if(data.state=="success"){
				content.getBreakRule(data.breakRule);				
			}else if(data.state=="1"){
				alert("请重新登录");
				window.location.href="./login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	this.getBreakRule = function(_data){
   		var breakRuleNode = "";
   		for (var i=0;i<_data.length;i++) {
   			breakRuleNode +='<div class="breakRuleNode">'+
				'<div class="returnTitle">'+_data[i].breakRuleTitle+'</div>'+
				'<div class="returnCarInfo">'+
					'<p>车牌号：<span>'+_data[i].carLicence+'</span></p><p>违章原因：<span>'+_data[i].ruleReason+'</span></p>'+
				'</div>'+
				'<div class="returnCarTime">'+
					'<p>地点：<span>'+_data[i].breakRulePlace+'</span></p><p class="transportTime">违章时间：<span class="returnTime">'+_data[i].breakRuleTime+'</span></p>'+
				'</div>'+
			'</div>'
   		}
   		$(".breakRuleNode").remove();
   		$(".breakRuleInfo").html(breakRuleNode);
   		$(".breakRuleInfo>div:nth-child(odd)").addClass("rowBgColor");
   }	
}

