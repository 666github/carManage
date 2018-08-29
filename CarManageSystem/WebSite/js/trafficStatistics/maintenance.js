$(document).ready(function() {
//	checkInfo("/handler/Statistics/ViewCarsMaintain.ashx");
	checkInfo("/handler/Statistics/ViewCarsMaintain.ashx");
});

//获取
function checkInfo(_url){
	var content = this;
	var department = $('.mtBranch').val();
	var status="";
	var mtTime1=$("#mtTime1").val();
	var mtTime2 = $("#mtTime2").val();
	var status = $(".status").val();
	
	$.ajax({
		type:"get",
		url:_url,
		data: { "department": department, "status": status, "startDate": mtTime1, "endDate": mtTime2 },
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				$(".maintenanceCosts").text(data.maintenanceCosts);
				$(".serviceCosts").text(data.serviceCosts);
				$(".maintenanceCount").text(data.maintenanceCount);				
				content.getMaintenance(data.maintenanceInfo);
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
	
	this.getMaintenance = function(_data){
		var maintenanceNode = "";
		for (var i = 0; i<_data.length;i++) {
			maintenanceNode += '<ul class="carInfo">'+
				'<li class="carsImg"><img src="' + _data[i].carImg + '"/></li>' +
				'<li class="brands"><span class="firstBrand">'+_data[i].firstBrand+'</span></li>'+
				'<li class="license"><span class="carLicense">车牌：<span class="plateNum">' + _data[i].licence + '</span></span><span class="seat">' + _data[i].seat + '</span></li>' +
				'<li class="stateInf"><div class="tripMile"><span class="miles">'+_data[i].price+'</span>元</div><div class="tripCount"><span class="count">'+_data[i].count+'</span>次</div></li>'+
			'</ul>';
		}
//		document.getElementById("driverInfo").innerHTML = maintenanceNode;
		$(".driversInfo").html(maintenanceNode)
	}
	
}
$(".oquery").click(function() {
	$("#driverInfo").html("");
//	checkInfo("/handler/Statistics/ViewCarsMaintain.ashx");

checkInfo("/handler/Statistics/ViewCarsMaintain.ashx")
})
