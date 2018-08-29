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
		var option = $(className).html();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "../handler/GetDrivers.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
			success: function (data) {
	  			var obj = data.users;
	  			for (var i = 0; i < obj.length; i++) {
	      			option += '<option value="' + obj[i].Account + '">' + obj[i].RealName + '</option>';
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
		$(".remindTag2").addClass("ohide");
	});
	$('.dueRemind').click(function(){
		$('.dueNoticeFrame').removeClass("hide").addClass("animated zoomIn");
		$('.dueNoticeFrame').siblings("div").addClass("hide");
		getAllMessage3();
		$(".remindTag3").addClass("ohide");
	});
	$('.maintenanceRemind ').click(function(){
		$('.maintenanceFrame').removeClass("hide").addClass("animated zoomIn");
		$('.maintenanceFrame').siblings("div").addClass("hide");
		getAllMessage4();
		$(".remindTag4").addClass("ohide");
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
	    for (var i = 0; i <_data.length; i++) {//audit 申请管理员
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span class="auditState">' + _data[i].fast + '</span><span class="auditAdminis">' + _data[i].applyfor + '</span></div>' +
				'<div class="auditIcon">' +
					'<div><span class="id" style="display:none">' + _data[i].applyid + '</span><span class="applicant">' + _data[i].applybody + '</span>&nbsp;提交于<span class="applyTime">' + _data[i].sendtime + '</span></div>'+
					(_data[i].needApply==1?('<div><span class="newsY">同意</span><span class="newsN">拒绝</span><span class="ohide ohideId">'+_data[i].id+'</span></div>'):('<div><span class="">'+_data[i].needApply+'</span></div>')) +
				'</div>' +
			'</div>';
	    }

	    for (var i = 0; i <_data1.length; i++) {//auditCar 审批司机跨借车
	        auditNode += '<div class="auditNode">' +
				'<div class="auditMessage"><span>'+_data1[i].type +'</span><span class="auditApplyCar">'+_data1[i].applyfor +'</span>车牌为<span>' + _data1[i].carLicence + '</span>的<span>'+ _data1[i].brand+'</span></div>' +
				'<div class="auditIcon">' +
					'<div><span class="applicant">' + _data1[i].applybody + '</span>&nbsp;提交于<span class="applyTime">' + _data1[i].sendtime + '</span></div>' +
					(_data1[i].needApply==1?('<div><span class="newsYcar">同意</span><span class="newsNcar">拒绝</span><span class="ohide ohideId">'+_data1[i].id+'</span></div>'):('<div><span class="">'+_data1[i].needApply+'</span></div>')) +
				'</div>' +
			'</div>';
	    }

	    for (var i = 0; i <_data2.length; i++) {//myaudit 我审批司机
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
//		    var name = $(this).parents('.auditNode').find('.id').text();//角色申请人applyid
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();//无用的参数""?
//			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/UserManage/Driver/AccessDriver.ashx",
				data: {uniqueCode:ynId,access:1,from:0},
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
//		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
//			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/UserManage/Driver/AccessDriver.ashx",
				data: {uniqueCode:ynId, access: 0,from:0 },
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
//		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
//			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/CarManage/AccessBorrow.ashx",
				data: {uniqueCode:ynCarId, access:1,from:0},
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
		//拒绝借车
		$('.newsNcar').click(function(){debugger;
			var ynCarId=$(this).parents('.auditIcon').find('.ohideId').text();
//		    var name = $(this).parents('.auditNode').find('.id').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
//			var arry = [name];
			var auditNode = $(this);
			$.ajax({
				type:"get",
				url: "../handler/CarManage/AccessBorrow.ashx",
				data: {uniqueCode:ynCarId, access:0,from:0 },
				xhrFields:{withCredentials:true},
				dataType:"json",
				success:function(data){					
					auditNode.parent().parent().parent().remove();	
					getAllMessage1();
				},error:function(e1,e2,e3){
					console.log("请求失败");
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
					(_data1[i].needApply==1?('<span class="dispose">处理</span><span class="hide hideId">'+_data1[i].id+'</span>'):('<span class="">'+_data1[i].needApply+'</span>'))+
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
				'<div class="returnTitle">'+
					'<span class="" style="width:25%;display:inline-block;">'+_data3[i].personName+'</span>'+
					'<span class="reason1">还车原因：'+_data3[i].reason1+'</span>'+
				'</div>' +
				'<div class="carInfo">'+
					'<span class="brand">品牌：'+_data3[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data3[i].carLicence+'</span>'+
				'</div>'+
//				'<div class="transportTime">'+
//					'<span class="reason1">还车原因：'+_data3[i].reason1+'</span>'+
//				'</div>'+
			'</div>';
		}
		//个人
		for(var i=0;i<_data4.length;i++) {
			illegalNode += '<div class="illegalNode blPersonal">'+
				'<div class="driverPic">'+
					'<p class="remindTitle">个人非法用车</p>'+
				'</div>'+
				'<div class="carInfo">'+
					'<b style="display:none">'+_data4[i].id+'</b>'+
					'<span class="brand">品牌：'+_data4[i].brand+'</span>'+
					'<span class="carLicence">车牌：'+_data4[i].carLicence+'</span>'+
					'<span class="illegalDispose '+(_data4[i].IsAdd==0?'':'hide')+'">补录</span><span class="illegalSave" style="display:none;">保存</span>'+
					'<span class="blReturnTime borrowReason">借车原因：<input type="text" class="blReturnTimeReason blBorder" /></span>'+
				'</div>'+
				'<div class="transportTime">'+
					'<span class="specificTime blUsedTime">用车时间：'+_data4[i].time+'</span>'+
					'<span class="blReturnTime">还车时间：<input type="text" class="Wdate blReturnTimeInput blBorder" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm\'})" /></span>'+
					'<span class="blReturnTime blApplication">用途：'+
							'<select name="" class="blReturnTimeSelect blBorder"><option value="gray">用途</option><option value="外业">外业</option><option value="会议">会议</option>'+
							'<option value="培训">培训</option><option value="其它">其它</option></select>'+																			
						'</span>'+
					'<span class="blReturnTime">目的地：<input type="text" class="blReturnTimeDes blBorder" /></span>'+
				'</div>'+				
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
			$(".illInputting").addClass("ohide");
		});
		$(".quitSure #sureIll").unbind("click").click(function(){	
			var PeopleName=$(".illInputtingPerson").val();
			var illReason=$(".illInputtingReason").val();			
			if(illReason!=""){
				$.ajax({
				 	type:"get",
					url:"../handler/CarManage/HandleIllegalUseCar.ashx",
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
			$(".breakInputting").addClass("ohide");
		});
		$(".quitSure #sureBreak").unbind("click").click(function(){	
			var breakPeopleName=$(".breakInputtingPerson").val();
			$.ajax({
				type:"get",
				url:"../handler/CarManage/Illegal/HandleIllegal.ashx",
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
	//违法补录信息
		$(".illegalDispose").click(function(){debugger
			var othis=$(this);
			othis.toggle();
			othis.next().toggle();
			othis.nextAll().removeClass("blReturnTime");
			othis.parent().next().find(".blReturnTime").removeClass("blReturnTime");
		});
		$(".illegalSave").bind("click",function(){
			var othis=$(this);
			var oborders=othis.parents(".illegalNode").find(".blBorder");debugger
			for(var i=0;i<oborders.length;i++){
				if(oborders[i].value==""){
					alert("有空缺信息");
					return;
				}
			}
			
			var id=othis.parent().find("b").text();console.log(id)
			var blReturnTimeReason=othis.parents(".illegalNode").find(".blReturnTimeReason").val();
			var blReturnTimeInput=othis.parents(".illegalNode").find(".blReturnTimeInput").val();
			var blReturnTimeSelect=othis.parents(".illegalNode").find(".blReturnTimeSelect").val();
			var blReturnTimeDes=othis.parents(".illegalNode").find(".blReturnTimeDes").val();
			$.ajax({
				type:"get",
				url:"../handler/CarManage/AddInfo.ashx",
				xhrFields: {withCredentials: true }, 
				data:{"id":id,"blReturnTimeReason":blReturnTimeReason,"blReturnTimeInput":blReturnTimeInput,"blReturnTimeSelect":blReturnTimeSelect,"blReturnTimeDes":blReturnTimeDes,from:0},
				dataType:"json",
				success:function(data){
					if(data.state=="success"){							
						othis.parents(".illegalNode").find(".blBorder").css("border","none");
						othis.parents(".illegalNode").find("select.blBorder").css("appearance","none");
						othis.toggle();
						getAllMessage2();							
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}
				},error:function(e1,e2,e3){
					alert("补录失败")
				}
			});
		})
					
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
					'<span class="departMent">'+_data[i].time+'</span>'+
				'</div>'+
				'<div class="transportTime">'+
					'<span class="expireType">到期类型：'+_data[i].expireType+'</span><span class="expireAgree">同意</span>'+
				'</div>'+
			'</div>';
		}
		$('.dueNoticeInfo').html(dueNoticeNode);
		content.expireAgree();
	}
	this.expireAgree = function(){
		//到期同意
		$('.expireAgree').click(function(){debugger;
			var carLicence=$(this).parents('.dueNoticeNode').find('.carLicence').text().substring(3);
			var carState=$(this).parents('.dueNoticeNode').find('.expireType').text().substring(5);
			var needState;
			if(carState=="保养到期"){
				needState=2;
			}else if(carState=="年检到期"){
				needState=3;
			}else{
				needState=4;
			}
			$.ajax({
				type:"get",
				url:"../handler/CarManage/CarMaintain/AccessMaintain.ashx",
				xhrFields: {withCredentials: true },
				data:{"carNumber":carLicence,"needState":needState,from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){debugger
						getAllMessage3();
						$(".remindNum3").text(($(".remindNum3").text()-1))
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			})
		});
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
					'<span class="departMent">'+_data[i].time+'</span>'+
				'</div>'+
				'<div class="transportTime">'+	
					'<span class="expireType">维修申请人：'+_data[i].personName+'</span><span><span class="maintY">同意</span><span class="maintN">拒绝</span></span>'+
				'</div>'+
			'</div>';
		}
		$('.maintenanceInfo').html(maintenanceNode);
		content.maintYN();
	}
	//同意拒绝维修申请
	this.maintYN = function(){
		$(".maintY").on("click",function(){
			var carLicence=$(this).parents('.maintenanceNode').find('.carLicence').text().substring(3);
			$.ajax({
				type:"get",
				url:"../handler/CarManage/CarMaintain/AccessMaintain.ashx",
				xhrFields: {withCredentials: true },
				data:{"needState":1,"carNumber":carLicence,from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
//						$(this).parents(".maintenanceNode").remove();
						getAllMessage4();
						$(".remindNum4").text(($(".remindNum4").text()-1));
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			})
		})
		$(".maintN").on("click",function(){
			var carLicence=$(this).parents('.maintenanceNode').find('.carLicence').text().substring(3);
			$.ajax({
				type:"get",
				url:"../handler/CarManage/CarMaintain/CancelApply.ashx",
				xhrFields: {withCredentials: true },
				data:{"carNumber":carLicence,from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
//						$(this).parents(".maintenanceNode").remove();
						getAllMessage4();
						$(".remindNum4").text(($(".remindNum4").text()-1));
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			})
		})
	}
}




