/**
 * Created by lenovo on 2017/10/27.
 */

/*
 * 该文件实现地图的绘图与选择工具条功能，测量功能
 * */

// 测距
var measureDist;
// 测面
var measureArea;
var tools =
{
    //工具条初始入口
    init: function () {

        //添加工具条界面
        //this.addDiv();

        //注册事件
        //this.setFun();

        ////行政区划导航
        //Nva.init();

        //添加量算、比例尺、定位等功能
        require(["dojo/dom", "dojo/dom-construct",
            "dojo/on",
            "esri/layers/GraphicsLayer",
            "src/MeasureDist",
            "src/MeasureArea",
            "dojo/domReady!"
        ], function (dom, domConstruct, on,  GraphicsLayer, MeasureDist, MeasureArea) {


            // 测距，先判断是否已创建或被销毁
            on(dom.byId("tool_measureDist"), "click", function () {

                if(boolDraw){
                    drawToolbar.deactivate();
                    boolDraw=false;
                }
                if(boolSelect){
                    selectToolbar.deactivate();
                    boolSelect=false;
                }

                //判断当前选中状态返回
                //if ($(this).attr("is-select") == 1)
                //    return;
                //注销量算工具
                tools.toolsClose();
                //当前选中状态
                tools.select(this);
                //注册量算事件
                !measureDist && (measureDist = new MeasureDist({
                    map: map
                }));
                measureDist.initTool();
                measureDist.closeTool = function () {
                    tools.close();
                    measureDist.close();
                }
            });

            // 测面，先判断是否已创建或被销毁
            on(dom.byId("tool_measureArea"), "click", function () {

                if(boolDraw){
                    drawToolbar.deactivate();
                    boolDraw=false;
                }
                if(boolSelect){
                    selectToolbar.deactivate();
                    boolSelect=false;
                }

                //判断当前选中状态返回
                //if ($(this).attr("is-select") == 1)
                //    return;
                //注销量算工具
                tools.toolsClose();
                //当前选中状态
                tools.select(this);
                //注册量算事件
                !measureArea && (measureArea = new MeasureArea({
                    map: map
                }));
                measureArea.initTool();
                measureArea.closeTool = function () {
                    measureArea.close();
                    tools.close();
                }
            });

        });

    },

    //注册事件
    setFun: function () {

        //鼠标移动到工具上，通过添加active样式改变背景颜色
        $('#toolsDiv span').bind('mouseover', function () {
            //添加选中样式
            $(this).addClass("active");
        });
        //鼠标离开工具，通过删除active样式还原背景颜色
        $('#toolsDiv span').bind('mouseout', function () {
            //判断当前工具未选中，移除选中样式
            if ($(this).attr("is-select") == 0)
                $(this).removeClass("active");
        });

        //行政区划定位
        $('.navLocal').bind('click', function () {

            if($(this).attr("is-select")==0)
            {
                //当前选中状态
                tools.select(this);
                $("#navLocalListDiv").css("display","block");
            }
            else
            {
                //取消其他工具选中状态
                tools.close();
                $("#navLocalListDiv").css("display","none");
            }

            //关闭用户信息界面
            tools.closeUserPanel();

        });

        //地图点击事件
        map.on("click",function(){
            //关闭用户信息面板
            tools.closeUserPanel();
        });

        ////清空
        //$('#tool_clear').bind('click', function (){
        //    Init.clear();
        //});
    },
    //关闭行政区划定位面板
    closeNavLocal: function(){
        if($(".navLocal").attr("is-select")==1)
        {
            //取消其他工具选中状态
            tools.close();
            $("#navLocalListDiv").css("display","none");
        }
    },
    //关闭用户信息面板
    closeUserPanel: function(){
        $(".userLinkPanel,.userLinkPanelArrow").removeClass("userLinkPanel-active");
        $("#mapDiv .rightBtn").removeClass("rightBtn-active");
    },
    //打印
    print: function (e){
        tools.close();
        var bdhtml = window.document.body.innerHTML;
        window.print();
    },
    //选中当前工具
    select: function (e) {
        //取消其他工具选中状态
        tools.close();

        //通过属性is-select=1记录选中状态
        $(e).attr("is-select", 1);

        //添加选中样式
        $(e).addClass("active");
    },
    mouseOver:function (name, x, y) {
        var list = "";
        $("#CurrentContent").css("display", "block");
        $("#CurrentContent").css("left", x + 10 + "px");
        $("#CurrentContent").css("top", y + 10 + "px");
        var gra=null;
        if (poorLayout.graphicLayer.graphics != null) {
            for (var i = 0; i < poorLayout.graphicLayer.graphics.length; i++) {
                if (poorLayout.graphicLayer.graphics[i].attributes != null) {
                    if (poorLayout.graphicLayer.graphics[i].attributes["NAME"] == name) {
                        gra=poorLayout.graphicLayer.graphics[i];
                        poorLayout.graphic.setGeometry(poorLayout.graphicLayer.graphics[i].geometry);
                        poorLayout.graphicLayer.add(poorLayout.graphic);
                        break;
                    }
                }

            }
        }
        var title = name + "<br>";

        var colors=userConfig.HighchartsColor;
        if(gra.attributes["TYPE"]=="POORLAYOUT")
        {
            list += '<div class="CurrentContentTitle">' + title + '</div>';
            var datas=gra.attributes["DATA"];
            var content="";
            for(var j=0;j<datas.length;j++)
            {
                content+="<div class='CurrentContentCube' style='background-color: "+colors[j]+"'></div>";
                content+="<div class='CurrentContentText'>"+datas[j].name+":"+ datas[j].y+"</div>";
                content+= "<br>";
            }
            list += '<div>' + content + '</div>';
        }

        $("#CurrentContent").html(list).show();
    },

    closetipDiv:function () {
        $("#CurrentContent").css("display", "none");
        poorLayout.graphicLayer.remove(poorLayout.graphic);
    },
    //取消所有工具选中状态
    close: function () {
        //取消选中样式
        $("#othTools span").removeClass("active");

        //通过属性is-select=0记录未选中状态
        $('#othTools span').attr("is-select", 0);

        ////清空行政区划状态
        //Nva.clear();

        //关闭用户信息面板
        //tools.closeUserPanel();


        //tools.closetipDiv();
    },
    // 关闭各个工具,清空图层
    toolsClose: function ()
    {
        measureDist && (measureDist.destroy(), measureDist = null);
        measureArea && (measureArea.destroy(), measureArea = null);

    },

    //设置信息提示
    //setWarningInfo: function(info){
    //    //消息提示
    //    $(".warningInfo").css("display", "inline");
    //    $(".warningInfo").html(info);
    //    var timeOutHandler = setTimeout(function () {
    //        $(".warningInfo").css("display", "none");
    //        clearTimeout(timeOutHandler);
    //    }, 1800);
    //}

};


/*------------------------------------*/
// 行政区划导航
/*------------------------------------*/

//var Nva =
//{
//    layer: null,
//    init: function () {
//
//        //当前位置范围图层
//        this.layer = new esri.layers.GraphicsLayer();
//        map.addLayer(this.layer);
//
//        //地图移动获取中心点行政区划信息
//        require(["dojo/on", "dojo/domReady!"], function (on) {
//            on(map, "extent-change", function (delta) {
//                //显示中心点所在乡镇
//                Nva.getDistrictByCenterPoint();
//            });
//
//            //添加行政区划定位界面
//            var cityList='<div class="navLocal active1" style="border-bottom: 1px solid #dadada;"><p style="color: #5266a4">当前位置：'+userConfig.appName+'</p></div>';
//            for (var i = 0; i < userConfig.townsLocation.length; i++) {
//                var city = userConfig.townsLocation[i];
//                cityList+= '<div class="nav_city"><a href="javascript:void(0)" ' + ' code="' + city.code + '">'
//                    + city.text + '</a></div>';
//            }
//            $(cityList).appendTo("#navLocalListDiv");
//
//            //定位
//            $('.nav_city a').bind('click', function () {
//                var level = parseInt($(this).attr("level"));
//                var code = $(this).attr("code");
//                $(".navLocal.active p").html($(this).text()).show();
//                $(".navLocal.active1 p").html("当前位置："+ $(this).text()).show();
//                Nva.getDistrictPolygonByCode(code);
//            });
//        });
//    },
//
//    //根据行政区划代码获取乡镇polygon
//    getDistrictPolygonByCode: function(code){
//        $("#waitingBox").css("display","block");
//        var queryTask = new esri.tasks.QueryTask(userConfig.thematicServices.SXMapThemtic.url + "/12");
//        var query = new esri.tasks.Query();
//        query.returnGeometry = true;
//        query.outFields = ["*"];
//        query.outSpatialReference = map.spatialReference;
//        query.where = " PAC = " + "'" + code + "'";
//        queryTask.execute(query, function(featureSet){
//            var resultFeatures = featureSet.features;
//            var graphic = resultFeatures[0];
//            Nva.layer.clear();
//            var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([7, 240, 245]), 3);
//            graphic.setSymbol(symbol);
//            Nva.layer.add(graphic);
//            //graphic高亮显示并闪烁
//            Nva.graphicHighlight(graphic, new esri.Color([7, 240, 245]), 3);
//            map.setExtent(graphic.geometry.getExtent().expand(1.5));
//            $(".navLocal p").html(graphic.attributes['NAME']).show();
//            $(".navLocal.active1 p").html("当前位置："+ graphic.attributes['NAME']).show();
//            $("#waitingBox").css("display","none");
//
//        }, function (error) {
//            console.log("按行政区划代码查询出错：");
//            console.log(error);
//            $("#waitingBox").css("display","none");
//        });
//    },
//
//    //获取中心点所在乡镇名称
//    getDistrictByCenterPoint: function () {
//        var queryTask = new esri.tasks.QueryTask(userConfig.thematicServices.SXMapThemtic.url + "/12");
//        var query = new esri.tasks.Query();
//        query.returnGeometry = true;
//        query.outFields = ["*"];
//        query.geometry = map.extent.getCenter();
//        query.outSpatialReference = map.spatialReference;
//        queryTask.execute(query, function(featureSet){
//            var resultFeatures = featureSet.features;
//            if (resultFeatures.length == 0 || resultFeatures == null) {
//                $(".navLocal p").html(userConfig.appName + "外区域").show();
//                $(".navLocal.active1 p").html("当前位置：" + userConfig.appName + "外区域").show();
//                return;
//            }
//            for (var i = 0, il = resultFeatures.length; i < il; i++) {
//                if(map.getLevel() > 0){
//                    var graphic = resultFeatures[i];
//                    var name = graphic.attributes["NAME"];
//                    $(".navLocal p").html(name).show();
//                    $(".navLocal.active1 p").html("当前位置："+name).show();
//                }else{
//                    $(".navLocal p").html(userConfig.appName).show();
//                    $(".navLocal.active1 p").html("当前位置：" + userConfig.appName).show();
//                }
//            }
//        }, function (error) {
//            console.log("根据地图中心点查询行政区划出错：");
//            console.log(error);
//        });
//    },
//
//    //graphic高亮显示
//    graphicHighlight: function(graphic,color, lineWeight) {
//        var highlightCount = 0;
//        var highlightSymbolHandler = setInterval(function () {
//            var symbolWhite = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([250, 250, 250]), lineWeight);
//            var symbolBlue = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, color, lineWeight);
//            highlightCount++;
//            if (highlightCount % 2) {
//                graphic.setSymbol(symbolBlue);
//            } else {
//                graphic.setSymbol(symbolWhite);
//            }
//            if (highlightCount == 9) {
//                clearTimeout(highlightSymbolHandler);
//            }
//        }, 150);
//    },
//
//    //清空图层、隐藏行政区划界面
//    clear: function () {
//        if(this.layer)
//            this.layer.clear();
//        $("#navLocalListDiv").css("display","none");
//    }
//};/**

