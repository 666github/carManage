var lastTime;
var userType;
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
				document.getElementById(id).innerHTML = "<img class='img1' width='200px' height='120px' src='"+path+"' />";
			}
		}
	}
//
$(function(){	
	//头像
getUser()
function getUser(){
	$.ajax({
		type:"get",
		url:"../handler/GetCurrentUser.ashx",
		data:{from:0},
		async:false,
		xhrFields: {withCredentials: true }, 
		success:function (data){
	      data = JSON.parse(data);
	      if (data.state == "success") {debugger
	      	var regulation=data.info.regulation;
				if(regulation==1){//监管员
					$("#carManage,#peopleManage,#branchManage,#statistics").addClass("ohide");
				}else{
					$("#carManage,#peopleManage,#branchManage,#statistics").removeClass("ohide");
				}	
	      	userType=data.info.usertype;
			$(".personPho img").attr("src",data.info.imgsrc);
	          $(".myName").text(data.info.myname);
	          $(".branchName").text(data.info.branch);
	          lastTime = data.info.LastLoginDate;
	//        $("#container").load('html/homePage/oHome.html');
			}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
			}else{
				alert(data.state);
			}
		}
	})
}
	//退出
  	$(".thrIcon").click(function (){
     	$.ajax({
	      	type:"get",
	      	url:"../handler/Quit.ashx",
	      	data:{from:0},
	      	async:true,
			xhrFields: {withCredentials: true},
			success:function (res) {
	          var data = JSON.parse(res);
	          if (data.state == "success") {
					location.href="./login.html"
				}else if(data.state=="1"){
					alert("请重新登录");
					location.href="./login.html"
				}else{
					alert(data.state);
				}
	        }
		})
	})
	//列表样式
	$(".firList p").on('click',function(){	
		$(this).siblings().toggle();
		$(this).addClass('p_pg1');
		if($(this).siblings().css('display')=='block'||$(this).siblings().length==0){
			$(this).parent().siblings().find('p').hover(function(){
				$(this).addClass('p_pg2');
			},function(){
				$(this).removeClass('p_pg2');
			})			
			$(this).parent().siblings().find('p').removeClass('p_pg1')
//			$(this).parent().siblings().find('p').css('background','#ffffff');			
			$(this).parent().siblings().find('.secList').css('display','none');
		}
	});
	//关闭预约信息框
	$(".closed").click(function(){
		$(".orderBg").addClass("hideBg");
		$(".orderBg1").addClass("hideBg");
		$(".orderBgM").addClass("hideBg");
		$(".orderBgAdm").addClass("hideBg");		
		$(".illegalProcess").addClass("hideBg");
		$(".ffycProcess").addClass("hideBg");
		
	})
	//左侧列表样式变化
	function setCss(_this){		
//		_this.parents('.lists').css('color','gray');
		$(".secList li").css('color','gray')
		_this.css('color','blue');
		$(".secList").css('display','none');
		_this.parent().css('display','block');
	}
	
//管理员	
//个人中心
	$(".personInf").click(function(){
		jump=false;
		$("#container").load('html/personCenter/personCenter.html');
		setCss($(this));
		$(".personInf p").css('color','gray');
	})
//首页
	$(".oHome").click(function(){
		$("#container").load('html/homePage/oHome.html');
		setCss($(this));
		$(".oHome").css('color','gray');
	})	
	$(".oHome").trigger('click');
//部门管理
	$(".oBranch").click(function(){
		$("#container").load('html/branchManage/branchManage.html');
		setCss($(this));
		$(".oBranch").css('color','gray');
		
	});
//人员管理	
	if(userType==1){
		$("#branchManage").addClass("ohide");//部门管理
		$(".yjgly").addClass("ohide");
		$(".sjgl").click(function(){
			$("#container").load('html/peopleManage/driManage.html');
			setCss($(this));
		});
		$(".bmjgly").click(function(){
			$("#container").load('html/peopleManage/branchAdminiBran.html');
			setCss($(this));
		});
	}else{
		$("#branchManage").removeClass("ohide");
		$(".yjgly").removeClass("ohide");
		$(".sjgl").click(function(){
			$("#container").load('html/peopleManage/driManageInsti.html');
			setCss($(this));
		});
		$(".bmjgly").click(function(){
			$("#container").load('html/peopleManage/branchAdminiIns.html');
			setCss($(this));
		});
	}
	$(".yjgly").click(function(){
		$("#container").load('html/peopleManage/instituteAdmini.html');
		setCss($(this));
	});
	
//借车登记
	$(".jc").click(function(){
		$("#container").load('html/borrowCar/borrowCar.html');
		setCss($(this));	
		$(".jc").css('color','gray');
	})
//还车登记
	$(".hc").click(function(){
		$("#container").load('html/returnCar/returnCar.html');
		setCss($(this));	
		$(".hc").css('color','gray');
	})
//车辆管理	
	//车辆管理——车辆信息修改
	$(".xxxg").click(function(){
		$("#container").load('html/carManage/infChange.html');
		setCss($(this));		
	})	
	//车辆管理——车辆录入	
	$(".cllr").click(function(){
		$("#container").load('html/carManage/loggingIn.html');
		setCss($(this));
	})
	//车辆管理——用车申请
//	$(".ycsq").click(function(){
//		$("#container #iframes").attr('src','html/carManage/apply.html');
//		setCss($(this));
//	})
	//车辆管理——维修车辆
	$(".wxby").click(function(){
		$("#container").load('html/carManage/maintain.html');
		setCss($(this));
	});
	//车辆管理——节假日用车
	$(".jjryc").click(function(){
		$("#container").load('html/carManage/holidays.html');
		setCss($(this));		
	});
	//车辆管理——加油卡信息
	$(".jjkxx").click(function(){
		$("#container").load('html/carManage/gasCard.html');
		setCss($(this));		
	})
	//车辆管理——违章查询
	$(".wzcx").click(function(){
		$("#container").load('html/carManage/breakRules.html');
		setCss($(this));		
	})
	
//统计
	//统计
	$(".cllc").click(function(){
		$("#container").load('html/trafficStatistics/mileage.html');
		setCss($(this));		
	})
	$(".sjtj").click(function(){
		$("#container").load('html/trafficStatistics/drivers.html');
		setCss($(this));		
	})
	$(".clwxby").click(function(){
		$("#container").load('html/trafficStatistics/maintenance.html');
		setCss($(this));		
	})
	$(".ycxq").click(function(){
		$("#container").load('html/trafficStatistics/usedCarInf.html');
		setCss($(this));		
	})
//轨迹管理
	//实时轨迹	
	$(".ssgj").click(function(){
//		$("#container #iframes").attr('src','html/track/current.html');
	$("#container").load('html/track/current.html');
		setCss($(this));
	})
	//历史轨迹
	$(".lsgj").click(function(){
//		$("#container #iframes").attr('src','html/track/history.html');
		$("#container").load('html/track/history.html');
		setCss($(this));
	})
})
function ifmload(ifm) {
    debugger
    var tempHtml = $(ifm.contentWindow.document.body).find('pre').html();
    if (tempHtml == undefined) {
        return;
    }
    var val = JSON.parse($(ifm.contentWindow.document.body).find('pre').html());

    if (val.state == "success") {
        alert('录入成功！');
    } else if (val.state == "1") {
        alert('请重新登录');
        window.location.href = './login.html';
    } else {
        alert('录入失败：' + val.state);
    }
}