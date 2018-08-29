$(function(){
	//部门默认颜色设置
	(function(){
		$("select").css("color","darkgray");
		$("option").css("color","black")
		$("select").change(function(){
			var selItem=$(this).val();
			if(selItem==$(this).find("option:first").val()){
				$(this).css("color","darkgray")
			}else{
				$(this).css("color","black")
			}
		})
	})();
	//车辆录入信息验证
	function loggingIn(){
		var img1src=$(".img1").attr('src');
		if(img1src==""){
			alert('请上传车辆照片');
			return false;
		}
//		var olength=$(".olength").val();		
//	    if (olength.length == 0) {
//	        alert("所有选项必填，有未填写选项！");
//	        return false;
//	    }
	    $.each($(".carLength"),function(){
	    	if($(this).val().length==0){
	    		alert("所有选项必填，有未填写选项！");
	        return false;
	    	}
	    })
	    var regPlate=/^京[A-Z]{1}[A-Z0-9]{5}$/;//var regPlate=/^[\u4e00-\u9fa5]{1}[A-Z][A-Z0-9]{5}/
	    var oPlate=$("#regPlate").val().toUpperCase();
	    if (!regPlate.test(oPlate)) {
	        alert("车牌格式不正确");
	        return false;
	    }
	    var regMileage=/^[0-9]*\.?[0-9]*$/;
	    var oMileage = $("#regMileage").val();
	    if (!regMileage.test(oMileage)) {
	        alert("里程格式为纯数字或数字加小数点");
	        return false;
	    }
	    var regPrice=/^[0-9]*\.?[0-9]*$/;
	    var oPrice = $("#regPrice").val();
	    if (!regPrice.test(oPrice)) {
	        alert("价格格式为纯数字或数字加小数点");
	        return false;
	    }
	    var regEngin=/^[a-zA-Z0-9]{4,}$/
	    var oEngin = $("#regEngin").val();
	    if (oEngin.length < 4) {
	        alert("发动机号不能少于4位！");
	        return false;
	    }
	    if (!regEngin.test(oEngin)) {
	        alert("发动机号只能由字母、数字组成！");
	        return false;
	    }
	    return true;
	    
	}
	
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