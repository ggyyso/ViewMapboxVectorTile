var imageMapUrl, imageMapLabelUrl, demMapUrl, slideMapUrl, responseGraphic, responseGraphic, RegionPositionLayer,
    drawRegionGraphic;

var boolDraw = false;
var boolSelect = false;
var map;
require([
        "esri/basemaps",
        "esri/map",
        "esri/dijit/Scalebar",
        "esri/dijit/BasemapGallery",
        "esri/dijit/Basemap",
        "esri/dijit/BasemapLayer",
        "esri/dijit/BasemapToggle",
        "esri/toolbars/draw",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/graphic",
        "esri/layers/GraphicsLayer",
        "esri/SpatialReference",
        "esri/Color",
        "esri/geometry/Polygon",
        "esri/geometry/Extent",
        "esri/layers/LabelClass",
        "esri/symbols/TextSymbol",
        "esri/geometry/jsonUtils",
        "esri/symbols/Font",
        "dojo/parser",
        "dojo/dom",
        "dojo/on",
        "dijit/layout/ContentPane",
        "dijit/TitlePane",
        "dojo/domReady!"
    ],
    function (esriBasemaps, Map, Scalebar, BasemapGallery, Basemap, BasemapLayer, BasemapToggle, Draw, SimpleLineSymbol,
              SimpleFillSymbol, SimpleMarkerSymbol, PictureMarkerSymbol, Graphic, GraphicsLayer, SpatialReference, Color, Polygon,
              Extent, LabelClass, TextSymbol, JsonUtils, Font, parser, dom, on) {
        parser.parse();
        imageMapUrl = mapService.imageMapUrl;
        imageMapLabelUrl = mapService.imageMapLabelUrl;
        demMapUrl = mapService.demMapUrl;

        map = new esri.Map("mapid", {
            center: [108.9, 34.8],
            zoom: 7,
            logo: false,
            maxZoom:15
        });
        var imgMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(imageMapUrl);
        var imgLableMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(imageMapLabelUrl);
        var demServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(demMapUrl);
        demServiceLayer.hide();
        imgLableMapServiceLayer.hide();
         map.addLayers([imgMapServiceLayer, imgLableMapServiceLayer,demServiceLayer]);

        map.on("load", function () {
            $("#is_show_label").css({
                display: 'block'
            });
            $("#switch_map").css({
                display: 'block'
            });
            var isDEM = false;
            $("#switch_map").click(function () {
                if (isDEM) {
                    $("#map_title").text("?????????");
                    $("#switch_map img").attr('src', 'image/dxt.png');
                    $("#is_show_label").css({
                        display: "block"
                    });
                    //map.setBasemap(imgBaseMap);
                    imgMapServiceLayer.show();
                    // imgLableMapServiceLayer.show();
                     $("#cb").prop('checked', false);
                    demServiceLayer.hide();
                    isDEM = false;
                } else {
                    $("#map_title").text("?????????");
                    $("#switch_map img").attr('src', 'image/imgLayer.png');
                    $("#is_show_label").css({
                        display: "none"
                    });
                    //?????????????????????zoom???17?????????????????????zoom???12???
                    // ??????????????????????????????zoom????????????12
                    if(map.getZoom()>12){
                        map.setZoom(12);
                    }

                    imgMapServiceLayer.hide();
                    imgLableMapServiceLayer.hide();
                    demServiceLayer.show();
                    isDEM = true;
                }
            });
            //??????????????????
            $("#is_show_label").click(function () {
                if (imgLableMapServiceLayer.visible) {
                    imgLableMapServiceLayer.hide();
                    $("#cb").prop('checked', false);
                } else {
                    imgLableMapServiceLayer.show();
                    $("#cb").prop('checked', true);
                }
            });
        });


        RegionPositionLayer = new GraphicsLayer();
        drawRegionGraphic = function (geo) {
            geometry = JsonUtils.fromJson(geo);
            setSymbol(geometry);
            responseGraphic = new Graphic(geometry, geosymbol);
            RegionPositionLayer.add(responseGraphic);
            map.addLayer(RegionPositionLayer);
            // myMap.setExtent(geometry.getExtent());
        };

        function setSymbol(geometry) {
            // geosymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            // new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2),
            // new Color([0, 0, 0, 0.3]));
            var pms=new PictureMarkerSymbol('image/dingwei.gif', 50, 60);
            pms.setOffset(0, 30);
            geosymbol =pms;

        }

        $.getScript("js/tools.js", function () {
            tools.init();
        });
        $("#clear_measure").click(function () {
            tools.toolsClose();
            RegionPositionLayer.clear();
        });
    //???????????????
        loadQuanMaoMap();
    });


