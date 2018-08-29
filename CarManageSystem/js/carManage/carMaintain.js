$(function(){
//	getDepartment();	
	//部门
	function getDepartment(){
		var option = $(".mtBranch").html();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "http://192.168.1.120:2238/handler/GetDepartment.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
			success: function (data) {
	  			var obj = data;
	  			for (var i = 0; i < obj.length; i++) {
	      			option += '<option value="' + obj[i].Name + '">' + obj[i].Name + '</option>';
	 			}
				$(".mtBranch").html(option);
				var currentBranch = $(".branchName").text();
				$(".mtBranch").val(currentBranch);
				getLicence();
			},
			error: function () {
	  			console.log("部门获取失败");
	  		}
		})
		
    }

    function getDepartment2() {
        var option = $(".mtBranch2").html();
        $.ajax({
            type: "post",
            dataType: "json",
            url: "http://192.168.1.120:2238/handler/GetDepartment.ashx",
            data: { from: 0 },
            xhrFields: { withCredentials: true },
            success: function (data) {
                var obj = data;
                for (var i = 0; i < obj.length; i++) {
                    option += '<option value="' + obj[i].Name + '">' + obj[i].Name + '</option>';
                }
                $(".mtBranch2").html(option);
                var currentBranch = $(".branchName2").text();
                $(".mtBranch2").val(currentBranch);
                getLicence2();
            },
            error: function () {
                console.log("部门获取失败");
            }
        })

    }
    getDepartment2();

	//车牌
	function getLicence(){
		var department=$(".mtBranch").val();
		$(".licences").removeClass("ohide");
		var option = '<option value="">按车牌号查询</option>';
        $.ajax({
            type: "post",
            dataType: "json",
            url: "http://192.168.1.120:2238/handler/GetCarNumbers.ashx",
            data:{"department":department,from:0},
            xhrFields:{withCredentials:true},
            success: function (data) {
                var obj = data;console.log(option)
                for (var i = 0; i < obj.length; i++) {
                   option += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
                }
                $('.licences').html(option);
                nopage();
            },
            error: function () {
                console.log("车牌获取失败");
            }
        })
	}
	function getLicence2(){
		var department=$(".mtBranch2").val();
		$(".licences2").removeClass("ohide");
		var option = '<option value="">按车牌号查询</option>';
        $.ajax({
            type: "post",
            dataType: "json",
            url: "http://192.168.1.120:2238/handler/GetCarNumbers.ashx",
            data:{"department":department,from:0},
            xhrFields:{withCredentials:true},
            success: function (data) {
                var obj = data;console.log(option)
                for (var i = 0; i < obj.length; i++) {
                   option += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
                }
                $('.licences2').html(option);
                nopage2();
            },
            error: function () {
                console.log("车牌获取失败");
            }
        })
	}
	//维修结束弹框保养类型
	$(".mtMileOrdateM").unbind("change").change(function(){
		$("#safeEnd,#nextMaint,#mtMileM").toggleClass("ohide");debugger
		$("#safeEnd,#nextMaint,#mtMileM").toggleClass("mFourLength");
	})
	//xuyao
	$(".a1").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a1").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").addClass("Mnone");
		lookTapbars();
	});
	$(".a2").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a2").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").removeClass("Mnone");
		Ming();
	});
	$(".a3").click(function(){
		$(".aaa").css({
			"color":"#000000",
			"border":"none"
		});
		$(".a3").css({
			"color":"#4275f8",
			"border-bottom":"solid 2px #4275f8"
		});
		$(".Mend").addClass("Mnone");
//		nopage();
		getDepartment();
	});
	lookTapbars();
	//维修表单查看筛选
	$(".mtBranch").change(function(){
		getLicence();	
	});
	$(".licences").change(function(){
		nopage();
	});
	$("#mtTimes1").click(function(){
		$("#mtTimes1").focus(function(){
			nopage();
			$("#mtTimes1").blur();
		});
	})
	$("#mtTimes2").click(function(){
		$("#mtTimes2").focus(function(){
			nopage();
			$("#mtTimes2").blur();
		});
	})
	//导入信息筛选
	$(".mtBranch2").change(function(){
		getLicence2();	
    });
    getLicence2();
	$(".licences2").change(function(){
		nopage2();
    });
	$("#mtTimes21").click(function(){
		$("#mtTimes21").focus(function(){
			nopage2();
			$("#mtTimes21").blur();
		});
	})
	$("#mtTimes22").click(function(){
		$("#mtTimes22").focus(function(){
			nopage2();
			$("#mtTimes22").blur();
		});
	})
	//维修单和导入信息单信息切换查看
	$(".mtendImportLook").click(function(){
		$(".maintainEnd1").addClass("hide");
		$(".mtImportLook").removeClass("hide");		
	});
	$(".mtformLook").click(function(){
		$(".maintainEnd1").removeClass("hide");
		$(".mtImportLook").addClass("hide");
		nopage2();
	});
	function lookTapbars(){
		//查看需要维修
		$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/ViewNeedMaintain.ashx",
				data:{from:0},
				xhrFields: {withCredentials: true},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						var maintInf=data.maintInf;//
						M1(maintInf);					
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}			
			})
		//查看维修中
//			$.ajax({
//				type:"get",
//				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/ViewMaintaining.ashx",
//				xhrFields: {withCredentials: true },
//				dataType:"json",
//				async:true,
//				success:function(data){
//					if(data.state=="success"){
//						var maintIngul=data.maintIngul;					
//						M2(maintIngul);
//					}else if(data.state=="1"){
//						alert("请重新登录");
//						location.href="./login.html"
//					}else{
//						alert(data.state);
//					}				
//				}
//			});
		//查看完成维修
//		page("http://192.168.1.120:2238/handler/CarManage/CarMaintain/ViewFinishMaintain.ashx");
//		nopage();
	}		
	function Ming(){
		$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/ViewMaintaining.ashx",
				xhrFields: {withCredentials: true },
				data:{from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						var maintIngul=data.maintIngul;					
						M2(maintIngul);
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			});
	}
	function M1(maintInf){
		$("#maintainNeed").html("");
		for(var i=0;i<maintInf.length;i++){
			if(maintInf[i].stateInf==1){
				maintInf[i].stateInf="维修申请";
			}else if(maintInf[i].stateInf==2){
				maintInf[i].stateInf="保养到期";
			}else if(maintInf[i].stateInf==3){
				maintInf[i].stateInf="年检到期";
			}else{
				maintInf[i].stateInf="保险到期";
			}			
			$("#maintainNeed").append($('<ul class="maintInf"><li class="choice">'+
				'<li class="carImg"><img src="'+maintInf[i].carImg+'"/></li>'+
				'<li class="brand" id="brandM"><span class="firBrand">'+maintInf[i].brand+'</span><span class="maintReason" title="'+maintInf[i].maintReason+'" style="float:right;width: 120px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">'+maintInf[i].maintReason+'</span></li>'+
				'<li class="licence" id="licenceM" style="clear:both;"><span class="carLicence1">车牌:</span><span class="carLicence2">'+maintInf[i].carLicence+'</span><span class="carSpace">'+maintInf[i].carSpace+'</span></li>'+
				'<li class="safe"><span class="safe1">保险到期时间：</span><span class="safe2">'+maintInf[i].safe+'</span></li>'+
				'<li class="lastMaint"><span class="lastMaint1">上次保养日期：</span><span class="lastMaint2">'+maintInf[i].lastMaint+'</span></li>'+
				'<li class="endMaint"><span class="endMaint1">年检到期日：</span><span class="endMaint2">'+maintInf[i].endMaint+'</span></li>'+
				'<li><div class="stateInfN">'+maintInf[i].stateInf+'</div><div class="agree">同意</div>'+(maintInf[i].stateInf=="维修申请"?'<div class="refused">拒绝</div>':'')+'</li>'						
				+'</ul>'));				
		}
		$(".refused").each(function(){console.log($(this))
			$(this).css("width","25%");
			$(this).prev(".agree").css("width","25%");
		})
		agree();
		refused();
	}
	function M2(maintIngul){
		$("#maintainIng").html("");
		for(var i=0;i<maintIngul.length;i++){
			if(maintIngul[i].stateInf==1){
				maintIngul[i].stateInf="维修申请";
			}else if(maintIngul[i].stateInf==2){
				maintIngul[i].stateInf="保养到期";
			}else if(maintIngul[i].stateInf==3){
				maintIngul[i].stateInf="年检到期";
			}else{
				maintIngul[i].stateInf="保险到期";
			}
			$("#maintainIng").append($('<ul class="maintIngul noCheck"><li class="choice" style="width:45px;background:url(img/smallImg/finger.png) no-repeat right 2px;"><input type="radio" name="delinput" id="delinput" value="" class="ocheck" style="width:25px;height:25px;"/><span class="oIds" style="display:none;">'+maintIngul[i].id+'</span></li>'+
				'<li class="carImg"><img src="'+maintIngul[i].carImg+'"/></li><li class="brand" id="brandM"><span class="firBrand">'+maintIngul[i].brand+'</span></li>'+
				'<li class="licence" id="licenceM"><span class="carLicence1">车牌:</span><span class="carLicence2">'+maintIngul[i].carLicence+'</span><span class="carSpace">'+maintIngul[i].carSpace+'</span></li>'+
				'<li class="safe"><span class="safe1">保险到期时间：</span><span class="safe2">'+maintIngul[i].safe+'</span></li>'+
				'<li class="lastMaint"><span class="lastMaint1">上次保养日期：</span><span class="lastMaint2">'+maintIngul[i].lastMaint+'</span></li>'+
				'<li class="endMaint"><span class="endMaint1">年检到期日：</span><span class="endMaint2">'+maintIngul[i].endMaint+'</span></li>'+
				'<li class="stateInfM">'+maintIngul[i].stateInf+'</li>'
				+'</ul>'));				
			}
	}
	//维修单列表加载
	function nopage(){debugger;
		var department=$(".mtBranch").val();
		var carNumber=$(".licences").val();
		var mtTimes1=$("#mtTimes1").val();
		var mtTimes2=$("#mtTimes2").val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/ViewFinishMaintain.ashx",
			data:{"department":department,"carNumber":carNumber,"startDate":mtTimes1,"endDate":mtTimes2,from:0},
			xhrFields: {withCredentials: true},
			async:true,
			success:function(data){
				if(data!=""){var data=JSON.parse(data)}
//				var data=JSON.parse(data);
				var mtUls="";
				if(data.state=="success"){
					var maintEndul=data.maintEndul;					
					for(var i=0;i<maintEndul.length;i++){						
						mtUls+='<ul class="maintEndul"><li class="Elist1">'+(i+1)+'</li>'+
								'<li class="Elist3">'+maintEndul[i].Elist3+'</li><li class="Elist4">'+maintEndul[i].Elist4+'</li><li class="Elist5">'+maintEndul[i].Elist5+'</li>'+
								'<li class="Elist6">'+maintEndul[i].Elist6+'</li><li class="Elist7">'+maintEndul[i].Elist7+'</li><li class="Elist8">'+maintEndul[i].Elist8+'</li>'+
								'<li class="Elist9">'+maintEndul[i].Elist9+'</li><li class="Elist10">'+maintEndul[i].Elist10+'</li>'+
								'</ul>'
					}
					$(".pageDiv").html(mtUls);
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}
			},
			error:function(e1,e2,e3){
				console.log("请求失败")
			}
		});
		//导入事件
		$("#mtendimport").change(function () {
        	importChange();
    	})
	}
	//导入信息加载
	function nopage2(){debugger;
		var department=$(".mtBranch2").val();
		var carNumber=$(".licences2").val();
		var mtTimes1=$("#mtTimes21").val();
		var mtTimes2=$("#mtTimes22").val();
		$.ajax({
			type:"get",
			url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/GetMaintainNotes.ashx",
			data:{"department":department,"carNumber":carNumber,"startDate":mtTimes1,"endDate":mtTimes2,from:0},
			xhrFields: {withCredentials: true},
			async:true,
			success:function(data){
				if(data!=""){var data=JSON.parse(data)}
//				var data=JSON.parse(data);
				var mtUls="";
				if(data.state=="success"){
					var maintEndul=data.maintEndul;					
					for(var i=0;i<maintEndul.length;i++){						
						mtUls+='<ul class="maintEndul"><li class="Elist1import">'+(i+1)+'</li>'+
								'<li class="Elist2import">'+maintEndul[i].Elist2+'</li><li class="Elist3import">'+maintEndul[i].Elist3+'</li>'+
								'<li class="Elist4import">'+maintEndul[i].Elist4+'</li><li class="Elist5import">'+maintEndul[i].Elist5+'</li>'+
								'</ul>'
					}
					$(".pageDiv2").html(mtUls);
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}
			},
			error:function(e1,e2,e3){
				console.log("请求失败")
			}
		});
    }
    nopage2();

	//导入事件
	function importChange() {debugger
	    var table = $("#mtendimport").val(); console.log(table);
	    //判断空文件上传
	    $.ajaxFileUpload({
	        secureuri: false,
	        fileElementId: 'mtendimport',
	        dataType: 'json',
	        url: "http://192.168.1.120:2238/handler/CarManage/CarMaintain/ImportMaintainNotes.ashx",
	        xhrFields: { withCredentials: true },
	        data: { from: 0 },
	        success: function (res) {
	            var data = JSON.parse(res);
	            if (data.state == "success") { 
	            	alert("导入成功");
	                nopage2()
	            } else if (data.state == "1") {
	                alert("请重新登录");
	                window.location.href = "./login.html"
	            } else {
	                alert(data.state);
	            }
	            $("#mtendimport").val("");
	            console.log("请求成功");           
	            $("#mtendimport").change(function () {
	                importChange();
	            });
	        }, error: function (e1, e2, e3) {
	            console.log("请求失败");
	        }
	    });
	};
	//选择同意保养的  加载保养中
	function agree(){
		$(".agree").on("click",function(){
			var carLicence=$(this).parents('.maintInf').find('.carLicence2').text();
			var carState=$(this).parents('.maintInf').find('.stateInfN').text();
			var needState;
			if(carState=="维修申请"){
				needState=1;
			}else if(carState=="保养到期"){
				needState=2;
			}else if(carState=="年检到期"){
				needState=3;
			}else{
				needState=4;
			}
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/AccessMaintain.ashx",
				xhrFields: {withCredentials: true },
				data:{"carNumber":carLicence,"needState":needState,from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){

						lookTapbars();
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			})
		})
	}
	function refused(){
		$(".refused").on("click",function(){
			var carLicence=$(this).parents('.maintInf').find('.carLicence2').text();
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/CancelApply.ashx",
				xhrFields: {withCredentials: true },
				data:{"carNumber":carLicence,from:0},
				dataType:"json",
				async:true,
				success:function(data){
					if(data.state=="success"){
						lookTapbars();
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html"
					}else{
						alert(data.state);
					}				
				}
			})
		})
	}
//选择需要结束保养的 加载保养最终结束
	function page(_url){
		debugger
////		$(".page").prepend('<div class="pageDiv clearfix"></div>')
		$(".pageBox").pageFun({  
		interFace:_url,  /*接口*/
		displayCount:10,  /*每页显示总条数*/
		maxPage:5,/*每次最多加载多少页*/
		dataFun:function(data){
			
	//  				var dataHtml = '<li>'+data.dataNum+'</li>';					
			var dataHtml = '<ul class="maintEndul"><li class="Elist1">'+data.Elist1+'</li>'+
						//'<li class="Elist2"><input type="radio" name="list2" id="" value="" class="ocheck"/></li>'+
						'<li class="Elist3">'+data.Elist3+'</li><li class="Elist4">'+data.Elist4+'</li><li class="Elist5">'+data.Elist5+'</li>'+
						'<li class="Elist6">'+data.Elist6+'</li><li class="Elist7">'+data.Elist7+'</li><li class="Elist8">'+data.Elist8+'</li>'+
						'<li class="Elist9">'+data.Elist9+'</li><li class="Elist10">'+data.Elist10+'</li>'
						'</ul>'
				return dataHtml;
		},
		pageFun:function(i){
			var pageHtml = '<li class="pageNum">'+i+'</li>';
				return pageHtml;
		}
	
		})
	}
	var carLicenceMing;
	var idMing;
	var stateInfMing;
	$(".Mend").click(function(){							
		$(".infListM input").val("");				
	//选择项
		var ochecks = document.getElementsByClassName("ocheck");
		var ocheck = [];
		
		
		for (var i = 0; i < ochecks.length; i++) {
			if(ochecks[i].checked){
				ocheck.push(ochecks[i]);
				break;					
			}
		};	
		if(ocheck.length==1){
			$(".orderBgM").removeClass("hideBg");
		}else{
			alert("请选择一辆车辆")
		}
		$.each(ocheck, function(){
			carLicenceMing=$(this).parents('.maintIngul').find('.carLicence2').text();
			stateInfMing=$(this).parents('.maintIngul').find('.stateInfM').text();
			idMing=$(this).parents('.maintIngul').find('.oIds').text();
			if(stateInfMing=="保养到期"){debugger
				$(".mtMileOrdateM").val("按时间保养");
				$("#safeEnd,#nextMaint").removeClass("ohide");
				$("#mtMileM").addClass("ohide");
				$("#safeEnd,#nextMaint").addClass("mFourLength");
				$("#mtMileM").removeClass("mFourLength");
				$(".safeNext").addClass("ohide");
				$(".infListM>li").css("float","left");
				$(".infListM .nextMaint").removeClass("ohide");
				$(".safeEnd").removeClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","保养起始时间");
				$(".infListM #nextMaint").attr("placeholder","保养结束时间");
			}else if(stateInfMing=="年检到期"){debugger;
				$("#safeEnd,#nextMaint").removeClass("ohide");
				$("#mtMileM").addClass("ohide");
				$("#mtMileM").removeClass("mFourLength");
				$(".infListM>li").css("float","left");
				$(".infListM .nextMaint").removeClass("ohide");
				$(".safeNext").addClass("ohide");
				$(".safeEnd").addClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","年检起始时间");
				$(".infListM #nextMaint").attr("placeholder","年检结束时间");
			}else if(stateInfMing=="保险到期"){
				$("#safeEnd,#nextMaint").removeClass("ohide");
				$("#mtMileM").addClass("ohide");
				$("#mtMileM").removeClass("mFourLength");
				$(".infListM>li").css("float","left");
				$(".infListM .nextMaint").removeClass("ohide");
				$(".safeNext").addClass("ohide");
				$(".safeEnd").addClass("ohide");
				$(".infListM #safeEnd").attr("placeholder","保险起始时间");
				$(".infListM #nextMaint").attr("placeholder","保险结束时间");
			}else{debugger
				$(".safeNext").removeClass("ohide");
				$(".infListM>li").css("float","none");
				$(".infListM .nextMaint").addClass("ohide");
				$("#safeEnd,#nextMaint,#mtMileM").addClass("ohide");
				$("#mtMileM").removeClass("mFourLength");
				$(".safeEnd").addClass("ohide");				
			}
		});
			
	})
		$(".quitSure #sureM").unbind("click").click(function(){console.log(stateInfMing)
			var mtMileOrdate = $(".mtMileOrdateM").val();
			var mtMile = $("#mtMileM").val();		
			var start=$(".infListM #safeEnd").val();
			var end=$(".infListM #nextMaint").val();
			var priceMaint=$(".infListM #priceMaint").val();
			var numMaint=$(".infListM #numMaint").val();
			var mFourLengths=$(".infListM .mFourLength");	
			if(stateInfMing!="维修申请"){
				for(var i=0;i<mFourLengths.length;i++){
					if(mFourLengths[i].value.length==0){
						alert("有未填写信息");
						return;
					}
				}
			}else if(mFourLengths[mFourLengths.length-1].value.length==0||mFourLengths[mFourLengths.length-2].value.length==0){
				alert("有未填写信息");
				return;
			}
		debugger
			var regpriceMaint=/^[0-9]*\.?[0-9]*$/;
		    var priceMaint = $("#priceMaint").val();
		    if (!regpriceMaint.test(priceMaint)) {
		        alert("金额为纯数字或数字加小数点");
		        return;
		    }	    
			//执行ajax
			$.ajax({
				type:"get",
				url:"http://192.168.1.120:2238/handler/CarManage/CarMaintain/FinishMaintain.ashx",
				xhrFields: {withCredentials: true },
				data:{
					 "mtMileOrdate":mtMileOrdate,
					 "mtMile":mtMile,
					 "carNumber":carLicenceMing,
					  "needState":stateInfMing,
					  "start":start,//接口中没写
					  "end":end,//接口中没写
					  "cost":priceMaint,
					  "code":numMaint,
					  "id":idMing,
					  from:0
					},
				dataType:"json",
				async:true,
				success:function(data){								
					if(data.state=="success"){
						$(".orderBgM").addClass("hideBg");
						Ming();						
					}else if(data.state=="1"){
						alert("请重新登录");
						location.href="./login.html";
					}else{
						alert(data.state);
					}
				},error:function(e1,e2,e3){
					console.log("请求失败")
				}
			});			
		})
	$(".quitSure #quitM").hover(function(){
			$(".quitSure #quitM").css('background','#4375f8');
			$(".quitSure #sureM").css('background','#FFFFFF');
		},function(){
			$(".quitSure #quitM").css('background','#FFFFFF');
			$(".quitSure #sureM").css('background','#4375f8');
		})
		$(".quitSure #quitM").click(function(){
			$(".orderBgM").addClass("hideBg");
		});
	//当前时间
	function currentTime(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(month>=1 && month<=9){
			month="0"+month;
		}
		if(day>=1 && day<=9){
			day="0"+day;
		}
	var currentdate=year+'-'+month+'-'+day;
		return currentdate;
	}
})

		