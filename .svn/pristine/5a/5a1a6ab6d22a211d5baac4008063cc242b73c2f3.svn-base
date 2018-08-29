var g_carNumber;
$(function(){	
	getDepartment();
	 function getDepartment(){
		var option = $('#allBranch').html().trim();
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
				$('#allBranch').html(option);
				var currentBranch = $(".branchName").text();
				$("#allBranch").val(currentBranch);
				if(userType==1){
					$('#allBranch').attr("disabled","disabled");
				}
				holiday();
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
	}
	function holiday(){debugger
		var	allBranch=$(".allBranch").val();
//		var holidayStart=$("#holidayStart").val();
//		var holidayEnd=$("#holidayEnd").val();
		$.ajax({
			type:"get",
			url:"../handler/CarManage/HolidayUse/ViewHolidayCars.ashx",
			xhrFields: {withCredentials: true },
			data:{"allBranch":allBranch,from:0},
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
							'<li class="brand"><span class="firBrand">'+car_inf[i].brand+'</span><span class="otime" style="color:#ff0060;">可用</span></li>'+
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
		})
	}

//部门状态查询
	$("#allBranch").change(function(){
		holiday();		
	})
//立即指定	
		$(".nowAppoint").click(function(){
			var holidayStart=$("#holidayStart").val();
			var holidayEnd=$("#holidayEnd").val()
			if($("#holidayStart").val().length==0||$("#holidayEnd").val().length==0){alert("请填写日期");return;}	
			$('.carInf').addClass("noCheck");
			$('.carInf').css('border-color','lightgray');
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
				carLicences.push(carLicence);				
			});
			
			nowappoint();
			function nowappoint(){debugger
				$.ajax({
					type:"get",
					url:"../handler/CarManage/HolidayUse/AddHolidayUse.ashx",
					xhrFields: {withCredentials:true},
					data:{"reqJson":JSON.stringify({"start":holidayStart,"end":holidayEnd,"cars":carLicences}),from:0},
					dataType:"json",
					async:true,
					success:function(data){					
						var car_inf=data.car_inf;
						if(data.state=="success"){						
							holiday();
							holidayDetail();
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
					delLicences.push(delLicence);
				}
			});
			console.log(delLicences)			
			delappoint();
			function delappoint(){
				$.ajax({
					type:"get",
					url:"../handler/CarManage/HolidayUse/RemoveHolidayUse.ashx",
					xhrFields: {withCredentials: true },
					data:{"inJson":JSON.stringify({"cars":delLicences}),from:0},
					dataType:"json",
					async:true,
					success:function(data){					
						var car_inf=data.car_inf;								
						if(data.state=="success"){							
							holiday();
							holidayDetail();
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
//节假详情》		
		function holidayDetail(){					
			$(".holidayDet").click(function(){
				g_carNumber=$(this).parents('.carInf').find('.carLicence').text();
				$("#container").load("html/carManage/holidayDetails.html");			
			});
		}
	
	
})