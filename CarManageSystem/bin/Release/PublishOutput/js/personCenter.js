function PreviewImage2(imgFile,id){
		var filextension=imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
		filextension=filextension.toLowerCase();
		if((filextension!='.jpg')){
			alert("请输入jpg格式图片");
			imgFile.focus();
		}else{
			var path;
	//		var fileId = imgFile.getAttribute("id");
			if(document.all){//ie
				imgFile.select();
				path = document.selection.createRange().text;
				document.getElementById(id).innerHTML = "";
			}else{//ff
				path=window.URL.createObjectURL(imgFile.files[0]);
				document.getElementById(id).innerHTML = "<img class='img1' width='80px' height='80px' src='"+path+"'/>";
			}
		}
	}
$(function(){
	//点击导航切换
	function perCenter(classUl,classA,id,ohides,ohide,othis){
		if($(classUl).hasClass(classA)){
			$(classUl).removeClass(classA);
			othis.addClass(classA);
		}				
		if($(id).hasClass(ohide)){
			$(ohides).addClass(ohide);
			$(id).removeClass(ohide);
		}
	}
	$("#person_amend").click(function(){
		perCenter(".percenterUl","personCenter_a","#infAmend",".ohides","ohide",$(this));
//		$.get("url",function(data){
//			$(".img").attr('src',data.imgsrc);
//			$(".userName").text(data.username)
//			$("#regmyName").val(data.myname);
//			$("#regBranch").val(data.branch);
//			$(".myPhone").text(data.myphone)
//			$(".myEmail").text(data.myemail)
//			$(".driverType").val(data.driverType);
//			$(".driType").val(data.driType);
//			$("#effecStart").val(data.effecStart);
//			$("#effecEnd").val(data.effecEnd);			
//		})
	})
	$("#person_news").click(function(){
		perCenter(".percenterUl","personCenter_a","#news",".ohides","ohide",$(this));
		
	})
	$("#peson_audit").click(function(){
		perCenter(".percenterUl","personCenter_a","#audit",".ohides","ohide",$(this));
	})
	$("#person_order").click(function(){
		perCenter(".percenterUl","personCenter_a","#infOrdercar",".ohides","ohide",$(this));
	})
	function baseInf(){
		var img1src=$(".img1").attr('src');
		if(img1src==""){
			alert('请上传车辆照片');
			return false;
		}
		var olength=$(".olength").val();		
	    if (olength.length == 0) {
	        alert("所有选项必填，有未填写选项！");
	        return false;
	    }	
	    var regMyname=$("#regmyName").val();
	    var regMyname=/^[\u4e00-\u9fa5]+$/;
	    if(!regMyname.test(regMyname)|| olength.length<2){
	    	alert("姓名格式为汉字且不少于两字！");
	        return false;
	    }
	    
//	    var carType = $("#regCarType").val();
//	    var regCarType = /^[a-zA-Z]{1}[0-9]{0,1}$/;
//	    if (!regCarType.test(carType)) {
//	        alert("请输入正确的准驾车型！");
//	        return false;
//	    }
	    return true;
	}
	//左侧表弟提交
	$("#mysubmit").click(function(){
		if(baseInf()){
			$("#myform").submit();
		}
	})
	//右侧验证
	function userSafe(){		
		var userName = $("#userName").val();	
	    var regName = /^[a-zA-Z0-9_]+$/;
	    if (!regName.test(userName)) {
	        alert("用户名只能由字母、数字或下划线组成！");
	        return;
   		}

		var oPhone = $("#oPhone").val();   
	    var regPhone = /^1[3578]\d{9}$/;
	    if(!regPhone.test(oPhone)){
	    	alert("请输入正确的手机号码");
	    	return;
	    }
	    var oEmail= $("#oEmail").val();   
	    var regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	    if (!regEmail.test(oEmail)) {
	        alert("邮箱格式不正确！");
	        return;
	    }
	    var opsw = $("#opsw").val();
	    var regpsw = /^[a-zA-Z0-9_]+$/;
	    if (opsw.length < 4) {
	        alert("登录密码不能为空，且不能少于4位！");
	        return;
	    }else if (!regpsw.test(opsw)) {
	        alert("登录密码只能由字母、数字或下划线组成！");
	        return;
	    }
	    return true;
	}
		var change=true;
		var num=0;
		$(".userName").text($("#userName").val());
		$(".myPhone").text($("#oPhone").val());
		$(".myEmail").text($("#oEmail").val());
		$(".change").click(function(){			
			if(change){
				$(this).prev().addClass('ohide');
				$(this).css('background','gray');
				$(this).text('保存');	
				change=!change;
				num++;
			}else{
				$(this).prev().removeClass('ohide');				
				$(this).css('background','#4575F8');
				$(this).text('修改');
				change=!change;
				num++;//至少触发两次事件才可以传数据
				if(userSafe()&&num>1){
					num=0;
					console.log(1);										
				}
			//保存获取值	
	//		var thisVal=$(this).parent().find('input').val();console.log(thisVal);
	//			$.get("url",{thisVal:thisVal},function(data){
	//				if(data.data==1){
	//					$(".myName",parent.document).text(thisVal);	
	//					$(".useName").text(thisVal);
	//				}else if(data.dada==2){
	//					$(".myPhone").text(thisVal);
	//				}else if(data.data==3){
	//					$(".myEmail").text(thisVal);
	//				}
	//			})
			}	
		});
//消息提醒
//	$.get('url',function(data){
//		var illegal=data.illegal;
//		var maturity=data.maturity;
//		var warning=data.warning;		
//		var warning=data.warning;
//		for(var i=0;i<illegal.length;i++){
//			$(".illegal1").append('<ul class="illegalInf clearfloat"><li class="illegal_num"><span>'+illegal[i].illegal_num+'</span></li>'
//			+'<li class="illegal_img"><img src="'+illegal[i].illegal_img+'"/></li><li class="illegal_inf">'
//			+'<ul class="illegal_infUl"><li class="illegal_infUl1"><span class="illegal_name">'+illegal[i].illegal_infUl11+'</span><span>'+illegal[i].illegal_infUl12+'</span></li>'
//			+'<li class="illegal_infUl2"><span>品牌：</span><span>'+illegal[i].illegal_infUl21+'</span></li><li class="illegal_infUl3"><span>车牌号：</span><span>'+illegal[i].illegal_infUl3+'</span></li>'
//			+'<li class="illegal_infUl4"><span>型号：</span><span>'+illegal[i].illegal_infUl4+'</span></li><li class="illegal_infUl5"><span>用车时间：</span><span>'+illegal[i].illegal_infUl51+'</span></li>'
//			+'</ul></li></ul>')					
//		}
//		for(var i=0;i<maturity.length;i++){
//			$(".maturity1").append('<ul class="maturityInf clearfloat"><li class="maturity_num"><span>'+maturity[i].maturity_num+'</span></li>'
//			+'<li class="maturity_inf1"><p><span class="brand1">'+maturity[i].maturity_inf11+'</span></p></li>'
//			+'<li class="maturity_inf2"><p class="maturity_inf21"><span>车牌号:</span><span>'+maturity[i].maturity_inf21+'</span></p><p class="maturity_inf22"><span>型号：</span><span>'+maturity[i].maturity_inf22+'</span></p></li>'						
//			+'<li class="maturity_inf3"><p class="maturity_inf31"><span>部门：</span><span>'+maturity[i].maturity_inf31+'</span></p><p class="maturity_inf32"><span>到期类型：</span><span class="maturity_type">'+maturity[i].maturity_inf32+'</span></p>'
//			+'</li></ul>')
//		}
//		for(var i=0;i<maintenance.length;i++){
//			$(".maintenance1").append('<ul class="maintenanceInf clearfloat"><li class="maintenance_num"><span>'+maintenance[i].maintenance_num+'</span></li>'
//			+'<li class="maintenance_inf1"><p><span class="brand1">'+maintenance[i].maintenance_inf11+'</span></p></li>'
//			+'<li class="maintenance_inf2"><p class="maintenance_inf21"><span>车牌号:</span><span>'+maintenance[i].maintenance_inf21+'</span></p><p class="maintenance_inf22"><span>型号：</span><span>'+maintenance[i].maintenance_inf22+'</span></p></li>'
//			+'<li class="maintenance_inf3"><p class="maintenance_inf31"><span>部门：</span><span>'+maintenance[i].maintenance_inf31+'</span></p><p class="maintenance_inf32"><span>维修申请人：</span><span>'+maintenance[i].maintenance_inf32+'</span></p>'
//			+'</li></ul>')
//		}
//		for(var i=0;i<warning.length;i++){
//			$(".warning1").append('<ul class="warningInf clearfloat"><li class="warning_num"><span>'+warning[i].warning_num+'</span></li>'
//			+'<li class="warning_inf1"><p class="warning_inf11"><span>您正在非法用车，非发用车类型为</span><span class="warning_reson">'+warning[i].warning_inf1+'</span></p></li>'
//			+'<p class="warning_inf12"><span>这是您这个月非法用车第</span><span class="warning_times">'+warning[i].warning_inf2+'</span><span>次</span></p><span class="warning_time">'+warning[i].warning_inf31+'</span>'
//			+'</li></ul>')
//		}																				
//	})

//待审批
//	$.get("url",function(data){
//		var warning=data.warning;
//		for(var i=0;i<warning.length;i++){
//			$("#audit").append($('<ul class="auditInf clearfloat"><li class="audit_img"><img src="../../img/index/carbg.jpg"/></li>'
//			+'<li class="audit_inf"><p><span class="fast">'+warning[i].fast+'</span><span class="auditAdm">'+warning[i].auditAdm+'</span><span>&nbsp;</span><span class="applyfor">'+warning[i].applyfor+'</span></p>'
//			+'<p><span class="applybody">'+warning[i].applybody+'</span><span>提交与</span><span class="sendtime">'+warning[i].sendtime+'</span></p></li>'
//			+'<li class="audit_node"><p><span>处理节点:</span><span class="auditadmin">'+warning[i].auditadmin+'</span></p>'
//			+'</li></ul>'
//			))
//		}
//	})

//预约车辆信息加载
//	$.ajax({
//		type:"get",
//		url:"",
//		dataType:"json",
//		async:true,
//		success:function(data){
//			var car_inf=data.car_inf;									
//			for(var i=0;i<car_inf.length;i++){
//				$("#infOrdercar").append($('<ul class="carInf clearfloat"><li class="inftitle" id="inftitle"><span class="firBrand">'+car_inf[i].brand1+'</span></li>'+
//				'<li class="infOne"><p><span class="licence1">车牌号：</span><span class="licence2">'+car_inf[i].licence+'</span></p><p><span class="model1">型号：</span><span class="model2">'+car_inf[i].model+'</span></p></li>'+
//				'<li class="infTwo"><p><span class="usetime1">用车时间：</span><span class="usetime2">'+car_inf[i].usetime+'</span></p><p><span class="returntime1">还车时间：</span><span class="returntime2">'+car_inf[i].returntime+'</span></p></li>'+
//				'<li class="infThree"><p><span class="destination1">目的地：</span><span class="destination2">'+car_inf[i].destination+'</span></p><p><span class="effect1">用途：</span><span class="effect2">'+car_inf[i].effect+'</span></p></li>'+
//				'<li class="infFour"><p><span class="ordertime1">预约车时间：</span><span class="ordertime2">'+car_inf[i].ordertime+'</span></p><p><span class="states1">'+car_inf[i].states1+'</span><span class="states2">'+car_inf[i].states2+'</span></p></li>'+
//				'<li class="infState" id="infState"><p><span class="infstate1"></span></p><p><span class="infstate2"></span></p></li>'
//				+'</ul>'));
//				if(car_inf[i].state==0){
//					$(".infstate1").text("取消预约");
//					$(".infstate1").addClass("stateCacle")
//					$(".infstate2").text("已预约");
//					$(".infstate2").addClass("statecolor");
//				}else if(car_inf[i].state==1){
//					$(".infstate1").text("取消预约");
//					$(".infstate1").addClass("stateCacle")
//					$(".infstate2").text("预约成功")
//					$(".infstate2").addClass("statecolor");
//				}else if(car_inf[i].state==2){
//					$(".infState").html('<span class="stateBack">马上还车</span>');
//				}else{
//					$(".infState").html('<span class="infstate3">已还车</span>');
//				}
//			}			
//		}
//	});
	//取消预约
	$(".stateCacle").click(function(){
		if($(this).text()=="取消预约"){
			$(this).parents('.carInf').remove();
			var licence=$(this).parents("carInf").find("licence2").text();
			$.get('url',{"licence":licence});
		}
	});
	

//查看预约审批
	if(window.location.search=="?look=orderInf"){
		if($(".percenterUl").hasClass("personCenter_a")){
			$(".percenterUl").removeClass("personCenter_a");
			$("#person_order").addClass("personCenter_a");
		}				
		if($("#infOrdercar").hasClass("ohide")){
			$(".ohides").addClass("ohide");
			$("#infOrdercar").removeClass("ohide");
		}
	}
//还车
	$(".stateBack").click(function(){
		$(".orderBg1",parent.document).removeClass("hideBg");
		
		$(".maintainYN input",parent.document).click(function(){
			if($(this).val()=="否"){
				$(".maintaintext",parent.document).val('暂无维修保养');
				console.log($(".maintaintext",parent.document).val())
			}
		});
		$(".instituteYN input",parent.document).click(function(){
			if($(this).val()=="否"){
				$(".resontext",parent.document).val('院内还车，用车完毕');
				console.log($(".resontext",parent.document).val())
			}
		});
		$(".quitSure #quit",parent.document).hover(function(){
			$(".quitSure #quit",parent.document).css('background','#4375f8');
			$(".quitSure #sure",parent.document).css('background','#FFFFFF');
		},function(){
			$(".quitSure #quit",parent.document).css('background','#FFFFFF');
			$(".quitSure #sure",parent.document).css('background','#4375f8');
		})
		$(".quitSure #quit",parent.document).click(function(){
			$(".orderBg1",parent.document).addClass("hideBg");
		});
		$(".quitSure #sure",parent.document).click(function(){
//			var carMile=$(".infList1 #carMile",parent.document).val();
			var carMile=parent.$(".infList1 #carMile").val();
			var retrunTime=$(".infList1 #retruntime",parent.document).val();
			var maintainText=$(".infList1 .maintaintext",parent.document).val();
			var resonText=$(".infList1 .resonText",parent.document).val();
			var olengths=$(".infList1 .olength",parent.document).val();
//			if(olengths.length!=0){console.log(1)
				//执行ajax

//			$.ajax({
//				type:"get",
//				url:"",
//				dataType:'json',
//				async:true,
//				data:{
	//				'carMile':carMile,
	//				'retrunTime':retrunTime,
	//				'maintainText':maintainText,
	//				'resonText':resonText
//				},
//				success:function(data){					
					$(".orderBg1",parent.document).addClass("hideBg");									
//				},
//				error:function(){				
//					alert("还车失败！")
//				}
//			});		
//			}else{alert('填写信息');return;}
		})
	})
	
	
	
	

})