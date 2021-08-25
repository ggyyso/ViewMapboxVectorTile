/**
 * Created by Jason on 2017/12/12.
 */


/**
 * 十三条穿越路线服务
 * @type {{name: string,shortName:string url: string}[]}
 */
var qlcyService = [
    {
        resourceId: "160001",
        name: "鳌山-太白山线",
        XMin: 107.353,
        YMin: 33.813,
        XMax: 107.8336,
        YMax: 34.0698
    },
    {
        resourceId: "160011",
        name: "太白山北南线",
        XMin: 107.4834,
        YMin: 33.7856,
        XMax: 107.9366,
        YMax: 34.1165
    },
    {
        resourceId: "160002",
        name: "鳌山线",
        XMin: 107.2568,
        YMin: 33.8679,
        XMax: 107.5658,
        YMax: 34.0739
    },
    {
        resourceId: "160012",
        name: "傥骆道北段线",
        XMin: 107.7856,
        YMin: 33.8405,
        XMax: 108.0945,
        YMax: 34.0465

    },
    {
        resourceId: "160010",
        name: "首阳山-大坪梁线",
        XMin: 108.3239,
        YMin: 33.8789,
        XMax: 108.5395,
        YMax: 34.0067
    },
    {
        resourceId: "160005",
        name: "户菜路-东梁-秦岭服务区线",
        XMin: 108.3108,
        YMin: 33.7251,
        XMax: 108.5093,
        YMax: 33.8364
    },
    {
        resourceId: "160013",
        name: "营盘沟-冰晶顶-兵马营大草甸-鹿角梁-光头山分水岭线",
        XMin: 108.5367,
        YMin: 33.7622,
        XMax: 108.8375,
        YMax: 33.8982
    },
    {
        resourceId: "160009",
        name: "三桥峪-朝阳洞-邢家岭-蒿沟线",
        XMin: 108.5395,
        YMin: 33.7698,
        XMax: 108.8402,
        YMax: 33.9682
    },
    {
        resourceId: "160004",
        name: "分水岭-大寺-高冠峪线",
        XMin: 108.6377,
        YMin: 33.8322,
        XMax: 108.902,
        YMax: 34.0176
    },
    {
        resourceId: "160006",
        name: "牛背梁-石砭峪线",
        YMin: 33.8281,
        XMax: 109.048,
        YMax: 33.9346
    },
    {
        resourceId: "160008",
        name: "秦楚古道-终南山线",
        XMin: 108.958,
        YMin: 33.8717,
        XMax: 109.0789,
        YMax: 33.9782
    },
    {
        resourceId: "160007",
        name: "牛背梁-大坝沟线",
        YMin: 33.8034,
        XMax: 108.9982,
        YMax: 33.9098
    },
    {
        resourceId: "160003",
        name: "草链岭U形线",
        XMin: 109.8106,
        YMin: 34.2401,
        XMax: 109.9099,
        YMax: 34.3086
    }
];

function getExtent(resourceId) {
    for (var r = 0; r < qlcyService.length; r++) {
        if(qlcyService[r].resourceId===resourceId){
            return qlcyService[r];
        }
    }
    return null;
}