var g_carNumber;
var accessed;
$(function () {
	getDepartment();
    //车辆查询  
   function getDepartment(){
   	$(".allBranch").removeClass("ohide");
		var option = $('#regBranch').html();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "../handler/GetDepartment.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
			success: function (data) {
	  			var obj = data;
	  			for (var i = 0; i < obj.length; i++) {
	      			option += '<option value="' + obj[i].Name + '">' + obj[i].Name + '</option>';
	 			}
				$('#regBranch').html(option);
				var currentBranch = $(".branchName").text();
				$("#regBranch").val(currentBranch);
				carquery();
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
	}
 
	function carquery(){		
		var allBranch=$(".allBranch").val();
		var status=$(".status").val();	
		$.ajax({
			type:"get",
			url:"../handler/CarManage/CarQuery/ViewCars.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"allBranch":allBranch,"status":status,from:0},
			dataType:"json",
			async:true,
			success:function(data){debugger
				if(data.state=="success"){
					accessed=data.accessed;
					$(".cars_Inf").html("");
					$(".sumNum").text(data.sumNum);
					$(".used").text(data.used);
					$(".unUsed").text(data.unUsed);
					var car_inf=data.car_inf;//
					var arr_carInf=[];
					var arr_carImg=[];
					var arr_brand1=[];
					var arr_licence=[];
					var arr_space=[];
					var arr_state=[];
					var arr_oilMass=[];
					var arr_site=[];
					var arr_lastperson=[];
					for(var i=0;i<car_inf.length;i++){
						arr_carImg.push(car_inf[i].carImg);
						arr_brand1.push(car_inf[i].brand1);
						arr_licence.push(car_inf[i].licence);
						arr_space.push(car_inf[i].space);
						arr_state.push(car_inf[i].state);
						arr_oilMass.push(car_inf[i].oilMass);
						arr_site.push(car_inf[i].site);
						arr_lastperson.push(car_inf[i].lastperson);
					}
					carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state,arr_oilMass,arr_site,arr_lastperson);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
				}else{
					alert(data.state);
				}
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		})
	}
	//部门状态car查询
	$("#regBranch").change(function(){
		carquery();	
	})
	$(".status").change(function(){
		carquery();	
	})
    function carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state,arr_oilMass,arr_site,arr_lastperson){
			for(var i=0;i<car_inf.length;i++){
				if(arr_state[i]==0){
					arr_state[i]="空闲";
				}else if(arr_state[i]==1){
					arr_state[i]="被预约";
				}else if(arr_state[i]==2){
					arr_state[i]="外出";
				}else if(arr_state[i]==3){
					arr_state[i]="维修保养";
				}else if(arr_state[i]==4){
					arr_state[i]="节假日";
				}else if(arr_state[i]==5){
					arr_state[i]="申请维修中";
				}else if(arr_state[i]==7){
					arr_state[i]="审核中";
					$(".orderTitle2").text("审核中").css("color","red");
					$(".tosee11").text("正在审批您预约车辆，点击");
					$(".tosee2").text("管理员审核通过后再使用车辆...");
				}else if(arr_state[i]==8){
					arr_state[i]="非法用车中";
				}else if(arr_state[i]==9){
					arr_state[i]="限号";
				}else{
					arr_state[i]="已预约";
					$(".orderTitle").text("预约成功").css("color","#000000");
					$(".tosee11").text("你已成功预约车辆，点击");
					$(".tosee2").text("你也可以在还车登记中查询");
				}
				$(".cars_Inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
				'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span><span class="carSpace">'+arr_space[i]+'</span></li>'+
				'<li class="licence"><span>车牌：</span><span class="carLicence">'+arr_licence[i]+'</span></li>'+
				'<li class="remaining">剩余油量：<span class="oilMass">'+arr_oilMass[i]+'</span></li>'+
				'<li class="parkingPlace">停车地点：<span class="site">'+arr_site[i]+'</span></li>'+	
				'<li class="lastDriver">上次使用：<span class="lastDriver">'+arr_lastperson[i]+'</span></li>'+
				'<li class="stateInf"><div class="carState">'+arr_state[i]+'</div><div class="details">详情>></div></li>'+
				'</ul>'));
	
			}	
			$(".carState").each(function(){
				if($(this).text().indexOf("外")==0 || $(this).text().indexOf("被")==0){
					$(this).parents(".carInf").css("border","solid 1px #ff22f2");
				}
				if($(this).text().indexOf("空")==0 || $(this).text().indexOf("申")==0){
					$(this).addClass("nowOrder");
					$(this).parents(".carInf").css("border","solid 1px #4275f8");
					if($(this).text().length==5){$(this).css("color","red");}
				}
				if($(this).text().indexOf("已")==0||$(this).text().indexOf("审")==0||$(this).text().indexOf("限")==0){
					$(this).addClass("nowOrder");
					$(this).addClass("haveOrder");
					$(this).css("color","red");
					$(this).parents(".carInf").css("border","solid 1px red");
				}
			})
			order();
			details();		
		}
//维修保养单子
var carLicenceWX="";
	$(".maintQuery").click(function(){		
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		
		var carState="";
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);					
			}
		};
		if(ocheck.length>1 || ocheck.length==0){
			alert("请选择可以预约的‘一辆’车");
			return;
		}else{		
			$.each(ocheck, function() {				
				carLicenceWX = $(this).parents('.carInf').find('.carLicence').text();
				carState=$(this).parents('.carInf').find('.carState').text();
			})
		}
		if(carState=="空闲"){
			$(".orderBgAdm").removeClass("hideBg");
		}else{alert("请选择空闲的车辆")}
			$(".quitSure #quitAdm").hover(function(){
			$(".quitSure #quitAdm").css('background','#4375f8');
			$(".quitSure #sureAdm").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quitAdm").css('background','#FFFFFF');
			$(".quitSure #sureAdm").css('background','#4375f8');
		})
		$(".quitSure #quitAdm").click(function(){
			$(".orderBgAdm").addClass("hideBg");
		})
		//维修单				
	})
	$(".quitSure #sureAdm").unbind("click").click(function(){		
			var resontextAdm=$(".infListAdm .resontextAdm").val();
			var maintAdm=$(".maintAdm");
			var ocheckVal="";		
			$.each(maintAdm, function() {
				if($(this)[0].checked){
					if($(this).val()=="维修"){
						ocheckVal="1";
					}else if($(this).val()=="保养"){
						ocheckVal="2";
					}else if($(this).val()=="年检"){
						ocheckVal="3";
					}else{
						ocheckVal="4";
					}	
				}
			});
			if(resontextAdm!=""){
				$.ajax({
					url:"../handler/CarManage/CarQuery/DirectMaintain.ashx",
					xhrFields: {withCredentials: true }, 
					data:{"carNumber":carLicenceWX,"type":ocheckVal,"reson":resontextAdm,from:0},
					dataType:"json",
					async:true,
					success:function(data){
						if(data.state=="success"){
							$(".orderBgAdm").addClass("hideBg");
							carquery();;
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
			}else{
				alert("请填写原因");
			}
		})
//删除信息
	$(".odel").click(function(){
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var carLicences=[];
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
			}
		};
		$.each(ocheck, function() {
			carLicences.push($(this).parent().siblings().find(".carLicence").text());		
			
		})
		var carArry={
			cars:carLicences
		}
		if(confirm("确定删除？")){
			$.ajax({
				url:"../handler/CarManage/DeleteCar.ashx",
				xhrFields: {withCredentials: true}, 
				data:{cars:JSON.stringify(carArry),from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						carquery();						
					}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
					}else{
						alert(data.state);
					}
				}
			});
		
		}
		
    })

//	//车辆查询详情
	function details(){
        $(".details").click(function () {
            g_carNumber = $(this).parents('.carInf').find('.carLicence').text();
            $("#container").load("html/borrowCar/borrowCarDetails.html");
			
		})
	}
//	var carLicence1;
//	var orderState;
	
	
////预约车辆弹框
	function order(){
		var content = this;
		var node=this.node=$(".carInf");		
		node.find(".nowOrder").bind("click",function(){
			$(".infList input").val("");//清空记录
			$(".infList textarea").val("");
//			var orderState = $(this);
			var orderState = this;
//			carLicence1=$(this).parents(".carInf").find(".carLicence").text();	debugger
			//有借车，再判断不是限号、节假日
//			if(accessed=="1"){debugger
//				$(".orderBg").removeClass('hideBg');
//				$(".orderInf").addClass("hideBg");
//				$(".orderSee").removeClass("hideBg");
//				$(".orderSee").addClass("animated flipInX");					
//			}else{
				$(".orderBg").removeClass('hideBg');
				$(".orderBg .orderInf").removeClass("hideBg");
				$(".orderBg .orderInf").addClass("animated bounceIn");
				$(".orderBg .orderSee").addClass("hideBg");	
				$(".quitSure #sureorder").unbind("click");				
				$(".quitSure #sureorder").bind("click",function(){debugger
					var carLicence1=$(orderState).parents(".carInf").find(".carLicence").text();
					var useTime=$(".infList #inpstart").val();
					var retrunTime=$(".infList #inpend").val();
					var purpose=$(".infList .branchs").val();
					var destination=$(".infList #destination").val();
					var resonText=$(".infList .resonText").val();
					var orderLengths=$(".infList .orderLength");
					var useTime1=useTime.replace(/[\s\-\:]*/g,"");
					var returnTime1=retrunTime.replace(/[\s\-\:]*/g,"");
					var useReturn=returnTime1 - useTime1;
//					console.log(useTime1,returnTime1,useReturn)
					if(useReturn<3000){alert("请选择合适的时分");return;}
					for(var i=0;i<orderLengths.length;i++){
						if(orderLengths[i].value.length==0 || purpose=="gray" ){alert("请填写未填信息");return;}
					}	
					$(".quitSure #sureorder").unbind("click");
					borrowCar();
					function borrowCar(){
						$.ajax({
							type:"get",
							url:"../handler/CarManage/CarQuery/BorrowCar.ashx",
							xhrFields: {withCredentials: true}, 
							dataType:'json',
							async:true,
							data:{
								'carNumber':carLicence1,
								'useCarTime':useTime,
								'expectReturnTime':retrunTime,
								'purpose':purpose,
								'destination':destination,
								'cause':resonText,
								from:0
								},
							success:function(data){debugger
								if(data.state=="success"){
									$(".orderBg .orderInf").addClass("hideBg");					
									$(".orderBg .orderSee").removeClass("hideBg");
									$(".orderBg .orderSee").addClass("animated flipInX");
//									$(".nowOrder").addClass("haveOrder");
									$(orderState).addClass("haveOrder");
									data.needAudit==0?$(orderState).text("已预约") : $(orderState).text("审核中");
			//						orderState.text("已预约");
									$(orderState).css("color","red");
									$(orderState).parents(".carInf").css("border","solid 1px red");
//									$("#sureorder").addClass("sureorder");
									if(data.needAudit==1){
										$(".orderTitle2").text("审核中").css("color","red");
										$(".tosee11").text("正在审批您预约车辆，点击");
										$(".tosee2").text("管理员审核通过后再使用车辆...");
									}else{
										$(".orderTitle").text("预约成功").css("color","#000000");
										$(".tosee11").text("你已成功预约车辆，点击");
										$(".tosee2").text("你也可以在还车登记中查询");
									}
//									localStorage.accessed="1";debugger
								}else if(data.state=="1"){
										alert("请重新登录");
										location.href="./login.html"
								}else{debugger
									alert(data.state);
									$(".orderBg").addClass("hideBg");
								}										
							},
							error:function(e1,e2,e3){				
								alert("预约失败！")
							}
						})
					}
				})
				$(".quitSure #quitorder").bind("click",function(){
					$(".orderBg").addClass("hideBg");
					$(".quitSure #quitorder").unbind("click");
				});
//			}
		})
	}						
		$(".orderBg .toSee").unbind("click").click(function(){
//			$("#container").load('html/returnCar/returnCar.html');
			$(".hc").trigger("click");
			$(".orderBg").addClass("hideBg");
			$(".orderSee").addClass("hideBg");
		})
		$("#sureClose").click(function(){
			$(".orderBg").addClass("hideBg");
			$(".orderSee").addClass("hideBg");
		})
	$(".quitSure #quitorder").hover(function(){
		$(".quitSure #quitorder").css('background','#4375f8');
		$(".quitSure #sureorder").css('background','#FFFFFF');
	},function(){
		$(".quitSure #quitorder").css('background','#FFFFFF');
		$(".quitSure #sureorder").css('background','#4375f8');
	})
	
//	$(".olook").click(function(){
//		$("#container").load("html/carManage/backCancel.html");
//	})
	
})