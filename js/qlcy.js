/**
 * 标识是否是全屏状态
 * @type {boolean}
 */
var isFullScreen = false;
var isRouteOpen = true;
var currentRouteService = null;
var currentRouteService_QueryUrl = null;
var mySlideMapUrlLayer = null;
var routeLayer;
var new_Label_arr = [];
var isEnlargePic = false;

//存储线路中存在的图标
var new_arr = [];
var lanchezuobiao;

var titleHeight = $(".top").height();
var slidHeight = $(".mw_slide").height();

$(function () {

    for (var t = 0; t < $("#legendTable label").length; t++) {
        new_Label_arr.push($("#legendTable label")[t].innerText.trim());
    }

    //动态计算map的高度
    setMapHeight($(".top").height(), $(".mw_slide").height());
    $(window).resize(function () {
        setMapHeight($(".top").height(), $(".mw_slide").height());
    });

    //全貌图控件
    $("#full_view").append("<div class='route_name'><h3>" + qlcyService[0].shortName + "</h3><p style='display: none;text-align: center'>" + qlcyService[0].name + "</p></div>");
    $("#full_view").hover(function () {
        $(this).find(".route_name").stop().animate({
            height: "93px"
        }, 500);
        $(this).find(".route_name h3").stop().animate({
            paddingTop: "10px"
        }, 500);
        $(this).find(".route_name p").show();
    }, function () {
        $(this).find(".route_name").stop().animate({
            height: "25px"
        }, 500);
        $(this).find(".route_name h3").stop().animate({
            paddingTop: "0px"
        }, 500);
        $(this).find(".route_name p").hide();
    });

    /**
     * 显示全貌图
     */
    $("#full_view").click(function () {
        loadQuanMaoMap();
        $("#bottomContainer").hide();
        $("#legendTable").hide();
        $("#selectRoute").hide();

        $("#legendTable_quanmaotu").show();
    });

    //13条路线
    $(".mw_slide_list").each(function (index) {
        var shortName = qlcyService[index + 1].shortName;
        var fullName = qlcyService[index + 1].name;
        // $(this).append("<div class='route_name'><h3><span class='route_No roll'><span>"
        // +(index+1)+
        // "</span></span>" + shortName + "</h3><p>" + fullName + "</p></div>");
        $(this).append("<div class='route_name'><h3><img style='height:20px;width:20px;' src='image/number/"+(index+1)+".png'>" + shortName + "</h3><p>" + fullName + "</p></div>");
    });

    $('.dowebok').liMarquee();

// var responseGraphic,responseGraphic,RegionPositionLayer, drawRegionGraphic;
    //自动加载十三条路线的名称
    $(".mw_slide_list").each(function (index) {

        // $(this).append("<div class='route_name'><h3>" + shortName + "</h3><p>" + fullName + "</p></div>");
        $(this).hover(function () {
            $(this).find(".route_name").stop().animate({
                height: "93px"
            }, 500);
            $(this).find(".route_name h3").stop().animate({
                paddingTop: "10px"
            }, 500);
        }, function () {
            $(this).find(".route_name").stop().animate({
                height: "25px"
            }, 500);
            $(this).find(".route_name h3").stop().animate({
                paddingTop: "0px"
            }, 500);
        });
        //点击十三条线路的缩略图，加载相应线路(此处需要判断是拖拽还是点击)（wjb）
        var oldx, newx;
        $(this).on('mousedown', function (e) {
            oldx = e.clientX;
        });
        $(this).on('mouseup', function (e) {
            newx = e.clientX;
            if (Math.abs(oldx - newx) < 1) {//如果拖动距离小于1就执行点击事件
                if (index > 12) {
                    index = index - 13;
                }

                $("#bottomContainer").show();
                $("#selectRoute").show();
                $("#trip_advice").css({
                    display: 'none'
                });
                load_trip_advice(index + 1);
                ClickPicture_LoadRoute(index + 1);
            }
        });

    });


    //收起（展开）路线名

    $("#slide_switch").click(function () {
        if (isRouteOpen) {
            $(".mw_slide").animate({
                height: "-1px"
            }, 500);
            $(this).attr('title', '路线详情');

            $("#arrow").removeClass("glyphicon-triangle-top");
            $("#arrow").addClass("glyphicon-triangle-bottom");
            $(".can_be_hidden").css({
                display: "none"
            });

            isRouteOpen = false;
        } else {
            $(".mw_slide").animate({
                height: "93px"
            }, 500);
            $(this).attr('title', '收起');

            $("#arrow").removeClass("glyphicon-triangle-bottom");
            $("#arrow").addClass("glyphicon-triangle-top");
            $(".can_be_hidden").css({
                display: "block"
            });
            isRouteOpen = true;
        }
        setMapHeight();
    });


    var isRight_Menu_Open = false;
    $('#rightMenuBtn').click(function () {
        if (isRight_Menu_Open) {
            $('#rightMenuBtn').animate({right: '0px'});
            $('#legendMenu').animate({right: '-242px'});
            isRight_Menu_Open = false;
        } else {
            $('#rightMenuBtn').animate({right: '242px'});
            $('#legendMenu').animate({right: '0px'});
            isRight_Menu_Open = true;
        }
    });

    $('#plan').click(function () {
        $('#trip_advice').toggle(500);
     });


    /**
     * 全屏按钮
     */

    $("#fullScreen").click(function () {
        if (isFullScreen) {
            if (!isRouteOpen) {
                $("#slide_switch").trigger("click")
            }
            $(".top").slideToggle(1000);
            $('#outer').animate({padding: '60px 0 0 0'});
            $(this).attr('title', '全屏显示');
            $(this).empty();
            $(this).append('<span class="glyphicon glyphicon-resize-full" style="color: #ffffff"></span>&nbsp;全屏');
            $(".can_be_hidden").animate({
                top: '60'
            });
            isFullScreen = false;
        } else {
            if (isRouteOpen) {
                $("#slide_switch").trigger("click");
            }
            $(".top").slideToggle(1000);
            $('#outer').animate({padding: '0px 0 0 0'});
            $(this).find("span").removeClass("glyphicon-resize-full");
            $(this).find("span").addClass("glyphicon-resize-small");
            $(this).attr('title', '退出全屏');
            $(this).empty();
            $(this).append('<span class="glyphicon glyphicon-resize-small" style="color: #ffffff"></span>&nbsp;退出');
            $(".can_be_hidden").css({
                top: '0'
            });
            isFullScreen = true;
        }
        setMapHeight();
    });

    $(".legendTable_tr_td label").click(function () {
        if (currentRouteService != null && mySlideMapUrlLayer != null) {
            highlightPoint($(this)[0].innerText.trim());

        }
    });

    $(".leftTd label").click(function () {
        if (currentRouteService != null && mySlideMapUrlLayer != null) {
            highlightPoint($(this)[0].innerText.trim());

        }
    });

    //动态设置map的高度
    function setMapHeight() {
        var t, s;
        if (isFullScreen && isRouteOpen) {
            t = 0;
            s = 93
            // s=slidHeight
        } else if (isFullScreen && !isRouteOpen) {
            t = 0;
            s = 0;
        } else if (!isFullScreen && isRouteOpen) {
            t = 60;
            s = 93;
            // t=titleHeight;
            // s=slidHeight
        } else if (!isFullScreen && !isRouteOpen) {
            t = 60;
            // t=titleHeight;
            s = 0;
        }
        var mapHeight = $(window).height() - t - s;
        $("#mapid").height(mapHeight);
    }

    /**
     * 放大三维图片
     */
    $("#enlargePic").click(function () {
        if (isEnlargePic) {
            isEnlargePic = false;
            $("#demModalDialog").css("width", "50%");
            $("#demModalDialog").css("height", "70%");
            $("#enlargePic").prop('src', 'image/big.png');
            $("#enlargePic").attr("title", "放大");
        } else {
            isEnlargePic = true;
            $("#demModalDialog").css("width", "80%");
            $("#demModalDialog").css("height", "100%");
            $("#enlargePic").prop('src', 'image/small.png');
            $("#enlargePic").attr("title", "缩小");
        }
    });

    $( "#trip_advice" ).draggable();
});

/**
 * 点击图例中路线列表加载路线
 * @param index
 * @constructor
 */
function ClickPicture_LoadRoute(index) {
    //设定
    changeProfileAndDEMModalSrc(index);
    //首先需要将所有的图标变成默认的样式
    $("#legendTable label").addClass('gray grayfont');
    $("#legendTable label").removeClass("legendPointer");

    currentRouteService = qlcyService[index].tileUrl;
    currentRouteService_QueryUrl = qlcyService[index].queryUrl;
    XMin = qlcyService[index].XMin;
    YMin = qlcyService[index].YMin;
    XMax = qlcyService[index].XMax;
    YMax = qlcyService[index].YMax;
    AddDynamicMapService(currentRouteService, XMin, YMin, XMax, YMax);
    if (index != 0) {
        new_arr = [];
        checkLegendMenu();
        if(qlcyService[index].telpher!=null)
        {
            new_arr.push("缆车(索道)");
            lanchezuobiao = qlcyService[index].telpher;
        }
        checkLegendMenu();
        $("#legendTable_quanmaotu").hide();
        $("#legendTable").show();
        $("#selectRoute").show();
    }
    else {
        $("#legendTable").hide();
        $("#legendTable_quanmaotu").show();
    }
}

//加载推荐行程 wjb 2017 12 25
function load_trip_advice(index) {
    $(".trip_detail").remove();
    $("#trip_title").remove();
    var trip_name = qlcyService[index].shortName;
    $("#trip_advice").append("<div id='trip_title'><b>" + "推荐行程（" + trip_name + "）" + "<span id='close_trip'>" + "×" + "</span></div>");
    $('#close_trip').click(function () {
        $('#trip_advice').css({
            display: 'none'
        });
    });
    var advice = qlcyService[index].trip;
    for (var i = 0; i < advice.length; i++) {
        var day = advice[i].split(':')[0];
        var place = advice[i].split(':')[1];
        $("#trip_advice").append("<div class='trip_detail'><b>" + day + "：" + "</b>" + place + "</div>");
    }
}


function loadQuanMaoMap() {
    currentRouteService = qlcyService[0].tileUrl;
    var XMin = qlcyService[0].XMin;
    var YMin = qlcyService[0].YMin;
    var XMax = qlcyService[0].XMax;
    var YMax = qlcyService[0].YMax;
    AddDynamicMapService(currentRouteService, XMin, YMin, XMax, YMax);
}


function AddDynamicMapService(url, XMin, YMin, XMax, YMax) {
    //加载dynamic service

    if (routeLayer != null) {
        map.removeLayer(routeLayer);
    }
    //mySlideMapUrlLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url);
    mySlideMapUrlLayer = new esri.layers.ArcGISTiledMapServiceLayer(url);
    map.addLayer(mySlideMapUrlLayer);
    //根据该条线路的四至范围，让地图及时缩放至此
    var extent = new esri.geometry.Extent({
        "xmin": XMin, "ymin": YMin, "xmax": XMax, "ymax": YMax,
        "spatialReference": {"wkid": 4326}
    });
    map.setExtent(extent);

    //记录下刚加载的图层的ID号，获取到该图层，并作为全局变量保存
    routeLayer = map.getLayer(map.layerIds[map.layerIds.length - 1]);


}


//图例，点击某一个图例，地图中相应位置点高亮闪烁
function highlightPoint(pointName) {
    if(pointName!="缆车(索道)"){
        RegionPositionLayer.clear();
        // var url = currentRouteService+"/1/query";
        var url = currentRouteService_QueryUrl;
        $.ajax({
            url: url,
            type: "GET",
            data: {
                where: "type like '%" + pointName + "%'",
                f: "json"
            },
            dataType: 'json',
            timeout: 30000,
            success: function (result) {
                if (result.features) {
                    var features = result.features;
                    // var ResultPoint_CordinateArray=[];
                    for (i = 0; i < features.length; i++) {
                        // ResultPoint_CordinateArray.push(features[i].geometry);
                        drawRegionGraphic(features[i].geometry);
                    }

                }
            },
            error: function (result) {
                // console.log(JSON.stringify(result));}
                {

                }
            }
        });
    }
    else{
        drawRegionGraphic(lanchezuobiao);
    }



}


/**
 * 修改模态对话框图片源
 * @param index
 */
function changeProfileAndDEMModalSrc(index) {
    if (index > 13) {
        index = index - 14;
    }

    if (0 != index) {
        $("#selectRoute div").html("当前选择线路：<i style='color: #fbfa42;'>" + qlcyService[index].name + "</i>");

        $("#profileModalLabel").html(qlcyService[index].name + " —— 海拔变化图");
        $("#profileImg").attr("src", "./image/profile/" + index + ".png");
        $("#demModalLabel").html(qlcyService[index].name + " —— 三维地形图");
        //$("#Img").attr("src", "./image/dem" + index + "_1.png");
        for (var i = 1; i < $(".swiper-slide img").length + 1; i++) {
            var img_name = index.toString() + '_' + i.toString() + '.jpg';
            var imgid = "#img" + i;
            $(imgid).prop('src', './image/3d/' + img_name);
        }

        //for (var i = 1; i < $(".gallery-thumbs .swiper-wrapper").length + 1; i++) {
        var slides = $(".gallery-thumbs .swiper-wrapper").children();
        //修改三维地形图
        for (var s = 0; s < slides.length; s++) {
            var img_name = index.toString() + '_' + (s + 1).toString() + '.jpg';
            slides[s].style.backgroundImage = 'url(./image/3d/' + img_name + ')';
        }
        //}
        //console.log($("#3d_carousel .item img"));
    }
    //加载dem轮播
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: false,
        loopedSlides: 6, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        lazy: {
            loadPrevNext: true
        },
        preventsDefault: false,   //干掉默认阻止的事件
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false,
        autoplay: 500,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination'
        },
        touchRatio: 1
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 6,
        centeredSlides: true,
        loop: false,
        autoplay: 500,
        loopedSlides: 6, //looped slides should be the same
        slideToClickedSlide: true,
        preventsDefault: false,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}


//线路中存在的图例才显示为正常颜色，不存在的显示为灰色
function checkLegendMenu() {
    var url = currentRouteService_QueryUrl;
    $.ajax({
        url: url,
        type: "GET",
        data: {
            where: "1=1",
            outFields: "TYPE",
            returnGeometry: "false",
            f: "json"
        },
        dataType: 'json',
        timeout: 30000,
        success: function (result) {
            // if (result.result == false) {
            //     Showbo.Msg.alert(result.error);
            //     return;
            // } else {
            var features = result.features;

            for (var i = 0; i < features.length; i++) {
                var a = result.features[i].attributes.TYPE;
                var Split = result.features[i].attributes.TYPE.split('；');
                if (Split.length > 1) {
                    for (var k = 0; k < Split.length; k++) {
                        if ($.inArray(Split[k], new_arr) == -1) {
                            new_arr.push(Split[k]);
                        }
                    }
                }
                else {
                    if ($.inArray(a, new_arr) == -1) {
                        new_arr.push(a);
                    }
                }
            }

            CheckIfCharInLegendTabel(new_arr);
            // }
        },
        error: function (result) {
            {
            }
        }
    });

}


//线路中存在的图例才显示为正常颜色，不存在的显示为灰色
function CheckIfCharInLegendTabel(new_arr) {
    for (var j = 0; j < new_Label_arr.length; j++) {
        if ($.inArray(new_Label_arr[j], new_arr) != -1) {
            $("#legendTable label").eq(j).removeClass("gray grayfont");
            $("#legendTable label").eq(j).addClass("legendPointer");
        }

    }
}

function ClickQuanmaotu_Td(index){
    changeProfileAndDEMModalSrc(index + 1);
    $("#bottomContainer").show();
    $("#selectRoute").show();
    $("#trip_advice").css({
        display: 'none'
    });
    load_trip_advice(index + 1);
    ClickPicture_LoadRoute(index + 1);
}