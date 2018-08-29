//
$(document).ready(function(){
	
	
	getDepartment()
	
	//getCarsInfo();
	
	odelSearch();
	
	details();
});

function getDepartment(){
	var option = $('#regBranch').html().trim();
	$.ajax({
  		type: "post",
  		url: "../handler/GetDepartment.ashx",
		dataType: "json",
		xhrFields:{withCredentials:true},
		success: function (data) {
//			debugger
  			var obj = data;
  			for (var i = 0; i < obj.length; i++) {
      			option += '<option value="' + obj[i].Name + '">' + obj[i].Name + '</option>';
 			}
			$('#regBranch').html(option);
			var currentBranch = $(".branchName").text();
			$("#regBranch").val(currentBranch);
			getCarsInfo();
		},
		error: function () {
  			console.log("部门获取失败");
  		}
	})
	
}

//加载车辆信息
function getCarsInfo(){
	
	
	var allBranch = $(".allBranch").val();
	var status = $(".status").val();
	//console.log(allBranch+"/"+status);
	$.ajax({
		type:"get",
		url: "../handler/CarManage/CarQuery/ViewCars.ashx",
		data:{"allBranch":allBranch,"status":status,"from":0},
		xhrFields:{withCredentials:true},
		dataType:"json",
		success:function(data){
//			debugger
			if(data.state=="success"){
				var car_inf=data.car_inf;
				var arr_carInf=[];
				var arr_carImg=[];
				var arr_brand1=[];
				var arr_licence=[];
				var arr_space=[];
				var arr_state=[];
				for(var i=0;i<car_inf.length;i++){
					arr_carImg.push(car_inf[i].carImg);
					arr_brand1.push(car_inf[i].brand1);
					arr_licence.push(car_inf[i].licence);
					arr_space.push(car_inf[i].space);
					arr_state.push(car_inf[i].state);
				}
				carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
				$(".sumNum").text(data.sumNum);
				$(".used").text(data.used);
				$(".unUsed").text(data.unUsed);
			}else if(data.state=="1"){
				alert("请重新登录");
				parent.location.href="login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	
}
//改变部门 状态
function odelSearch(){	
	$("#regBranch").change(function(){
		getCarsInfo();
	})
	$(".status").change(function(){
		getCarsInfo();
	})
}

//返回车辆信息
function carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state){
	var carInfo = "";
	for(var i=0;i<car_inf.length;i++){
		if(arr_state[i]==0){
			arr_state[i]="空闲";
		}else if(arr_state[i]==1){
			arr_state[i]="被预约";
		}else if(arr_state[i]==2){
			arr_state[i]="外出";
		}else if(arr_state[i]==6){
			arr_state[i]="已预约";
		}else{
			arr_state[i]="不可用";
		}
		carInfo += '<ul class="carInf">'+
			'<li class="choice"><input type="checkbox" name="" id="delinput" value=""  class="ocheck" /></li>'+
			'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li>'+
			'<li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span><span class="secBrand"></span><span class="carSpace">'+arr_space[i]+'</span></li>'+
			'<li class="licence">车牌：<span class="carLicence">'+arr_licence[i]+'</span></li>'+
			'<li class="remaining">剩余油量：<span class="oilMass">70%</span></li>'+
			'<li class="parkingPlace">停车地点：<span class="site">北一楼前</span></li>'+
			'<li><div class="carState">'+arr_state[i]+'</div><div class="details">详情>></div></li>'+
		'</ul>';
	}
	$(".carInf").remove();
	$("#car_inf").append(carInfo);
	$(".carState").each(function(){
		if($(this).text().indexOf("空")==0){
			$(this).addClass("nowOrder");
		}
		if($(this).text().indexOf("已")==0){
			$(this).addClass("nowOrder");
			$(this).addClass("haveOrder");
		}
	});
	order();
	details();
}



//预约车辆弹框
function order(){
	var content = this;
	var node=this.node=$(".carInf");
	var orderState;
	node.find(".nowOrder").click(function(){
		orderState = this;
//		var carLicence=$(this).parent().prev().find(".carLicence").text();
		var carLicence=$(this).parents(".carInf").find(".carLicence").text();
		//console.log(carLicence);
		if($(".carState").hasClass("haveOrder")){
			$(".orderBg").removeClass('hideBg');
			$(".orderInf").addClass("hideBg");
			$(".orderSee").removeClass("hideBg");
			$(".orderSee").addClass("animated flipInX");
			$(".orderBg .toSee").click(function(){
				$("#container").load('driverManagement/carsManage/returnCar.html');				
				$(".ycsq_dri").trigger('click');				
				$(".orderBg").addClass("hideBg");
				$(".orderSee").addClass("hideBg");
			})
			$("#sureClose").click(function(){
				$(".orderBg").addClass("hideBg");
				$(".orderSee").addClass("hideBg");
			})
		}else{
			$(".orderBg").removeClass('hideBg');
			$(".orderInf").removeClass("hideBg");
			$("#quit").hover(function(){
				$("#quit").css('background','#4375f8');
				$("#orderSure").css('background','#FFFFFF');
			},function(){
				$("#quit").css('background','#FFFFFF');
				$("#orderSure").css('background','#4375f8');
			})
			$("#quit").click(function(){
				$(".orderBg").addClass("hideBg");
			});
			$("#orderSure").unbind("click").click(function(){
				var useTime=$("#inpstart").val();
				var retrunTime=$("#inpend").val();
				var branchs=$(".branchs").val();
				var destination=$("#destination").val();
				var resonText=$(".resonText").val();
				var olengths=$(".olength");
				for(var i=0;i<olengths.length;i++){
					if(olengths[i].value.length==0){
						alert("有未填写信息");
						return;
					}
				}
//				if(resonText.length!=0){debugger
					$.ajax({
						type:"get",
						url:"../handler/CarManage/CarQuery/BorrowCar.ashx",
						xhrFields:{withCredentials:true},
						dataType:'json',
						data:{
							'carNumber':carLicence,
							'useCarTime':useTime,
							'expectReturnTime':retrunTime,
							'purpose':branchs,
							'destination':destination,
							'cause':resonText,
							'from':0
						},
						success:function(data){
							if(data.state=="success"){
								
								$(".orderInf").addClass("hideBg");
								$(".orderSee").removeClass("hideBg");
								$(".orderSee").addClass("animated flipInX");
								$(orderState).addClass("haveOrder");
								$(orderState).text("已预约");
								$(".orderBg .toSee").click(function(){
									$("#container").load('driverManagement/carsManage/returnCar.html');
									
									$(".ycsq_dri").trigger('click');
									
									$(".orderBg").addClass("hideBg");
									$(".orderSee").addClass("hideBg");
								})
							}else if(data.state=="1"){
									alert("请重新登录");
									parent.location.href="login.html"
							}else{
								alert(data.state);
							}
						},error:function(e1,e2,e3){				
							alert("预约失败！")
						}
					})
//				}else{
//					alert('填写信息');
//					return;
//				}
			});
			$("#sureClose").click(function(){
				$(".orderBg").addClass("hideBg");
				$(".orderSee").addClass("hideBg");
			})
		}
	})
	

}

//点击详情
var carNumber;
function details(){
	$(".details").click(function(){
		carNumber = $(this).parent().prevAll().find(".carLicence").text();
		$("#container").load('driverManagement/carsManage/carDetails.html');
		//debugger;
	});
}

