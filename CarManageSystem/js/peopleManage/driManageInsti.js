var viewAccount;
$(function(){
	getDepartment();
	driverTask();
//	//请求司机信息
	var department;
	var driverType;
	function getDepartment(){
		$("#regBranch").removeClass("ohide");
			var option = $('#regBranch').html();
	          $.ajax({
	              type: "post",
	              dataType: "json",
	              url: "http://192.168.1.120:2238/handler/GetDepartment.ashx",
	              data:{from:0},
	              xhrFields:{withCredentials:true},
	              success: function (data) {
	                  var obj = data;
	                  for (var i = 0; i < obj.length; i++) {
	                      option += '<option value="' + obj[i].Id + '">' + obj[i].Name + '</option>';
	                  }
	                  $('#regBranch').html(option);
	              },
	              error: function () {
	                  console.log("部门获取失败");
	              }
	         })
	}
	function driverTask(){	
		department=$("#regBranch").val();
		driverType=$(".status").val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/UserManage/Driver/ViewDriver.ashx",
			xhrFields:{withCredentials:true},
			data:{"department":department,"driverType":driverType,"viewType":0,from:0},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".driNum").text(data.driversTotal);
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
//			if(_data[i].driverState==0){
//				_data[i].driverState="";
//			}else if(_data[i].driverState==1){
//				_data[i].driverState="已预约";
//			}else if(_data[i].driverState==2){
//				_data[i].driverState="外出";
//			}else{
//				_data[i].driverState="不可用";
//			}

			_data[i].driverState==0?(_data[i].driverState="空闲"):(_data[i].driverState="外出");
			//设置基本信息值			
			driver += '<ul class="driverInfo">'+
				'<li class="choice" style="display:none;"><input type="checkbox" name="" id="" value="" class="ocheck"><span  class="userId">'+_data[i].userid+'</span></li>'+
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
		$('.driverInfos').html(driver);
	}
	$("#regBranch").change(function(){
		driverTask();
	});
	$(".status").change(function(){
		driverTask();
	});
//	//删除
//	$(".driDel").click(function(){
//		var ochecks = document.getElementsByClassName("ocheck");
//		var ocheck = [];
//		var nameDel=[];
//		for (var i = 0; i < ochecks.length; i++) {
//			if(ochecks[i].checked){
//				ocheck.push(ochecks[i]);
//			}
//		};		
//		$.each(ocheck, function() {
//			nameDel.push($(this).parents(".driverInfo").find(".userId").text());		
//		});
//		if(confirm("确定删除？")){	
////			$.each(ocheck, function() {		
////				$(this).parents('.driverInfo').remove();											
////			});
//			delDri();
//		}
//		function delDri(){debugger;
//			$.ajax({
//				type:"get",
//				url:"http://192.168.1.120:2238/handler/UserManage/Driver/DeleteDriver.ashx",
//				data:{"drivers":JSON.stringify({"Ids":nameDel})},
//				xhrFields: {withCredentials: true }, 
//				dataType:"json",
//				async:true,
//				success:function(data){
//					if(data.state=="success"){	
//						driverTask();
//					}else if(data.state=="1"){
//							alert("请重新登录");
//							window.location.href="./login.html"
//					}else{
//						alert(data.state);
//					}
//				}
//			})
//		}
//	});
	function details(){
		$(".details").click(function(){
			viewAccount= $(this).parents('.driverInfo').find('.userId').text();
			$("#container").load("html/peopleManage/driManageDetail.html");
		})
	}
	//审批司机
	$(".driApprove").click(function(){
		$(this).css("background","lightgray");
		$(".driLook").css("background","#FFFFFF");
		driApprove1()
	});
	$(".driLook").click(function(){
		$(this).css("background","lightgray");
		$(".driApprove").css("background","#FFFFFF");
		driverTask();
	});
	
	function driApprove1(){
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/UserManage/Driver/ViewApplyDriver.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"viewType":0,from:0},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".driApprove1").html("");
					$(".driNum").text(data.driversTotal);
					addNode1(data.driversInfo);
				}else if(data.state=="1"){
							alert("请重新登录");
							window.location.href="./login.html"
				}else{
					alert(data.state);
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
					'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheckY"><span style="display:none;" class="userId">'+_data[i].userid+'</span></li>'+
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
			$('.driApprove1').html(driver);
		}
	}
	function driApprove2(){
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/UserManage/Driver/ViewNoAccessDriver.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"viewType":0,from:0},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".driApprove2").html("");
					$(".driNum").text(data.driversTotal);
					addNode2(data.driversInfo);
				}else if(data.state=="1"){
							alert("请重新登录");
							window.location.href="./login.html"
				}else{
					alert(data.state);
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
					'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheckN"><span style="display:none;" class="userId">'+_data[i].userid+'</span></li>'+
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
			$('.driApprove2').html(driver);
		}
	}
	$(".approve1").click(function(){
		$(this).addClass("approveCss");
		$(".approve2").removeClass("approveCss");
		$(".driApprove1").removeClass("ohide");
		$(".driApprove2").addClass("ohide");
		$(".approveP2").removeClass("ohide");
		driApprove1();
	});
	$(".approve2").click(function(){
		$(this).addClass("approveCss");
		$(".approve1").removeClass("approveCss");
		$(".driApprove2").removeClass("ohide");
		$(".driApprove1").addClass("ohide");
		$(".approveP2").addClass("ohide");
		driApprove2();
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
			nameY.push($(this).parents(".driverInfo").find(".userId").text());	
		});
		if(ocheckY.length>0){
			if(confirm("确定同意？")){						
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/UserManage/Driver/AccessDriver.ashx",
					xhrFields:{withCredentials:true},
					data:{"Ids":JSON.stringify({"Ids":nameY}),"access":1,from:0},
					dataType:"json",
					async:true,
					success:function(data){
						var _data=data.driversInfo;
						if(data.state=="success"){
	//						$.each(ocheckY, function() {	
	//							$(this).parents('.driverInfo').remove();
	//						});
							addNode1(_data)
						}else if(data.state=="1"){
								alert("请重新登录");
								window.location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
			}
		}else{
			alert("请勾选相关项");
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
			nameN.push($(this).parents(".driverInfo").find(".userId").text());	
		});
		if(ocheckN.length>0){
			if(confirm("确定拒绝？")){	
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/UserManage/Driver/AccessDriver.ashx",
					xhrFields:{withCredentials:true},
					data:{"Ids":JSON.stringify({"Ids":nameN}),"access":0,from:0},
					dataType:"json",
					async:true,
					success:function(data){
						var _data=data.driversInfo;
						if(data.state=="success"){	
	//						$.each(ocheckN, function() {
	//							$(this).parents('.driverInfo').remove();
	//						});
						addNode1(_data);
						}else if(data.state=="1"){
								alert("请重新登录");
								window.location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
			}
		}else{
			alert("请勾选相关项");
		}
	});
	
})


