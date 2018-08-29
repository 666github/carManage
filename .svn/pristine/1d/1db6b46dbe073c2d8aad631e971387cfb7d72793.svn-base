var i = setInterval(function(){
	$.ajax({
		type:"get",
		url:"../handler/CheckUserRole.ashx",
		xhrFields:{withCredentials:true},
		data:{"user":0, "from":0},
		success:function(data){
			data = JSON.parse(data);
			if(data.state == 1){
				alert("请退出之前账号然后登录！");
				window.location.href="login.html"
			}
		}
	});
},10000)

