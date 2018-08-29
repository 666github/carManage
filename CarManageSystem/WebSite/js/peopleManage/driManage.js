
$(function(){
	driverTask("data/查看司机.json");
	driApprove1();
	driApprove2();
	//请求司机信息
	function driverTask(_url){	
		var regBranch=$("#regBranch").val();
		var status=$(".status").val();
		$.ajax({
			type:"get",
			url:_url,
			data:{"regBranch":regBranch,"status":status},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".carsCount").text(data.driversTotal);
					addNode(data.driversInfo);
				}
				details();
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		});				 
	}
	function addNode(_data){
		var driver = '';
		for(var i=0;i<_data.length;i++){
			if(_data[i].driverState==0){
				_data[i].driverState="预约";
			}else if(_data[i].driverState==1){
				_data[i].driverState="已预约";
			}else if(_data[i].driverState==2){
				_data[i].driverState="外出";
			}else{
				_data[i].driverState="不可用";
			}
			//设置基本信息值			
			driver += '<ul class="driverInfo">'+
				'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheck"></li>'+
				'<li class="driverIcon">'+
					'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
					'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="departMent" datatype="departMent">'+_data[i].departMent+'</p></div>'+
				'</li>'+
				'<li class="driveingInfo">'+
					'<p><span class="driverType">司机类型 : <span class="driverTypeInfo" datatype="typeInfo">'+_data[i].typeInfo+'</span></span>'+
					'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo" datatype="licenseInfo">'+_data[i].licenseInfo+'</span></span></p>'+
					'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
					'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
				'</li>'+
				'<li class="driverState"><span class="free" datatype="driverState">'+_data[i].driverState+'</span><span class="details">详情>></span></li>'+
			'</ul>';
		};
		$('.driverInfos').append(driver);
	}
	//查询
//	$(".driQuery").click(function(){
//		var allBranch=$(".allBranch").val();
//		var status=$(".status").val();
//		$(".driverInfos").html("");
//		driverTask("data/查看司机.json",{"allBranch":allBranch,"status":status});
//	})
	$("#regBranch").change(function(){
		var allBranch=$(".allBranch").val();
		var status=$(".status").val();
		$(".driverInfos").html("");
		driverTask("data/查看司机.json",{"allBranch":allBranch,"status":status});
	});
	$(".status").change(function(){
		var allBranch=$(".allBranch").val();
		var status=$(".status").val();
		$(".driverInfos").html("");
		driverTask("data/查看司机.json",{"allBranch":allBranch,"status":status});
	})
	//删除
	$(".driDel").click(function(){
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var nameDel=[];
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
			}
		};		
		$.each(ocheck, function() {
			nameDel.push($(this).parents(".driverInfo").find(".driverName").text());		
		});
		if(confirm("确定删除？")){	
			$.each(ocheck, function() {		
				$(this).parents('.driverInfo').remove();											
			});
			debugger
			delDri();
		}
		function delDri(){
			$.get("data/查看司机.json",{"nameDel":nameDel},function(data){
				if(data.state=="success"){	
					$(".driverInfos").html("");
					addNode(data.driversInfo)
				}else if(data.state=="1"){
						alert("请重新登录");
						parent.location.href="/login.html"
				}else{
					alert(data.state);
				}
			});
		}
	});
	function details(){
		$(".details").click(function(){
			$("#container").load("html/peopleManage/driManageDetail.html");
		})
	}
	//审批司机
	$(".driApprove").click(function(){
		$(this).css("background","lightgray");
		$(".driLook").css("background","#FFFFFF");
	});
	$(".driLook").click(function(){
		$(this).css("background","lightgray");
		$(".driApprove").css("background","#FFFFFF");
	});
	function driApprove1(){
		$.ajax({
			type:"get",
			url:"data/审批司机待审核.json",
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".driApprove1").html("");
					$(".carsCount").text(data.driversTotal);
					addNode1(data.driversInfo);
				}
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		});
		
		 function addNode1(_data){
			var driver = '';
			for(var i=0;i<_data.length;i++){				
				//设置基本信息值			
				driver += '<ul class="driverInfo">'+
					'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheckY"></li>'+
					'<li class="driverIcon">'+
						'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
						'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="departMent" datatype="departMent">'+_data[i].departMent+'</p></div>'+
					'</li>'+
					'<li class="driveingInfo">'+
						'<p><span class="driverType">司机类型 : <span class="driverTypeInfo" datatype="typeInfo">'+_data[i].typeInfo+'</span></span>'+
						'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo" datatype="licenseInfo">'+_data[i].licenseInfo+'</span></span></p>'+
						'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
						'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
					'</li>'+
					'<li class="driDate"><span class="details">有效日期:</span><span class="effectDate">'+_data[i].effectDate+'</span></li>'+
				'</ul>';
			};
			$('.driApprove1').append(driver);
		}
	}
	function driApprove2(){
		$.ajax({
			type:"get",
			url:"data/审批司机未通过.json",
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".driApprove2").html("");
					$(".carsCount").text(data.driversTotal);
					addNode2(data.driversInfo);
				}
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		});
		
	    function addNode2(_data){
			var driver = '';
			for(var i=0;i<_data.length;i++){				
				//设置基本信息值			
				driver += '<ul class="driverInfo">'+
					'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheckN"></li>'+
					'<li class="driverIcon">'+
						'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
						'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="noPass" datatype="departMent">未通过</p></div>'+
					'</li>'+
					'<li class="driveingInfo">'+
						'<p><span class="driverType">司机类型 : <span class="driverTypeInfo" datatype="typeInfo">'+_data[i].typeInfo+'</span></span>'+
						'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo" datatype="licenseInfo">'+_data[i].licenseInfo+'</span></span></p>'+
						'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
						'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
					'</li>'+
					'<li class="driDate"><span class="details">有效日期:</span><span class="effectDate">'+_data[i].effectDate+'</span></li>'+
				'</ul>';
			};
			$('.driApprove2').append(driver);
		}
	}
	$(".approve1").click(function(){
		$(this).addClass("approveCss");
		$(".approve2").removeClass("approveCss");
		$(".driApprove1").removeClass("ohide");
		$(".driApprove2").addClass("ohide");
		$(".approveP2").removeClass("ohide");
	});
	$(".approve2").click(function(){
		$(this).addClass("approveCss");
		$(".approve1").removeClass("approveCss");
		$(".driApprove2").removeClass("ohide");
		$(".driApprove1").addClass("ohide");
		$(".approveP2").addClass("ohide");
	});
	
//同意与拒绝
	$(".oYes").click(function(){
		var ochecksY = document.getElementsByClassName("ocheckY");
		var ocheckY = [];
		var nameY=[];
		for (var i = 0; i < ochecksY.length; i++) {
			if(ochecksY[i].checked){
				ocheckY.push(ochecksY[i]);
			}
		};
		$.each(ocheckY, function() {
			nameY.push($(this).parents(".driverInfo").find(".driverName").text());	
		});
		if(confirm("确定同意？")){						
			$.get("data/查看司机.json",{"nameY":nameY},function(data){
				var _data=data.driversInfo;
				if(data.state=="success"){
					$.each(ocheckY, function() {	
						$(this).parents('.driverInfo').remove();
					});
					$('.driverInfos').html('');
					var driver = '';
					for(var i=0;i<_data.length;i++){
						if(_data[i].driverState==0){
							_data[i].driverState="预约";
						}else if(_data[i].driverState==1){
							_data[i].driverState="已预约";
						}else if(_data[i].driverState==2){
							_data[i].driverState="外出";
						}else{
							_data[i].driverState="不可用";
						}
						//设置基本信息值			
						driver += '<ul class="driverInfo">'+
							'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheck"></li>'+
							'<li class="driverIcon">'+
								'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
								'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="departMent" datatype="departMent">'+_data[i].departMent+'</p></div>'+
							'</li>'+
							'<li class="driveingInfo">'+
								'<p><span class="driverType">司机类型 : <span class="driverTypeInfo" datatype="typeInfo">'+_data[i].typeInfo+'</span></span>'+
								'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo" datatype="licenseInfo">'+_data[i].licenseInfo+'</span></span></p>'+
								'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
								'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
							'</li>'+
							'<li class="driverState"><span class="free" datatype="driverState">'+_data[i].driverState+'</span><span class="details">详情>></span></li>'+
						'</ul>';
					};
					$('.driverInfos').append(driver);
				}else if(data.state=="1"){
						alert("请重新登录");
						parent.location.href="login.html"
				}else{
					alert(data.state);
				}
			});
		}
	})
	$(".oNo").click(function(){
		var ochecksN = document.getElementsByClassName("ocheck");
		var ocheckN = [];
		var nameN=[];
		for (var i = 0; i < ochecksN.length; i++) {
			if(ochecksN[i].checked){
				ocheckN.push(ochecksN[i]);
			}
		};		
		$.each(ocheckN, function() {
			nameN.push($(this).parents(".driverInfo").find(".driverName").text());	
		});
		if(confirm("确定拒绝？")){	
			$.get("data/审批司机未通过.json",{"nameN":nameN},function(data){
				var _data=data.driversInfo;
				if(data.state=="success"){	
					$.each(ocheckN, function() {
						$(this).parents('.driverInfo').remove();
					});
					$('.driApprove2').html('');
					var driver='';
					for(var i=0;i<_data.length;i++){
					//设置基本信息值			
					driver += '<ul class="driverInfo">'+
						'<li class="driverIcon">'+
							'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
							'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="noPass" datatype="departMent">未通过</p></div>'+
						'</li>'+
						'<li class="driveingInfo">'+
							'<p><span class="driverType">司机类型 : <span class="driverTypeInfo" datatype="typeInfo">'+_data[i].typeInfo+'</span></span>'+
							'<span class="driverLicense">驾驶类型 : <span class="driverLicenseInfo" datatype="licenseInfo">'+_data[i].licenseInfo+'</span></span></p>'+
							'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
							'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
						'</li>'+
						'<li class="driverState"><span class="free" datatype="driverState">'+_data[i].driverState+'</span><span class="details">详情>></span></li>'+
					'</ul>';
				};
				$('.driApprove2').append(driver);
				}else if(data.state=="1"){
						alert("请重新登录");
						parent.location.href="login.html"
				}else{
					alert(data.state);
				}
			});
		}
	});
	
})


