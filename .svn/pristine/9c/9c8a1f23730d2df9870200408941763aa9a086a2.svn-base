$(function () {
//  lcarNumber = localStorage.getItem('carNumber');
    $.ajax({
        type: "get",
        url: "http://192.168.1.120:2238/handler/CarManage/CarQuery/GetCarDetails.ashx",
        xhrFields: {withCredentials: true }, 
        dataType: "json",
        data: { 'carNumber': g_carNumber,from:0 },
        success: function (data) {
            if (data.state=="success") {debugger
                //车辆信息详情               
                var carInf_det = data.carInf_det;
                $(".topBranch").text(carInf_det.topBranch);
                $(".img1").attr("src", carInf_det.imgSrc);
                $(".firBrandDet").val(carInf_det.firBrandDet);
                $(".licenceDet").text(carInf_det.licenceDet);
                $(".buydayDet").val(carInf_det.buydayDet);
                $(".modelDet").val(carInf_det.modelDet);
                $(".typeDet").val(carInf_det.typeDet);
                $("#safeStart").val(carInf_det.safeStartDet);
                $("#safeEnd").val(carInf_det.safeEndDet);
                $(".enginDet").val(carInf_det.enginDet);
                $(".priceDet").val(carInf_det.priceDet);
                $(".annualStartDet").val(carInf_det.annualStartDet);
                $(".annuaEndDet").val(carInf_det.annuaEndDet);
                $(".mileDet").text(carInf_det.mileDet);
                $(".outnumDet").text(carInf_det.outnumDet);
                if(carInf_det.mtMileOrdate=="按里程保养"){
                	$("#mtStartDet,#mtEndDet,#mtMile").toggle();
					$(".maintan_det span:last-of-type").toggle();
					$(".maintan_det span:first-of-type").text("下次保养里程(km):");
					$("#mtMile").val(carInf_det.mtMile);
                }else{
                	$(".mtStartDet").val(carInf_det.mtStartDet);
                	$(".mtEndDet").val(carInf_det.mtEndDet);
                }             
                $(".mtMoneyDet").text(carInf_det.mtMoneyDet == "" ? 0 : carInf_det.mtMoneyDet);
                $(".mtNumDet").text(carInf_det.mtNumDet);
                //状态信息	
                var state_det = data.state_det;
                var stateStr="";
                var randomColor = function() {
				    return "rgb(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 100) + "," + parseInt(Math.random() * 100) + ")";
				}
                if(state_det.length==0){$(".state_det").addClass("hide")}else{$(".state_det").removeClass("hide")}
                $.each(state_det, function(index,obj) {
                	stateStr+='<ul class="currentInf" style="color:'+randomColor()+'">'+
						'<li><span class="statePerson">预约人：</span><span class="currName">'+obj.currName+'</span></li>'+
						'<li>部门：<span class="currBranch">'+obj.currBranch+'</span></li>'+
						'<li>用车时间：<span class="currUsed">'+obj.currUsed+'</span></li>'+
						'<li>还车时间：<span class="currBack">'+obj.currBack+'</span></li>'+
						'<li>目的地：<span class="currDestination">'+obj.currDestination+'</span></li>'+
						'<li>用途：<span class="currEffect"></span>'+obj.currEffect+'</li>'+
					'</ul>'
                });
                $(".state_det").append(stateStr);
            } else if (data.state == "1") {
                alert("请重新登录");
                location.href = "./login.html"
            } else {
                alert(data.state);
            }
        },
        error: function () {
            alert('暂无详情可查看！')
        }
    });

		$(".back_title").click(function(){
			$("#container").load("html/borrowCar/borrowCar.html");
		});
})