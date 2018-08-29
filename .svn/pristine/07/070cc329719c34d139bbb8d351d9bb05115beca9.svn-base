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
	$.get("http://192.168.1.114:2238/handler/GetCurrentUser.ashx",function(data){			
		if(data.state=="success"){
			$(".img").attr('src',data.imgsrc);
			$(".userName").text(data.username)
			$("#regmyName").val(data.myname);
			$("#regBranch").val(data.branch);
			$(".myPhone").text(data.myphone)
			$(".myEmail").text(data.myemail)
			$(".driverType").val(data.driverType);
			$(".driType").val(data.driType);
			$("#effecStart").val(data.effecStart);
			$("#effecEnd").val(data.effecEnd);
		}else if(data.state=="1"){
				alert("请重新登录");
				location.href="/login.html"
		}else{
			alert(data.state);
		}
	})


	function baseInf(){
		var img1src=$(".img1").attr('src');
		if(img1src==""){
			alert('请上传车辆照片');
			return false;
		}
		var olengthCenter=$(".olengthCenter").val();		
	    if (olengthCenter.length == 0) {
	        alert("所有选项必填，有未填写选项！");
	        return false;
	    }	
	    var regMyname=$("#regmyName").val();
	    var regMyname=/^[\u4e00-\u9fa5]+$/;
	    if(!regMyname.test(regMyname)|| olengthCenter.length<2){
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
	var osubmit=false;
	if(osubmit){
		$("#mysubmit").click(function(){						
			if(baseInf()){
				$("#myform").submit();
			};
			$(".ulBg").css("display","block");
			$("#mysubmit").val("修改");			
			osubmit=!osubmit;
		})
	}else{
		$("#mysubmit").click(function(){						
			$(".ulBg").css("display","none");
			$("#mysubmit").val("保存");
			osubmit=!osubmit;
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
	//SAFEdianhua
	var safePhone=true;
	$(".safePhone").click(function(){		
		if(safePhone){
			$(this).prev().addClass('ohide');
			$(this).css('background','gray');
			$(this).text('保存');	
			safePhone=!safePhone;
			num++;
		}else{
			var oPhone = $("#oPhone").val();   
		    var regPhone = /^1[3578]\d{9}$/;
		    if(!regPhone.test(oPhone)){
		    	alert("请输入正确的手机号码");
		    	return;
		    }
			var phoneVal=$(this).parent().find('input').val();console.log(phoneVal);
			$.get("http://192.168.1.114:2238/handler/PersonalCenter/ChangeSecurityInfo.ashx",{"value":phoneVal,"flag":1},function(data){				
				if(data.state=="success"){
					$(".myPhone").text(phoneVal);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
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
			num++;
		}else{
			var oEmail= $("#oEmail").val();   
		    var regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		    if (!regEmail.test(oEmail)) {
		        alert("邮箱格式不正确！");
		        return;
		    }
		    var emailVal=$(this).parent().find('input').val();console.log(emailVal);
			$.get("/handler/PersonalCenter/ChangeSecurityInfo.ashx",{"value":emailVal,"flag":2},function(data){				
				if(data.state=="success"){
					$(".myEmail").text(emailVal);
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
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
			var opsw = $("#opsw").val();
		    var regpsw = /^[a-zA-Z0-9_]+$/;
		    if (opsw.length < 4) {
		        alert("登录密码不能为空，且不能少于4位！");
		        return;
		    }else if (!regpsw.test(opsw)) {
		        alert("登录密码只能由字母、数字或下划线组成！");
		        return;
		    }			
			var pswVal=$(this).parent().find('input').val();console.log(pswVal);
			$.get("/handler/PersonalCenter/ChangeSecurityInfo.ashx",{"value":pswVal,"flag":3},function(data){
				if(data.state=="1"){
					alert("请重新登录");
					location.href="/login.html"
				}else{
					alert(data.state);
				}
			})
			$(this).prev().removeClass('ohide');				
			$(this).css('background','#4575F8');
			$(this).text('修改');
			safePsw=!safePsw;
		}		
	})
	
})