$(function(){
//	var allBranch="";
//		if($(".allBran").children().hasClass("allBranch")){
//			allBranch=$(".allBranch").val();
//		}else{
//			allBranch=$(".branchName",parent.document).text();//司机没部门可选 将主页部门信息加载过来
//		}
//	$.ajax({
//		type:"get",
//		url:"",
//		data:{"allBranch":allBranch},
//		dataType:"json",
//		async:true,
//		success:function(data){
//			$(".unUsed").text(data.unUsed);
//			var car_inf=data.car_inf;//
//			var arr_carInf=[];
//			var arr_carImg=[];
//			var arr_brand1=[];
//			var arr_brand2=[];
//			var arr_licence=[];
//			var arr_space=[];
//			for(var i=0;i<car_inf.length;i++){
//				arr_carImg.push(car_inf[i].carImg);
//				arr_brand1.push(car_inf[i].brand1);
//				arr_brand2.push(car_inf[i].brand2);
//				arr_licence.push(car_inf[i].licence);
//				arr_space.push(car_inf[i].space);
//			}
//			carsInf(car_inf,arr_carImg,arr_brand1,arr_brand2,arr_licence,arr_space,arr_state);
//		}
//	});
//	function carsInf(car_inf,arr_carImg,arr_brand1,arr_brand2,arr_licence,arr_space,arr_state){
//		for(var i=0;i<car_inf.length;i++){
//			$("#car_inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
//			'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span><span class="secBrand">'+arr_brand2[i]+'</span></li>'+
//			'<li class="licence"><span class="carLicence">'+arr_licence[i]+'</span><span></span>&nbsp;-&nbsp;<span class="carSpace">'+arr_state[i]+'</span></li>'+
//			'<li class="stateInf"><div class="nowOrder">马上预约>></div></li>'
//			+'</ul>'));				
//		}		
//	}

	
	//用车申请
	$(".nowOrder").click(function(){
		console.log(234);
		$(".applyOrderBg",parent.document).removeClass('hideBg');
		$(".applyOrderBg .applyOrderInf",parent.document).removeClass("hideBg");
		$(".applyOrderBg .applyOrderInf",parent.document).addClass("animated bounceIn");
		$(".applyOrderBg .applyOrderSee",parent.document).addClass("hideBg");
		$(".applyQuitSure #applyQuit",parent.document).hover(function(){
			$(".applyQuitSure #applyQuit",parent.document).css('background','#4375f8');
			$(".applyQuitSure #applyOrderSure",parent.document).css('background','#FFFFFF');
		},function(){
			$(".applyQuitSure #applyQuit",parent.document).css('background','#FFFFFF');
			$(".applyQuitSure #applyOrderSure",parent.document).css('background','#4375f8');
		})
		$(".applyQuitSure #applyQuit",parent.document).click(function(){
			$(".applyOrderBg",parent.document).addClass("hideBg");
		});
		$(".applyQuitSure #applyOrderSure",parent.document).click(function(){
			var useTime=$(".applyInfList #applyUseTime",parent.document).val();
			var retrunTime=$(".applyInfList #applyRetrunTime",parent.document).val();
			var branchs=$(".applyInfList .branchs",parent.document).val();
			var destination=$(".applyInfList #applyDestination",parent.document).val();
			var resonText=$(".applyInfList .applyResonText",parent.document).val();
			var olengths=$(".applyInfList .olength",parent.document).val();
//			if(olengths.length!=0){
				//执行ajax
//				$.ajax({
//					type:"get",
//					url:"",
//					dataType:'json',
//					async:true,
//					data:{
//						'useTime':useTime,
//						'retrunTime':retrunTime,
//						'branchs':branchs,
//						'destination':destination,
//						'resonText':resonText
//					},
//					success:function(data){
//						if(data.state=="success"){
							$(".applyOrderBg .applyOrderInf",parent.document).addClass("hideBg");					
							$(".applyOrderBg .applyOrderSee",parent.document).removeClass("hideBg");
							$(".applyOrderBg .applyOrderSee",parent.document).addClass("animated flipInX");
							$(".applyOrderBg .applyToSee",parent.document).click(function(){
								location.href="./html/personCenter/personCenter.html?look=orderInf";//此路径相对主页面
								$(".applyOrderBg",parent.document).addClass("hideBg");	
							})
							$(".applyOrderSee #applySureClose",parent.document).click(function(){
								$(".applyOrderBg",parent.document).addClass("hideBg");
							})
//						}else if(data.state=="1"){
//								alert("请重新登录");
//								parent.location.href="/login.html"
//						}else{
//							alert(data.state);
//						}										
//					},
//					error:function(){				
//						alert("预约失败！")
//					}
//				});		
//			}else{alert('填写信息');return;}
		})
	});
	
})