$(function(){
	$(".findPsw").click(function(){
		$(".bg").removeClass("hide");
		$("#findPsw").removeClass("hide");
	})
	//邮箱发送
//	$(".send").click(function(){
//		$(".bg").addClass("hide");
//		$("#findPsw").addClass("hide");
//		var emailId=$("#emailId").val();
//		console.log(emailId)
//	})
	//键盘Enter
	document.onkeydown=function(e){
		var ev = document.all ? window.event:e;
		if(ev.keyCode==13){
			$(".loginBtn").click();
		}
	}
	//登录页面验证
	$(".loginBtn").click(function(){
		var userName=$("#userName").val();
		var userPsw=$("#userPsw").val();		
		if(userName.length==0){
			alert("请输入账户");
			return;
		}
		if(userPsw.length==0){
			alert("请输入密码");
			return;
		}		

		$.ajax({						
			type:"post",
			dataType:"json",
			url:"../handler/Login.ashx",
			data:{userName:userName,userPsw:userPsw,from:0},
			xhrFields:{withCredentials:true},
            success: function (data) {
                if (data.state == "success") {
                    if (data.data == 0) {
                        window.location.href = "./index_dri.html";
                    }
                    else if (data.data == 1) {
                        window.location.href = "./index.html";
                    }
                    else if (data.data == 2) {
                        alert("账户错误");
                    } else {
                        alert("密码错误");
                    }
                }
                else {
                    alert(data.state);
                }

			},
			error:function(){
				alert("登录失败");
			}
		});
	})
})