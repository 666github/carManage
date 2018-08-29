$(document).ready(function() {
//	checkInfo("/handler/Statistics/ViewCarsMileage.ashx");
checkInfo("/handler/Statistics/ViewCarsMileage.ashx");
});

//获取
function checkInfo(_url){
	var content = this;
	var department = $('.mileBranch').val();
	var mileTime1=$("#mileTime1").val();
	var mileTime2=$("#mileTime2").val();
	$.ajax({
		type:"get",
		url:_url,
		data:{"department":department,"startDate":mileTime1,"endDate":mileTime2},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				$(".totalNum").text(data.totalNum);
				$(".mileNum").text(data.mileNum);
				$(".travelNum").text(data.travelNum);
				content.getMileage(data.mileageInfo);
				//debugger
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	
	this.getMileage = function(_data){
		var mileageNode = "";
		for (var i = 0; i<_data.length;i++) {
			mileageNode += '<ul class="carInfo">'+
				'<li class="carsImg"><img src="'+_data[i].carsImg+'"/></li>'+
				'<li class="brands"><span class="firstBrand">'+_data[i].firstBrand+'</span></li>'+
				'<li class="license"><span class="carLicense">车牌：<span class="plateNum">'+_data[i].plateNum+'</span></span><span class="seat">'+_data[i].seat+'</span></li>'+
				'<li class="stateInf"><div class="tripMile"><span class="miles">'+_data[i].miles+'</span>公里</div><div class="tripCount"><span class="count">'+_data[i].count+'</span>次</div></li>'+
			'</ul>';
		}
		document.getElementById("carinfo").innerHTML = mileageNode;
	}
	
}
$(".oquery").click(function() {
	$("#carinfo").html("");
	checkInfo("/handler/Statistics/ViewCarsMileage.ashx");
})
