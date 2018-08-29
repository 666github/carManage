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
function PreviewImage(imgFile,id){
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
			document.getElementById(id).innerHTML = "<img class='img2' width='100%' height='100%' src='"+path+"' />";
		}
	}
}

$(function () {
    debugger
	getDepartment();
	 function getDepartment(){
		var option = $('#regBranch').html().trim();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "http://192.168.1.120:2238/handler/GetDepartment.ashx",
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
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
	}
	$.ajax({
		type:"get",
		url: "http://192.168.1.120:2238/handler/GetCurrentUser.ashx",
		data:{from:0},
		xhrFields:{withCredentials:true},
		dataType:"json",
		success:function(data){
			if(data.state=="success"){debugger
				var data = data.info;
				var regulation=data.regulation;
				if(regulation==1){//监管员
					$(".roleSupervise").attr("checked",true);
					$(".roleAdmin").attr("checked",false);
					$("#carManage,#peopleManage,#branchManage,#statistics").addClass("ohide");
					if(userType==2){$("#branchManage").addClass("ohide");}
				}else{
					$(".roleSupervise").attr("checked",false);
					$(".roleAdmin").attr("checked",true);
					$("#carManage,#peopleManage,#statistics").removeClass("ohide");
					if(userType==2){$("#branchManage").removeClass("ohide");}
				}				
				$(".img1").attr('src',data.imgsrc);
				$(".img2").attr('src',data.imgDri);
				$(".userName").text(data.username)
				$("#regmyName").val(data.myname);
				$("#regBranch").val(data.branch);
				$(".myPhone").text(data.myphone)
				$(".myEmail").text(data.myemail)
				$(".driverType").val(data.driverType);
				$(".driType").text(data.driType);
				$("#effecStart").val(data.effecStart);
				$("#effecEnd").val(data.effecEnd);
				$("#oPhone").val(data.myphone);
				$("#oPhone").attr("placeholder",data.myphone);
				$("#oEmail").val(data.myemail);
				$("#oEmail").attr("placeholder",data.myemail);	
				baseAmend();
				amendSafe();
				dritypeChecked();
				changeRole();
				changeNews();
			}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
			}else{
				alert(data.state);
			}
		}
	})
	//角色切换
	function changeRole(){
		$(".roleAdmin").click(function(){
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/SetRequlation.ashx",
				xhrFields:{withCredentials:true},
				data:{"regulation":0,from:0},
				success:function(data){
					var data=JSON.parse(data);
					if(data.state=="success"){
						$("#carManage,#peopleManage,#statistics").removeClass("ohide");
						if(userType==2){$("#branchManage").removeClass("ohide");}
						console.log("您现在是管理员");
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}
				}
			})
		})
		$(".roleSupervise").click(function(){debugger
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/SetRequlation.ashx",
				xhrFields:{withCredentials:true},
				data:{"regulation":1,from:0},
				success:function(data){
					var data=JSON.parse(data);
					if(data.state=="success"){
						$("#carManage,#peopleManage,#statistics").addClass("ohide");
						if(userType==2){$("#branchManage").addClass("ohide");}
						console.log("您现在是监管员");
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
	//推送消息选择
	function changeNews(){debugger
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/NotifySet/Get.ashx",
			xhrFields:{withCredentials:true},
			data:{from:0},
			success:function(data){
				var data=JSON.parse(data);
				if(data.state=="success"){
					var newsHtml='';
					var list=data.list;
					for(var i=0;i<list.length;i++){
						newsHtml+='<p><input type="checkbox" name="superviseContent" id="" value=""'+(list[i].value==1?'checked="checked"':'')+' /><span>'+list[i].key+'</span></p>'
					};
					$(".supervise").html(newsHtml);
					checkedNews();
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
				}else{
					alert(data.state);
				}
			}
		})
		function checkedNews(){
			var oinputs=$(".supervise input");
			oinputs.bind("click",function(){debugger
				var res=[];
				oinputs.each(function(){
					var okey="",ovalue="";
					okey=$(this).next().text();
					if(this.checked==true){
						ovalue=1;
					}else{
						ovalue=0;
					}
					res.push({"key":okey,"value":ovalue});
				})
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/NotifySet/Set.ashx",
					xhrFields:{withCredentials:true},
					data:{"res":JSON.stringify(res),from:0},
					success:function(data){
						var data=JSON.parse(data);
						if(data.state=="success"){
							console.log("消息类型选择成功");
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
	//基本信息验证
	function baseInf(){
		var img1src=$(".img1").attr('src');
		if(img1src==""){
			alert('请上传车辆照片');
			return false;
		}		
		var olengthCenter=$(".olengthCenter");		
	    for(var i=0;i<olengthCenter.length;i++){
	    	if (olengthCenter[i].value.length == 0) {
		        alert("所有选项必填，有未填写选项！");
		        return false;
	    	}
	    }
	    var oMyname=$("#regmyName").val();
	    var regMyname=/^[\u4e00-\u9fa5]+$/;
	    if(!regMyname.test(oMyname)|| oMyname.length<2){
	    	alert("姓名格式为汉字且不少于两字！");
	        return false;
	    }
	    if($(".driType").text()==""){
	    	alert("请选择准驾车型");
	    	return false;
	    }
	    return true;
	}
	//驾照类型修改
	$(".driType").click(function(event){
		event.stopPropagation();
		$(".zjcxInput").toggle();
	});
	$(".zjcxInput input").click(function(){
		var oinputs=$(".zjcxInput input");
		var arrchecked=[];
		$.each(oinputs, function() {
			if($(this)[0].checked){
				arrchecked.push($(this).val());
			}
		});
		$(".driType").text(arrchecked.join(","));
	});
	$("body").click(function(){
		if($(".zjcxInput").css("display")=="block"){
			$(".zjcxInput").css("display","none");			
		}
	});
	function dritypeChecked(){
		var strChecked=$(".driType").text();
		var arrChecked=strChecked.split(",");
		$.each(arrChecked, function(i) {
			$.each($(".zjcxInput input"), function() {
				if(arrChecked[i]==$(this).val()){
					$(this).attr("checked",true);
				}
			});
		});
	}
	//左侧表单提交
	function baseAmend(){
		var osubmit=false;
		$("#mysubmit").click(function(){
			if(osubmit){
				if(baseInf()){
					$("#myform").submit();
					$(".ulBg").css("display","block");
					$("#mysubmit").val("修改").css("background","#4575f8");			
					osubmit=!osubmit;
				};				
			}else{					
				$(".ulBg").css("display","none");
				$("#mysubmit").val("保存").css("background","#6d7383");
				osubmit=!osubmit;
			}
		})		
	}
	
	//右侧验证userSafe（）暂无用下面分开验证了
	function userSafe(){		
//		var userName = $("#userName").val();	
//	    var regName = /^[a-zA-Z0-9_]+$/;
//	    if (!regName.test(userName)) {
//	        alert("用户名只能由字母、数字或下划线组成！");
//	        return;
// 		}

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
	
	function amendSafe(){
		//SAFEdianhua
		var safePhone=true;
		$(".safePhone").click(function(){		debugger
			if(safePhone){
				$(this).prev().addClass('ohide');
				$(this).css('background','gray');
				$(this).text('保存');	
				safePhone=!safePhone;
	//			num++;
			}else{
				var oPhone = $("#oPhone").val();   
			    var regPhone = /^1[3578]\d{9}$/;
			    if(!regPhone.test(oPhone)){
			    	alert("请输入正确的手机号码");
			    	return;
			    }
				var phoneVal=$(this).parent().find('input').val();
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/PersonalCenter/ChangeInfo/ChangeSecurityInfo.ashx",
					xhrFields:{withCredentials:true},
					data:{"value":phoneVal,"flag":1,from:0},
					success:function(data){
						var data=JSON.parse(data);
						if(data.state=="success"){
							$(".myPhone").text(phoneVal);
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="/login.html"
						}else{
							alert(data.state);
						}
					}
				})
				$(this).prev().removeClass('ohide');				
				$(this).css('background','#4575F8');
				$(this).text('修改');
				safePhone=!safePhone;
			}		
		});
		//SAFEyouxiang
		var safeEmail=true;
		$(".safeEmail").click(function(){		
			if(safeEmail){
				$(this).prev().addClass('ohide');
				$(this).css('background','gray');
				$(this).text('保存');	
				safeEmail=!safeEmail;
	//			num++;
			}else{
				var oEmail= $("#oEmail").val();   
			    var regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			    if (!regEmail.test(oEmail)) {
			        alert("邮箱格式不正确！");
			        return;
			    }
			    var emailVal=$(this).parent().find('input').val();
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/PersonalCenter/ChangeInfo/ChangeSecurityInfo.ashx",
					xhrFields:{withCredentials:true},
					data:{"value":emailVal,"flag":2,from:0},
					success:function(data){
						var data=JSON.parse(data);
						if(data.state=="success"){
							$(".myEmail").text(emailVal);
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
				$(this).prev().removeClass('ohide');				
				$(this).css('background','#4575F8');
				$(this).text('修改');
				safeEmail=!safeEmail;			
			}		
		})
		//SAFEmima
		var safePsw=true;
		$(".safePsw").click(function(){		
			if(safePsw){
				$(this).prev().addClass('ohide');
				$(this).css('background','gray');
				$(this).text('保存');	
				safePsw=!safePsw;
			}else{
				var psw = $("#psw").val();
			    var regpsw = /^[a-zA-Z0-9_]+$/;
			    if (psw.length < 4) {
			        alert("登录密码不能为空，且不能少于4位！");
			        return;
			    }else if (!regpsw.test(psw)) {
			        alert("登录密码只能由字母、数字或下划线组成！");
			        return;
			    }			
				var oldPsw = $("#oldPsw").val();
				var pswVal=$("#psw").val();
				var rPsw = $("#rpsw").val();
				if(pswVal != rPsw){
					alert("新密码与确认密码输入不一致");
				}
				$.ajax({
					type:"get",
					url:"http://192.168.1.120:2238/handler/PersonalCenter/ChangeInfo/ChangeSecurityInfo.ashx",
					xhrFields:{withCredentials:true},
					data:{"oldvalue":oldPsw,"value":pswVal,"rvalue":rPsw,"flag":3,from:0},
					success:function(data){
						data = JSON.parse(data);
						if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
						}else{						
							alert(data.state);
						}
					}
				})
				$(this).prev().removeClass('ohide');				
				$(this).css('background','#4575F8');
				$(this).text('修改');
				safePsw=!safePsw;
			}		
		})
	}
	
	//申请管理员
	if(userType==1){
		$(".applayUp").removeClass("ohide");
		$(".applayUp").click(function(){
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/UserManage/ApplyToUser.ashx",
				xhrFields:{withCredentials:true},
				data:{"applyType":2,from:0},
				success:function(data){
					data = JSON.parse(data);
					if(data.state=="success"){
						alert("申请成功，等待院级管理员审核");					
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{						
						alert(data.state);
					}
				}
			})
		})
	}else{
		$(".applayUp").addClass("ohide");
	}
	
})

