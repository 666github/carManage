var g_carNumber;
$(function(){	
	holiday();
	function holiday(){
		var	allBranch=$(".allBranch").val();
		var holidayStart=$("#holidayStart").val();
		var holidayEnd=$("#holidayEnd").val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.111:2238/handler/CarManage/HolidayUse/ViewHolidayCars.ashx",
			data:{"allBranch":allBranch,"holidayStart":holidayStart,"holidayEnd":holidayEnd},
			dataType:"json",
			async:true,
			success:function(data){	
				if(data.state=="success"){
					$(".cars_Inf").html("");
					var car_inf=data.car_inf;//			
					for(var i=0;i<car_inf.length;i++){
						if(car_inf[i].otime.length>0){
							$(".cars_Inf").append($('<ul class="carInf haveCheck" style="border-color:#4275f8"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
							'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
							'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime"><span></span>'+car_inf[i].otime+'</span></li>'+
							'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
							'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
							+'</ul>'));	
						}else{
							$(".cars_Inf").append($('<ul class="carInf noCheck" style="border-color:lightgray"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
							'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
							'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime">可用时间：'+car_inf[i].otime+'</span></li>'+
							'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
							'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
							+'</ul>'));	
						}
					}
					
					holidayDetail();
				}else if(data.state=="1"){
						alert("请重新登录");
						location.href="/login.html"
				}else{
						alert(data.state);
				}
			},error:function(e1,e2,e3){
	//			debugger;
			}
		});
	}

//部门状态查询
//	$(".allBranQuery").click(function(){
//		holiday();		
//	})
//立即指定	
		$(".nowAppoint").click(function(){
//			if($("#holidayStart").val().length==0||$("#holidayEnd").val().length==0){alert("请填写日期");return;}	
			$('.carInf').addClass("noCheck");
			$('.carInf').css('border-color','lightgray')
			var ochecks = document.getElementsByClassName("ocheck");
			var ocheck = [];
			var carLicences=[];
			for (var i = 0; i < ochecks.length; i++) {
				if(ochecks[i].checked){
					ocheck.push(ochecks[i]);
					//.is(":checked")
				}
			};
			$('.carInf').removeClass("haveCheck");
			$.each(ocheck, function() {   				
		    	$(this).parents('.carInf').css('border-color','#4275f8');	
		    	$(this).parents('.carInf').addClass('haveCheck');
		    	$(this).parents('.carInf').removeClass("noCheck");
				var carLicence=$(this).parents('.carInf').find('.carLicence').text();
				carLicences.push({"carNumber":carLicence});				
			});
			
			nowappoint();
			function nowappoint(){
				$.ajax({
					type:"get",
					url:"http://192.168.1.111:2238/handler/CarManage/HolidayUse/AddHolidayUse.ashx",
					data:{"start":holidayStart,"end":holidayEnd,"cars":carLicences},
					dataType:"json",
					async:true,
					success:function(data){					
						var car_inf=data.car_inf;
						if(data.state=="success"){
							$(".cars_Inf").html('');
							for(var i=0;i<car_inf.length;i++){
								if(car_inf[i].otime.length<1){
									$(".cars_Inf").append($('<ul class="carInf haveCheck" style="border-color:#4275f8"><li class="choice"><input type="checkbox" name=""  value=""  class="ocheck" /></li>'+
									'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
									'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime">可用时间：'+car_inf[i].otime+'</span></li>'+
									'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
									'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
									+'</ul>'));	
								}else{
									$(".cars_Inf").append($('<ul class="carInf noCheck" style="border-color:lightgray"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
									'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
									'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime">可用时间：'+car_inf[i].otime+'</span></li>'+
									'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
									'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
									+'</ul>'));	
								}
							}
							holidayDetail();
						}else if(data.state=="1"){
								alert("请重新登录");
								location.href="/login.html"
						}else{
							alert(data.state);
						}						
					}
				});
			}
		})
//取消指定
		$(".delAppoint").click(function(){
			var delcheck=$(".ocheck");
			var ocheckVal="";
			var delLicences=[];
			$.each(delcheck, function() {
				if(!$(this)[0].checked && $(this).parents(".carInf").hasClass("haveCheck")){
					$(this).parents(".carInf").removeClass("haveCheck");
					$(this).parents(".carInf").addClass("noCheck");
					$(this).parents(".carInf").css('border-color','lightgray');					
				}
				if($(this)[0].checked && $(this).parents(".carInf").hasClass("haveCheck")){
					var delLicence=$(this).parents(".carInf").find(".carLicence").text();
					delLicences.push({"carNumber":delLicence});
				}
			});
			console.log(delLicences)			
			delappoint();
			function delappoint(){
				$.ajax({
					type:"get",
					url:"http://192.168.1.111:2238/handler/CarManage/HolidayUse/RemoveHolidayUse.ashx",
					data:{"start":holidayStart,"end":holidayEnd,"cars":delLicences},
					dataType:"json",
					async:true,
					success:function(data){					
						var car_inf=data.car_inf;								
						if(data.state=="success"){
							$(".cars_Inf").html('');
							for(var i=0;i<car_inf.length;i++){
								if(car_inf[i].otime.length>0){
									$(".cars_Inf").append($('<ul class="carInf haveCheck" style="border-color:#4275f8"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
									'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
									'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime">可用时间：'+car_inf[i].otime+'</span></li>'+
									'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
									'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
									+'</ul>'));	
								}else{
									$(".cars_Inf").append($('<ul class="carInf noCheck" style="border-color:lightgray"><li class="choice"><input type="checkbox" name=""  value="" class="ocheck" /></li>'+
									'<li class="carImg"><img src="'+car_inf[i].carImg +'"/></li>'+
									'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime">可用时间：'+car_inf[i].otime+'</span></li>'+
									'<li class="licence"><span>车牌：</span><span class="carLicence">'+car_inf[i].licence+'</span><span class="carSpace">'+car_inf[i].space+'</span></li>'+
									'<li class="stateInf"><div class="details holidayDet">详情>></div></li>'
									+'</ul>'));	
								}
							}
							holidayDetail();
						}else if(data.state=="1"){
								alert("请重新登录");
								location.href="login.html"
						}else{
							alert(data.state);
						}						
					}
				});
			}
		})
//节假详情》		
		function holidayDetail(){					
			$(".holidayDet").click(function(){
				g_carNumber=$(this).parents('.carInf').find('.carLicence').text();
				$("#container").load("html/carManage/holidayDetails.html");			
			});
		}
	
	
})