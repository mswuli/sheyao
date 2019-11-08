<template>
  <div class="mapbox" style="height: 100%;" ref="element" id="abc">

    <Carousel
      v-model="mapdata"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow">
      <CarouselItem>
        <div class="demo-carousel">
          <div id="mapChart" style="height: 100%; margin: 0 auto" :style="{width: mapheight + 'px'}"></div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <div id="mapChart2" style="height: 100%; margin: 0 auto" :style="{width: mapheight + 'px'}"></div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <div id="mapChart3" style="height: 100%; margin: 0 auto" :style="{width: mapheight + 'px'}"></div>
        </div>
      </CarouselItem>
    </Carousel>

  </div>
</template>
<script>
  export default {
    name: 'echartsMap',
    data() {
      return {
        mapdata: 0,
        setting: {
          autoplay: true,
          autoplaySpeed: 6000,
          dots: 'none',
          radiusDot: false,
          trigger: 'click',
          arrow: 'always'
        },
        mapheight: 0,
        chianGeoCoord: {
          '甘肃': [103.73, 36.03],
          '青海': [101.74, 36.56],
          '四川': [104.06, 30.67],
          '河北': [114.48, 38.03],
          '云南': [102.73, 25.04],
          '贵州': [106.71, 26.57],
          '湖北': [114.31, 30.52],
          '河南': [113.65, 34.76],
          '山东': [117, 36.65],
          '江苏': [118.78, 32.04],
          '安徽': [117.27, 31.86],
          '浙江': [120.19, 30.26],
          '江西': [115.89, 28.68],
          '福建': [119.3, 26.08],
          '广东': [113.23, 23.16],
          '湖南': [113, 28.21],
          '海南': [110.35, 20.02],
          '辽宁': [123.38, 41.8],
          '吉林': [125.35, 43.88],
          '黑龙江': [126.63, 45.75],
          '山西': [112.53, 37.87],
          '陕西': [108.95, 34.27],
          '台湾': [121.30, 25.03],
          '北京':[116.46, 39.92],
          '上海':[121.48, 31.22],
          '重庆':[106.54, 29.59],
          '天津':[117.2, 39.13],
          '内蒙古':[111.65, 40.82],
          '广西':[108.33, 22.84],
          '西藏':[91.11, 29.97],
          '宁夏':[106.27, 38.47],
          '新疆':[87.68, 43.77],
          '香港':[114.17, 22.28],
          '澳门':[113.54, 22.19],
          '海门':[121.15, 31.89],
          '鄂尔多斯':[109.781327, 39.608266],
          '招远':[120.38, 37.35],
          '舟山':[122.207216, 29.985295],
          '齐齐哈尔':[123.97, 47.33],
          '盐城':[120.13, 33.38],
          '赤峰':[118.87, 42.28],
          '青岛':[120.33, 36.07],
          '乳山':[121.52, 36.89],
          '金昌':[102.188043, 38.520089],
          '泉州':[118.58, 24.93],
          '莱西':[120.53, 36.86],
          '日照':[119.46, 35.42],
          '胶南':[119.97, 35.88],
          '南通':[121.05, 32.08],
          '拉萨':[91.11, 29.97],
          '云浮':[112.02, 22.93],
          '梅州':[116.1, 24.55],
          '文登':[122.05, 37.2],
          '上海':[121.48, 31.22],
          '攀枝花':[101.718637, 26.582347],
          '威海':[122.1, 37.5],
          '承德':[117.93, 40.97],
          '厦门':[118.1, 24.46],
          '汕尾':[115.375279, 22.786211],
          '潮州':[116.63, 23.68],
          '丹东':[124.37, 40.13],
          '太仓':[121.1, 31.45],
          '曲靖':[103.79, 25.51],
          '烟台':[121.39, 37.52],
          '福州':[119.3, 26.08],
          '瓦房店':[121.979603, 39.627114],
          '即墨':[120.45, 36.38],
          '抚顺':[123.97, 41.97],
          '玉溪':[102.52, 24.35],
          '张家口':[114.87, 40.82],
          '阳泉':[113.57, 37.85],
          '莱州':[119.942327, 37.177017],
          '湖州':[120.1, 30.86],
          '汕头':[116.69, 23.39],
          '昆山':[120.95, 31.39],
          '宁波':[121.56, 29.86],
          '湛江':[110.359377, 21.270708],
          '揭阳':[116.35, 23.55],
          '荣成':[122.41, 37.16],
          '连云港':[119.16, 34.59],
          '葫芦岛':[120.836932, 40.711052],
          '常熟':[120.74, 31.64],
          '东莞':[113.75, 23.04],
          '河源':[114.68, 23.73],
          '淮安':[119.15, 33.5],
          '泰州':[119.9, 32.49],
          '南宁':[108.33, 22.84],
          '营口':[122.18, 40.65],
          '惠州':[114.4, 23.09],
          '江阴':[120.26, 31.91],
          '蓬莱':[120.75, 37.8],
          '韶关':[113.62, 24.84],
          '嘉峪关':[98.289152, 39.77313],
          '广州':[113.23, 23.16],
          '延安':[109.47, 36.6],
          '太原':[112.53, 37.87],
          '清远':[113.01, 23.7],
          '中山':[113.38, 22.52],
          '昆明':[102.73, 25.04],
          '寿光':[118.73, 36.86],
          '盘锦':[122.070714, 41.119997],
          '长治':[113.08, 36.18],
          '深圳':[114.07, 22.62],
          '珠海':[113.52, 22.3],
          '宿迁':[118.3, 33.96],
          '咸阳':[108.72, 34.36],
          '铜川':[109.11, 35.09],
          '平度':[119.97, 36.77],
          '佛山':[113.11, 23.05],
          '海口':[110.35, 20.02],
          '江门':[113.06, 22.61],
          '章丘':[117.53, 36.72],
          '肇庆':[112.44, 23.05],
          '大连':[121.62, 38.92],
          '临汾':[111.5, 36.08],
          '吴江':[120.63, 31.16],
          '石嘴山':[106.39, 39.04],
          '沈阳':[123.38, 41.8],
          '苏州':[120.62, 31.32],
          '茂名':[110.88, 21.68],
          '嘉兴':[120.76, 30.77],
          '长春':[125.35, 43.88],
          '胶州':[120.03336, 36.264622],
          '银川':[106.27, 38.47],
          '张家港':[120.555821, 31.875428],
          '三门峡':[111.19, 34.76],
          '锦州':[121.15, 41.13],
          '南昌':[115.89, 28.68],
          '柳州':[109.4, 24.33],
          '三亚':[109.511909, 18.252847],
          '自贡':[104.778442, 29.33903],
          '吉林':[126.57, 43.87],
          '阳江':[111.95, 21.85],
          '泸州':[105.39, 28.91],
          '西宁':[101.74, 36.56],
          '宜宾':[104.56, 29.77],
          '呼和浩特':[111.65, 40.82],
          '成都':[104.06, 30.67],
          '大同':[113.3, 40.12],
          '镇江':[119.44, 32.2],
          '桂林':[110.28, 25.29],
          '张家界':[110.479191, 29.117096],
          '宜兴':[119.82, 31.36],
          '北海':[109.12, 21.49],
          '西安':[108.95, 34.27],
          '金坛':[119.56, 31.74],
          '东营':[118.49, 37.46],
          '牡丹江':[129.58, 44.6],
          '遵义':[106.9, 27.7],
          '绍兴':[120.58, 30.01],
          '扬州':[119.42, 32.39],
          '常州':[119.95, 31.79],
          '潍坊':[119.1, 36.62],
          '重庆':[106.54, 29.59],
          '台州':[121.420757, 28.656386],
          '南京':[118.78, 32.04],
          '滨州':[118.03, 37.36],
          '贵阳':[106.71, 26.57],
          '无锡':[120.29, 31.59],
          '本溪':[123.73, 41.3],
          '克拉玛依':[84.77, 45.59],
          '渭南':[109.5, 34.52],
          '马鞍山':[118.48, 31.56],
          '宝鸡':[107.15, 34.38],
          '焦作':[113.21, 35.24],
          '句容':[119.16, 31.95],
          '北京':[116.46, 39.92],
          '徐州':[117.2, 34.26],
          '衡水':[115.72, 37.72],
          '包头':[110, 40.58],
          '绵阳':[104.73, 31.48],
          '乌鲁木齐':[87.68, 43.77],
          '枣庄':[117.57, 34.86],
          '杭州':[120.19, 30.26],
          '淄博':[118.05, 36.78],
          '鞍山':[122.85, 41.12],
          '溧阳':[119.48, 31.43],
          '库尔勒':[86.06, 41.68],
          '安阳':[114.35, 36.1],
          '开封':[114.35, 34.79],
          '济南':[117, 36.65],
          '德阳':[104.37, 31.13],
          '温州':[120.65, 28.01],
          '九江':[115.97, 29.71],
          '邯郸':[114.47, 36.6],
          '临安':[119.72, 30.23],
          '兰州':[103.73, 36.03],
          '沧州':[116.83, 38.33],
          '临沂':[118.35, 35.05],
          '南充':[106.110698, 30.837793],
          '天津':[117.2, 39.13],
          '富阳':[119.95, 30.07],
          '泰安':[117.13, 36.18],
          '诸暨':[120.23, 29.71],
          '郑州':[113.65, 34.76],
          '哈尔滨':[126.63, 45.75],
          '聊城':[115.97, 36.45],
          '芜湖':[118.38, 31.33],
          '唐山':[118.02, 39.63],
          '平顶山':[113.29, 33.75],
          '邢台':[114.48, 37.05],
          '德州':[116.29, 37.45],
          '济宁':[116.59, 35.38],
          '荆州':[112.239741, 30.335165],
          '宜昌':[111.3, 30.7],
          '义乌':[120.06, 29.32],
          '丽水':[119.92, 28.45],
          '洛阳':[112.44, 34.7],
          '秦皇岛':[119.57, 39.95],
          '株洲':[113.16, 27.83],
          '石家庄':[114.48, 38.03],
          '莱芜':[117.67, 36.19],
          '常德':[111.69, 29.05],
          '保定':[115.48, 38.85],
          '湘潭':[112.91, 27.87],
          '金华':[119.64, 29.12],
          '岳阳':[113.09, 29.37],
          '长沙':[113, 28.21],
          '衢州':[118.88, 28.97],
          '廊坊':[116.7, 39.53],
          '菏泽':[115.480656, 35.23375],
          '合肥':[117.27, 31.86],
          '武汉':[114.31, 30.52],
          '大庆':[125.03, 46.58]
        }
      }
    },
    mounted() {
      let topW = this.$refs.element.clientWidth;
      this.mapheight = topW

      this.$nextTick(function () {
        this.drawMap();
        this.drawMap2();
        this.drawMap3();
      })

    },
    methods: {
      // 全国货量分布
      drawMap() {
        // 基于准备好的dom，初始化echarts实例
        let mapChart = this.$echarts.init(document.getElementById('mapChart'))

        // 取货量
        var data = [
          {name: '南昌', value: 3750027},
          {name: '沈阳', value: 2075128},
          {name: '靖江', value: 1194607},
          {name: '杭州', value: 1140138},
          {name: '郑州', value: 1084081},
          {name: '广州', value: 1025029},
          {name: '石家庄', value: 758311},
          {name: '贵阳', value: 719730},
          {name: '连云港', value: 648361},
          {name: '济南', value: 614821},
          {name: '武汉', value: 572042},
          {name: '上海', value: 561072},
          {name: '成都', value: 511358},
          {name: '南京', value: 455208},
          {name: '安吉', value: 430306},
          {name: '长沙', value: 377149},
          {name: '湛江', value: 367415},
          {name: '无锡', value: 348059},
          {name: '重庆', value: 307204},
          {name: '南宁', value: 292732},
          {name: '南通', value: 278053},
          {name: '泰州', value: 277823},
          {name: '合肥', value: 277430},
          {name: '长春', value: 263852},
          {name: '兰州', value: 242874},
          {name: '哈尔滨', value: 198151},
          {name: '济宁', value: 189212},
          {name: '临沂', value: 188240},
          {name: '嘉兴', value: 187169},
          {name: '天津', value: 187124},
          {name: '海口', value: 164785},
          {name: '金华', value: 152701},
          {name: '西安', value: 147572},
          {name: '中山', value: 140698},
          {name: '厦门', value: 135886},
          {name: '烟台', value: 122281},
          {name: '淮安', value: 113329},
          {name: '北京', value: 105598},
          {name: '盐城', value: 103068},
          {name: '苏州', value: 100873},
          {name: '太原', value: 96684},
          {name: '常熟', value: 96403},
          {name: '汕头', value: 93695},
          {name: '温州', value: 90120},
          {name: '昆明', value: 88337},
          {name: '佛山', value: 85220},
          {name: '江门', value: 84205},
          {name: '青岛', value: 71455},
          {name: '深圳', value: 71310},
          {name: '徐州', value: 69444},
          {name: '沧州', value: 64111},
          {name: '宁波', value: 62846},
          {name: '福州', value: 61842},
          {name: '常州', value: 56762},
          {name: '绍兴', value: 50993},
          {name: '大连', value: 40837},
          {name: '台州', value: 37183},
          {name: '宜兴', value: 29726},
          {name: '乌鲁木齐', value: 24956},
          {name: '芜湖', value: 15622},
          {name: '呼和浩特', value: 13343},
          {name: '湖州', value: 10780},
          {name: '扬州', value: 6896},
          {name: '镇江', value: 5122},
          {name: '张家港', value: 4980},
          {name: '东莞', value: 4231},
          {name: '太仓', value: 3188},
          {name: '银川', value: 2566},
          {name: '永康', value: 1931}
        ];

        // 收货量
        var data2 = [
          {name: '南昌', value: 1104872},
          {name: '沈阳', value: 869806},
          {name: '靖江', value: 24797},
          {name: '杭州', value: 790129},
          {name: '郑州', value: 1518138},
          {name: '广州', value: 719021},
          {name: '石家庄', value: 744724},
          {name: '贵阳', value: 225223},
          {name: '连云港', value: 74341},
          {name: '济南', value: 986171},
          {name: '武汉', value: 841129},
          {name: '上海', value: 1155095},
          {name: '成都', value: 922084},
          {name: '南京', value: 403230},
          {name: '安吉', value: 72383},
          {name: '长沙', value: 825570},
          {name: '湛江', value: 124573},
          {name: '无锡', value: 174857},
          {name: '重庆', value: 468822},
          {name: '南宁', value: 436154},
          {name: '南通', value: 182416},
          {name: '泰州', value: 122432},
          {name: '合肥', value: 613226},
          {name: '长春', value: 332040},
          {name: '兰州', value: 221341},
          {name: '哈尔滨', value: 556748},
          {name: '济宁', value: 119821},
          {name: '临沂', value: 182965},
          {name: '嘉兴', value: 112661},
          {name: '天津', value: 478735},
          {name: '海口', value: 100073},
          {name: '金华', value: 221528},
          {name: '西安', value: 554161},
          {name: '中山', value: 130972},
          {name: '厦门', value: 194938},
          {name: '烟台', value: 141522},
          {name: '淮安', value: 225770},
          {name: '北京', value: 1023359},
          {name: '盐城', value: 165661},
          {name: '苏州', value: 159919},
          {name: '太原', value: 240107},
          {name: '常熟', value: 66709},
          {name: '汕头', value: 168296},
          {name: '温州', value: 263021},
          {name: '昆明', value: 284759},
          {name: '佛山', value: 366811},
          {name: '江门', value: 85704},
          {name: '青岛', value: 173704},
          {name: '深圳', value: 274307},
          {name: '徐州', value: 198575},
          {name: '沧州', value: 85836},
          {name: '宁波', value: 204342},
          {name: '福州', value: 145818},
          {name: '常州', value: 217436},
          {name: '绍兴', value: 119987},
          {name: '大连', value: 121595},
          {name: '台州', value: 174241},
          {name: '宜兴', value: 27571},
          {name: '乌鲁木齐', value: 131276},
          {name: '芜湖', value: 10205},
          {name: '呼和浩特', value: 94958},
          {name: '湖州', value: 57947},
          {name: '扬州', value: 102643},
          {name: '镇江', value: 3439},
          {name: '张家港', value: 52062},
          {name: '东莞', value: 95380},
          {name: '太仓', value: 5672},
          {name: '银川', value: 56131},
          {name: '永康', value: 4346}
        ];

        // 经纬度
        var geoCoordMap = this.chianGeoCoord;

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        var _this = this;
        var chinaData = "/static/mapdata/china.json";
        $.getJSON(chinaData, function (geoJson) {
          _this.$echarts.registerMap("china", geoJson);
          mapChart.setOption({
            title: {
              text: '全国货量分布',
              left: 'center',
              top: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof(params.value)[2] == "undefined") {
                  return params.name + ' : ' + params.value;
                } else {
                  return params.name + ' : ' + params.value[2] + '件';
                }
              }
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['取货货量分布', '收货货量分布'],
              textStyle: {
                color: '#ccc'
              }
            },
            geo: {
              map: 'china',
              // show: true,
              roam: true,
              zoom: 1.2,
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  // areaColor: '#091632',
                  // borderColor: '#1773c3',
                  // shadowColor: '#1773c3',
                  // shadowBlur: 20
                  areaColor: '#031525',
                  borderColor: '#fff',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#0f2c70'
                }
              }
            },
            series: [
              {
                name: '取货货量分布',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                  return val[2] / 100000;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ddb926'
                  }
                }
              },
              {
                name: '收货货量分布',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data2),
                symbolSize: function (val) {
                  return val[2] / 100000;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#f11b05'
                  }
                }
              },
            ]
          });
        });
      },

      // 网点分布
      drawMap2() {
        // 基于准备好的dom，初始化echarts实例
        let mapChart2 = this.$echarts.init(document.getElementById('mapChart2'))

        // 网点
        var data = [
          {name: '沧州', value: 11},
          {name: '常熟', value: 12},
          {name: '常州', value: 20},
          {name: '成都', value: 66},
          {name: '大连', value: 15},
          {name: '东莞', value: 21},
          {name: '佛山', value: 29},
          {name: '福州', value: 17},
          {name: '广州', value: 70},
          {name: '贵阳', value: 24},
          {name: '哈尔滨', value: 69},
          {name: '海口', value: 4},
          {name: '合肥', value: 46},
          {name: '呼和浩特', value: 6},
          {name: '湖州', value: 8},
          {name: '淮安', value: 38},
          {name: '济南', value: 66},
          {name: '济宁', value: 21},
          {name: '嘉兴', value: 13},
          {name: '江门', value: 13},
          {name: '金华', value: 28},
          {name: '靖江', value: 6},
          {name: '昆明', value: 25},
          {name: '兰州', value: 24},
          {name: '连云港', value: 4},
          {name: '临沂', value: 15},
          {name: '南昌', value: 60},
          {name: '南京', value: 28},
          {name: '南宁', value: 17},
          {name: '南通', value: 19},
          {name: '宁波', value: 43},
          {name: '青岛', value: 28},
          {name: '厦门', value: 35},
          {name: '汕头', value: 21},
          {name: '绍兴', value: 15},
          {name: '深圳', value: 36},
          {name: '石家庄', value: 57},
          {name: '苏州', value: 19},
          {name: '台州', value: 18},
          {name: '太仓', value: 10},
          {name: '太原', value: 19},
          {name: '泰州', value: 12},
          {name: '温州', value: 18},
          {name: '乌鲁木齐', value: 9},
          {name: '无锡', value: 40},
          {name: '芜湖', value: 11},
          {name: '武汉', value: 54},
          {name: '徐州', value: 22},
          {name: '烟台', value: 22},
          {name: '盐城', value: 26},
          {name: '扬州', value: 7},
          {name: '宜兴', value: 6},
          {name: '银川', value: 7},
          {name: '永康', value: 6},
          {name: '湛江', value: 7},
          {name: '张家港', value: 9},
          {name: '长春', value: 42},
          {name: '长沙', value: 41},
          {name: '镇江', value: 2},
          {name: '中山', value: 19},
          {name: '重庆', value: 24}
        ];

        // 分拨中心
        var data2 = [
          {name: '安吉', value: 9},
          {name: '北京', value: 48},
          {name: '沧州', value: 2}
        ];

        // 经纬度
        var geoCoordMap = this.chianGeoCoord;

        var convertData = function (data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };

        var _this = this;
        var chinaData = "/static/mapdata/china.json";
        $.getJSON(chinaData, function (geoJson) {
          _this.$echarts.registerMap("china", geoJson);
          mapChart2.setOption({
            title: {
              text: '网点分布',
              left: 'center',
              top: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof(params.value)[2] == "undefined") {
                  return params.name + ' : ' + params.value;
                } else {
                  return params.name + ' : ' + params.value[2] + '家';
                }
              }
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['网点', '分拨中心'],
              textStyle: {
                color: '#ccc'
              }
            },
            geo: {
              map: 'china',
              // show: true,
              roam: true,
              zoom: 1.2,
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  // areaColor: '#091632',
                  // borderColor: '#1773c3',
                  // shadowColor: '#1773c3',
                  // shadowBlur: 20
                  areaColor: '#031525',
                  borderColor: '#fff',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#0f2c70'
                }
              }
            },
            series: [
              {
                name: '网点',
                // type: 'scatter',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function (val) {
                  return val[2] / 5;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#21cdab',
                    // color: new _this.$echarts.graphic.LinearGradient(0.5, 0.5, 1, [{
                    //   offset: 0,
                    //   color: 'rgba(255, 255, 255, 0)'
                    // }, {
                    //   offset: 1,
                    //   color: 'rgba(3, 231, 245, 1)'
                    // }]),
                    // borderColor: new _this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    //   offset: 0,
                    //   color: 'rgba(3, 231, 245, 1)'
                    // }, {
                    //   offset: 0.7,
                    //   color: 'rgba(3, 231, 245, 1)'
                    // }, {
                    //   offset: 1,
                    //   color: 'rgba(3, 231, 245, 1)'
                    // }], false),
                    shadowColor: 'rgba(255,255,255, 0.5)',
                    shadowBlur: 100
                  },
                  // emphasis: {
                  //   show: true,
                  //   color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
                  //     offset: 0,
                  //     color: 'rgba(255, 255, 255, 0)'
                  //   }, {
                  //     offset: 1,
                  //     color: 'rgba(255, 255, 255, 1)'
                  //   }]),
                  //   borderColor: '#fff',
                  // }
                },
              },
              {
                name: '分拨中心',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data2),
                symbolSize: function (val) {
                  return val[2] / 20;
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#a6f065'
                  }
                }
              },
            ]
          });
        });
      },

      // 实时订单
      drawMap3() {
        // 基于准备好的dom，初始化echarts实例
        let mapChart3 = this.$echarts.init(document.getElementById('mapChart3'))

        // 起始地F58158 目的地58B3CC
        var allData = {
          "citys": [{
            "name": "南昌",
            "value": [115.89, 28.68, 166, 1948],
            "symbolSize": 8,
            "itemStyle": {"normal": {"color": "#F58158"}}
          }, {
            "name": "南昌",
            "value": [115.89, 28.68, 166, 1948],
            "symbolSize": 8,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "成都",
            "value": [104.06, 30.67, 150, 2256],
            "symbolSize": 7,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "郑州",
            "value": [113.65, 34.76, 162, 1318],
            "symbolSize": 6,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "北京",
            "value": [116.46, 39.92, 102, 1242],
            "symbolSize": 5,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "沈阳",
            "value": [123.38, 41.8, 96, 924],
            "symbolSize": 5,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "济南",
            "value": [117, 36.65, 78, 994],
            "symbolSize": 4,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "西安",
            "value": [108.95, 34.27, 76, 1080],
            "symbolSize": 4,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "石家庄",
            "value": [114.48, 38.03, 74, 1258],
            "symbolSize": 4,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "合肥",
            "value": [117.27, 31.86, 74, 978],
            "symbolSize": 4,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }, {
            "name": "广州",
            "value": [113.23, 23.16, 68, 1398],
            "symbolSize": 3,
            "itemStyle": {"normal": {"color": "#58B3CC"}}
          }],

          "moveLines": [{
            "fromName": "南昌",
            "toName": "南昌",
            "coords": [[115.89, 28.68], [115.89, 28.68]]
          }, {
            "fromName": "南昌",
            "toName": "成都",
            "coords": [[115.89, 28.68], [104.06, 30.67]]
          }, {
            "fromName": "南昌",
            "toName": "郑州",
            "coords": [[115.89, 28.68], [113.65, 34.763]]
          }, {
            "fromName": "南昌",
            "toName": "北京",
            "coords": [[115.89, 28.68], [116.46, 39.92]]
          }, {
            "fromName": "南昌",
            "toName": "沈阳",
            "coords": [[115.89, 28.68], [123.38, 41.8]]
          }, {
            "fromName": "南昌",
            "toName": "济南",
            "coords": [[115.89, 28.68], [117, 36.65]]
          }, {
            "fromName": "南昌",
            "toName": "西安",
            "coords": [[115.89, 28.68], [108.95, 34.27]]
          }, {
            "fromName": "南昌",
            "toName": "石家庄",
            "coords": [[115.89, 28.68], [114.48, 38.03]]
          }, {
            "fromName": "南昌",
            "toName": "合肥",
            "coords": [[115.89, 28.68], [117.27, 31.86]]
          }, {
            "fromName": "南昌",
            "toName": "广州",
            "coords": [[115.89, 28.68], [113.23, 23.16]]
          }]
        };

        var _this = this;
        var chinaData = "/static/mapdata/china.json";
        $.getJSON(chinaData, function (geoJson) {
          _this.$echarts.registerMap("china", geoJson);
          mapChart3.setOption({
            title: {
              text: '实时订单',
              left: 'center',
              top: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            legend: {
              show: false,
              orient: 'vertical',
              top: 'bottom',
              left: 'right',
              data: ['地点', '线路'],
              textStyle: {
                color: '#fff'
              }
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: true,
              zoom: 1.2,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#fff',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#0f2c70'
                }
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                if (typeof(params.value)[2] == "undefined") {
                  return params.name + ' : ' + params.value + '单';
                } else {
                  return params.name + ' : ' + params.value[2] + '单' + ' ' + params.value[3] + '件';
                }
              }
            },
            series: [{
              name: '地点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke'
              },
              label: {
                emphasis: {
                  show: true,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: 2,
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: '#46bee9'
                }
              },
              data: allData.citys
            }, {
              name: '线路',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                constantSpeed: 30,
                symbol: 'pin',
                symbolSize: 3,
                trailLength: 0,
              },
              lineStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0, color: '#58B3CC'
                  }, {
                    offset: 1, color: '#F58158'
                  }], false),
                  width: 1,
                  opacity: 0.5,
                  curveness: 0.1
                }
              },
              data: allData.moveLines
            }]
          });
        });
      }
    },
    created() {
    }
  }
</script>
<style>
  .mapbox .ivu-carousel,
  .mapbox .ivu-carousel-list,
  .mapbox .ivu-carousel-track,
  .mapbox .ivu-carousel-item,
  .mapbox .demo-carousel {
    height: 100% !important;
  }
</style>
