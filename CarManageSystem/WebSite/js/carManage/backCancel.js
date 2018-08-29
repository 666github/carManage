$(function () {
    var viewBorrow = function () {
        //预约车辆信息加载
        $.ajax({
            type: "get",
            url: "http://192.168.1.111:2238/handler/PersonalCenter/Reservation/ViewBorrowCar.ashx",
//url:"data/huanche.json",
            dataType: "json",
            async: true,
            success: function (data) {
//              debugger
                if (data.state = "success") {
                    var car_inf = data.car_inf;
                    var carstate;
                    for (var i = 0; i < car_inf.length; i++) {debugger
                        if (car_inf[i].state == 0) {
                            carstate = ["取消预约", "已预约"]
                        } else if (car_inf[i].state == 1) {
                            carstate = ["取消预约", "预约成功"]
                        } else if (car_inf[i].state == 2) {
                            carstate = ["马上还车", ""]
                        } else if (car_inf[i].state == -1) {
                            carstate = ["已取消", ""]
                        }
                        else {
                            carstate = ["已还车", ""]
                        }
                       $("#infOrdercar").append($('<ul class="carInf clearfloat"><li class="inftitle" id="inftitle"><span class="unique" style="display:none;">'+car_inf[i].uniqueCode+'</span><span class="firBrand">'+car_inf[i].brand1+'</span></li>'+
						'<li class="infOne"><p><span class="licence1">车牌号：</span><span class="licence2">'+car_inf[i].licence+'</span></p><p><span class="model1">型号：</span><span class="model2">'+car_inf[i].model+'</span></p></li>'+
						'<li class="infTwo"><p><span class="usetime1">用车时间：</span><span class="usetime2">'+car_inf[i].usetime+'</span></p><p><span class="returntime1">还车时间：</span><span class="returntime2">'+car_inf[i].returntime+'</span></p></li>'+
						'<li class="infThree"><p><span class="destination1">目的地：</span><span class="destination2">'+car_inf[i].destination+'</span></p><p><span class="effect1">用途：</span><span class="effect2">'+car_inf[i].effect+'</span></p></li>'+
						'<li class="infFour"><p><span class="ordertime1">预约车时间：</span><span class="ordertime2">'+car_inf[i].ordertime+'</span></p></li>'+
						'<li class="infState" id="infState"><p><span class="infstate1'+(carstate[0]=="取消预约"?' stateCacle':(carstate[0]=="马上还车")?' stateBack':' infstate3')+'">'+carstate[0]+'</span></p><p><span class="infstate2">'+carstate[1]+'</span></p></li>'
						+'</ul>'));
//					
                    }
                backCacle();
                }else if (data.state == "1") {
                    alert("请重新登录");
                    location.href = "/login.html"
                } else {
                    alert(data.state);
                }
			}		
        });
    }
    viewBorrow();
	//取消预约
	function backCacle(){
		$(".stateCacle").click(function(){
			if($(this).text()=="取消预约"){				
				var olicence=$(this).parents(".carInf").find("licence2").text();
				var id=$(this).parents(".carInf").find(".unique").text();
				$.get('http://192.168.1.111:2238/handler/PersonalCenter/Reservation/CancelBorrow.ashx',{"uniqueCode":id},function(data){
				    if (data.state = "success") {
				        $("#infOrdercar").html('');
					    //$(this).parents('.carInf').remove();
					    alert('取消成功');
					    viewBorrow();
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="/login.html"
					}else{
						alert(data.state);
					}					
				});
			}
		});
//还车
		$(".stateBack").click(function () { 			
			var licence=$(this).parents(".carInf").find(".licence2").text();
			var id=$(this).parents(".carInf").find(".unique").text();
			var now = (new Date()).toLocaleString();
			$(".orderBg1").removeClass("hideBg");
			$("#retruntime").val(now);
			$(".maintainYN input").click(function(){
				if($(this).val()=="否"){
					$(".maintaintext").val('暂无维修保养');
					console.log($(".maintaintext").val())
				}
			});
//			$(".instituteYN input").click(function(){
//				if($(this).val()=="否"){
//					$(".resontext").val('院内还车，用车完毕');
//					console.log($(".resontext").val())
//				}
//			});
			$(".quitSure #quit").hover(function(){
				$(".quitSure #quit").css('background','#4375f8');
				$(".quitSure #sure").css('background','#FFFFFF');
			},function(){
				$(".quitSure #quit").css('background','#FFFFFF');
				$(".quitSure #sure").css('background','#4375f8');
			})
			$(".quitSure #quit").click(function(){
				$(".orderBg1").addClass("hideBg");
			});
			$(".quitSure #sure").click(function(){
				var maintainYN="";
				var instituteYN="";
				$.each($(".infList1 .maintainyn"),function(){
					if($(this)[0].checked){ 
						if($(this).val()=="否"){
							 maintainYN="0";
						}else{maintainYN="1";}
					}
				})
//				$.each($(".infList1 .instituteyn"),function(){
//					if($(this)[0].checked){ 
//						if($(this).val()=="否"){
//							instituteYN="0";
//						}else{ instituteYN="1";}
//					}
//				})		
				var carMile=parent.$(".infList1 #carMile").val();
				var retrunTime=$(".infList1 #retruntime").val();
				var instituteYN=$(".infList1 .instituteYN").val();
				var gasL=$(".infList1 .gasL").val();
				var maintainText=$(".infList1 .maintaintext").val();
				var resonText=$(".infList1 .resonText").val();
				var backLengths=$(".infList1 .backLength").val();
				for(var i=0;i<backLengths.length;i++){
					if(backLengths[i].length==0){alert("请填写未填信息");return;}
				}
				//执行ajax
				$.ajax({
					type:"get",
					url:"http://192.168.1.111:2238/handler/PersonalCenter/Reservation/ReturnCar.ashx",
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
						"uniqueCode":id
					},
					success: function (data) {

						if(data.state="success"){
							$(".orderBg1").addClass("hideBg");	
						}else if(data.state=="1"){
								alert("请重新登录");
							location.href="/login.html"
						}else{
							alert(data.state);
						}
					},
					error:function(e1,e2,e3){				
						alert("还车失败！")
					}
				});		
			})
		})
	}

})