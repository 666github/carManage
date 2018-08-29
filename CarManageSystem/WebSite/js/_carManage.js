$(function(){
//部门默认颜色设置
	(function(){
		$(".branchs").css("color","darkgray");
		$(".branchs option").css("color","black")
		$(".branchs").change(function(){
			var selItem=$(this).val();
			if(selItem==$(this).find("option:first").val()){
				$(this).css("color","darkgray")
			}else{
				$(this).css("color","black")
			}
		})
	})();
//车辆录入信息验证
	function loggingIn(){
		var img1src=$(".img1").attr('src');
		if(img1src==""){
			alert('请上传车辆照片');
			return false;
		}
		var olength=$(".olength").val();		
	    if (olength.length == 0) {
	        alert("所有选项必填，有未填写选项！");
	        return false;
	    }		
	    var regPlate=/^京[A-Z]{1}[A-Z0-9]{5}$/;//var regPlate=/^[\u4e00-\u9fa5]{1}[A-Z][A-Z0-9]{5}/
	    var oPlate=$("#regPlate").val().toUpperCase();
	    if (!regPlate.test(oPlate)) {
	        alert("车牌格式不正确");
	        return false;
	    }
	    var regMileage=/^[0-9]*\.?[0-9]*$/;
	    var oMileage = $("#regMileage").val();
	    if (!regMileage.test(oMileage)) {
	        alert("里程格式为纯数字或数字加小数点");
	        return false;
	    }
	    var regPrice=/^[0-9]*\.?[0-9]*$/;
	    var oPrice = $("#regPrice").val();
	    if (!regPrice.test(oPrice)) {
	        alert("价格格式为纯数字或数字加小数点");
	        return false;
	    }
	    var regEngin=/^[a-zA-Z0-9]{4,}$/
	    var oEngin = $("#regEngin").val();
	    if (oEngin.length < 4) {
	        alert("发动机号不能少于4位！");
	        return false;
	    }
	    if (!regEngin.test(oEngin)) {
	        alert("发动机号只能由字母、数字组成！");
	        return false;
	    }
	    return true;
	    
	}
	
	$("#mysubmit").click(function(){
		if(loggingIn()){
			$("#myform").submit();
		}
	})
	console.log($(".allBranch").val())
	//车辆查询
//	$.ajax({
//		type:"get",
//		url:"",
//		dataType:"json",
//		async:true,
//		success:function(data){
//			var car_inf=data.car_inf;//
//			var arr_carInf=[];
//			var arr_carImg=[];
//			var arr_brand1=[];
//			var arr_brand2=[];
//			var arr_licence=[];
//			var arr_space=[];
//			var arr_state=[];
//			for(var i=0;i<car_inf.length;i++){
//				arr_carImg.push(car_inf[i].carImg);
//				arr_brand1.push(car_inf[i].brand1);
//				arr_brand2.push(car_inf[i].brand2);
//				arr_licence.push(car_inf[i].licence);
//				arr_space.push(car_inf[i].space);
//				arr_state.push(car_inf[i].state);
//			}
//			carsInf(car_inf,arr_carImg,arr_brand1,arr_brand2,arr_licence,arr_space,arr_state);
//		}
//	});
//	function carsInf(car_inf,arr_carImg,arr_brand1,arr_brand2,arr_licence,arr_space,arr_state){
//		for(var i=0;i<car_inf.length;i++){
//				$("#car_inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
//				'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span><span class="secBrand">'+arr_brand2[i]+'</span></li>'+
//				'<li class="licence"><span class="carLicence">'+arr_licence[i]+'</span><span></span>&nbsp;-&nbsp;<span class="carSpace">'+arr_state[i]+'</span></li>'+
//				'<li class="stateInf"><div class="carState">'+arr_state[i]+'</div><div class="details">详情>></div></li>'
//				+'</ul>'));
//		}		
//	}

//删除信息
	$(".odel").click(function(){
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
			}
		};
		$.each(ocheck, function() {
			$(this).parents('.carInf').css('display','none');
//			$(this).parents('.carInf').remove();
		});
	})
//	//车辆查询详情
	$(".details").click(function(){
		var allBranch="";
		if($(".allBran").children().hasClass("allBranch")){
			allBranch=$(".allBranch").val();
		}else{
			allBranch=$(".branchName",parent.document).text();//司机没部门可选 将主页部门信息加载过来
		}
		var status=$(".status").val();
		var carlicence=$(this).parents('.carInf').find('.carLicence').text();
		location.href='query_details.html';
//		$.ajax({						
//			type:"get",
//			url:"",
//			dataType:"json",			
//			data:{
//				'carlicence':carlicence,
//				'allBranch':allBranch,
//				'status':status
//			},
//			success:function(data){
//				//车辆信息详情
//				var carInf_det=data.carInf_det;
//				$(".firBrandDet").text(carInf_det.firBrandDet);
//				$(".secBrandDet").text(carInf_det.secBrandDet);
//				$(".buydayDet").text(carInf_det.buydayDet);
//				$(".modelDet").text(carInf_det.modelDet);
//				$(".typeDet").text(carInf_det.typeDet);
//				$(".safeStartDet").text(carInf_det.safeStartDet);
//				$(".safeEndDet").text(carInf_det.safeEndDet);
//				$(".enginDet").text(carInf_det.enginDet);
//				$(".priceDet").text(carInf_det.priceDet);
//				$(".annualStartDet").text(carInf_det.annualStartDet);
//				$(".annuaEndDet").text(carInf_det.annuaEndDet);
//				$(".mileDet").text(carInf_det.mileDet);
//				$(".outnumDet").text(carInf_det.outnumDet);
//				$(".mtStartDet").text(carInf_det.mtStartDet);
//				$(".mtEndDet").text(carInf_det.mtEndDet);
//				$(".mtMoneyDet").text(carInf_det.mtMoneyDet);
//				$(".mtNumDet").text(carInf_det.mtNumDet);
//				//车辆状态信息
//				var state_det=data.state_det;
//				$(".currName").text(state_det.currName);
//				$(".currBranch").text(state_det.currBranch);
//				$(".currUsed").text(state_det.currUsed);
//				$(".currBack").text(state_det.currBack);
//				$(".mtEndDet").text(state_det.mtEndDet);
//				$(".currDestination").text(state_det.currDestination);
//				$(".currEffect").text(state_det.currEffect);				
//			},
//			error:function(){
//				
//			}
//		});
	});
	$(".back_title").click(function(){
		location.href='query.html';
	});
	//当前时间
	
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
			if(olengths.length!=0){console.log(1)
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
					$(".orderSee #sureClose",parent.document).click(function(){
						$(".orderBg",parent.document).addClass("hideBg");
					})					
//				},
//				error:function(){				
//					alert("预约失败！")
//				}
//			});		
			}else{alert('填写信息');return;}
		})
		
		
	});
	//预约查看
	
	
	
})


function ifmload(ifm) {
    var val = $(ifm.contentWindow.document.body).find('pre').html();
    if (val == "success") {
        alert('录入成功！');
    } else if (val == undefined) {

    } else {
        alert('录入失败：' + ifm);
    }
}