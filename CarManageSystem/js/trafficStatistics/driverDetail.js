$(function(){
	detailInf();	
	function detailInf(){debugger		
		$.ajax({
			type:"get",
			url:"./data/wzcx.json",
//			xhrFields: {withCredentials: true}, 
//			data:{"departmentDetail":departmentDetail,"nameDetail":nameDetail,from:0},
			success:function(data){
//				var data=JSON.parse(data);
				if(data.state=="success"){
					var detailInf="<p class='departName'>"+departmentDetail+"&nbsp;"+nameDetail+"<span class='beExcel'>输出表格</span>"+"</p>";
					var brearule=data.brearule;					
					for(var i=0;i<brearule.length;i++){
						detailInf +='<ul class="detailInf">'+
						'<li ><span>日期:&nbsp;</span><span class="person">'+brearule[i].person+'</span></li>'+
						'<li ><span>车辆:&nbsp;</span><span class="act">'+brearule[i].act+'</span></li>'+
						'<li ><span>行驶里程:&nbsp;</span><span class="area">'+brearule[i].area+'</span></li>'+
						'<li ><span>违章情况:&nbsp;</span><span class="date">'+(brearule[i].date==""?"无":brearule[i].date)+'</span></li>'+
						'<li ><span>违章罚款:&nbsp;</span><span class="fen">'+(brearule[i].fen==""?"无":brearule[i].fen)+'</span><span>分</span></li>'+
						'<li ><span>加油费用:&nbsp;</span><span class="handled">'+brearule[i].handled+'</span></li>'+
						'<li ><span>维修保养费用:&nbsp;</span><span class="money">'+brearule[i].money+'</span><span>元</span></li>'+
						'</ul>'
					}
					$(".details").html(detailInf);
					beExcel();
				}else if(data.state=="1"){
					alert("请重新登录");
					window.location.href="./login.html"
				}else{
					alert(data.state);
				}
			},error:function(e1,e2,e3){
				console.log("请求失败");
			}
		})
	}
	function beExcel(){
		$(".beExcel").click(function(){
//				$.ajax({
//			    type: "get",
//			    dataType: "json",
//			    url: "http://192.168.1.120:2238/handler/GetDepartment.ashx",
//			    data:{from:0},
//			    xhrFields:{withCredentials:true},
//			    success: function (data) {
//			        if(data.state=="success"){
//						carquery();						
//					}else if(data.state=="1"){
//							alert("请重新登录");
//							location.href="./login.html"
//					}else{
//						alert(data.state);
//					}
//			    },
//			      error: function () {
//			          console.log("部门获取失败");
//			    }
//			})
		})
	}
	$(".detailBack").click(function(){
		$("#container").load("html/trafficStatistics/drivers.html");
	})
})