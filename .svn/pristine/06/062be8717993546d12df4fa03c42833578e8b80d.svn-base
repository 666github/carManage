$(function () {
    var viewBorrow = function () {
        //预约车辆信息加载
        $.ajax({
            type: "get",
            url: "../handler/PersonalCenter/Reservation/ViewBorrowCar.ashx",
			xhrFields: {withCredentials:true}, 
			data:{from:0},
            dataType: "json",
            async: true,
            success: function (data) {
                debugger
                if (data.state == "success") {
                	$("#infOrdercar").html("");
                    var car_inf = data.car_inf;
                    var carstate;
                    for (var i = 0; i < car_inf.length; i++) {
                        if (car_inf[i].state == 0) {
                            carstate = ["取消预约", "审核中"]
                        } else if (car_inf[i].state == 1) {
                            carstate = ["取消预约", "预约成功"]
                        } else if (car_inf[i].state == 2) {
                            carstate = ["马上还车", ""]
                        } else if (car_inf[i].state == -1) {
                            carstate = ["已取消", ""]
                        }else if(car_inf[i].state == 4) {
                            carstate = ["已拒绝", ""]
                        }else {
                            carstate = ["已还车", ""]
                        }
                       $("#infOrdercar").append($('<ul class="carInf clearfloat"><li class="inftitle" id="inftitle"><span class="unique" style="display:none;">'+car_inf[i].uniqueCode+'</span><span class="firBrand">'+car_inf[i].brand1+'</span></li>'+
						'<li class="infOne"><p><span class="licence1">车牌号：</span><span class="licence2">'+car_inf[i].licence+'</span></p><p><span class="model1">型号：</span><span class="model2">'+car_inf[i].model+'</span></p></li>'+
						'<li class="infTwo"><p><span class="usetime1">用车时间：</span><span class="usetime2">'+car_inf[i].usetime+'</span></p><p><span class="returntime1">还车时间：</span><span class="returntime2">'+car_inf[i].returntime+'</span></p></li>'+
						'<li class="infThree"><p><span class="ordertime1">预约车时间：</span><span class="ordertime2">'+car_inf[i].ordertime+'</span></p><p><span class="effect1">用途：</span><span class="effect2">'+car_inf[i].effect+'</span></p></li>'+
						'<li class="infFour"><p><span class="destination1">目的地：</span><span class="destination2">'+car_inf[i].destination+'</span></p></li>'+
						'<li class="infState" id="infState"><p><span class="infstate1'+(carstate[0]=="取消预约"?' stateCacle':(carstate[0]=="马上还车")?' stateBack':' infstate3')+'">'+carstate[0]+'</span></p><p><span class="infstate2">'+carstate[1]+'</span></p></li>'
						+'</ul>'));
//					
                    }
                    if(car_inf.length==0){
						$("#infOrdercar").html("<div style='color:red;text-align:center;line-height:30px;'>暂无信息</div>")
					}
                backCacle();
                }else if (data.state == "1") {
                    alert("请重新登录");
                    location.href = "./login.html"
                } else {
                    alert(data.state);
                }
			}		
        })
    }
    viewBorrow();
	//取消预约
	function backCacle(){
		$(".stateCacle").click(function(){debugger
			if($(this).text()=="取消预约"){				
				var olicence=$(this).parents(".carInf").find(".licence2").text();
				var id=$(this).parents(".carInf").find(".unique").text();
				$.ajax({
					url:'../handler/PersonalCenter/Reservation/CancelBorrow.ashx',
					data:{"uniqueCode":id,from:0},
					xhrFields: {withCredentials:true}, 
		            dataType: "json",
		            async: true,
		            success:function(data){
					    if (data.state == "success") {
					        $("#infOrdercar").html('');
						    //$(this).parents('.carInf').remove();
						    alert('取消成功');
						    viewBorrow();
//						    localStorage.accessed="0";debugger
//						    accessed=localStorage.getItem('accessed');
//						    console.log(accessed,accessed,accessed)
						}else if(data.state=="1"){
							alert("请重新登录");
							location.href="./login.html"
						}else{
							alert(data.state);
						}
					}
				})
			}
		})
//还车	
		var idHC;
		var othis;
		var licence;
		$(".stateBack").click(function () { 
			othis=$(this);
			licence=$(this).parents(".carInf").find(".licence2").text();
			idHC=$(this).parents(".carInf").find(".unique").text();
			var now = (new Date()).toLocaleString();
			$(".orderBg1").removeClass("hideBg");
			$(".orderInf").removeClass("hideBg");
			$("#retruntime").val(now);			
		})
//		if($(".maintainYN").val()==0){debugger
//			$(".maintaintext").val('暂无维修保养');
//		}
		$(".maintainYN input").unbind("click").click(function(){
			if($(this).val()=="否"){
				$(".maintaintext").val('暂无维修保养').attr("readonly","readonly");
				console.log($(".maintaintext").val())
			}else{
				if(confirm("确定维修保养？")){debugger
					$(".maintaintext").val('').removeAttr("readonly");
				}else{
					$(".maintainYN2").click();
				}				
			}
		});
		$(".instituteYN").change(function(){
			if($(".instituteYN").val()!="院外"){
				$(".resontext").addClass("ohide");
			}else{
				$(".resontext").removeClass("ohide");
			}
		})
		$(".orderInf>p>span:last-child").click(function(){
			$(".maintainYN2").click();
		})
		$(".quitSure #quitBack").hover(function(){
				$(".quitSure #quitBack").css('background','#4375f8');
				$(".quitSure #sureBack").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quitBack").css('background','#FFFFFF');
				$(".quitSure #sureBack").css('background','#4375f8');
			})
		$(".quitSure #quitBack").unbind("click");
			$(".quitSure #quitBack").bind("click",function(){
				$(".orderBg1").addClass("hideBg");
				$(".maintainYN2").click();
			});
//		======
		$(".quitSure #sureBack").unbind("click");
		$(".quitSure #sureBack").bind("click",function(){debugger
				var maintainYN="";
//				var instituteYN="";
				$.each($(".infList1 .maintainyn"),function(){
					if($(this)[0].checked){ 
						if($(this).val()=="否"){
							 maintainYN="0";
						}else{maintainYN="1";}
					}
				})		
				var carMile=parent.$(".infList1 #carMile").val();
				var retrunTime=$(".infList1 #retruntime").val();
				var instituteYN=$(".infList1 .instituteYN").val();
				var gasL=$(".infList1 .gasL").val();
				var maintainText=$(".infList1 .maintaintext").val();
				var resonText=$(".infList1 .resontext").val();
				var backLengths=$(".infList1 .backLength");
				if($(".instituteYN").val()!="院外"){
					backLengths.length-=1;
				}
				for(var i=0;i<backLengths.length;i++){
					if(backLengths[i].value.length==0){alert("请填写未填信息");return;}
				}
				//验证里程				
				var regMileage=/^[0-9]*\.?[0-9]*$/;
			    var oMileage = $("#carMile").val();
			    if (!regMileage.test(oMileage)) {
			        alert("里程格式为纯数字或数字加小数点");
			        return ;
			    }
			    backMileage();
			    function backMileage(){
					$.ajax({
						type:"get",
						url:"../handler/PersonalCenter/Reservation/GetCarMileage.ashx",
						xhrFields: {withCredentials:true}, 
						dataType:'json',
						async:true,
						data:{
							'carNumber':licence,							
							from:0
						},
						success: function (data) {debugger
							if(data.state=="success"){
								var oldMileage=data.mileage;
								if(carMile - oldMileage >500){
									if(!confirm("本次行车里程大于500公里，是否确认")){
										return;
									}
								}
								returnInf();
							}else if(data.state=="1"){
									alert("请重新登录");
								location.href="./login.html"
							}else{
								alert(data.state);
							}
						},
						error:function(e1,e2,e3){				
							alert("里程请求失败！");
						}
					})
				}
//			    $(".quitSure #sureBack").unbind("click");				
				//执行ajax
				function returnInf(){
					$.ajax({
						type:"get",
						url:"../handler/PersonalCenter/Reservation/ReturnCar.ashx",
						xhrFields: {withCredentials:true}, 
						dataType:'json',
						async:true,
						data:{
							'travMileage':carMile,
							'retrunTime':retrunTime,
							"gasL":gasL,
							"carRepair":maintainYN,
							'carRepairDetail':maintainText,					
							"returnAtOut":instituteYN,					
							'returnDetail':resonText,
							"uniqueCode":idHC,
							from:0
						},
						success: function (data) {
							if(data.state=="success"){
								$(".orderBg1").addClass("hideBg");
								$(".maintainYN2").click();
								othis.text("已还车").addClass("infstate3")
								othis.removeClass("stateBack");
//								localStorage.accessed="0";debugger
//								console.log(localStorage.accessed)
							}else if(data.state=="1"){
									alert("请重新登录");
								location.href="./login.html"
							}else{
								alert(data.state);
							}
						},
						error:function(e1,e2,e3){				
							alert("还车失败！")
						}
					})
				}
			})
		
	}

})