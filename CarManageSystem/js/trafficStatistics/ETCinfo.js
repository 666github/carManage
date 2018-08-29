$(function () {
	getDepartment();
	function getDepartment(){
		var option = $('.allBranch').html();
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
				$('.allBranch').html(option);
				var currentBranch = $(".branchName").text();
				$(".allBranch").val(currentBranch);
				if(userType==1){
					$(".allBranch").attr("disabled","disabled");
				}
				getLicence();
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
	}	
	function getLicence(){		
		var option = '<option value="">车牌号</option>';
		var currentBranch = $(".allBranch").val();
         $.ajax({
            type: "post",
            dataType: "json",
            url: "http://192.168.1.120:2238/handler/GetCarNumbers.ashx",
            data:{"department":currentBranch,from:0},
            xhrFields:{withCredentials:true},
            success: function (data) {
                var obj = data;
                for (var i = 0; i < obj.length; i++) {
                   option += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
                }
                $('.licences').html(option);
                detailInf();
            },
            error: function () {
                console.log("车牌获取失败");
            }
         })
	}
//事件	
	//detailInf();
	$(".allBranch").change(function(){
		getLicence();
	})
	$(".licences").change(function(){
		detailInf();
	})
	$("#usedTime1").click(function(){
		$("#usedTime1").focus(function(){
			detailInf();			
			$("#usedTime1").blur();
		});
	})	
	$("#usedTime2").click(function(){
		$("#usedTime2").focus(function(){
			detailInf();
			$("#usedTime2").blur();
		});
	})
	//导入事件
	$("#etcImport").change(function () {
    	importChange();
	})
//查询	
	function detailInf(){
	var usedcarInf = '';
	var department=$(".allBranch").val();
	var carNumber=$(".licences").val();
	var usedTime1=$("#usedTime1").val();
	var usedTime2=$("#usedTime2").val();
	debugger
	$.ajax({
		type:"get",
		url:"http://192.168.1.120:2238/handler/ETC/GetInfo.ashx",
		async:false,
		data:{"department":department,"carNumber":carNumber,"usedTime1":usedTime1,"usedTime2":usedTime2,from:0},
		xhrFields:{withCredentials:true},
		success:function(data){
			var data=JSON.parse(data);
			if(data.state=="success"){
				var infos=data.infos;
				for(var i=0;i<infos.length;i++){
					usedcarInf+='<ul class="infos">'+
					'<li class="list1">'+infos[i].Elist1+'</li><li class="list2">'+infos[i].Elist2+'</li>'+
					'<li class="list3">'+infos[i].Elist3+'</li><li class="list4" title="'+infos[i].Elist4+'">'+infos[i].Elist4+'</li>'+
					'<li class="list5 list52">'+infos[i].Elist5+'</li>'+
					'</ul>'	
				}					
				$('.usedInfsB').html(usedcarInf);
			}else if(data.state=="1"){
				alert("请重新登录");
				window.location.href="./login.html"
			}else{
				alert(data.state);
			}
		},error:function(e1,e2,e3){
			console.log("请求失败");
		}
	});
}
//导入事件
	function importChange() {debugger
	    //判断空文件上传
	    $.ajaxFileUpload({
	        secureuri: false,
	        fileElementId: 'etcImport',
	        dataType: 'json',
	        url: "http://192.168.1.120:2238/handler/ETC/Import.ashx",
	        xhrFields: { withCredentials: true },
	        data: { from: 0 },
	        success: function (res) {
	            var data = JSON.parse(res);
	            if (data.state == "success") { 
	            	alert("导入成功");
	                detailInf()
	            } else if (data.state == "1") {
	                alert("请重新登录");
	                window.location.href = "./login.html"
	            } else {
	                alert(data.state);
	            }
	            $("#etcImport").val("");
	            console.log("请求成功");           
	            $("#etcImport").change(function () {
	                importChange();
	            });
	        }, error: function (e1, e2, e3) {
	            console.log("请求失败");
	        }
	    })
	};
})	

