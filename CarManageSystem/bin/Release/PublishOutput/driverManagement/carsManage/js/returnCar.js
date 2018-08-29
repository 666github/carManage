$(document).ready(function(){
	
	getBorrowCar();
})

//加载预约信息
function getBorrowCar(){
	$.ajax({
		type:"get",
		url: "../handler/PersonalCenter/Reservation/ViewBorrowCar.ashx",
		xhrFields:{withCredentials:true},
		data:{"from":0},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.state="success"){
				
				$('.stateCarInfo').remove();
			    var car_inf = data.car_inf;
				debugger
				var stateCarInfo = "";
				for(var i=0;i<car_inf.length;i++){
				    if (car_inf[i].state == 0) {
				        car_inf[i].state = "取消预约";
						
				    } else if (car_inf[i].state == 1) {
				        car_inf[i].state = "取消预约";
						
				    } else if (car_inf[i].state == 2) {
				        car_inf[i].state = "马上还车";
				    } else if (car_inf[i].state == -1) {
				        car_inf[i].state = "已取消";

				    } else {
				        car_inf[i].state = "已还车";
				    }
				    stateCarInfo = '<ul class="stateCarInfo clearfloat"><li class="inftitle" id="inftitle"><span class="unique" style="display:none;">'+car_inf[i].uniqueCode+'</span><span class="firBrand">'+car_inf[i].brand1+'</span></li>'+
						'<li class="infOne"><p><span class="licence1">车牌号：</span><span class="licence2">'+car_inf[i].licence+'</span></p><p><span class="model1">核载人数：</span><span class="model2">'+car_inf[i].model+'</span></p></li>'+
						'<li class="infTwo"><p><span class="usetime1">用车时间：</span><span class="usetime2">'+car_inf[i].usetime+'</span></p><p><span class="returntime1">还车时间：</span><span class="returntime2">'+car_inf[i].returntime+'</span></p></li>'+
						'<li class="infThree"><p><span class="destination1">目的地：</span><span class="destination2">'+car_inf[i].destination+'</span></p><p><span class="effect1">用途：</span><span class="effect2">'+car_inf[i].effect+'</span></p></li>'+
						'<li class="infFour"><p><span class="ordertime1">预约车时间：</span><span class="ordertime2">'+car_inf[i].ordertime+'</span></p></li>'+
						'<li class="infState" id="infState"><p><span class="returnBtn">' + car_inf[i].state + '</span></p><p><span class="infstate2"></span></p></li>'
					+'</ul>'
					$("#infOrdercar").append(stateCarInfo);
				}
				$(".returnBtn").each(function(){
					if($(this).text().indexOf("取")==0){
						$(this).addClass("infstate1");
					}
					if($(this).text().indexOf("马")==0){
						$(this).addClass("stateBack");
					}
					if ($(this).text().indexOf("已") == 0 || $(this).text().indexOf("已") == 0) {
						$(this).addClass("infstate3");
					}
				});
				
				cancelBorrow();
				returnCar();
					
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="login.html"
			}else{
				alert(data.state);
			}						
		}
	});
}

//取消预约
function cancelBorrow(){
	var node = $(".stateCarInfo");
	node.find(".infstate1").click(function(){
	    var id = $(this).parent().parent().parent().find(".unique").text();
        debugger
		$.ajax({
			type:"get",
			url:"../handler/PersonalCenter/Reservation/CancelBorrow.ashx",
			xhrFields:{withCredentials:true},
			dataType:'json',
			data:{
				'uniqueCode':id,
				 "from":0
			},
			success:function(data){
			    if (data.state == "success") {
			        alert('取消成功');

			        getBorrowCar();
			    }
			},
			error:function(){				
				alert("请求失败！");
			}
		});
	})
}

//还车
function returnCar(){
	var node = $(".stateCarInfo");
	node.find(".stateBack").click(function(){
	    var id = $(this).parent().parent().parent().find(".unique").text();
	    var now = (new Date()).toLocaleString();
        
	    $("#retruntime").val(now);
		if($(".returnBtn").hasClass("stateBack")){
			$(".orderBg1").removeClass("hideBg");
			
			$(".maintainYN input").click(function(){
				if($(this).val()=="否"){
					$(".maintaintext").val('暂无维修保养');
					console.log($(".maintaintext").val())
				}
			});
			
			
			$("#returnQuit").hover(function(){
				$("#returnQuit").css('background','#4375f8');
				$("#returnSure").css('background','#FFFFFF');
			},function(){
				$("#returnQuit").css('background','#FFFFFF');
				$("#returnSure").css('background','#4375f8');
			})
			
			$("#returnQuit").click(function(){
				$(".orderBg1").addClass("hideBg");
			});
			
			$(".instituteYN").change(function(){
				if($(".instituteYN").val() == "院外"){
					$(".textarea1").attr("readonly","readonly");
				}
			})
			
			$("#returnSure").unbind("click").click(function(){
			    debugger
			    var maintainYN = $(":radio:checked").val();
				var carMile=$(".infList1 #carMile").val();
				var retrunTime=$("#retruntime").val();
				var instituteYN = $(".instituteYN").val();
				var gasL = $(".gasL").val();
				var maintainText=$(".maintaintext").val();
				var resonText=$(".resontext").val();
				var olengths = $(".infList1 .resontext").val();
				if(olengths.length!=0){
					$.ajax({
						type:"get",
						url:"../handler/PersonalCenter/Reservation/ReturnCar.ashx",
						xhrFields:{withCredentials:true},
						dataType:'json',
						data:{
							'travMileage':carMile,
							'retrunTime':retrunTime,
							"returnAtOut":instituteYN,					
							"gasL":gasL,
							'carRepairDetail':maintainText,					
							"carRepair":maintainYN,
							'returnDetail':resonText,
							"uniqueCode":id,
							 "from":0
						},
						success: function (data) {
                            debugger
							$(".orderBg1").addClass("hideBg");
							$(".stateBack").text("已还车");
							$(".stateBack").removeClass("stateBack").addClass("infstate3");
						},
						error: function () {
                            debugger
							alert("还车失败！");
						}
					})	
				}
				else{alert('填写信息');return;}
			})
		}
	})

}
function checkradio() {
    var item = $(":radio:checked");
    var len = item.length;
    if (len > 0) {
        alert("yes--选中的值为：" + $(":radio:checked").val());
    }
}