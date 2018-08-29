$(document).ready(function() {
	checkInfo("/handler/Statistics/ViewDriverStatistics.ashx");
//checkInfo("data/driversTask.json")
});

//获取
function checkInfo(_url){
	var content = this;
	var department = $('.allBranch option:selected').val();
	var driTime1=$("#driTime1").val();
	var driTime2=$("#driTime2").val();
	$.ajax({
		type:"get",
		url:_url,
		data:{"department":department,"startDate":driTime1,"endDate":driTime2},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				$(".partTimeDriCount").text(data.partTimeDriCount);
				$(".fullTimeDriCount").text(data.fullTimeDriCount);
				$(".c1Count").text(data.c1Count);
				$(".c2Count").text(data.c2Count);
				content.getDrivers(data.driversInfo);
				//debugger
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="/login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	
	this.getDrivers = function(_data){
		var driversNode = "";
		for (var i = 0; i<_data.length;i++) {
			driversNode += '<ul class="driverInfo">'+
				'<li class="driverIcon"><div class="icon"><img class="" src="'+_data[i].driverImg+'"/></div><div class="iconInfo"><p>'+_data[i].driverName+'</p><p>'+_data[i].driverBranch+'</p></div></li>'+
				'<li class="driveingInfo"><span class="driverType">司机类型 : <span class="driverTypeInfo">'+_data[i].driverType+'</span></span>'+
				'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo">'+_data[i].driverLicenseInfo+'</span></span>'+
				'<span class="driverNum">驾驶次数 : <span class="driverNumInfo">'+_data[i].driverNumInfo+'</span></span><span class="illegalNum">违章次数 : <span class="illegalNumInfo">'+_data[i].illegalNumInfo+'</span></span></li>'+				
				'<li class="driverMileage">行驶里程 ：<span class="milesNum">'+_data[i].milesNum+'</span></li>'+
			'</ul>';
		}
//		document.getElementById("driverInfo").innerHTML = driversNode;
		$(".driversInfo").html(driversNode);
	}
	
}
$(".oquery").click(function() {
	$("#driverInfo").html("");
	checkInfo("/handler/Statistics/ViewDriverStatistics.ashx");
//	checkInfo("data/driversTask.json")
})
					
							
							
							
				