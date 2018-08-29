$(document).ready(function() {
    checkInfo("/handler/Statistics/ViewProperty.ashx");
});

//获取
function checkInfo(_url){
	var content = this;
	var department = $('.propertyBranch').val();
	$.ajax({
		type:"get",
		url:_url,
		data:{"department":department},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				$(".sumNum").text(data.sumNum);
				$(".carAmount").text(data.carAmount);			
				content.getCarsAssets(data.carsAssetsInfo);
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
	
	this.getCarsAssets = function (_data) {
		var carsAssetsNode = "";
		for (var i = 0; i < _data.length; i++) {

			carsAssetsNode += '<ul class="carInf"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
				'<li class="carImg"><img src="' + _data[i].carsImg + '"/></li>' +
				'<li class="brand"><span class="firBrand">' + _data[i].firstBrand + '</span></li>' +
				'<li class="license"><span class="carLicense">车牌：<span class="carLicence">' + _data[i].plateNum + '</span><span class="carSpace">' + _data[i].seat + '</span></li>' +
				'<li class="stateInf">价值：<span class="carMoney">' + _data[i].carMoney + '</span></li>' +
			'</ul>';
		}
		$('.cars_Inf').html(carsAssetsNode);
	}
}
$(".propertyBranch").change(function () {
    $(".cars_Inf").html("");
	checkInfo("/handler/Statistics/ViewProperty.ashx");
})				
		
				