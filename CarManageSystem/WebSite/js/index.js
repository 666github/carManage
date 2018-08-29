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
$.get("http://192.168.1.111:2238/handler/GetCurrentUser.ashx", function (data) {
      data = JSON.parse(data);
      if (data.state == "success") {
//    	userType=data.userType;
		$(".personPho img").attr("src",data.info.imgsrc);
          $(".myName").text(data.info.username);
          $(".branchName").text(data.info.branch);
          lastTime = data.info.LastLoginDate;
          $("#container").load('html/homePage/oHome.html');
		}else if(data.state=="1"){
//				alert("请重新登录");
//				location.href="/login.html"
		}else{
			alert(data.state);
		}
	});		
	//退出
  $(".thrIcon").click(function () {
      $.get("http://192.168.1.111:2238/handler/Quit.ashx", function (res) {
          var data = JSON.parse(res);
          if (data.state == "success") {
				location.href="/login.html"
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="/login.html"
			}else{
				alert(data.state);
			}
		});
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
		$(".BgBm").addClass("hideBg");
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
		$(".yjgly").addClass("ohide");
		$(".sjgl").click(function(){
		$("#container").load('html/peopleManage/driManage.html');
		setCss($(this));
		});
	}else{
		$(".yjgly").removeClass("ohide");
		$(".sjgl").click(function(){
		$("#container").load('html/peopleManage/driManageInsti.html');
		setCss($(this));
	});
	}
	$(".yjgly").click(function(){
		$("#container").load('html/peopleManage/instituteAdmini.html');
		setCss($(this));
	});
	$(".bmjgly").click(function(){
		$("#container").load('html/peopleManage/branchAdmini.html');
		setCss($(this));
	});
	
//车辆管理	
	//车辆管理——车辆查询
	$(".clcx").click(function(){
		$("#container").load('html/carManage/query.html');
		setCss($(this));		
	})	
	//车辆管理——车辆录入	
	$(".cllr").click(function(){
		$("#container").load('html/carManage/loggingIn.html');
		$(".thrIcon").css('display','none');
		setCss($(this));
	})
	//车辆管理——用车申请
//	$(".ycsq").click(function(){
//		$("#container #iframes").attr('src','html/carManage/apply.html');
//		setCss($(this));
//	})
	//车辆管理——维修车辆
	$(".wxcl").click(function(){
		$("#container").load('html/carManage/maintain.html');
		setCss($(this));
	});
	//车辆管理——节假日用车
	$(".jjryc").click(function(){
		$("#container").load('html/carManage/holidays.html');
		setCss($(this));		
	});
	$(".hcdj").click(function(){
		$("#container").load('html/carManage/backCancel.html');
		setCss($(this));		
	})
	$(".jjkxx").click(function(){
		$("#container").load('html/carManage/gasCard.html');
		setCss($(this));		
	})

	//预约车辆
	
//司机
	//车辆管理
	$(".query_dri").click(function(){
		$("#container #iframes").attr('src','html/carManage/query.html');
		setCss($(this));
		$(this).css('color','gray');	
	});
	$(".clcx_dri").click(function(){
		$("#container #iframes").attr('src','html/carManage/queryDriCars.html');
		setCss($(this));		
	})
	$(".ycsq_dri").click(function(){
		$("#container #iframes").attr('src','html/carManage/apply.html');
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
