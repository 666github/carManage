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
	//预约车辆弹框
	$(".nowOrder").click(function(){
		$(".orderBg",parent.document).removeClass('hideBg');
		$(".quitSure #quit",parent.document).hover(function(){
			$(".quitSure #quit",parent.document).css('background','#4375f8');
			$(".quitSure #sure",parent.document).css('background','#FFFFFF');
		},function(){
			$(".quitSure #quit",parent.document).css('background','#FFFFFF');
			$(".quitSure #sure",parent.document).css('background','#4375f8');
		})
		$(".quitSure #quit",parent.document).click(function(){
			$(".orderBg",parent.document).addClass("hideBg");
		});
		$(".quitSure #sure",parent.document).click(function(){
			var useTime=$(".infList #useTime",parent.document).val();
			var retrunTime=$(".infList #retrunTime",parent.document).val();
			var branchs=$(".infList .branchs",parent.document).val();
			var destination=$(".infList #destination",parent.document).val();
			var resonText=$(".infList .resonText",parent.document).val();
			var olengths=$(".infList .olength",parent.document).val();
//			if(olengths.length!=0){console.log(1)
				//执行ajax

//			$.ajax({
//				type:"get",
//				url:"",
//				dataType:'json',
//				async:true,
//				data:{
//				'useTime':useTime,
//				'retrunTime':retrunTime,
//				'branchs':branchs,
//				'destination':destination,
//				'resonText':resonText
//				},
//				success:function(data){
					$(".orderInf",parent.document).addClass("hideBg");
					$(".orderSee",parent.document).removeClass("hideBg");
					$(".toSee",parent.document).click(function(){
						location.href="./html/personCenter/personCenter.html?look=orderInf";//此路径相对主页面
						$(".orderBg",parent.document).addClass("hideBg");
					})
					$(".orderSee #sureClose",parent.document).click(function(){
						$(".orderBg",parent.document).addClass("hideBg");
					})					
//				},
//				error:function(){				
//					alert("预约失败！")
//				}
//			});		
//			}else{alert('填写信息');return;}
		})
		
	});
	
	$(".olook").click(function(){
		location.href="../personCenter/personCenter.html?look=orderInf";
	})
	
	
	
	
})