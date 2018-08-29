$(function(){
	getDepartment();
	branchM();	
	function getDepartment(){
		var option = $('.infListBmto').html();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "../handler/GetDepartment.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
			success: function (data) {
	  			var obj = data;
	  			for (var i = 0; i < obj.length; i++) {
	      			option += '<option value="' + obj[i].Name + '">' + obj[i].Name + '</option>';
	 			}
				$('.infListBmto').html(option);
				var currentBranch = $(".branchName").text();
				$('.infListBmto').val(currentBranch);
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
	}
	function branchM(){
		$.ajax({
			type:"get",
			url:"../handler/DepartmentManage/View.ashx",
			xhrFields:{withCredentials:true},
			data:{from:0},
			dataType:"json",
			async:true,
			success:function(data){
//				var data=JSON.parse(data);
				if(data.state=="success"){
					var bmInf=data.bmInf;
					$(".bmNum").text(data.branchNum);
//					$(".bmInfs").html("");
//					for(var i=0;i<bmInf.length;i++){
//						$(".bmInfs").append('<ul class="bmInf">'
//						+'<li class="bmInf1"><p class="bmInf11">'+bmInf[i].bmInf11+'<span class="ids" style="display:none">'+bmInf[i].id+'</span></p>'
//						+'<p><span class="bmInf1amend"></span><span class="bmInf1del"></span></p></li>'
//						+'<li class="bmInf2"><span>该部门创建于</span>'+bmInf[i].bmInf2+'</li>'
//						+'<li class="bmInf3"><div class="bmInf31"><p class="driNum">'+bmInf[i].driNum+'</p><p class="driAll">司机总数</p></div>'
//						+'<div class="bmInf32"><p class="carNum">'+bmInf[i].carNum+'</p><p class="carAll">车辆总数</p></div>'							
//						+'</li></ul>')
//					}
					bM(bmInf);
					amendDel();
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
				}else{
					alert(data.state);
				}			
			},error:function(e1,e2,e3){
				console.log("加载失败")
			}
		});
	}
	//关闭
	$(".closed").click(function(){
		$(".BgBm").addClass("hideBg");
		$(".amendBm").addClass("hideBg");
		$(".delBm").addClass("hideBg");
		$(".addBm").addClass("hideBg");
	})
	//添加信息
	$(".bmAdd").click(function(){
		$(".BgBm").removeClass('hideBg');
		$(".addBm").removeClass('hideBg');	
//		document.onkeydown=function(e){debugger;
//			var ev=document.all ? window.event:e;
//			if(ev.keyCode==13){
//				$(".quitSure #sureadd").unbind("click").click();
//			}
//		}
	})
	$(".quitSure #quitadd").hover(function(){
		$(".quitSure #quitadd").css('background','#4375f8');
		$(".quitSure #sureadd").css('background','#FFFFFF');
	},function(){
		$(".quitSure #quitadd").css('background','#FFFFFF');
		$(".quitSure #sureadd").css('background','#4375f8');
	});
	$(".quitSure #quitadd").click(function(){
		$(".BgBm").addClass("hideBg");
		$(".addBm").addClass('hideBg');		
	});
	$(".quitSure #sureadd").unbind("click").click(function(){
			var branchBm=$(".infListBmadd").val();
			if(branchBm!=""){
					$.ajax({
					type:"get",
					url:"../handler/DepartmentManage/Add.ashx",
					xhrFields:{withCredentials:true},
					data:{"name":branchBm,from:0},
					dataType:"json",
					async:true,
					success:function(data){
						if(data.state=="success"){
							branchM();
							$(".BgBm").addClass("hideBg");
							$(".addBm").addClass('hideBg');
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
			}else{
				alert("请填写部门");
			}
		})
	function bM(bmInf){
		$(".bmInfs").html("");
		for(var i=0;i<bmInf.length;i++){
			$(".bmInfs").append('<ul class="bmInf">'
			+'<li class="bmInf1"><p class="bmInf11">'+bmInf[i].bmInf11+'<span class="ids" style="display:none">'+bmInf[i].id+'</span></p>'
			+'<p><span class="bmInf1amend"></span><span class="bmInf1del"></span></p></li>'
			+'<li class="bmInf2"><span>该部门创建于 </span>'+bmInf[i].bmInf2+'</li>'
			+'<li class="bmInf3"><div class="bmInf31"><p class="driNum">'+bmInf[i].driNum+'</p><p class="driAll">司机总数</p></div>'
			+'<div class="bmInf32"><p class="carNum">'+bmInf[i].carNum+'</p><p class="carAll">车辆总数</p></div>'							
			+'</li></ul>')
		}
	}
	
	function amendDel(){
		//修改部门
		var idXG;
		$(".bmInf1amend").click(function(){debugger
			$(".bmInf11").removeClass(".pVal");
			$(this).parents(".bmInf1").find(".bmInf11").addClass("pVal");
			idXG=$(this).parents(".bmInf1").find(".ids").text();
			$(".BgBm").removeClass('hideBg');
			$(".amendBm").removeClass('hideBg');				
		});
		$(".quitSure #quitamend").hover(function(){
			$(".quitSure #quitamend").css('background','#4375f8');
			$(".quitSure #sureamend").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quitamend").css('background','#FFFFFF');
				$(".quitSure #sureamend").css('background','#4375f8');
			});
			$(".quitSure #quitamend").click(function(){
				$(".BgBm").addClass("hideBg");
				$(".amendBm").addClass('hideBg');				
			});
		$(".quitSure #sureamend").unbind("click").click(function(){
			var branchBm=$(".infListBm").val();
			if(branchBm!=""){
					$.ajax({
					type:"get",
					url:"../handler/DepartmentManage/ChangeName.ashx",
					xhrFields:{withCredentials:true},
					data:{"id":idXG,"name":branchBm,from:0},
					success:function(data){
						var data=JSON.parse(data);
						if(data.state=="success"){
							$(".pVal").text(branchBm);
							$(".BgBm").addClass("hideBg");
							$(".amendBm").addClass("hideBg");	
//							var bmInf=data.bmInf;
							branchM();
						}else if(data.state=="1"){
							alert("请重新登录");
							window.loacation.href="./login.html";
						}else{
							alert(data.state);
							return;
						}
					}
				})
			}else{
				alert("请填写部门");
			}
		});
		
		//删除信息
		var oldidSC;
		var newPoint;
		var pVal;
		var driNum;
		var carNum;
		var oldidSC;
		$(".bmInf1del").click(function(){		
			pVal=$(this).parents(".bmInf1").find(".bmInf11").text();
			driNum=$(this).parents(".bmInf").find(".driNum").text();
			carNum=$(this).parents(".bmInf").find(".carNum").text();
			oldidSC=$(this).parents(".bmInf1").find(".ids").text();
			$(".BgBm").removeClass('hideBg');
			$(".delBm").removeClass('hideBg');							
		})
		
		$(".quitSure #quitDel").hover(function(){
				$(".quitSure #quitDel").css('background','#4375f8');
				$(".quitSure #sureDel").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quitDel").css('background','#FFFFFF');
				$(".quitSure #sureDel").css('background','#4375f8');
			});
		$(".quitSure #quitDel").click(function(){
			$(".BgBm").addClass("hideBg");
			$(".delBm").addClass('hideBg');
		});
		$(".quitSure #sureDel").unbind("click").click(function(){	
			var toVal=$(".infListBmto").val();
			
//			$.each($(".bmInf11"), function() {						
//				if($(this).parents(".bmInf").find(".bmInf11").text()==toVal && toVal!=pVal){
//					var driNum1=$(this).parents(".bmInf").find(".driNum").text();
//					var carNum1=$(this).parents(".bmInf").find(".driNum").text();
//					newPoint=$(this).parents(".bmInf").find(".ids").text()
//					$(this).parents(".bmInf").find(".driNum").text(parseInt(driNum1)+parseInt(driNum));
//					$(this).parents(".bmInf").find(".carNum").text(parseInt(carNum1)+parseInt(carNum));						
//					return;
//				};
//				if($(this).parents(".bmInf").find(".bmInf11").text()==pVal && toVal!=pVal){
////					$(this).parents(".bmInf").remove();
//				}				
//			});	
			deletHtml();
			function deletHtml(){debugger;
				$.ajax({
					type:"get",
					url:"../handler/DepartmentManage/Delete.ashx",
					xhrFields:{withCredentials:true},
					data:{"old":oldidSC,"newPoint":newPoint,from:0},
					success:function(data){
						var data=JSON.parse(data);
						if(data.state=="success"){	
							branchM();
							$(".BgBm").addClass("hideBg");
							$(".delBm").addClass('hideBg');
						}else if(data.state=="1"){
							alert("请重新登录");
							window.loacation.href="./login.html";
						}else{
							alert(data.state);
						}
					},error:function(e1,e2,e3){
						console.log("请求失败");
					}
				})
			}
		})
				
	}
	
	
})