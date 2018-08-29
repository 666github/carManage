//$(document).ready(function() {
//	$('.cartitle').click(function(){
//		location.href = "oHome.html";
//	})
//});

//消息提醒
//	$.get('url',function(data){
//		var illegal=data.illegal;
//		var maturity=data.maturity;
//		var warning=data.warning;		
//		var warning=data.warning;
//		for(var i=0;i<illegal.length;i++){
//			$(".illegal1").append('<ul class="illegalInf clearfloat"><li class="illegal_num"><span>'+illegal[i].illegal_num+'</span></li>'
//			+'<li class="illegal_img"><img src="'+illegal[i].illegal_img+'"/></li><li class="illegal_inf">'
//			+'<ul class="illegal_infUl"><li class="illegal_infUl1"><span class="illegal_name">'+illegal[i].illegal_infUl11+'</span><span>'+illegal[i].illegal_infUl12+'</span></li>'
//			+'<li class="illegal_infUl2"><span>品牌：</span><span>'+illegal[i].illegal_infUl21+'</span></li><li class="illegal_infUl3"><span>车牌号：</span><span>'+illegal[i].illegal_infUl3+'</span></li>'
//			+'<li class="illegal_infUl4"><span>型号：</span><span>'+illegal[i].illegal_infUl4+'</span></li><li class="illegal_infUl5"><span>用车时间：</span><span>'+illegal[i].illegal_infUl51+'</span></li>'
//			+'</ul></li></ul>')					
//		}
//		for(var i=0;i<maturity.length;i++){
//			$(".maturity1").append('<ul class="maturityInf clearfloat"><li class="maturity_num"><span>'+maturity[i].maturity_num+'</span></li>'
//			+'<li class="maturity_inf1"><p><span class="brand1">'+maturity[i].maturity_inf11+'</span></p></li>'
//			+'<li class="maturity_inf2"><p class="maturity_inf21"><span>车牌号:</span><span>'+maturity[i].maturity_inf21+'</span></p><p class="maturity_inf22"><span>型号：</span><span>'+maturity[i].maturity_inf22+'</span></p></li>'						
//			+'<li class="maturity_inf3"><p class="maturity_inf31"><span>部门：</span><span>'+maturity[i].maturity_inf31+'</span></p><p class="maturity_inf32"><span>到期类型：</span><span class="maturity_type">'+maturity[i].maturity_inf32+'</span></p>'
//			+'</li></ul>')
//		}
//		for(var i=0;i<maintenance.length;i++){
//			$(".maintenance1").append('<ul class="maintenanceInf clearfloat"><li class="maintenance_num"><span>'+maintenance[i].maintenance_num+'</span></li>'
//			+'<li class="maintenance_inf1"><p><span class="brand1">'+maintenance[i].maintenance_inf11+'</span></p></li>'
//			+'<li class="maintenance_inf2"><p class="maintenance_inf21"><span>车牌号:</span><span>'+maintenance[i].maintenance_inf21+'</span></p><p class="maintenance_inf22"><span>型号：</span><span>'+maintenance[i].maintenance_inf22+'</span></p></li>'
//			+'<li class="maintenance_inf3"><p class="maintenance_inf31"><span>部门：</span><span>'+maintenance[i].maintenance_inf31+'</span></p><p class="maintenance_inf32"><span>维修申请人：</span><span>'+maintenance[i].maintenance_inf32+'</span></p>'
//			+'</li></ul>')
//		}
//		for(var i=0;i<warning.length;i++){
//			$(".warning1").append('<ul class="warningInf clearfloat"><li class="warning_num"><span>'+warning[i].warning_num+'</span></li>'
//			+'<li class="warning_inf1"><p class="warning_inf11"><span>您正在非法用车，非发用车类型为</span><span class="warning_reson">'+warning[i].warning_inf1+'</span></p></li>'
//			+'<p class="warning_inf12"><span>这是您这个月非法用车第</span><span class="warning_times">'+warning[i].warning_inf2+'</span><span>次</span></p><span class="warning_time">'+warning[i].warning_inf31+'</span>'
//			+'</li></ul>')
//		}																				
//	})