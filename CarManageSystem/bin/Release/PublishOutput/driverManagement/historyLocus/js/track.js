$(function () {
    $('#myhistorymap').load('html/trajectlog/history.html');
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
	var allBranch=$(".branchName").text();//部门
	//历史
	var historyDate=$("#historyDate").val();
	$("#historyDate").val(currentTime());
	var allLicence=$(".allLicence").val();
	var driLength=$(".driInf").length;
	if(window.screen.width<1366){
		$(".driInfs_wrap").width(($(".driInfs").width()*driLength))
		$(".driInf").width($(".driInfs").width());
		//信息左右切换
		var i=1;
		$(".moveLeft").click(function(){
			if(i<driLength){
				$(".driInfs_wrap").css("left",-i*100+"%");
				i++;
				if(i==driLength){return;}	
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
		$(".driInfs_wrap").width(($(".driInfs").width()*driLength)/2)
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
//	$(".allLicence").change(function(){
//		historyDriInf();
//	});
	$("#historyDate").blur(function(){
		historyDriInf();
	})
	function historyDriInf(){
		$.ajax({
			type:"get",
			url:"",
			data:{"allLicence":allLicence,"historyDate":historyDate,from:0},
			xhrFields:{withCredentials:true},
			async:true,
			success:function(data){
				if(data.state=="success"){
					var driInf=data.driInf;
					$(".driInfs_wrap").html("");
					for(var i=0;i<driInf.length;i++){
						$(".driInfs_wrap").append($('<div class="driInf"><img src="'+driInf[i].driImg+'" class="driImg"/>'+'<ul class="detInf">'
						+'<li class="detInf1"><span class="driName">'+driInf[i].driName+'</span><span class="branchName">'+driInf[i].branchName+'</span></li><li class="detInf2">'+driInf.detInf2+'</li>'
						+'<li class="detInf3">用途：<span class="effect">'+driInf[i].effect+'</span></li><li class="detInf4">目的地：<span class="destination">'+driInf[i].destination+'</span></li>'
						+'<li class="detInf5">用车时间：<span class="usedTime">'+driInf[i].usedTime+'</span></li>'
						+'</ul></div>'))
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