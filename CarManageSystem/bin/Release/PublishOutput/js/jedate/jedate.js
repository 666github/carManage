$(function(){
var start = {
//	isinitVal:true,
	initAddVal:{hh:"+2"},
    format: 'YYYY-MM-DD hh:mm',
    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
    //festival:true,
//  maxDate: $.nowDate({DD:0}), //最大日期
    choosefun: function(elem,datas){
        end.minDate = datas; //开始日选好后，重置结束日的最小日期
//      endDates();
    },
    okfun:function (elem,datas) {
        //alert(datas)
    }
    
};
var end = {
//	isinitVal:true,
	initAddVal:'YYYY-MM-DD hh:mm',
    format: 'YYYY-MM-DD hh:mm',
    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
    //festival:true,
    maxDate: '2099-06-16 23:59:59', //最大日期
    choosefun: function(elem,datas){
        start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
    }
};
function endDates() {
    end.trigger = false;
    $("#inpend").jeDate(end);
}
$("#inpstart").jeDate(start);
$("#inpend").jeDateEnd(end);

})