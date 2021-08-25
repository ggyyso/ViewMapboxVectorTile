/**
 * Created by Jason on 2018/4/12.
 */
var map;
require([
        "esri/map",
        "esri/layers/VectorTileLayer",
        "dojo/domReady!"
    ],
    function (Map, VectorTileLayer) {
        require([
            "esri/map",
            "esri/layers/VectorTileLayer",
            "dojo/domReady!"
        ], function(Map, VectorTileLayer) {

             map = new Map("map", {
                center: [2.3508, 48.8567], // longitude, latitude
                zoom: 2
            });


            //The URL referenced in the constructor may point to a style url JSON (as in this sample)
            //or directly to a vector tile service
            var vtlayer = new VectorTileLayer("https://www.arcgis.com/sharing/rest/content/items/92c551c9f07b4147846aae273e822714/resources/styles/root.json");

            var vtlLayer1 = new VectorTileLayer(
                // URL to the vector tile service
                "https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer"
            );
            var oristyle="https://www.arcgis.com/sharing/rest/content/items/92c551c9f07b4147846aae273e822714/resources/styles/root.json";

            var darkGrayStyleURL = "https://www.arcgis.com/sharing/rest/content/items/57436c01bc754dbb87dfb636b6484022/resources/styles/root.json";
            var lightGrayStyleURL = "https://www.arcgis.com/sharing/rest/content/items/1e47168d181248e491541ffd5a91c0de/resources/styles/root.json"
            var initStyle="https://www.arcgis.com/sharing/rest/content/items/92c551c9f07b4147846aae273e822714/resources/styles/root.json";

            //设置样式
            //vtlLayer1.setStyle(oristyle);


            map.addLayer(vtlLayer1);

        });

});
function  changeStyleOrig(){
    var darkGrayStyleURL = "https://basemaps.arcgis.com/b2/arcgis/rest/services/World_Basemap/VectorTileServer/resources/styles/root.json";
    var vlayer =map.getLayer("layer0");
    vlayer.loadStyle(darkGrayStyleURL);
}
function  changeStyleblack(){
    var darkGrayStyleURL = "https://www.arcgis.com/sharing/rest/content/items/92c551c9f07b4147846aae273e822714/resources/styles/root.json";
    var vlayer =map.getLayer("layer0");
    vlayer.loadStyle(darkGrayStyleURL);
}

function  changeStyleDark(){
    var darkGrayStyleURL = "https://www.arcgis.com/sharing/rest/content/items/57436c01bc754dbb87dfb636b6484022/resources/styles/root.json";
    var vlayer =map.getLayer("layer0");
    vlayer.loadStyle(darkGrayStyleURL);
}
function  changeStyleLight(){
    var darkGrayStyleURL = "https://www.arcgis.com/sharing/rest/content/items/1e47168d181248e491541ffd5a91c0de/resources/styles/root.json";
    var vlayer =map.getLayer("layer0");
    vlayer.loadStyle(darkGrayStyleURL);
}