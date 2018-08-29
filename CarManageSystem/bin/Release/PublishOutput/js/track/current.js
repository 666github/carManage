﻿var mapr;
$(function () {
    //实时轨迹
    // 百度地图API功能
    mapr = new BMap.Map("mycurrentmap");
    mapr.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
    mapr.enableScrollWheelZoom(true);
    mapr.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
    mapr.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
    mapr.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件
    mapr.addControl(new BMap.MapTypeControl());                  //添加地图类型控件

    var myIcon = new BMap.Icon("lorry.png", new BMap.Size(30, 26), {    //小车图片
        offset: new BMap.Size(0, -5),    //相当于CSS精灵
        imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
    });

    var carMk;
    var count = 0;
    var wsImpl = window.WebSocket || window.MozWebSocket;
    var convertor = new BMap.Convertor();
    var arrCar = [];//车辆id的数组
    var arrMK = [];//车辆标记的数组
    var opts = {
        width: 200,     // 信息窗口宽度
        height: 110,     // 信息窗口高度
    }

    var run = function () {
        window.ws = new wsImpl('ws://127.0.0.1:8001/');
        ws.onmessage = function (data) {
            console.log(data.data);
            var obj = eval('(' + data.data + ')');
            for (var i = 0; i < obj.length; i++) {
                var car = obj[i];
                var index = arrCar.indexOf(car.id);
                var p = new BMap.Point(car.position.x, car.position.y);
                switch (car.state) {
                    case 0:
                    case 1:
                        if (index > -1) {
                            arrMK[index].setPosition(p);
                        }
                        else {
                            var labelgg = new BMap.Label("车牌号:" + car.id, { offset: new BMap.Size(20, -10) });
                            var carMk = new BMap.Marker(p);
                            carMk.addEventListener("click", function (e) {
                                //根据carId 去请求驾驶员、用途、目的地、借车日期
                                $.ajax({
                                    type: "post",
                                    dataType: "json",
                                    url: "../handler/Trajectory/GetDriverInfo.ashx",
                                    data: { carNumber:car.id,from: 0 },
                                    xhrFields: { withCredentials: true },
                                    success: function (data) {
                                        debugger
                                        var resObj = data;
                                        mapr.panTo(new BMap.Point(car.position.x, car.position.y));
                                        mapr.centerAndZoom(new BMap.Point(car.position.x, car.position.y), 14);
                                        var infoWindow = new BMap.InfoWindow("车牌:" + resObj.userInfo.carNumber + "</br>驾驶员:" + resObj.userInfo.user + "</br>用途:" + resObj.userInfo.purpose + "</br>目的地:" + resObj.userInfo.destination + "</br>借车时间:" + resObj.userInfo.time, opts);  // 创建信息窗口对象 
                                        mapr.openInfoWindow(infoWindow, new BMap.Point(e.point.lng, e.point.lat)); //开启信息窗口
                                    },
                                    error: function () {
                                        alert('请求失败，请重试!');
                                    }
                                })	
                            });
                            mapr.addOverlay(carMk);
                            carMk.setLabel(labelgg); //添加GPS label
                            carMk.setPosition(p);
                            arrCar.push(car.id);
                            arrMK.push(carMk);
                        }
                        break;
                    case -1:
                        if (index > -1) {
                            mapr.removeOverlay(arrMK[index]);
                            arrCar.remove(index);
                            arrMK.remove(index);
                        }
                        break;
                    default: break;
                }
            }
        };
    }

    setTimeout(function () {
        run();
    }, 1000);

    Array.prototype.remove = function (dx) {
        if (isNaN(dx) || dx > this.length) { return false; }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    }
})