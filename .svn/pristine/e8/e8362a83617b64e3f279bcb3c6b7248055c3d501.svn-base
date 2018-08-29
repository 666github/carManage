$(function(){
	//部门默认颜色设置
//	(function(){
//		$("select").css("color","darkgray");
//		$("option").css("color","black")
//		$("select").change(function(){
////			var selItem=$(this).val();
////			if(selItem==$(this).find("option:first").val()){
////				$(this).css("color","darkgray")
////			}else{
//				$(this).css("color","black")
////			}
//		})
//	})();
	//车辆录入信息验证
//	function regGasCard(){		
//	    $.each($(".cardLen"),function(){
//	    	if($(this).val().length==0){
//	    		alert("所有选项必填，有未填写选项！");
//	        return false;
//	    	}
//	    })
//	    var regcardNum=/^[0-9]{19}$/;
//	    var cardNum = $("#regcardNum").val();
//	    if (!regcardNum.test(cardNum)) {
//	        alert("加油卡格式为19位纯数字");
//	        return false;
//	    }
//	    var regcarLicence=/^京[A-Z]{1}[A-Z0-9]{5}$/;//var regcarLicence=/^[\u4e00-\u9fa5]{1}[A-Z][A-Z0-9]{5}/
//	    var carLicence=$("#regcarLicence").val().toUpperCase();
//	    if (!regcarLicence.test(carLicence)) {
//	        alert("车牌格式不正确，标准格式为：京AV0001");	 
//	        return false;
//	    }
//	    var regPay=/^[0-9]*\.?[0-9]*$/;
//	    var myPay = $("#regPay").val();
//	    if (!regPay.test(myPay)) {
//	        alert("消费金额格式为纯数字或数字加小数点");
//	        return false;
//	    }
//	    var reglitre=/^[0-9]*\.?[0-9]*$/;
//	    var litre = $("#reglitre").val();
//	    if (!reglitre.test(litre)) {
//	        alert("消费金额格式为纯数字或数字加小数点");
//	        return false;
//	    }
//	    var regPrice=/^[0-9]*\.?[0-9]*$/;
//	    var oPrice = $("#regPrice").val();
//	    if (!regPrice.test(oPrice)) {
//	        alert("价格格式为纯数字或数字加小数点");
//	        return false;
//	    }
//	    var regEngin=/^[a-zA-Z0-9]{4,}$/
//	    var oEngin = $("#regEngin").val();
//	    if (oEngin.length < 4) {
//	        alert("发动机号不能少于4位！");
//	        return false;
//	    }
//	    if (!regEngin.test(oEngin)) {
//	        alert("发动机号只能由字母、数字组成！");
//	        return false;
//	    }
//	    return true;
//	    
//	}
//change事件
	$("#carlicence").change(function(){
		var gaslicence = $("#carlicence").val();
		$.get("url",{"gaslicence":gaslicence},function(data){
			if(data.state=="success"){
				$(".gasNums").text(data.gasNums);
				$(".personId").text(data.personId);
				$(".gasState").text(data.gasState);
				var gasCardInf=data.gasCardInf;
			}else if(data.state=="1"){
				alert("请重新登录");
				location.href="/login.html"
			}else{
				alert(data.state);
			}
		})
	})
	$("#mysubmit").click(function(){
		if(loggingIn()){
			$("#myform").submit();
		}
	})
})
function ifmload(ifm) {
    var val = JSON.parse($(ifm.contentWindow.document.body).find('pre').html());
    debugger
    if (val.state == "success") {
        alert('录入成功！');
    } else if (val.state == "1") {
        alert('请重新登录');
        window.location.href = 'login.html';
    } else {
        alert('录入失败：' + val.state);
    }
}