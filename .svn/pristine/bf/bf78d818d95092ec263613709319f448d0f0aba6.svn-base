/*
 *车辆统计
 */
$(function(){
	
	//左侧列表样式变化
	function setCss(_this){
		//_this.parents('.lists').css('color','gray');
		$(".secList li").css('color','gray')
		_this.css('color','blue');
		$(".secList").css('display','none');
		_this.parent().css('display','block');
	}
	
	$(".cllc").click(function(){
		$("#container").load('html/trafficStatistics/mileage.html');
		setCss($(this));		
	})
	$(".sjtj").click(function(){
		$("#container").load('html/trafficStatistics/drivers.html');
		setCss($(this));		
	})
	$(".clwxby").click(function(){
		$("#container").load('html/trafficStatistics/maintenance.html');
		setCss($(this));		
	})
	$(".assets").click(function(){
		$("#container").load('html/trafficStatistics/carsAssets.html');
		setCss($(this));		
	})
	
})