var map;
$(function () {
    //历史轨迹
    // 百度地图API功能
    debugger
    map = new BMap.Map("myhistorymap");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
    map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
    map.enableScrollWheelZoom(true);

    
})

var setHistory = function (position) {
    var arry = [
        //new BMap.Point(116.380967, 39.913285),
        //new BMap.Point(115.424374, 35.914668)
    ]
    for (var i = 0; i < position.length; i++) {
        arry.push(new BMap.Point(position[i].Longitude, position[i].Latitude));
        console.log(position[i].Longitude + "    " + position[i].Latitude)
    }
    debugger
    var polyline = new BMap.Polyline(arry, { strokeColor: "blue", strokeWeight: 5, strokeOpacity: 1 });
    debugger
    map.addOverlay(polyline);
}