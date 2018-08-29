$(document).ready(function() {
	$(".lastTime").text(lastTime);
	getPeopleName('.illInputtingPerson');
	getPeopleName('.breakInputtingPerson');
	checkMessage();
//	getAllMessage();	
	getAllMessage1();
});
    //人名 
   	function getPeopleName(className){
		var option = $(className).html().trim();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "../handler/GetDrivers.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
			success: function (data) {
	  			var obj = data;
	  			for (var i = 0; i < obj.length; i++) {
	      			option += '<option value="' + obj[i].id + '">' + obj[i].name + '</option>';
	 			}
				$(className).html(option);
			},
			error: function () {
	  			console.log("人名获取失败");
	  		}
		})		
	}
//切换消息模块
function checkMessage(){
	$('.warningMessage ').click(function(){
		$('.auditFrame').removeClass("hide").addClass("animated zoomIn");
		$('.auditFrame').siblings("div").addClass("hide");
		getAllMessage1();
	})
	$('.illegalCar').click(function(){
		$('.illegalFrame').removeClass("hide").addClass("animated zoomIn");
		$('.illegalFrame').siblings("div").addClass("hide");
		getAllMessage2();
	});
	$('.dueRemind').click(function(){
		$('.dueNoticeFrame').removeClass("hide").addClass("animated zoomIn");
		$('.dueNoticeFrame').siblings("div").addClass("hide");
		getAllMessage3();
	});
	$('.maintenanceRemind ').click(function(){
		$('.maintenanceFrame').removeClass("hide").addClass("animated zoomIn");
		$('.maintenanceFrame').siblings("div").addClass("hide");
		getAllMessage4();
	});	
}

//获得所有提醒
function getAllMessage1(){
	var content = this;debugger;
	//审核消息
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=1",
//		url:"http://127.0.0.1:8020/CarManageSystem/CarManageSystem/data/首页.json",
		xhrFields:{withCredentials:true},
		data:{from:0},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				$(".remindNum1").text(data.remindNum1);
				$(".remindNum2").text(data.remindNum2);
				$(".remindNum3").text(data.remindNum3);
				$(".remindNum4").text(data.remindNum4);
				data.redpoint2==0?($(".remindTag2").addClass("ohide")):($(".remindTag2").removeClass("ohide"));
				data.redpoint3==0?($(".remindTag3").addClass("ohide")):($(".remindTag3").removeClass("ohide"));
				data.redpoint4==0?($(".remindTag4").addClass("ohide")):($(".remindTag4").removeClass("ohide"));
				content.getAudit(data.audit,data.auditCar,data.myaudit,data.myauditCar);
//			    content.getRemind(data.remindIlleCar,data.peccancy,data.remindOut,data.myremindIlleCar,data.mypeccancy,data.myremindOut);
//				content.getDueNotice(data.dueNotice);
//				content.getMaintenance(data.maintenance);
				$(".auditInfo>div:nth-child(odd)").addClass("rowBgColor");
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
	this.getAudit = function (_data,_data1,_data2,_data3) {
	    var auditNode = "";
	    for (var i = 0; i < _data.length; i++) {//audit 申请管理员
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditState">' + _data[i].fast + '</span><span class="auditAdminis">' + _data[i].applyfor + '</span></div>' +
				'<div class="auditIcon">' +
					'<div><span class="id" style="display:none">' + _data[i].applyid + '</span><span class="applicant">' + _data[i].applybody + '</span>&nbsp;提交于<span class="applyTime">' + _data[i].sendtime + '</span></div>'+
					'<div><span class="newsY">同意</span><span class="newsN">拒绝</span><span class="ohide ohideId">'+_data[i].id+'</span></div>' +
				'</div>' +
			'</div>';
	    }

	    for (var i = 0; i < _data1.length; i++) {//auditCar 审批司机跨借车
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditApplyCar">'+_data1[i].applyfor +'</span>车牌为<span>' + _data1[i].carLicence + '</span>的<span>'+ _data1[i].brand+'</span></div>' +
				'<div class="auditIcon">' +
					'<div><span class="applicant">' + _data1[i].applybody + '</span>&nbsp;提交于<span class="applyTime">' + _data1[i].sendtime + '</span></div>' +
					'<div><span class="newsYcar">同意</span><span class="newsNcar">拒绝</span><span class="ohide ohideId">'+_data1[i].id+'</span></div>' +
				'</div>' +
			'</div>';
	    }

	    for (var i = 0; i < _data2.length; i++) {//myaudit 我审批司机
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditState">' + _data2[i].auditState + '</span>您申请的<span class="auditSummary">' + _data2[i].auditSummary + '</span>'
			    + '</div></div>';
	    }
		for (var i=0; i<_data3.length;i++) {//myauditCar 我跨院借车审批
		    auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditState">' + _data3[i].auditState + '</span>您'+_data3[i].auditJumpBorrow+'<span class="auditSummary">' + _data3[i].auditSummary + '</span>车牌为<span>' + _data3[i].carLicence + '</span>的<span>' + _data3[i].brand + '</span> </div>' +
				'<div class="auditIcon">' +
					'<div>提交于<span class="applyTime">' + _data3[i].applyTime + '</span></div>' +
				'</div>' +
			'</div>';
		}
		$('.auditInfo').html(auditNode);
		content.newsYN();
	}
	//审核
	this.newsYN = function(){
		//审核成为角色
		$('.newsY').click(function(){debugger;
			var ynId=$(this).parents('.auditIcon').find('.ohideId').text();
		    var name = $(this).parents('.auditNode').find('.id').text();//角色申请人applyid
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();//无用的参数""?
			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/UserManage/Driver/AccessDriver.ashx",
				data: { drivers: JSON.stringify({ "Ids": arry }),id:ynId,access:1,from:0},
				xhrFields:{withCredentials:true},
				dataType:"json",
				success:function(data){
					auditNode.parent().parent().parent().remove();
					getAllMessage1();
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			});
		});
		$('.newsN').click(function(){
			var ynId=$(this).parents('.auditIcon').find('.ohideId').text();
		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/UserManage/Driver/AccessDriver.ashx",
				data: { drivers: JSON.stringify({ "Ids": arry }),id:ynId, access: 0,from:0 },
				xhrFields:{withCredentials:true},
				dataType:"json",
				success:function(data){					
					auditNode.parent().parent().parent().remove();	
					getAllMessage1();
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			});
		});
		//审核跨院部门借车
		//通过跨院借车
		$('.newsYcar').click(function(){debugger;
			var ynCarId=$(this).parents('.auditIcon').find('.ohideId').text();
			var auditApplyCar=$(this).parents(".auditIcon").find(".auditApplyCar").text();
		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
			var arry = [name];
			var auditNode = $(this);
			if(auditApplyCar=="跨天申请使用"){
				$.ajax({
					type:"get",
					url: "../handler/CarManage/AccessBorrow.ashx",
					data: { drivers: JSON.stringify({ "Ids": arry }),id:ynCarId, access:2,from:0},
//					data: {access:2,from:0},
					xhrFields:{withCredentials:true},
					dataType:"json",
					success:function(data){
						auditNode.parent().parent().parent().remove();
						getAllMessage1();
					},error:function(e1,e2,e3){
						console.log("请求失败")
					}
				});
			}else{
				$.ajax({
					type:"get",
					url: "../handler/CarManage/AccessBorrow.ashx",
					data: { drivers: JSON.stringify({ "Ids": arry }),id:ynCarId, access:1,from:0},
//					data: {access:1,from:0},
					xhrFields:{withCredentials:true},
					dataType:"json",
					success:function(data){
						auditNode.parent().parent().parent().remove();
						getAllMessage1();
					},error:function(e1,e2,e3){
						console.log("请求失败")
					}
				});
			}
		});		
		//拒绝借车
		$('.newsNcar').click(function(){debugger;
			var ynCarId=$(this).parents('.auditIcon').find('.ohideId').text();
		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/CarManage/AccessBorrow.ashx",
				data: { drivers: JSON.stringify({ "Ids": arry }),id:ynCarId, access:3,from:0 },
//				data: {access:3,from:0},
				xhrFields:{withCredentials:true},
				dataType:"json",
				success:function(data){					
					auditNode.parent().parent().parent().remove();	
					getAllMessage1();
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			})
		})
	}
}
function getAllMessage2(){
	var content = this;debugger;
	//消息提醒
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=2",
//		url:"http://127.0.0.1:8020/CarManageSystem/CarManageSystem/data/首页.json",
		xhrFields:{withCredentials:true},
		data:{from:0},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
			    content.getRemind(data.remindIlleCar,data.peccancy,data.remindOut,data.myremindIlleCar,data.myremindOut);
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
	this.getRemind = function (_data1,_data2,_data3,_data4,_data5) {
	    getIllage(_data1,_data2,_data3,_data4,_data5);
//	    getMyIllage(_data4,_data5,_data6);
//	    getOutsideReturn(_data1);
		$(".illegalInfo>div:nth-child(odd)").addClass("rowBgColor");
	}
	//消息提醒
	function getIllage(_data1,_data2,_data3,_data4,_data5,_data6){
		var illegalNode = "";
		for (var i=0;i<_data1.length;i++){
			illegalNode += '<div class="illegalNode">'+
				'<div class="driverPic">'+
					'<p class="remindTitle">非法用车</p>'+
				'</div>'+
				'<div class="illegalPeople hide">'+
					'<span>非法用车人：</span><span class="illperson"></span>'+
					'<span>非法用车原因：</span><span class="illreason"></span>'+											
				'</div>'+
				'<div class="carInfo">'+
					'<span class="brand">品牌：'+_data1[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data1[i].carLicence+'</span>'+
					'<span class="dispose">处理</span><span class="hide hideId">'+_data1[i].id+'</span>'+
				'</div>'+
				'<div class="transportTime">'+
					'<span class="specificTime">用车时间：'+_data1[i].time+'</span>'+
				'</div>'+
//				'<div class="dispose"><span class="dispose">处理</span></div>'+
			'</div>';
		}
		for (var i = 0; i <_data2.length; i++) {
		     illegalNode +='<div class="breakRuleFrame">' +
//				'<div class="breakRuleTitle moduleTitle">违章信息</div>' +
				'<div class="driverPic">'+
					'<p class="remindTitle">违章信息</p>'+
				'</div>'+
				'<div class="breakRuleInfo">' +
					'<div class="breakRuleNode">'+
						'<div class="carInfo">'+
							'<span>车牌：'+_data2[i].carLicence+'</span>'+
							'<span>违章原因:'+_data2[i].reason+'</span>'+
							'<span class="'+(_data2[i].personName==""?'breakDispose':'breakName')+'">'+(_data2[i].personName==""?'处理':'违章人:'+_data2[i].personName)+'</span><span class="hide hideId">'+_data2[i].id+'</span>'+
						'</div>'+
						'<div class="returnCarTime">'+
							'<p class="transportTime">违章时间：<span class="returnTime">'+_data2[i].time+'</span></p><p>地点：<span>'+_data2[i].place+'</span></p>'+
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';			
		}
		for(var i = 0; i<_data3.length; i++){
		    illegalNode += '<div class="illegalNode">'+
				'<div class="driverPic">'+
					'<p class="remindTitle">院外还车</p>'+
				'</div>'+
				'<div class="returnTitle">'+_data3[i].personName+'</div>' +
				'<div class="carInfo">'+
					'<span class="brand">品牌：'+_data3[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data3[i].carLicence+'</span>'+
				'</div>'+
//				'<div class="transportTime">'+
//					'<span class="specificTime">车辆类型：'+_data3[i].type+'</span>'+
//				'</div>'+
			'</div>';
		}
		//个人
		for(var i=0;i<_data4.length;i++) {
			illegalNode += '<div class="illegalNode">'+
				'<div class="driverPic">'+
					'<p class="remindTitle">个人非法用车</p>'+
				'</div>'+
				'<div class="carInfo">'+
					'<span class="brand">品牌：'+_data4[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data4[i].carLicence+'</span>'+
				'</div>'+
				'<div class="transportTime">'+
					'<span class="specificTime">用车时间：'+_data4[i].time+'</span>'+
				'</div>'+
//				'<div class="dispose"><span>处理</span></div>'+
			'</div>';
		}
		for (var i = 0; i<_data5.length; i++) {
		    illegalNode += '<div class="illegalNode">'+
				'<div class="driverPic">'+
					'<p class="remindTitle">个人院外还车</p>'+
				'</div>'+
				'<div class="returnTitle">'+_data5[i].personName+'</div>' +
				'<div class="carInfo">'+
					'<span class="brand">品牌：'+_data5[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data5[i].carLicence+'</span>'+
				'</div>'+
//				'<div class="transportTime">'+
//					'<span class="specificTime">车辆类型：'+_data5[i].type+'</span>'+
//				'</div>'+
			'</div>';
		}
		$(".illegalInfo").html(illegalNode);
		content.disposes();
	}
	this.disposes = function(){
		var othis;
		//违法
		var disposeId="";
		var breakDisposeId="";
		$('.dispose').click(function(){debugger
			othis=$(this);
			$(".illInputting").removeClass("ohide");
			disposeId=$(this).parent().find('.hideId').text();
		});
		$(".quitSure #quitIll").hover(function(){
			$(".quitSure #quitIll").css('background','#4375f8');
			$(".quitSure #sureIll").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quitIll").css('background','#FFFFFF');
			$(".quitSure #sureIll").css('background','#4375f8');
		});
		$(".quitSure #quitIll").click(function(){
			$(".illInputting").addClass("hide");
		});
		$(".quitSure #sureIll").unbind("click").click(function(){	
			var PeopleName=$(".illInputtingPerson").val();
			var illReason=$(".illInputtingReason").val();			
			if(illReason!=""){
				$.ajax({
				 	type:"get",
					url:"../handler/CarManage/HandleIllegalUserCar.ashx",
					xhrFields: {withCredentials: true }, 
					data:{"id":disposeId,"user":PeopleName,"cause":illReason,from:0},
					dataType:"json",
					success:function(data){
						if(data.state=="success"){
							othis.addClass("hide");
							othis.parents(".illegalNode").find(".transportTime").append("<span class='illperson'>"+(PeopleName==null?"":PeopleName)+"</span>非法用车原因：</span><span class='illreason'>"+illReason+"</span>");
							$(".illInputting").addClass("ohide");
							getAllMessage2();
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html";
						}else{
							alert(data.state);
						}
					},error:function(e1,e2,e3){
						console.log("处理失败");
					}
				})
			}else{
				alert("请填写原因");
			}
		});
		//违章
		$('.breakDispose').click(function(){debugger;
			othis=$(this);
			$(".breakInputting").removeClass("ohide");
			breakDisposeId=$(this).parent().find('.hideId').text();
		});
		$(".quitSure #quitBreak").hover(function(){
			$(".quitSure #quitBreak").css('background','#4375f8');
			$(".quitSure #sureBreak").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quitBreak").css('background','#FFFFFF');
			$(".quitSure #sureBreak").css('background','#4375f8');
		});
		$(".quitSure #quitBreak").click(function(){
			$(".breakInputting").addClass("hide");
		});
		$(".quitSure #sureBreak").unbind("click").click(function(){	
			var breakPeopleName=$(".breakInputtingPerson").val();
			$.ajax({
				type:"get",
				url:"../handler/CarManage/CarQuery/DirectMaintain.ashx",
				xhrFields: {withCredentials: true }, 
				data:{"id":breakDisposeId,"user":breakPeopleName,from:0},
				dataType:"json",
				success:function(data){
					if(data.state=="success"){							
						othis.addClass("breakName");
						othis.removeClass("breakDispose");
						$(".breakName").html('违章人:'+breakPeopleName);
						$(".breakInputting").addClass("ohide");
							getAllMessage2();
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}
				},error:function(e1,e2,e3){
					console.log("处理失败")
				}
			});
		});	
	}
}
function getAllMessage3(){
	//到期提醒
	var content = this;debugger;
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=3",
//		url:"http://127.0.0.1:8020/CarManageSystem/CarManageSystem/data/首页.json",
		xhrFields:{withCredentials:true},
		data:{from:0},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				content.getDueNotice(data.dueNotice);
				$(".dueNoticeInfo>div:nth-child(odd)").addClass("rowBgColor");
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
	this.getDueNotice = function(_data){
		var dueNoticeNode = "";
		for (var i=0;i<_data.length;i++) {
			dueNoticeNode += '<div class="dueNoticeNode">'+
				'<div class="dueNoticeDriver">'+_data[i].brand+'</div>'+
				'<div class="carInfo">'+
					'<span class="carLicence">车牌：'+_data[i].carLicence+'</span>'+
					'<span class="departMent">部门：'+_data[i].department+'</span>'+
				'</div>'+
				'<div class="transportTime">'+
					'到期类型：<span class="expireType">'+_data[i].expireType+'</span>'+
				'</div>'+
			'</div>';
		}
		$('.dueNoticeInfo').html(dueNoticeNode);
	}
}
function getAllMessage4(){
	//维修申请
	var content = this;debugger;
	$.ajax({
		type:"get",
		url:"../handler/Index/IndexMessage.ashx?info=4",
//		url:"http://127.0.0.1:8020/CarManageSystem/CarManageSystem/data/首页.json",
		xhrFields:{withCredentials:true},
		data:{from:0},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				content.getMaintenance(data.maintenance);
				$(".maintenanceInfo>div:nth-child(odd)").addClass("rowBgColor");
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
	this.getMaintenance = function(_data){
		var maintenanceNode = "";
		for (var i=0;i<_data.length;i++) {
			maintenanceNode += '<div class="maintenanceNode">'+
				'<div class="maintenanceDriver">'+_data[i].brand+'</div>'+
				'<div class="carInfo">'+
					'<span class="carLicence">车牌：'+_data[i].carLicence+'</span>'+
					'<span class="departMent">部门：'+_data[i].department+'</span>'+
				'</div>'+
				'<div class="transportTime">'+	
					'维修申请人：<span class="expireType">'+_data[i].personName+'</span>'+
				'</div>'+
			'</div>';
		}
		$('.maintenanceInfo').html(maintenanceNode);
	}
}




