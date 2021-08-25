/**
 * Created by Jason on 2017/12/12.
 */

/**
 *地图服务地址配置
 */

var mapService = {
    imageMapUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxImgMap/DWVobmNALdyAPmJf/TileServer",
    imageMapLabelUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxImgLabelMap/pTB-6Dqokc9CK29Q/TileServer",
    demMapUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxShadeMap/Dc5JB4Js9LfuyNgL/TileServer"
    //imageMapUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxImgMap/-3UypEuCbL83Ko9Q/TileServer",
    //imageMapLabelUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxImgLabelMap/4dLKkaSLyuy7rgTV/TileServer",
    //demMapUrl: "http://1.85.55.27:8080/ServiceSystem2016/rest/service/SxShadeMap/z1yMfKX5N58FgI-K/TileServer"
};

/**
 * 十三条穿越路线服务
 * @type {{name: string,shortName:string url: string}[]}
 */
var qlcyService = [
    {
        name: "十三条穿越路线全貌图",
        shortName: "全貌图",
        url: "/arcgis/rest/services/QLCY/1_13_WW/MapServer",
        tileUrl:"/arcgis/rest/services/QLCY/13TOUL_ALL/MapServer",
        queryUrl: "",
        XMin: 105.25910623172228,
        XMax: 111.02689778684845,
        YMin: 32.73252772659334,
        YMax: 35.32756968237498
    },
    {
        name: "鳌山-太白山线",
        shortName: "鳌太线",
        url: "/arcgis/rest/services/QLCY/1_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/1TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/1TOUL/MapServer",
        XMin: 107.353,
        YMin: 33.813,
        XMax: 107.8336,
        YMax: 34.0698,
        trip: [
            "第一天:塘口村—2900营地—鳌山盆景园",
            "第二天:盆景园—导航架—麦秸梁—水窝营地",
            "第三天:水窝营地—飞机梁—2800营地",
            "第四天:2800营地—南天门—太白梁—东源—大石河营地",
            "第五天:大石河营地—万仙阵—拔仙台",
            "第六天:大爷海—拔仙台—大文公庙—平安寺—莺鸽镇"
        ],
        telpher: {
            x: 107.819,
            y: 34.005
        }
    },
    {
        name: "太白山北南线",
        shortName: "太白山北南线",
        url: "/arcgis/rest/services/QLCY/2_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/2TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/2TOUL/MapServer",
        XMin: 107.4834,
        YMin: 33.7856,
        XMax: 107.9366,
        YMax: 34.1165,
        trip: [
            "第一天:鹦鸽镇柴胡山村—上白云—大殿—斗母宫—平安寺",
            "第二天:平安寺—明星寺—放羊寺—大文公庙—大爷海",
            "第三天:大爷海—雷公庙—万仙阵—将军庙—老庙子",
            "第四天:老庙子—灵官台—太白庙—都督门—老县城",
        ]
    },
    {
        name: "鳌山线",
        shortName: "鳌山线",
        url: "/arcgis/rest/services/QLCY/3_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/3TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/3TOUL/MapServer",
        XMin: 107.2568,
        YMin: 33.8679,
        XMax: 107.5658,
        YMax: 34.0739,
        trip: [
            "第一天:西安—23千米登山口—牛头树—3300营地",
            "第二天:3300营地—鳌头—导航架—盆景园—2900营地—塘口村",
        ]
    },
    {
        name: "傥骆道北段线",
        shortName: "傥骆道北段线",
        url: "/arcgis/rest/services/QLCY/4_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/4TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/4TOUL/MapServer",
        XMin: 107.7856,
        YMin: 33.8405,
        XMax: 108.0945,
        YMax: 34.0465,
        trip: [
            "第一天:骆峪矿场—碾子坪—茅草坪—关岭梁—关城子—陈家河",
            "第二天:陈家河—洛阳宫—西老君岭—八斗河—石桥",
            "第三天:八斗河—卡发梁—殷家坪—大蟒河—父子岭—拐九沟—厚畛子",
        ]

    },
    {
        name: "首阳山-大坪梁线",
        shortName: "首阳山-大坪梁线",
        url: "/arcgis/rest/services/QLCY/5_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/5TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/5TOUL/MapServer",
        XMin: 108.3239,
        YMin: 33.8789,
        XMax: 108.5395,
        YMax: 34.0067,
        trip: [
            "第一天:西安—耿峪白杨岔—熊岔—首阳山顶",
            "第二天:首阳山—无名山峰—大坪梁—涝峪西汉高速"
        ]
    },
    {
        name: "户菜路-东梁-秦岭服务区线",
        shortName: "户菜路-东梁线",
        url: "/arcgis/rest/services/QLCY/6_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/6TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/6TOUL/MapServer",
        XMin: 108.3108,
        YMin: 33.7251,
        XMax: 108.5093,
        YMax: 33.8364,
        trip: [
            "第一天:鄂邑区涝峪—两涝河口—母子坪—户菜路71千米处",
            "第二天:户菜路71千米处—林场废弃通信站—东梁",
            "第三天:东梁营地—二道沟—西汉高速路秦岭服务区"
        ]
    },
    {
        name: "营盘沟-冰晶顶-兵马营大草甸-鹿角梁-光头山分水岭线",
        url: "/arcgis/rest/services/QLCY/7_WW/MapServer",
        shortName: "营盘沟-鹿角梁线",
        url: "/arcgis/rest/services/QLCY/7_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/7TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/7TOUL/MapServer",
        XMin: 108.5367,
        YMin: 33.7622,
        XMax: 108.8375,
        YMax: 33.8982,
        trip: [
            "第一天:营盘沟—冰晶顶",
            "第二天:兵马营大草甸—蒿沟垭口",
            "第三天:蒿沟垭口—鹿角梁—光头山",
        ]
    },
    {
        name: "三桥峪-朝阳洞-邢家岭-蒿沟线",
        shortName: "三桥峪-蒿沟线",
        url: "/arcgis/rest/services/QLCY/8_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/8TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/8TOUL/MapServer",
        XMin: 108.5395,
        YMin: 33.7698,
        XMax: 108.8402,
        YMax: 33.9682,
        trip: [
            "第一天:三桥峪—练驴坡—铁瓦庙—朝阳洞",
            "第二天:朝阳洞—邢家岭—黄羊坝—蒿沟",
        ]
    },
    {
        name: "分水岭-大寺-高冠峪线",
        shortName: "分水岭-高冠峪线",
        url: "/arcgis/rest/services/QLCY/9_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/9TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/9TOUL/MapServer",
        XMin: 108.6377,
        YMin: 33.8322,
        XMax: 108.902,
        YMax: 34.0176,
        trip: [
            "第一天:西安—210国道分水岭—光头山—大寺村",
            "第二天:大寺村—铁桥—高冠峪",
        ]
    },
    {
        name: "牛背梁-石砭峪线",
        shortName: "牛背梁-石砭峪线",
        url: "/arcgis/rest/services/QLCY/10_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/10TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/10TOUL/MapServer",
        XMin: 108.9271,
        YMin: 33.8281,
        XMax: 109.048,
        YMax: 33.9346,
        trip: [
            "第一天:西安—龙王沟—南天门—三岔路口",
            "第二天:三岔口—牛背梁顶—三岔口—实木沟—水洞子沟垭口—2号通风竖井—罗汉坪村"
        ]
    },
    {
        name: "秦楚古道-终南山线",
        shortName: "秦楚古道-终南山线",
        url: "/arcgis/rest/services/QLCY/11_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/11TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/11TOUL/MapServer",
        XMin: 108.958,
        YMin: 33.8717,
        XMax: 109.0789,
        YMax: 33.9782,
        trip: [
            "第一天:终南山—花门楼—黄河长江分水岭—杜鹃观赏台—九天瀑布—终南山大草甸—将军当关石—翠华山景区大门"
        ]
    },
    {
        name: "牛背梁-大坝沟线",
        shortName: "牛背梁-大坝沟线",
        url: "/arcgis/rest/services/QLCY/12_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/12TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/12TOUL/MapServer",
        XMin: 108.8773,
        YMin: 33.8034,
        XMax: 108.9982,
        YMax: 33.9098,
        trip: [
            "第一天:石砭峪罗汉坪村—二号通风井—三岔口—2802牛背岭顶",
            "第二天:2802梁顶—烂泥糊—西沟垭口—雷公包",
            "第三天:雷公包—无名山包—沿山脊向南—中途右下一大坝沟"
        ],
        telpher: {
            x: 108.993,
            y: 33.861
        }
    },
    {
        name: "草链岭U形线",
        shortName: "草链岭U形线",
        url: "/arcgis/rest/services/QLCY/13_WW/MapServer",
        queryUrl: "/arcgis/rest/services/QLCY/13TOUL/MapServer/0/query",
        tileUrl:"/arcgis/rest/services/QLCY/13TOUL/MapServer",
        XMin: 109.8106,
        YMin: 34.2401,
        XMax: 109.9099,
        YMax: 34.3086,
        trip:[
            "第一天:草链岭—龙潭沟—石海—窝棚—废弃村庄—磨盘—小曲沟村"
        ]
    }
];