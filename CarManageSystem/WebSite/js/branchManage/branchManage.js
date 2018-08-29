$(function(){
	$.ajax({
		type:"get",
		url:"/handler/DepartmentManage/View.ashx",
		dataType:"json",
		async:true,
		success:function(data){
			if(data.state=="success"){
				var bmInf=data.bmInf;
				$(".bmNum").text(data.branchNum);
				for(var i=0;i<bmInf.length;i++){
					$(".bmInfs").append('<ul class="bmInf">'
					+'<li class="bmInf1"><p class="bmInf11">'+bmInf[i].bmInf11+'<span class="ids" style="display:none">'+bmInf[i].id+'</span></p><p><span class="bmInf1amend"></span><span class="bmInf1del"></span></p></li>
					+'<li class="bmInf2"><span>该部门创建于</span>'+bmInf[i].bmInf2+'</li>'
					+'<li class="bmInf3"><div class="bmInf31"><p class="driNum">'+bmInf[i].driNum+'</p><p class="driAll">司机总数</p></div>'
					+'<div class="bmInf32"><p class="carNum">'+bmInf[i].carNum+'</p><p class="carAll">车辆总数</p></div>'							
					+'</li></ul>')
				}
				amendDel();
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="login.html"
			}else{
				alert(data.state);
			}			
		},error:function(e1,e2,e3){
			console.log("加载失败")
		}
	});
	//添加信息
	$(".bmAdd").click(function(){
		$(".BgBm").removeClass('hideBg');
		$(".addBm").removeClass('hideBg');
		$(".quitSure #quit").hover(function(){
				$(".quitSure #quit").css('background','#4375f8');
				$(".quitSure #sure").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quit").css('background','#FFFFFF');
				$(".quitSure #sure").css('background','#4375f8');
			});
		$(".quitSure #quit").click(function(){
			$(".BgBm").addClass("hideBg");
			$(".addBm").addClass('hideBg');
		});
		$(".quitSure #sure").click(function(){
			var branchBm=$(".infListBmadd").val();
			$.get("/handler/DepartmentManage/Add.ashx",{"name":branchBm},function(data){
				if(data.state=="success"){
					var bmInf=data.bmInf;
					$(".bmInfs").html("");
					for(var i=0;i<.length;i++){
						$(".bmInfs").append('<ul class="bmInf">'
						+'<li class="bmInf1"><p class="bmInf11">'+bmInf[i].bmInf11+'<span class="ids" style="display:none">'+bmInf[i].id+'</span></p><p><span class="bmInf1amend"></span><span class="bmInf1del"></span></p></li>
						+'<li class="bmInf2"><span>该部门创建于</span>'+bmInf[i].bmInf2+'</li>'
						+'<li class="bmInf3"><div class="bmInf31"><p class="driNum">'+bmInf[i].driNum+'</p><p class="driAll">司机总数</p></div>'
						+'<div class="bmInf32"><p class="carNum">'+bmInf[i].carNum+'</p><p class="carAll">车辆总数</p></div>'							
						+'</li></ul>')
					}
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="login.html"
				}else{
					alert(data.state);
				}
			})
			$(".BgBm").addClass("hideBg");
			$(".addBm").addClass('hideBg');
		});
	})
	
	function amendDel(){
		//修改部门
		$(".bmInf1amend").click(function(){
			$(".bmInf11").removeClass(".pVal");
			$(this).parents(".bmInf1").find(".bmInf11").addClass("pVal");
			var id=$(this).parents(".bmInf1").find("ids").text();
	//		debugger;
			$(".BgBm").removeClass('hideBg');
			$(".amendBm").removeClass('hideBg');
			$(".quitSure #quit").hover(function(){
					$(".quitSure #quit").css('background','#4375f8');
					$(".quitSure #sure").css('background','#FFFFFF');
				},function(){
					$(".quitSure #quit").css('background','#FFFFFF');
					$(".quitSure #sure").css('background','#4375f8');
				});
			$(".quitSure #quit").click(function(){
				$(".BgBm").addClass("hideBg");
				$(".amendBm").addClass('hideBg');
			});	
			$(".quitSure #sure").click(function(){
				var branchBm=$(".infListBm").val();
				$.get("/handler/DepartmentManage/ChangeName.ashx",{"id":id,"name":branchBm},function(data){
					if(data.state=="success"){
						$(".pVal").text(branchBm);
						$(".BgBm").addClass("hideBg");
						$(".amendBm").addClass("hideBg");					
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="login.html"
					}else{
						alert(data.state);
					}
				})
			});
		});
		//删除信息
		$(".bmInf1del").click(function(){		
			var pVal=$(this).parents(".bmInf1").find(".bmInf11").text();
			var driNum=$(this).parents(".bmInf").find(".driNum").text();
			var carNum=$(this).parents(".bmInf").find(".carNum").text();
			var oldid=$(this).parents(".bmInf1").find(".ids").text();
			$(".BgBm").removeClass('hideBg');
			$(".delBm").removeClass('hideBg');
			$(".quitSure #quit").hover(function(){
				$(".quitSure #quit").css('background','#4375f8');
				$(".quitSure #sure").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quit").css('background','#FFFFFF');
				$(".quitSure #sure").css('background','#4375f8');
			});
			$(".quitSure #quit").click(function(){
				$(".BgBm").addClass("hideBg");
				$(".delBm").addClass('hideBg');
			});
			$(".quitSure #sure").click(function(){	
				var toVal=$(".infListBmto").val();
				var newPoint="";
				$.each($(".bmInf11"), function() {						
					if($(this).parents(".bmInf").find(".bmInf11").text()==toVal && toVal!=pVal){
						var driNum1=$(this).parents(".bmInf").find(".driNum").text();
						var carNum1=$(this).parents(".bmInf").find(".driNum").text();
						newPoint=$(this).parents(".bmInf").find(".ids").text()
						$(this).parents(".bmInf").find(".driNum").text(parseInt(driNum1)+parseInt(driNum));
						$(this).parents(".bmInf").find(".carNum").text(parseInt(carNum1)+parseInt(carNum));						
						return;
					}
					if($(this).parents(".bmInf").find(".bmInf11").text()==pVal && toVal!=pVal){
						$(this).parents(".bmInf").remove();
					}
				});
				$.get("/handler/DepartmentManage/Delete.ashx",{"old":oldid,"newPoint"：newPoint},function(data){
					if(data.state=="success"){					
////拿到了外面						$.each($(".bmInf11"), function() {						
////							if($(this).parents(".bmInf").find(".bmInf11").text()==toVal && toVal!=pVal){
////								var driNum1=$(this).parents(".bmInf").find(".driNum").text();
////								var carNum1=$(this).parents(".bmInf").find(".driNum").text();
////								$(this).parents(".bmInf").find(".driNum").text(parseInt(driNum1)+parseInt(driNum));
////								$(this).parents(".bmInf").find(".carNum").text(parseInt(carNum1)+parseInt(carNum));						
////								return;
////							}
////							if($(this).parents(".bmInf").find(".bmInf11").text()==pVal && toVal!=pVal){
////								$(this).parents(".bmInf").remove();
////							}
////						});						
////						$(".BgBm").addClass("hideBg");
////						$(".delBm").addClass('hideBg');
						var bmInf=data.bmInf;
						$(".bmInfs").html("");
						for(var i=0;i<.length;i++){
							$(".bmInfs").append('<ul class="bmInf">'
							+'<li class="bmInf1"><p class="bmInf11">'+bmInf[i].bmInf11+'<span class="ids" style="display:none">'+bmInf[i].id+'</span></p><p><span class="bmInf1amend"></span><span class="bmInf1del"></span></p></li>
							+'<li class="bmInf2"><span>该部门创建于</span>'+bmInf[i].bmInf2+'</li>'
							+'<li class="bmInf3"><div class="bmInf31"><p class="driNum">'+bmInf[i].driNum+'</p><p class="driAll">司机总数</p></div>'
							+'<div class="bmInf32"><p class="carNum">'+bmInf[i].carNum+'</p><p class="carAll">车辆总数</p></div>'							
							+'</li></ul>')
						}
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="login.html"
					}else{
						alert(data.state);
					}
	
				});					
			})		
		});
	}
	
	
})