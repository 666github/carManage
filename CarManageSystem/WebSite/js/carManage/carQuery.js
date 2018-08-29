var g_carNumber;
$(function () {
    
	carquery();
    //车辆查询  
	function carquery(){
		var allBranch=$(".allBranch").val();
		var status=$(".status").val();	
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/CarManage/CarQuery/ViewCars.ashx",
			data:{"allBranch":allBranch,"status":status},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state=="success"){
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
					for(var i=0;i<car_inf.length;i++){
						arr_carImg.push(car_inf[i].carImg);
						arr_brand1.push(car_inf[i].brand1);
						arr_licence.push(car_inf[i].licence);
						arr_space.push(car_inf[i].space);
						arr_state.push(car_inf[i].state);
					}
					carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
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
	}
	//部门状态car查询
////  $(".allBranQuery").click(function () {
	$("#regBranch").change(function(){
        var allBranch = $('.allBranch').val();
        var status = $('.status').val();

		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/CarManage/CarQuery/ViewCars.ashx",
			data:{"allBranch":allBranch,"status":status},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state=="success"){
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
					for(var i=0;i<car_inf.length;i++){
						arr_carImg.push(car_inf[i].carImg);
						arr_brand1.push(car_inf[i].brand1);
						arr_licence.push(car_inf[i].licence);
						arr_space.push(car_inf[i].space);
						arr_state.push(car_inf[i].state);
					}
					$(".cars_Inf").html("");
					carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
				}
			}
		});		
	});
	$(".status").change(function(){
        var allBranch = $('.allBranch').val();
        var status = $('.status').val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/CarManage/CarQuery/ViewCars.ashx",
			data:{"allBranch":allBranch,"status":status},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state=="success"){
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
					for(var i=0;i<car_inf.length;i++){
						arr_carImg.push(car_inf[i].carImg);
						arr_brand1.push(car_inf[i].brand1);
						arr_licence.push(car_inf[i].licence);
						arr_space.push(car_inf[i].space);
						arr_state.push(car_inf[i].state);
					}
					$(".cars_Inf").html("");
					carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
				}
			}
		});		
	})
    function carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state){
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
					arr_state[i]="节假日不可用";
				}else if(arr_state[i]==5){
					arr_state[i]="申请维修保养中";
				}else{
					arr_state[i]="已预约";
				}
				$(".cars_Inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
				'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span></li>'+
				'<li class="licence"><span>车牌：</span><span class="carLicence">'+arr_licence[i]+'</span><span class="carSpace">'+arr_space[i]+'</span></li>'+
				'<li class="stateInf"><div class="carState">'+arr_state[i]+'</div><div class="details">详情>></div></li>'+
				'</ul>'));
	
			}	
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
//维修保养单子
	$(".maintQuery").click(function(){		
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var carLicence="";
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
				carLicence = $(this).parents('.carInf').find('.carLicence').text();
				carState=$(this).parents('.carInf').find('.carState').text();
			});
		}
		if(carState=="空闲"){
			$(".orderBgAdm").removeClass("hideBg");
		}else{alert("请选择空闲的车辆")}
			$(".quitSure #quit").hover(function(){
			$(".quitSure #quit").css('background','#4375f8');
			$(".quitSure #sure").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quit").css('background','#FFFFFF');
			$(".quitSure #sure").css('background','#4375f8');
		})
		$(".quitSure #quit").click(function(){
			$(".orderBgAdm").addClass("hideBg");
		});
		//维修单		
		$(".quitSure #sure").click(function(){		
			var resontextAdm=$(".infListAdm .resontextAdm").val();
			var maintAdm=$(".maintAdm");
			var ocheckVal="";		
			$.each(maintAdm, function() {
				if($(this)[0].checked){
					if($(this).val()=="维修"){
						ocheckVal="0";
					}else if($(this).val()=="保养"){
						ocheckVal="1";
					}else if($(this).val()=="年检"){
						ocheckVal="2";
					}else{
						ocheckVal="3";
					}	
				}
			});
			if(resontextAdm!=""){
				$.get("http://192.168.1.111:2238/handler/CarManage/CarQuery/DirectMaintain.ashx",{"carNumber":carLicence,"type":ocheckVal,"reson":resontextAdm},function(data){
					if(data.state=="success"){
						$(".orderBgAdm").addClass("hideBg");
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="/login.html"
					}else{
						alert(data.state);
					}					
				})
			}else{
				alert("请填写原因");
			}
		})
		
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
						
		});
		$.get("http://192.168.1.111:2238/handler/CarManage/CarQuery/ViewCars.ashx",{"carLicences":carLicences},function(data){
			if(data.state=="success"){
				if(confirm("确定删除？")){
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
					for(var i=0;i<car_inf.length;i++){
						arr_carImg.push(car_inf[i].carImg);
						arr_brand1.push(car_inf[i].brand1);
						arr_licence.push(car_inf[i].licence);
						arr_space.push(car_inf[i].space);
						arr_state.push(car_inf[i].state);
					}
					$(".cars_Inf").html("");
					
					carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
				}
			}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
			}else{
				alert(data.state);
			}
			
		});
    })

//	//车辆查询详情
	function details(){
        $(".details").click(function () {
            g_carNumber = $(this).parents('.carInf').find('.carLicence').text();
            $("#container").load("html/carManage/queryDetails.html");
			
		});
	}
////预约车辆弹框
//	function order(){
		var content = this;
		var node=this.node=$(".carInf");
		var orderState;
		node.find(".nowOrder").click(function(){
			orderState = this;
			var carLicence=$(this).parents(".carInf").find(".carLicence").text();
			if($(".carState").hasClass("haveOrder")){
			$(".orderBg").removeClass('hideBg');
				$(".orderInf").addClass("hideBg");
				$(".orderSee").removeClass("hideBg");
				$(".orderSee").addClass("animated flipInX");
				$(".orderBg .toSee").click(function(){
					$("#container").load('driverManagement/carManage/backCancel.html');
					$(".hcdj").trigger("click");
					$(".orderBg").addClass("hideBg");
					$(".orderSee").addClass("hideBg");
				})
				$("#sureClose").click(function(){
					$(".orderBg").addClass("hideBg");
					$(".orderSee").addClass("hideBg");
				})
			}else{
				$(".orderBg").removeClass('hideBg');
				$(".orderBg .orderInf").removeClass("hideBg");
				$(".orderBg .orderInf").addClass("animated bounceIn");
				$(".orderBg .orderSee").addClass("hideBg");
				$(".quitSure #quit").hover(function(){
					$(".quitSure #quit").css('background','#4375f8');
					$(".quitSure #sure").css('background','#FFFFFF');
				},function(){
					$(".quitSure #quit").css('background','#FFFFFF');
					$(".quitSure #sure").css('background','#4375f8');
				})
				$(".quitSure #quit").click(function(){
					$(".orderBg").addClass("hideBg");
				});
				$(".quitSure #sure").click(function(){
					var useTime=$(".infList #inpstart").val();
					var retrunTime=$(".infList #inpend").val();
					var purpose=$(".infList .branchs").val();
					var destination=$(".infList #destination").val();
					var resonText=$(".infList .resonText").val();
					var orderLengths=$(".infList .orderLength").val();
					for(var i=0;i<orderLengths.length;i++){
						if(orderLengths[i].length==0){alert("请填写未填信息");return;}
					}
					$.ajax({
						type:"get",
						url:"http://192.168.1.111:2238/handler/CarManage/CarQuery/BorrowCar.ashx",
						dataType:'json',
						async:true,
						data:{
						'carNumber':carLicence,
						'useCarTime':useTime,
						'expectReturnTime':retrunTime,
						'purpose':purpose,
						'destination':destination,
						'cause':resonText
						},
						success:function(data){
							if(data.state=="success"){
								$(".orderBg .orderInf").addClass("hideBg");					
								$(".orderBg .orderSee").removeClass("hideBg");
								$(".orderBg .orderSee").addClass("animated flipInX");
								$(".nowOrder").addClass("haveOrder");
								$(orderState).text("已预约");
								$(".orderBg .toSee").click(function(){
									$("#container").load("html/carManage/backCancel.html");
									$(".hcdj").trigger("click");
									$(".orderBg").addClass("hideBg");	
								})
								$(".orderSee #sureClose").click(function(){
								$(".orderBg").addClass("hideBg");
								})
							}else if(data.state=="1"){
									alert("请重新登录");
									location.href="login.html"
							}else{
								alert(data.state);
							}										
						},
						error:function(e1,e2,e3){				
							alert("预约失败！")
						}
					});		
				})
			}
						
		});
//	}
	
	$(".olook").click(function(){
		$("#container").load("html/carManage/backCancel.html");
	})
	
})