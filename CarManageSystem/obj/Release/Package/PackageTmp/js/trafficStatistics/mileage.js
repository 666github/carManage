$(document).ready(function() {

//	checkInfo();
	getDepartment();
	odelSearch();
});

function getDepartment(){
	var option = $('.mileBranch').html().trim();
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
            $('.mileBranch').html(option);
            var currentBranch = $(".branchName").text();
			$(".mileBranch").val(currentBranch);
			if(userType==1){
				$(".mileBranch").attr("disabled","disabled");
			}
			checkInfo();
        },
        error: function (e1,e2,e3) {
            console.log("部门获取失败");
        }
    })
}

//获取
function checkInfo(){
	var content = this;
	var department = $('.mileBranch').val();
	var mileTime1=$("#mileTime1").val();debugger
	var mileTime2=$("#mileTime2").val();
	
	$.ajax({
		type:"get",
		url:"../handler/Statistics/ViewCarsMileage.ashx",
		data:{"department":department,"startDate":mileTime1,"endDate":mileTime2,from:0},
		xhrFields:{withCredentials:true},
		dataType:"json",
		success:function(data){debugger
			if(data.state=="success"){
				$(".totalNum").text(data.totalNum);
				$(".mileNum").text(data.mileNum);
				$(".travelNum").text(data.travelNum);
				content.getMileage(data.mileageInfo);console.log(mileTime1,mileTime2)
				//debugger
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
	
	this.getMileage = function(_data){
		var mileageNode = "";
		for (var i = 0; i<_data.length;i++) {
			mileageNode += '<ul class="carInfo">'+
				'<li class="carsImg"><img src="'+_data[i].carsImg+'"/></li>'+
				'<li class="brands"><span class="firstBrand">'+_data[i].firstBrand+'</span></li>'+
				'<li class="license"><span class="carLicense">车牌：<span class="plateNum">'+_data[i].plateNum+'</span></span><span class="seat">'+_data[i].seat+'</span></li>'+
				'<li class="stateInf"><div class="tripMile"><span class="miles">'+_data[i].miles+'</span>公里</div><div class="tripCount"><span class="count">'+_data[i].count+'</span>次</div></li>'+
			'</ul>';
		}
		document.getElementById("carinfo").innerHTML = mileageNode;
	}
	
}
function odelSearch(){
	$(".mileBranch").change(function(){
		checkInfo();
	})
//	$(".olength").blur(function(){
//		if($("body>div:last-child").css("display")=="none"){//时间框隐藏了触发事件
//			checkInfo();debugger
//		}
//	})
//	$("#mileTime1").focus(function(){//法2需要在checkInfo获取新日期参考historyDate
//		WdatePicker({maxDate:'#F{$dp.$D(\'mileTime2\')}',dchanged:checkInfo,Mchanged:checkInfo,ychanged:checkInfo});
//	})
	$("#mileTime1").click(function(){
		$("#mileTime1").focus(function(){
			checkInfo();
			$("#mileTime1").blur();
		});
	})
	$("#mileTime2").click(function(){
		$("#mileTime2").focus(function(){
			checkInfo();
			$("#mileTime2").blur();
		});
	})
}
