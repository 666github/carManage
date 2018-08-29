
$(function(){
	
	driverTask();
	driApprove1();
	driApprove2();
	function driverTask(){	
		var department=$(".allBranch").val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/UserManage/Driver/ViewDriver.ashx",
			xhrFields:{withCredentials:true},
			data:{"department,":department,"viewType":1,from:0},
			dataType:"json",
			async:true,
			success:function(data){
				if(data.state == "success"){
					$(".carsCount").text(data.driversTotal);
					addNode(data.driversInfo);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
				}		
//				details();
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		})
	}
	 function addNode(_data){
		var driver = '';
		for(var i=0;i<_data.length;i++){			
			//设置基本信息值			
			driver += '<ul class="driverInfo">'+
				'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheck"><span style="display:none;" class="userId">'+_data[i].userid+'</span></li>'+
				'<li class="driverIcon">'+
					'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
					'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="departMent" datatype="departMent">'+_data[i].departMent+'</p></div>'+
				'</li>'+
				'<li class="driveingInfo">'+						
					'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
					'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
				'</li>'+
			'</ul>';
		};
		$('.driverInfos').html(driver);
	}
	//查询
//	$(".driQuery").click(function(){
//		var allBranch=$(".allBranch").val();
//		var status=$(".status").val();
//		$(".driverInfos").html("");
//		driverTask("data/查看司机.json",{"allBranch":allBranch,"status":status});
//	})
	$("#regBranch").change(function(){
		driverTask();
	});
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
			nameDel.push($(this).parents(".driverInfo").find(".userId").text());		
		});
		if(confirm("确定删除？")){	
			$.each(ocheck, function() {		
				$(this).parents('.driverInfo').remove();											
			});
			delDri();
		}
		function delDri(){
			$.ajax({
				type:"get",
				url:"http://192.168.1.111:2238/handler/UserManage/Driver/DeleteDriver.ashx",
				data:{"drivers":JSON.stringify(nameY),from:0},
				xhrFields: {withCredentials: true }, 
				data:{"viewType":1},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){	
						$(".driverInfos").html("");
						addNode(data.driversInfo)
					}else if(data.state=="1"){
							alert("请重新登录");
							window.location.href="./login.html"
					}else{
						alert(data.state);
					}
				}
			})
		}
	});
//	function details(){
//		$(".details").click(function(){
//			$("#container").load("html/peopleManage/driManageDetail.html");
//		})
//	}
	//审批司机
	$(".driApprove").click(function(){
		$(this).css("background","lightgray");
		$(".driLook").css("background","#FFFFFF");
		driApprove1();
	});
	$(".driLook").click(function(){
		$(this).css("background","lightgray");
		$(".driApprove").css("background","#FFFFFF");
		driverTask();
	});
	function driApprove1(){
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/UserManage/Driver/ViewApplyDriver.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"viewType":1,from:0},
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
						'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="departMent" datatype="departMent">待审核</p></div>'+
					'</li>'+
					'<li class="driveingInfo">'+					
						'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
						'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+
					'</li>'+
				'</ul>';
			};
			$('.driApprove1').html(driver);
		}
	}
	function driApprove2(){
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/UserManage/Driver/ViewNoAccessDriver.ashx",
			xhrFields: {withCredentials: true }, 
			data:{"viewType":1,from:0},
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
					'<li class="choice"><input type="checkbox" name="" id="" value="" class="ocheckN"><span style="display:none;" class="userId">'+_data[i].userid+'</span></li>'+
					'<li class="driverIcon">'+
						'<div class="icon"><img class="" src="'+_data[i].pictureUrl+'"/></div>'+
						'<div class="iconInfo"><p class="driverName" datatype="driverName">'+_data[i].driverName+'</p><p class="noPass" datatype="departMent">未通过</p></div>'+
					'</li>'+
					'<li class="driveingInfo">'+
						'<p class="driverTel">电话 : <span class="driverTelInfo" datatype="telInfo">'+_data[i].telInfo+'</span></p>'+
						'<p class="mailNum">邮箱 : <span class="mailNumInfo" datatype="mailNumInfo">'+_data[i].mailNumInfo+'</span></p>'+					
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
		driApprove1();
	});
	$(".approve2").click(function(){
		$(this).addClass("approveCss");
		$(".approve1").removeClass("approveCss");
		$(".driApprove2").removeClass("ohide");
		$(".driApprove1").addClass("ohide");
		$(".approveP2").addClass("ohide");
		driApprove2()
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
					url:"http://192.168.1.111:2238/handler/UserManage/Driver/AccessDriver.ashx",
					data:{"Ids":JSON.stringify(nameY),"access":1},
					dataType:"json",
					async:true,
					success:function(data){
						var _data=data.driversInfo;
						if(data.state=="success"){
							$.each(ocheckY, function() {	
								$(this).parents('.driverInfo').remove();
							});
							addNode1(_data)				
						}else if(data.state=="1"){
								alert("请重新登录");
								window.location.href="./login.html"
						}else{
							alert(data.state);
						}
					});
				}
			})
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
		if(ocheckY.length>0){
			if(confirm("确定拒绝？")){	
				$.ajax({
					type:"get",
					url:"http://192.168.1.111:2238/handler/UserManage/Driver/AccessDriver.ashx",
					data:{"Ids":JSON.stringify(nameY),"access":0},
					dataType:"json",
					async:true,
					success:function(data){
						var _data=data.driversInfo;
						if(data.state=="success"){	
							$.each(ocheckN, function() {
								$(this).parents('.driverInfo').remove();
							});
						addNode1(_data);					
						}else if(data.state=="1"){
								alert("请重新登录");
								Window.location.href="、login.html"
						}else{
							alert(data.state);
						}
					});
				}
			});
		}else{
			alert("请勾选相关项");
		}
	})


