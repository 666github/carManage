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
		url: "../handler/CarManage/CarQuery/GetCarDetails.ashx",
		data: { "carNumber": carNumber ,"from":0},
		xhrFields:{withCredentials:true},
		dataType:"json",
		success:function(data){
			//debugger
			
			content.carDetail(data.carInf_det,data.state_det);
			
		},error:function(e1,e2,e3){
			debugger
			console.log("加载失败")
		}
	});
	
	this.carDetail = function(dataList,stateList){
		
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
		if( dataList.currentState == 1 ||dataList.currentState == 2){
			$(".state_det").removeClass("hide");
			
			if( dataList.currentState == 1 ){
				$(".currentState").text("被预约");
				content.getCarState(stateList);
			}else if( dataList.currentState == 2 ){
				$(".currentState").text("已外出");
				content.getCarState(stateList);
			}
		}
	}
	
	this.getCarState = function(stateList){
		var node=$(".state_det");
		//设置状态信息
		var name,value;
		
		for(name in stateList){
			
			value=stateList[name];
			
			if(typeof(value)!=="function"){
				
				value=value?value:" ";
				
				node.find("[dataName="+name+"]").text(value);
				
			}
			
		}
	}
	
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



