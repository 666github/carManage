var g_carNumber;
$(function () {
	getDepartment();
    //车辆查询  
   function getDepartment(){
   	$(".allBranch").removeClass("ohide");
		var option = $('#regBranch').html().trim();
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
				if(userType==1){
					$('#regBranch').attr("disabled","disabled");
				}
				carquery();
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		});
		
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
			success:function(data){
				if(data.state=="success"){
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
		})
	}
	//部门状态car查询
	$("#regBranch").change(function(){
        var allBranch = $('.allBranch').val();
        var status = $('.status').val();
		$.ajax({
			type:"get",
			url:"../handler/CarManage/CarQuery/ViewCars.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"allBranch":allBranch,"status":status,from:0},
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
		})	
	})
	$(".status").change(function(){
        var allBranch = $('.allBranch').val();
        var status = $('.status').val();
		$.ajax({
			type:"get",
			url:"../handler/CarManage/CarQuery/ViewCars.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"allBranch":allBranch,"status":status,from:0},
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
		})	
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
				'<li class="stateInf"><div class="carStatenone" style="display:none;">'+arr_state[i]+'</div><div class="details" style="width:100%;">详情>></div></li>'+
				'</ul>'));
	
			}	
//			$(".carState").each(function(){
//				if($(this).text().indexOf("空")==0){
//					$(this).addClass("nowOrder");
//				}
//				if($(this).text().indexOf("已")==0){
//					$(this).addClass("nowOrder");
//					$(this).addClass("haveOrder");
//				}
//			})
//			order();
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
				$.ajax({
					url:"../handler/CarManage/CarQuery/DirectMaintain.ashx",
					xhrFields: {withCredentials: true }, 
					data:{"carNumber":carLicenceWX,"type":ocheckVal,"reson":resontextAdm,from:0},
					dataType:"json",
					async:true,
					success:function(data){
						if(data.state=="success"){
							$(".orderBgAdm").addClass("hideBg");
							carquery();
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
            $("#container").load("html/carManage/infChangeDetails.html");
			
		})
	}

	$(".olook").click(function(){
//		$("#container").load("html/returnCar/returnCar.html");
		$(".hc").trigger("click");
	})
	
})