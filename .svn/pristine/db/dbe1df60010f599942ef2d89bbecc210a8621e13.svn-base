$(function () {
    //$('#mycurrentmap').load('html/trajectlog/realtime.html');
    //$('#myhistorymap').load('html/trajectlog/history.html');
	getDepartment();
	function getDepartment(){
        var option = $('.allLicence').html();
		$.ajax({
	  		type: "post",
			dataType: "json",
			url: "../handler/GetCarNumbers.ashx",
			data:{from:0},
			xhrFields:{withCredentials:true},
            success: function (data) {
	  			var obj = data;
	  			for (var i = 0; i < obj.length; i++) {
                        option += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
	 			}
                $('.allLicence').html(option);
                //var currentBranch = $(".allLicence").text();
                //$(".allLicence").val(currentBranch);
			},
			error: function () {
	  			console.log("车辆获取失败");
	  		}
		})		
	}
    
	function currentTime(){
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
//		var hours=date.getHours();
//		var minutes=date.getMinutes();
//		var seconds=date.getSeconds();
		if(month>=1 && month<=9){
			month="0"+month;
		}
		if(day>=1 && day<=9){
			day="0"+day;
		}
//		var currentdate=year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
	var currentdate=year+'-'+month+'-'+day;
		return currentdate;
	}
	var allBranch=$(".allBranch").val();//部门或车牌
	//实时
	$(".allBranch").change(function(){
		$.ajax({
			type:"get",
			url:"",
			data:{"department":allBranch,from:0},
			xhrFields:{withCredentials:true},
			async:true,
			success:function(data){
//				if(data.state=="success"){
//					
//				}else if(data.state=="1"){
//					alert("请重新登录");
//					location.href="./login.html"
//				}else{
//					alert(data.state);
//				}
			},error:function(e1,e2,e3){
				console.log("请求失败")
			}
		});
	})
	
	
	//历史
	var historyDate=$("#historyDate").val();
	$("#historyDate").val(currentTime());
	var allLicence=$(".allLicence").val();
	var driLength=$(".driInf").length;
	if(window.screen.width<1366){
////		$(".driInfs_wrap").width(driLength*100+'%');
		$(".driInfs_wrap").width(($(".driInfs").width()*driLength))
////		$(".driInf").width(($(".driInfs_wrap").width())/driLength);
		$(".driInf").width($(".driInfs").width());
		//信息左右切换
		var i=1;
		$(".moveLeft").click(function(){
			if(i<driLength){
				$(".driInfs_wrap").css("left",-i*100+"%");
				i++;
				if(i==driLength){return;}
//				console.log(i)	
			}		
		})
		$(".moveRight").click(function(){console.log(i)		
			if(i==driLength){
				i--;
			}
			if(i>0){
				i--;
				$(".driInfs_wrap").css('left',-i*100+'%');
				if(i==0){i=1;}
			}			
		})
	}else{
////		$(".driInfs_wrap").width(driLength*50+'%');
		$(".driInfs_wrap").width(($(".driInfs").width()*driLength)/2)
////		$(".driInf").width((($(".driInfs_wrap").width())/driLength));
		$(".driInf").width($(".driInfs").width()/2);
		var i=1;
		$(".moveLeft").click(function(){
			if(i<driLength-1){
				$(".driInfs_wrap").css("left",-i*50+"%");
				i++;
				if(i==driLength-1){return;}
			}		
		})
		$(".moveRight").click(function(){console.log(i)		
			if(i==driLength-1){
				i--;
			}
			if(i>0){
				i--;
				$(".driInfs_wrap").css('left',-i*50+'%');
					if(i==0){
						i=1;
				}
			}			
		})
	}
	//历史轨迹查看
	$(".allLicence").change(function(){
		historyDriInf();
	});
	$("#historyDate").blur(function(){
		historyDriInf();
	})
    function historyDriInf() {
        debugger
        var historyDate = $("#historyDate").val();
        var allLicence = $(".allLicence").val();
		$.ajax({
			type:"get",
            url:"../handler/Trajectory/GetTrajectory.ashx",
			data:{"allLicence":allLicence,"historyDate":historyDate,from:0},
			xhrFields:{withCredentials:true},
			async:true,
            success: function (datajson) {
                var data = JSON.parse(datajson);
                debugger
				if(data.state=="success"){
					var driInf=data.info;
					$(".driInfs_wrap").html("");
					for(var i=0;i<driInf.length;i++){
                        $(".driInfs_wrap").append($('<div class="driInf"><img src="' + driInf[i].driImg + '" class="driImg"/>' + '<ul class="detInf">'
                            + '<li class="detInf1"><span class="driName">' + driInf[i].driName + '</span><span class="branchName">' + driInf[i].branchName + '</span></li><li class="detInf2">' + driInf[i].detInf2 + '</li>'
                            + '<li class="detInf3">用途：<span class="effect">' + driInf[i].effect + '</span></li><li class="detInf4">目的地：<span class="destination">' + driInf[i].destination + '</span></li>'
                            + '<li class="detInf5">用车时间：<span class="usedTime">' + driInf[i].usedTime + '</span></li>'
                            + '</ul></div>'));
                        setHistory(driInf[i].position);
                    }
                    
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
				}else{
					alert(data.state);
				}			
			}
		})
	}
	if($(".driInf").length<2){
		$(".moveLeft").addClass("ohide");
		$(".moveRight").addClass("ohide");
	}else{
		$(".moveLeft").removeClass("ohide");
		$(".moveRight").removeClass("ohide");
	}

    
})
