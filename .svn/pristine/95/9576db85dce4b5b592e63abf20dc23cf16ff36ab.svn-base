$(document).ready(function() {
	checkMessage();
	getAllMessage();
	
});

//切换消息模块
function checkMessage(){
	$('.illegalCar').click(function(){
		$('.illegalFrame').removeClass("hide");
		$('.illegalFrame').siblings("div").addClass("hide");
	});
	$('.dueRemind').click(function(){
		$('.dueNoticeFrame').removeClass("hide");
		$('.dueNoticeFrame').siblings("div").addClass("hide");
	});
	$('.maintenanceRemind ').click(function(){
		$('.maintenanceFrame').removeClass("hide");
		$('.maintenanceFrame').siblings("div").addClass("hide");
	});
	$('.warningMessage ').click(function(){
		$('.auditFrame').removeClass("hide");
		$('.auditFrame').siblings("div").addClass("hide");
	})
}

//获得所有提醒
function getAllMessage(){
	var content = this;
	$.ajax({
		type:"get",
		url:"data/wardenMess.json",
		data:{"status":status},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){
				
				//debugger;
				content.getAudit(data.audit);
				//content.getIllegal(data.illegal);
				content.getDueNotice(data.dueNotice);
				content.getMaintenance(data.maintenance);
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
	this.getAudit = function(_data){
		var auditNode = "";
		for (var i=0; i<_data.length;i++) {
			auditNode += '<div class="auditNode">'+
				'<div class="auditMessage"><span class="auditState">'+_data[i].fast+'</span><span class="auditSummary">'+_data[i].auditAdm+'</span> '+_data[i].applyfor+'</div>'+
				'<div class="auditIcon">'+
					'<div><span class="applicant">'+_data[i].applybody+'</span>&nbsp;提交于<span class="applyTime">'+_data[i].sendtime+'</span></div>'+
					'<div><span class="newsY">同意</span><span class="newsN">拒绝</span></div>'+
				'</div>'+
			'</div>';
		}
		$('.auditInfo').append(auditNode);
		content.newsYN();
	}
	this.getIllegal = function(_data){
		var illegalNode = "";
		for (var i=0;i<_data.length;i++) {
			illegalNode += '<div class="illegalNode">'+
				'<div class="driverPic">'+
					'<img src="img/driver.png" alt="" />'+
				'</div>'+
				'<div class="driverInfo">'+
					'<span class="driverName">陈阳</span>'+
					'<span class="departMent">基础测绘部</span>'+
				'</div>'+
				'<div class="carInfo">'+
					'<span class="brand">品牌：现代-朗动</span>'+
					'<span class="carLicence">车牌：京B·BP684</span>'+
				'</div>'+
				'<div class="transportTime">'
					'<span class="specificTime">用车时间：2017/08/08-2017/08/12</span>'+
				'</div>'+
			'</div>';
		}
	}
	this.getDueNotice = function(_data){
		var dueNoticeNode = "";
		for (var i=0;i<_data.length;i++) {
			dueNoticeNode += '<div class="dueNoticeNode">'+
				'<div class="dueNoticeDriver">'+_data[i].maturity_inf11+'</div>'+
				'<div class="carInfo">'+
					'<span class="carLicence">车牌：'+_data[i].maturity_inf21+'</span>'+
					'<span class="departMent">'+_data[i].maturity_inf31+'</span>'+
				'</div>'+
				'<div class="transportTime">'+
					'到期类型：<span class="expireType">'+_data[i].maturity_inf32+'</span>'+
				'</div>'+
			'</div>';
		}
		$('.dueNoticeInfo').append(dueNoticeNode);
	}
	this.getMaintenance = function(_data){
		var maintenanceNode = "";
		for (var i=0;i<_data.length;i++) {
			maintenanceNode += '<div class="maintenanceNode">'+
				'<div class="maintenanceDriver">'+_data[i].maintenance_inf11+'</div>'+
				'<div class="carInfo">'+
					'<span class="carLicence">车牌：'+_data[i].maintenance_inf21+'</span>'+
					'<span class="departMent">'+_data[i].maintenance_inf31+'</span>'+
				'</div>'+
				'<div class="transportTime">'+	
					'维修申请人：<span class="expireType">'+_data[i].maintenance_inf32+'</span>'+
				'</div>'+
			'</div>';
		}
		$('.maintenanceInfo').append(maintenanceNode);
	}
	
	//审核
	this.newsYN = function(){
		$('.newsY').click(function(){
			var name = $(this).parents('.auditNode').find('.applicant').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
			$.ajax({
				type:"get",
				url:"",
				data:{},
				dataType:"json",
				success:function(data){
					
					$(this).parents('.auditNode').remove();
					
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			});
		});
		$('.newsN').click(function(){
			var name = $(this).parents('.auditNode').find('.applicant').text();
			var auditAdm = $(this).parents('.auditNode').find('.auditSummary').text();
			$.ajax({
				type:"get",
				url:"",
				data:{},
				dataType:"json",
				success:function(data){
					
					$(this).parents('.auditNode').remove();
					
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			});
		});
	}
	
}

