//console.log(carNumber);
$(document).ready(function(){
	getCarDetail();
})


$(".back_title").click(function(){
	$("#container").load("driverManagement/carsManage/carsManagement.html");
});

function getCarDetail(){
	var content = this;
	$.ajax({
		type:"get",
		url: "http://192.168.1.120:2238/handler/CarManage/CarQuery/GetCarDetails.ashx",
		data: { "carNumber": carNumber ,"from":0},
		xhrFields:{withCredentials:true},
		dataType:"json",
		success:function(data){
			//debugger						
			if (data.state=="success") {debugger
				if(data.state_det.length==0){$(".state_det").addClass("hide")}else{$(".state_det").removeClass("hide")}
		        content.carDetail(data.carInf_det,data.state_det);
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="./login.html"
			}else{
				alert(data.state);
			}			
		},error:function(e1,e2,e3){
			debugger
			console.log("加载失败")
		}
	});
	
	this.carDetail = function(dataList,state_det){
		
		var node=$("#detailsInf");
		//设置基本信息值
		var name,value;
		
		for(name in dataList){
			
			value=dataList[name];
			
			if(typeof(value)!=="function"){
				
				value=value?value:" ";
				
				node.find("[dataName="+name+"]").text(value);
				
			}
			
		}
		$('.carIcon').attr("src",dataList.imgSrc);
//		if( dataList.currentState == 1 ||dataList.currentState == 2){
//			$(".state_det").removeClass("hide");
			
//			if( dataList.currentState == 1 ){
//				$(".currentState").text("被预约");
//				content.getCarState(stateList);
//			}else if( dataList.currentState == 2 ){
//				$(".currentState").text("已外出");
//				content.getCarState(stateList);
//			}
//		}
//状态信息
        var stateStr="";
        var randomColor = function() {
		    return "rgb(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 100) + "," + parseInt(Math.random() * 100) + ")";
		}
        $.each(state_det, function(index,obj) {
        	stateStr+='<ul class="currentInf" style="color:'+randomColor()+'">'+
				'<li><span class="statePerson">预约人：</span><span class="currName">'+obj.currName+'</span></li>'+
				'<li>部门：<span class="currBranch">'+obj.currBranch+'</span></li>'+
				'<li>用车时间：<span class="currUsed">'+obj.currUsed+'</span></li>'+
				'<li>还车时间：<span class="currBack">'+obj.currBack+'</span></li>'+
				'<li>目的地：<span class="currDestination">'+obj.currDestination+'</span></li>'+
				'<li>用途：<span class="currEffect"></span>'+obj.currEffect+'</li>'+
			'</ul>'
        });
        $(".state_det").append(stateStr);
	}
	
//	this.getCarState = function(stateList){
//		var node=$(".state_det");
//		//设置状态信息
//		var name,value;
//		
//		for(name in stateList){
//			
//			value=stateList[name];
//			
//			if(typeof(value)!=="function"){
//				
//				value=value?value:" ";
//				
//				node.find("[dataName="+name+"]").text(value);
//				
//			}
//			
//		}
//	}
	
	
}




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



