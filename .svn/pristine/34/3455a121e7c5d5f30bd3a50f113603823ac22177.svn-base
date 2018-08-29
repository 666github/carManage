//图片上传
function PreviewImage(imgFile,id){
		var filextension=imgFile.value.substring(imgFile.value.lastIndexOf("."),imgFile.value.length);
		filextension=filextension.toLowerCase();
		if((filextension!='.jpg')){
			alert("请输入jpg格式图片");
			imgFile.focus();
		}else{
			var path;
	//		var fileId = imgFile.getAttribute("id");
			if(document.all){//ie
				imgFile.select();
				path = document.selection.createRange().text;
				document.getElementById(id).innerHTML = "";
			}else{//ff
				path=window.URL.createObjectURL(imgFile.files[0]);
				document.getElementById(id).innerHTML = "<img class='img1' width='100%' height='100%' src='"+path+"' />";
			}
		}
	}
$(function(){
		//车辆查询
//	var allBranch="";
//	if($(".allBran").children().hasClass("allBranch")){
	var allBranch=$(".allBranch").val();
//	}else{
//		allBranch=$(".branchName",parent.document).text();//司机没部门可选 将主页部门信息加载过来
//	}
	var status=$(".status").val();
	$.ajax({
		type:"get",
//		url:"/handler/ViewCars.ashx",
		url:"../../data/1.json",
		data:{"allBranch":allBranch,"status":status},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.state=="success"){
				$(".sumNum").text(data.sumNum);
				$(".used").text(data.used);
				$(".unUsed").text(data.unUsed);
				var car_inf=data.car_inf;//
				var arr_carInf=[];
				var arr_carImg=[];
				var arr_brand1=[];
				var arr_licence=[];
				var arr_space=[];
				var arr_state=[];
				for(var i=0;i<car_inf.length;i++){
					arr_carImg.push(car_inf[i].carImg);
					arr_brand1.push(car_inf[i].brand1);
					arr_licence.push(car_inf[i].licence);
					arr_space.push(car_inf[i].space);
					arr_state.push(car_inf[i].state);
				}
				carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
			}else if(data.state=="1"){
				alert("请重新登录");
				parent.location.href="/login.html"
			}else{
				alert(data.state);
			}
		},error:function(){
			console.log("加载失败")
		}
	});	

	function carsInf(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state){
		for(var i=0;i<car_inf.length;i++){
			if(arr_state[i]==0){
				arr_state[i]="预约";
			}else if(arr_state[i]==1){
				arr_state[i]="已预约";
			}else if(arr_state[i]==2){
				arr_state[i]="外出";
			}else{
				arr_state[i]="不可用";
			}
			$(".cars_Inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
			'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span></li>'+
			'<li class="licence"><span class="carLicence">'+arr_licence[i]+'</span><span></span>&nbsp;-&nbsp;<span class="carSpace">'+arr_space[i]+'</span></li>'+
			'<li class="stateInf"><div class="carState">'+arr_state[i]+'</div><div class="details">详情>></div></li>'+
			'</ul>'));

		}	
		$(".carState").each(function(){
			if($(this).text().indexOf("预")==0){
				$(this).addClass("nowOrder");
			}
		});
		order();
		details();		
	}
	//部门状态查询
	$(".allBranQuery").click(function(){
		$.ajax({
		type:"get",
		url:"/handler/ViewCars.ashx",
//		url:"../../data/1.json",
		data:{"allBranch":allBranch,"status":status},
		dataType:"json",
		async:true,
		success:function(data){
			if(data.state=="success"){
				$(".sumNum").text(data.sumNum);
				$(".used").text(data.used);
				$(".unUsed").text(data.unUsed);
				var car_inf=data.car_inf;//
				var arr_carInf=[];
				var arr_carImg=[];
				var arr_brand1=[];
				var arr_licence=[];
				var arr_space=[];
				var arr_state=[];
				for(var i=0;i<car_inf.length;i++){
					arr_carImg.push(car_inf[i].carImg);
					arr_brand1.push(car_inf[i].brand1);
					arr_licence.push(car_inf[i].licence);
					arr_space.push(car_inf[i].space);
					arr_state.push(car_inf[i].state);
				}
				$(".cars_Inf").html("");
				carsInf2(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state);
			}else if(data.state=="1"){
				alert("请重新登录");
				parent.location.href="/login.html"
			}else{
				alert(data.state);
			}
		}
	});
	function carsInf2(car_inf,arr_carImg,arr_brand1,arr_licence,arr_space,arr_state){
		for(var i=0;i<car_inf.length;i++){
			if(arr_state[i]==0){console.log($(this))
				arr_state[i]="预约";
			}else if(arr_state[i]==1){
				arr_state[i]="已预约";
			}else if(arr_state[i]==2){
				arr_state[i]="外出";
			}else{
				arr_state[i]="不可用";
			}
			$(".cars_Inf").append($('<ul class="carInf"><li class="choice"><input type="checkbox" name="" id="delinput" value="" class="ocheck" /></li>'+
				'<li class="carImg"><img src="'+arr_carImg[i] +'"/></li><li class="brand"><span class="firBrand">'+arr_brand1[i]+'</span></li>'+
				'<li class="licence"><span class="carLicence">'+arr_licence[i]+'</span><span></span>&nbsp;-&nbsp;<span class="carSpace">'+arr_space[i]+'</span></li>'+
				'<li class="stateInf"><div class="carState">外出</div><div class="details">详情>></div></li>'
				+'</ul>'));				
			}					
		}
		order();
		details();
	})
//维修保养单子
	$(".maintQuery").click(function(){		
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var carLicence="";
		var carState="";
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);					
			}
		};
		if(ocheck.length>1 || ocheck.length==0){
			alert("请选择可以预约的‘一辆’车");
			return;
		}else{		
			$.each(ocheck, function() {				
				carLicence = $(this).parents('.carInf').find('.carLicence').text();
				carState=$(this).parents('.carInf').find('.carState').text();
			});
		}
		if(carState=="预约"){
			$(".orderBgAdm",parent.document).removeClass("hideBg");
		}else{alert("请选择空闲的车辆")}
			$(".quitSure #quit",parent.document).hover(function(){
			$(".quitSure #quit",parent.document).css('background','#4375f8');
			$(".quitSure #sure",parent.document).css('background','#FFFFFF');
		},function(){
			$(".quitSure #quit",parent.document).css('background','#FFFFFF');
			$(".quitSure #sure",parent.document).css('background','#4375f8');
		})
		$(".quitSure #quit",parent.document).click(function(){
			$(".orderBgAdm",parent.document).addClass("hideBg");
		});
		//维修单		
		$(".quitSure #sure",parent.document).click(function(){		
			var resontextAdm=$(".infListAdm .resontextAdm",parent.document).val();
			var maintAdm=parent.$(".maintAdm");
			var ocheckVal="";		
			$.each(maintAdm, function() {
				if($(this)[0].checked){
					ocheckVal=$(this).val();
				}
			});
			if(ocheckVal!=""&&resontextAdm!=""){
				$.get("url",{"类别":ocheckVal,"原因":resontextAdm},function(data){
					if(data.state=="success"){
						$(".orderBgAdm",parent.document).addClass("hideBg");
					}else if(data.state=="1"){
						alert("请重新登录");
						parent.location.href="/login.html"
					}else{
						alert(data.state);
					}
					
				})
			}					
		})
		
	})
//删除信息
	$(".odel").click(function(){
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		var carLicences=[];
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
			}
		};
		$.each(ocheck, function() {
			carLicences.push($(this).parent().siblings().find(".carLicence").text());		
//			$.get("url",{"carLicences":carLicences},function(data){
//				if(data.state=="success"){
					if(confirm("确定删除？")){$(this).parents('.carInf').remove();}
//				}else if(data.state=="1"){
//						alert("请重新登录");
//						parent.location.href="/login.html"
//				}else{
//					alert(data.state);
//				}
//			});			
		});
		
	})
//	//车辆查询详情
//	function details(){
			$(".details").click(function(){
		/*var allBranch="";
		if($(".allBran").children().hasClass("allBranch")){
			allBranch=$(".allBranch").val();
		}else{
			allBranch=$(".branchName",parent.document).text();//司机没部门可选 将主页部门信息加载过来
		}
		var status=$(".status").val();		
		*/
		var carlicence=$(this).parents('.carInf').find('.carLicence').text();
//		$.ajax({						
//			type:"get",
//			url:"/handler/GetCarDetails.ashx",
//			dataType:"json",			
//			data:{
//				'carlicence':carlicence,
//				'allBranch':allBranch,
//				'status':status
//			},
//			success:function(data){
//				if(data.state="success"){
//					//车辆信息详情
//					var carInf_det=data.carInf_det;
//					$(".topBranch").text(carInf_det.topBranch);
//					$("#topPhoto img1").attr("src",carInf_det.imgSrc);
//					$(".firBrandDet").val(carInf_det.firBrandDet);
//					$(".licenceDet").text(carInf_det.licenceDet);
//					$(".buydayDet").val(carInf_det.buydayDet);
//					$(".modelDet").val(carInf_det.modelDet);
//					$(".typeDet").val(carInf_det.typeDet);
//					$("#safeStart").text(carInf_det.safeStartDet);
//					$("#safeEnd").text(carInf_det.safeEndDet);
//					$(".enginDet").val(carInf_det.enginDet);
//					$(".priceDet").val(carInf_det.priceDet);
//					$(".annualStartDet").val(carInf_det.annualStartDet);
//					$(".annuaEndDet").val(carInf_det.annuaEndDet);
//					$(".mileDet").text(carInf_det.mileDet);
//					$(".outnumDet").text(carInf_det.outnumDet);
//					$(".mtStartDet").val(carInf_det.mtStartDet);
//					$(".mtEndDet").val(carInf_det.mtEndDet);
//					$(".mtMoneyDet").text(carInf_det.mtMoneyDet);
//					$(".mtNumDet").text(carInf_det.mtNumDet);
//					//状态信息
//					var state_det=data.state_det;
//					$(".currentState").text(state_det.currentState);
//					$(".statePerson").text(state_det.statePerson);
//					$(".currName").text(state_det.currName);
//					$(".currBranch").text(state_det.currBranch);
//					$(".currUsed").text(state_det.currUsed);
//					$(".currBack").text(state_det.currBack);
//					$(".currDestination").text(state_det.currDestination);
//					$(".currEffect").text(state_det.currEffect);	
					location.href='queryDetails.html';
//				}else if(data.state=="1"){
//					alert("请重新登录");
//					parent.location.href="/login.html"
//				}else{
//					alert(data.state);
//				}
//			},
//			error:function(){
//				alert('暂无详情可查看！')
//			}
//		});
	});
//	}
	//修改详情信息
	$(".detChange").click(function(){
		$(".detChange").addClass("ohide");
		$(".detSave").removeClass("ohide");
		$(".detailsInfBg").addClass("ohide");
		
	});
	$(".detSave").click(function(){
		$(".detSave").addClass("ohide");
		$(".detChange").removeClass("ohide");		
		$(".detailsInfBg").removeClass("ohide");
		
	})
	////预约车辆弹框
	function order(){
		$(".nowOrder").click(function(){
		$(".orderBg",parent.document).removeClass('hideBg');
		$(".orderBg .orderInf",parent.document).removeClass("hideBg");
		$(".orderBg .orderInf",parent.document).addClass("animated bounceIn");
		$(".orderBg .orderSee",parent.document).addClass("hideBg");
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
					if(data.state=="success"){
						$(".orderBg .orderInf",parent.document).addClass("hideBg");					
						$(".orderBg .orderSee",parent.document).removeClass("hideBg");
						$(".orderBg .orderSee",parent.document).addClass("animated flipInX");
						$(".orderBg .toSee",parent.document).click(function(){
							location.href="./html/personCenter/personCenter.html?look=orderInf";//此路径相对主页面
							$(".orderBg",parent.document).addClass("hideBg");	
						})
						$(".orderSee #sureClose",parent.document).click(function(){
						$(".orderBg",parent.document).addClass("hideBg");
						})
					}else if(data.state=="1"){
							alert("请重新登录");
							parent.location.href="/login.html"
					}else{
						alert(data.state);
					}										
//				},
//				error:function(){				
//					alert("预约失败！")
//				}
//			});		
//			}else{alert('填写信息');return;}
		})
		
	});
	}
	
	$(".olook").click(function(){
		$(".secList",parent.document).css('display','none');
		$(".secList li",parent.document).css("color","gray");
		location.href="../personCenter/personCenter.html?look=orderInf";
	})
	
	$(".back_title").click(function(){
		location.href='query.html';
	});
})