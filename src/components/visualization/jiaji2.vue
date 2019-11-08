<template>
  <div style="height: 100%;">
    <div class="wrapper">
      <div class="header">
        <a href class="logo">
          <img src="@/assets/images/visualization/logo.png" alt="医药四方云">
        </a>
        <h2>上海佳吉快运有限公司</h2>
      </div>
      <div class="container">
        <div class="container-left">
          <!-- 涉药运输服务能力 -->
          <div class="service-capability">
            <h2 class="part-title">
              <p>涉药运输服务能力</p>
              <i></i>
            </h2>
            <div class="part-content">
              <h3>
                医药客户
                <b>{{ ability.total }}</b> 家
              </h3>
              <dl>
                <dd class="max-text">
                  <span>分拨中心</span>
                  <b>{{ ability.center }}</b>
                  <em>家</em>
                </dd>
                <dd class="max-text">
                  <span>物流网点</span>
                  <b>{{ ability.outlet }}</b>
                  <em>家</em>
                </dd>
              </dl>
              <dl>
                <dd class="max-text">
                  <span>自有运营车辆</span>
                  <b>{{ ability.vehicle }}</b>
                  <em>辆</em>
                </dd>
                <dd class="min-text">
                  <span>冷藏车</span>
                  <b>{{ ability.truck }}</b>
                  <em>辆</em>
                </dd>
              </dl>
              <dl>
                <!--<dd class="max-text">-->
                <!--<span>累计货量</span><b>{{ ability.volume }}</b><em>万件</em>-->
                <!--</dd>-->
                <dd class="max-text">
                  <span>医药货量</span>
                  <b>{{ ability.medicine }}</b>
                  <em>万件</em>
                </dd>
                <dd class="min-text">
                  <p>货物包含药品、医疗耗材、医疗器械</p>
                </dd>
              </dl>
              <dl>
                <dd class="max-text">
                  <span>年配送货值</span>
                  <b>＞{{ ability.value }}</b>
                  <em>亿元</em>
                </dd>
                <dd class="max-text">
                  <span>年物流业务收入</span>
                  <b>{{ ability.income }}</b>
                  <em>亿元</em>
                </dd>
              </dl>
            </div>
          </div>
          <div class="spacing-h"></div>
          <!-- 优势线路 -->
          <div class="advantage-line">
            <h2 class="part-title">
              <p>优势线路</p>
              <i></i>
            </h2>
            <div class="part-content">
              <div style="height: 70%;">
                <div id="pieChart" :style="{width: '100%', height: '100%'}"></div>
              </div>
              <ul>
                <li>
                  <p>覆盖省份</p>
                  <b>{{advantageData.ProvinceNumber}}个</b>
                </li>
                <li>
                  <p>省域覆盖率</p>
                  <b>{{advantageData.ProvinceRate}}</b>
                </li>
                <li>
                  <p>覆盖城市</p>
                  <b>{{advantageData.CityNumber}}座</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container-middle">
          <!-- 地图 -->
          <div class="echart-map">
            <div class="mapbox" style="height: 100%; position: relative;" ref="mapBox" id="abc" @mouseover="mouseover" @mouseout="mouseout">
              <div class="map-btn map-btnL" v-on:click="changeMap(-1)"></div>
              <div class="map-btn map-btnR" v-on:click="changeMap(1)"></div>
              <div id="mapChart" style="margin: 0 auto" :style="{width: mapwidth + 'px', height: mapheight + 'px'}" ref="mapChart"></div>
            </div>
          </div>
          <div class="spacing-h"></div>
          <!-- 省际干线一览 -->
          <div class="trunk-list">
            <Tabs :value="tabsnumber" @on-click="getTrunkData">
              <TabPane label="省际干线一览" name="1">
                <div class="trunk-header">
                  <p>线路名称</p>
                  <p>起运地</p>
                  <p>目的地</p>
                </div>
                <div class="swiper-container trunk-body">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(interprovincial, index) in interprovincials" :key="index">
                      <div class="table-row">
                        <p>{{interprovincial.RouteName}}</p>
                        <p>{{interprovincial.DispatchVenue}}</p>
                        <p>{{interprovincial.DestinationVenue}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane label="城际干线一览" name="2">
                <div class="trunk-header">
                  <p>线路名称</p>
                  <p>起运地</p>
                  <p>目的地</p>
                </div>
                <div class="swiper-container trunk-body">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(intercity, index) in intercities" :key="index">
                      <div class="table-row">
                        <p>{{intercity.RouteName}}</p>
                        <p>{{intercity.DispatchVenue}}</p>
                        <p>{{intercity.DestinationVenue}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane label="同城干线一览" name="3">
                <div class="trunk-header">
                  <p>线路名称</p>
                  <p>起运地</p>
                  <p>目的地</p>
                </div>
                <div class="swiper-container trunk-body">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(samecity, index) in samecities" :key="index">
                      <div class="table-row">
                        <p>{{samecity.RouteName}}</p>
                        <p>{{samecity.DispatchVenue}}</p>
                        <p>{{samecity.DestinationVenue}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div class="container-right">
          <!-- 涉药运输服务质量 -->
          <div class="service-quality">
            <h2 class="part-title">
              <p>涉药运输服务质量</p>
              <i></i>
            </h2>
            <div class="part-content">
              <div class="score">
                <p>
                  涉药运输评级
                  <b>待评定</b>
                </p>
              </div>
              <!-- 折线图 -->
              <div style="height: 90%;">
                <div class="line-title">
                  <b>货物提取准时率</b>
                  <i>94.93%</i>
                </div>
                <div id="lineChart" :style="{width: '100%', height: '13%'}"></div>
                <div class="line-title">
                  <b>货物送达准时率</b>
                  <i>93.93%</i>
                </div>
                <div id="lineChart2" :style="{width: '100%', height: '13%'}"></div>
                <div class="line-title">
                  <b>运输包装完好率</b>
                  <i>93.30%</i>
                </div>
                <div id="lineChart3" :style="{width: '100%', height: '13%'}"></div>
                <div class="line-title">
                  <b>运输过程信息可追溯率</b>
                  <i>99%</i>
                </div>
                <div id="lineChart4" :style="{width: '100%', height: '13%'}"></div>
                <div class="line-title">
                  <b>冷藏药品温度控制合格率</b>
                  <i>--</i>
                </div>
                <div id="lineChart5" :style="{width: '100%', height: '13%'}"></div>
                <div class="line-title">
                  <b>客户有效投诉率</b>
                  <i>0.03%</i>
                </div>
                <div id="lineChart6" :style="{width: '100%', height: '13%'}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>Copyright © 2006-2015 深圳传世般若科技有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

let mapAData;
let mapBData;
let mapCData;

export default {
  data() {
    return {
      mapChart:null,
      selectedTab: 0,
      selectedHover: true,
      ability: {
        total: 1460,
        center: 69,
        outlet: "2,501",
        vehicle: "7,908",
        truck: 0,
        volume: "2,215",
        medicine: "2,215",
        value: 160,
        income: 3.8
      },
      advantageData: {
        ProvinceLineNumber: 0,
        CityLineNumber: 0,
        SameCityLineNumber: 0
      },
      interprovincials: [],
      intercities: [],
      samecities: [],
      tabsnumber: "1",
      swiperLoaded: false,
      mapdata: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 6000,
        dots: "none",
        radiusDot: false,
        trigger: "click",
        arrow: "always"
      },
      mapwidth: 0,
      mapheight: 0,
      // 地图经纬度
      chianGeoCoord: {
        甘肃: [103.73, 36.03],
        青海: [101.74, 36.56],
        四川: [104.06, 30.67],
        河北: [114.48, 38.03],
        云南: [102.73, 25.04],
        贵州: [106.71, 26.57],
        湖北: [114.31, 30.52],
        河南: [113.65, 34.76],
        山东: [117, 36.65],
        江苏: [118.78, 32.04],
        安徽: [117.27, 31.86],
        浙江: [120.19, 30.26],
        江西: [115.89, 28.68],
        福建: [119.3, 26.08],
        广东: [113.23, 23.16],
        湖南: [113, 28.21],
        海南: [110.35, 20.02],
        辽宁: [123.38, 41.8],
        吉林: [125.35, 43.88],
        黑龙江: [126.63, 45.75],
        山西: [112.53, 37.87],
        陕西: [108.95, 34.27],
        台湾: [121.3, 25.03],
        北京: [116.46, 39.92],
        上海: [121.48, 31.22],
        重庆: [106.54, 29.59],
        天津: [117.2, 39.13],
        内蒙古: [111.65, 40.82],
        广西: [108.33, 22.84],
        西藏: [91.11, 29.97],
        宁夏: [106.27, 38.47],
        新疆: [87.68, 43.77],
        香港: [114.17, 22.28],
        澳门: [113.54, 22.19],
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      }
    };
  },
  watch:{
    selectedTab(n ,o){
      if(n !== o){
        this.getMapChart();
      }
    }
  },
  mounted() {
    this.getAdvantageLine();
    this.getTrunkData("1");

    let topW = this.$refs.mapBox.clientWidth;
    let topH = this.$refs.mapBox.clientHeight;
    this.mapwidth = topW;
    this.mapheight = topH;
    this.$nextTick(function() {
      this.getMapChart();
    });

    this.getLineChart();
    this.selectedTab = 0;
    this.autoMap();
  },
  computed: {
    JiajiUrl() {
      return `${this.apiUrls.jiajiUrl.baseURL}`;
    }
  },
  methods: {
     mouseover: function() {
        this.selectedHover = false;
      },
      mouseout: function() {
        this.selectedHover = true;
      },
    autoMap() {
      var self = this;
      setInterval(function(){
        if(self.selectedHover){
          if(self.selectedTab < 3){
            self.selectedTab++;
          } else {
            self.selectedTab = 0;
          }
        }
      }, 2000)
    },
    
    // 地图切换
    changeMap(arg){
      if(arg > 0 ){
        this.selectedTab++;
      }
      if(arg < 0){
        this.selectedTab--;
      }
      if(this.selectedTab < 0){
        this.selectedTab = 2;
      }
      if(this.selectedTab > 2){
        this.selectedTab = 0;
      }
    },
    // 地图
    getMapChart() {
      if(this.mapChart === null) {
        this.mapChart = this.$echarts.init(document.getElementById("mapChart"));
      }
       // 经纬度
      var geoCoordMap = this.chianGeoCoord;
      var convertData = function(data) {
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
      // 全国货量分布-取货量
      var data = [
        {
          name: "南昌",
          value: 3750027
        },
        {
          name: "沈阳",
          value: 2075128
        },
        {
          name: "靖江",
          value: 1194607
        },
        {
          name: "杭州",
          value: 1140138
        },
        {
          name: "郑州",
          value: 1084081
        },
        {
          name: "广州",
          value: 1025029
        },
        {
          name: "石家庄",
          value: 758311
        },
        {
          name: "贵阳",
          value: 719730
        },
        {
          name: "连云港",
          value: 648361
        },
        {
          name: "济南",
          value: 614821
        },
        {
          name: "武汉",
          value: 572042
        },
        {
          name: "上海",
          value: 561072
        },
        {
          name: "成都",
          value: 511358
        },
        {
          name: "南京",
          value: 455208
        },
        {
          name: "安吉",
          value: 430306
        },
        {
          name: "长沙",
          value: 377149
        },
        {
          name: "湛江",
          value: 367415
        },
        {
          name: "无锡",
          value: 348059
        },
        {
          name: "重庆",
          value: 307204
        },
        {
          name: "南宁",
          value: 292732
        },
        {
          name: "南通",
          value: 278053
        },
        {
          name: "泰州",
          value: 277823
        },
        {
          name: "合肥",
          value: 277430
        },
        {
          name: "长春",
          value: 263852
        },
        {
          name: "兰州",
          value: 242874
        },
        {
          name: "哈尔滨",
          value: 198151
        },
        {
          name: "济宁",
          value: 189212
        },
        {
          name: "临沂",
          value: 188240
        },
        {
          name: "嘉兴",
          value: 187169
        },
        {
          name: "天津",
          value: 187124
        },
        {
          name: "海口",
          value: 164785
        },
        {
          name: "金华",
          value: 152701
        },
        {
          name: "西安",
          value: 147572
        },
        {
          name: "中山",
          value: 140698
        },
        {
          name: "厦门",
          value: 135886
        },
        {
          name: "烟台",
          value: 122281
        },
        {
          name: "淮安",
          value: 113329
        },
        {
          name: "北京",
          value: 105598
        },
        {
          name: "盐城",
          value: 103068
        },
        {
          name: "苏州",
          value: 100873
        },
        {
          name: "太原",
          value: 96684
        },
        {
          name: "常熟",
          value: 96403
        },
        {
          name: "汕头",
          value: 93695
        },
        {
          name: "温州",
          value: 90120
        },
        {
          name: "昆明",
          value: 88337
        },
        {
          name: "佛山",
          value: 85220
        },
        {
          name: "江门",
          value: 84205
        },
        {
          name: "青岛",
          value: 71455
        },
        {
          name: "深圳",
          value: 71310
        },
        {
          name: "徐州",
          value: 69444
        },
        {
          name: "沧州",
          value: 64111
        },
        {
          name: "宁波",
          value: 62846
        },
        {
          name: "福州",
          value: 61842
        },
        {
          name: "常州",
          value: 56762
        },
        {
          name: "绍兴",
          value: 50993
        },
        {
          name: "大连",
          value: 40837
        },
        {
          name: "台州",
          value: 37183
        },
        {
          name: "宜兴",
          value: 29726
        },
        {
          name: "乌鲁木齐",
          value: 24956
        },
        {
          name: "芜湖",
          value: 15622
        },
        {
          name: "呼和浩特",
          value: 13343
        },
        {
          name: "湖州",
          value: 10780
        },
        {
          name: "扬州",
          value: 6896
        },
        {
          name: "镇江",
          value: 5122
        },
        {
          name: "张家港",
          value: 4980
        },
        {
          name: "东莞",
          value: 4231
        },
        {
          name: "太仓",
          value: 3188
        },
        {
          name: "银川",
          value: 2566
        },
        {
          name: "永康",
          value: 1931
        }
      ];
      // 全国货量分布-收货量
      var data2 = [
        {
          name: "南昌",
          value: 1104872
        },
        {
          name: "沈阳",
          value: 869806
        },
        {
          name: "靖江",
          value: 24797
        },
        {
          name: "杭州",
          value: 790129
        },
        {
          name: "郑州",
          value: 1518138
        },
        {
          name: "广州",
          value: 719021
        },
        {
          name: "石家庄",
          value: 744724
        },
        {
          name: "贵阳",
          value: 225223
        },
        {
          name: "连云港",
          value: 74341
        },
        {
          name: "济南",
          value: 986171
        },
        {
          name: "武汉",
          value: 841129
        },
        {
          name: "上海",
          value: 1155095
        },
        {
          name: "成都",
          value: 922084
        },
        {
          name: "南京",
          value: 403230
        },
        {
          name: "安吉",
          value: 72383
        },
        {
          name: "长沙",
          value: 825570
        },
        {
          name: "湛江",
          value: 124573
        },
        {
          name: "无锡",
          value: 174857
        },
        {
          name: "重庆",
          value: 468822
        },
        {
          name: "南宁",
          value: 436154
        },
        {
          name: "南通",
          value: 182416
        },
        {
          name: "泰州",
          value: 122432
        },
        {
          name: "合肥",
          value: 613226
        },
        {
          name: "长春",
          value: 332040
        },
        {
          name: "兰州",
          value: 221341
        },
        {
          name: "哈尔滨",
          value: 556748
        },
        {
          name: "济宁",
          value: 119821
        },
        {
          name: "临沂",
          value: 182965
        },
        {
          name: "嘉兴",
          value: 112661
        },
        {
          name: "天津",
          value: 478735
        },
        {
          name: "海口",
          value: 100073
        },
        {
          name: "金华",
          value: 221528
        },
        {
          name: "西安",
          value: 554161
        },
        {
          name: "中山",
          value: 130972
        },
        {
          name: "厦门",
          value: 194938
        },
        {
          name: "烟台",
          value: 141522
        },
        {
          name: "淮安",
          value: 225770
        },
        {
          name: "北京",
          value: 1023359
        },
        {
          name: "盐城",
          value: 165661
        },
        {
          name: "苏州",
          value: 159919
        },
        {
          name: "太原",
          value: 240107
        },
        {
          name: "常熟",
          value: 66709
        },
        {
          name: "汕头",
          value: 168296
        },
        {
          name: "温州",
          value: 263021
        },
        {
          name: "昆明",
          value: 284759
        },
        {
          name: "佛山",
          value: 366811
        },
        {
          name: "江门",
          value: 85704
        },
        {
          name: "青岛",
          value: 173704
        },
        {
          name: "深圳",
          value: 274307
        },
        {
          name: "徐州",
          value: 198575
        },
        {
          name: "沧州",
          value: 85836
        },
        {
          name: "宁波",
          value: 204342
        },
        {
          name: "福州",
          value: 145818
        },
        {
          name: "常州",
          value: 217436
        },
        {
          name: "绍兴",
          value: 119987
        },
        {
          name: "大连",
          value: 121595
        },
        {
          name: "台州",
          value: 174241
        },
        {
          name: "宜兴",
          value: 27571
        },
        {
          name: "乌鲁木齐",
          value: 131276
        },
        {
          name: "芜湖",
          value: 10205
        },
        {
          name: "呼和浩特",
          value: 94958
        },
        {
          name: "湖州",
          value: 57947
        },
        {
          name: "扬州",
          value: 102643
        },
        {
          name: "镇江",
          value: 3439
        },
        {
          name: "张家港",
          value: 52062
        },
        {
          name: "东莞",
          value: 95380
        },
        {
          name: "太仓",
          value: 5672
        },
        {
          name: "银川",
          value: 56131
        },
        {
          name: "永康",
          value: 4346
        }
      ];
      // 网点分布-网点
      var networkData = [
        {
          name: "沧州",
          value: 11
        },
        {
          name: "常熟",
          value: 12
        },
        {
          name: "常州",
          value: 20
        },
        {
          name: "成都",
          value: 66
        },
        {
          name: "大连",
          value: 15
        },
        {
          name: "东莞",
          value: 21
        },
        {
          name: "佛山",
          value: 29
        },
        {
          name: "福州",
          value: 17
        },
        {
          name: "广州",
          value: 70
        },
        {
          name: "贵阳",
          value: 24
        },
        {
          name: "哈尔滨",
          value: 69
        },
        {
          name: "海口",
          value: 4
        },
        {
          name: "合肥",
          value: 46
        },
        {
          name: "呼和浩特",
          value: 6
        },
        {
          name: "湖州",
          value: 8
        },
        {
          name: "淮安",
          value: 38
        },
        {
          name: "济南",
          value: 66
        },
        {
          name: "济宁",
          value: 21
        },
        {
          name: "嘉兴",
          value: 13
        },
        {
          name: "江门",
          value: 13
        },
        {
          name: "金华",
          value: 28
        },
        {
          name: "靖江",
          value: 6
        },
        {
          name: "昆明",
          value: 25
        },
        {
          name: "兰州",
          value: 24
        },
        {
          name: "连云港",
          value: 4
        },
        {
          name: "临沂",
          value: 15
        },
        {
          name: "南昌",
          value: 60
        },
        {
          name: "南京",
          value: 28
        },
        {
          name: "南宁",
          value: 17
        },
        {
          name: "南通",
          value: 19
        },
        {
          name: "宁波",
          value: 43
        },
        {
          name: "青岛",
          value: 28
        },
        {
          name: "厦门",
          value: 35
        },
        {
          name: "汕头",
          value: 21
        },
        {
          name: "绍兴",
          value: 15
        },
        {
          name: "深圳",
          value: 36
        },
        {
          name: "石家庄",
          value: 57
        },
        {
          name: "苏州",
          value: 19
        },
        {
          name: "台州",
          value: 18
        },
        {
          name: "太仓",
          value: 10
        },
        {
          name: "太原",
          value: 19
        },
        {
          name: "泰州",
          value: 12
        },
        {
          name: "温州",
          value: 18
        },
        {
          name: "乌鲁木齐",
          value: 9
        },
        {
          name: "无锡",
          value: 40
        },
        {
          name: "芜湖",
          value: 11
        },
        {
          name: "武汉",
          value: 54
        },
        {
          name: "徐州",
          value: 22
        },
        {
          name: "烟台",
          value: 22
        },
        {
          name: "盐城",
          value: 26
        },
        {
          name: "扬州",
          value: 7
        },
        {
          name: "宜兴",
          value: 6
        },
        {
          name: "银川",
          value: 7
        },
        {
          name: "永康",
          value: 6
        },
        {
          name: "湛江",
          value: 7
        },
        {
          name: "张家港",
          value: 9
        },
        {
          name: "长春",
          value: 42
        },
        {
          name: "长沙",
          value: 41
        },
        {
          name: "镇江",
          value: 2
        },
        {
          name: "中山",
          value: 19
        },
        {
          name: "重庆",
          value: 24
        }
      ];
      // 网点分布-分拨中心
      var networkData2 = [
        {
          name: "安吉",
          value: 9
        },
        {
          name: "北京",
          value: 48
        },
        {
          name: "沧州",
          value: 2
        }
      ];
      // 实时订单-起始地F58158 目的地58B3CC
      var allData = {
        citys: [
          {
            name: "南昌",
            value: [115.89, 28.68, 166, 1948],
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#F58158"
              }
            }
          },
          {
            name: "南昌",
            value: [115.89, 28.68, 166, 1948],
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "成都",
            value: [104.06, 30.67, 150, 2256],
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "郑州",
            value: [113.65, 34.76, 162, 1318],
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "北京",
            value: [116.46, 39.92, 102, 1242],
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "沈阳",
            value: [123.38, 41.8, 96, 924],
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "济南",
            value: [117, 36.65, 78, 994],
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "西安",
            value: [108.95, 34.27, 76, 1080],
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "石家庄",
            value: [114.48, 38.03, 74, 1258],
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "合肥",
            value: [117.27, 31.86, 74, 978],
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          },
          {
            name: "广州",
            value: [113.23, 23.16, 68, 1398],
            symbolSize: 3,
            itemStyle: {
              normal: {
                color: "#58B3CC"
              }
            }
          }
        ],

        moveLines: [
          {
            fromName: "南昌",
            toName: "南昌",
            coords: [[115.89, 28.68], [115.89, 28.68]]
          },
          {
            fromName: "南昌",
            toName: "成都",
            coords: [[115.89, 28.68], [104.06, 30.67]]
          },
          {
            fromName: "南昌",
            toName: "郑州",
            coords: [[115.89, 28.68], [113.65, 34.763]]
          },
          {
            fromName: "南昌",
            toName: "北京",
            coords: [[115.89, 28.68], [116.46, 39.92]]
          },
          {
            fromName: "南昌",
            toName: "沈阳",
            coords: [[115.89, 28.68], [123.38, 41.8]]
          },
          {
            fromName: "南昌",
            toName: "济南",
            coords: [[115.89, 28.68], [117, 36.65]]
          },
          {
            fromName: "南昌",
            toName: "西安",
            coords: [[115.89, 28.68], [108.95, 34.27]]
          },
          {
            fromName: "南昌",
            toName: "石家庄",
            coords: [[115.89, 28.68], [114.48, 38.03]]
          },
          {
            fromName: "南昌",
            toName: "合肥",
            coords: [[115.89, 28.68], [117.27, 31.86]]
          },
          {
            fromName: "南昌",
            toName: "广州",
            coords: [[115.89, 28.68], [113.23, 23.16]]
          }
        ]
      };

      // 全国货量分布
      function mapA(){
        if(mapAData != null){
          return mapAData;
        }

        mapAData = {
          title: {
            text: "全国货量分布",
            left: "center",
            top: "top",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: (params) => {
              if (typeof params.value[2] == "undefined") {
                return `${params.name}：${params.value}`
              } else {
                return `${params.name}：${_this.formatNum(params.value[2])}件`;
              }
            }
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["取货货量分布", "收货货量分布"],
            textStyle: {
              color: "#ccc"
            }
          },
          geo: {
            map: "china",
            roam: true,
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#fff",
                borderWidth: 1
              },
              emphasis: {
                areaColor: "#0f2c70"
              }
            }
          },
          series: [
            {
              name: "取货货量分布",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(data),
              symbolSize: function(val) {
                return val[2] / 100000;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#ddb926"
                }
              }
            },
            {
              name: "收货货量分布",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(data2),
              symbolSize: function(val) {
                return val[2] / 100000;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#f11b05"
                }
              }
            }
          ]
        };

        return mapAData;
      };

      // 网点分布
      function mapB() {
        if(mapBData != null){
          return mapBData;
        }

        mapBData = {
          title: {
            text: "网点分布",
            left: "center",
            top: "top",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              if (typeof params.value[2] == "undefined") {
                return `${params.name}：${params.value}`
              } else {
                return `${params.name}：${params.value[2]}家`
              }
            }
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["网点", "分拨中心"],
            textStyle: {
              color: "#ccc"
            }
          },
          geo: {
            map: "china",
            roam: true,
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#fff",
                borderWidth: 1
              },
              emphasis: {
                areaColor: "#0f2c70"
              }
            }
          },
          series: [
            {
              name: "网点",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: convertData(networkData),
              symbolSize: function(val) {
                return val[2] / 5;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#21cdab",
                  shadowColor: "rgba(255,255,255, 0.5)",
                  shadowBlur: 100
                }
              }
            },
            {
              name: "分拨中心",
              type: "scatter",
              coordinateSystem: "geo",
              data: convertData(networkData2),
              symbolSize: function(val) {
                return val[2] / 20;
              },
              label: {
                normal: {
                  formatter: "{b}",
                  position: "right",
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: "#a6f065"
                }
              }
            }
          ]
        };

        return mapBData;
      };
      
      //实时订单
      function mapC(){
        if(mapCData != null){
          return mapCData;
        }

        mapCData = {
          title: {
            text: "实时订单",
            left: "center",
            top: "top",
            textStyle: {
              color: "#fff"
            }
          },
          legend: {
            show: false,
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["地点", "线路"],
            textStyle: {
              color: "#fff"
            }
          },
          geo: {
            map: "china",
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            zoom: 1.2,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#fff",
                borderWidth: 1
              },
              emphasis: {
                areaColor: "#0f2c70"
              }
            }
          },
          tooltip: {
            trigger: "item",
            formatter: function(params) {
              if (typeof params.value[2] == "undefined") {
                return `${params.name}：${params.value}单`;
              } else {
                return `${params.name}：${params.value[2]}单 ${_this.formatNum(params.value[3])}件`;
              }
            }
          },
          series: [
            {
              name: "地点",
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                brushType: "stroke"
              },
              label: {
                emphasis: {
                  show: true,
                  position: "right",
                  formatter: "{b}"
                }
              },
              symbolSize: 2,
              showEffectOn: "render",
              itemStyle: {
                normal: {
                  color: "#46bee9"
                }
              },
              data: allData.citys
            },
            {
              name: "线路",
              type: "lines",
              coordinateSystem: "geo",
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                constantSpeed: 30,
                symbol: "pin",
                symbolSize: 3,
                trailLength: 0
              },
              lineStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#58B3CC"
                    },
                    {
                      offset: 1,
                      color: "#F58158"
                    }
                  ], false),
                  width: 1,
                  opacity: 0.5,
                  curveness: 0.1
                }
              },
              data: allData.moveLines
            }
          ]
        };
        
        return mapCData;
      }

      var _this = this;
      var chinaData = "/static/mapdata/china.json";
      $.getJSON(chinaData, (geoJson) => {
        this.$echarts.registerMap("china", geoJson);
        let mapOption = {};

        if(this.selectedTab === 0){
          mapOption = mapA();
        } else if (this.selectedTab === 1){
          mapOption = mapB();
        } else{
          mapOption = mapC();
        }
        
        this.mapChart.setOption(mapOption, true);
      });
    },

    // 优势路线饼图
    getPieChart() {
      const self = this;

      let pieChart = this.$echarts.init(document.getElementById("pieChart"));
      let pieOption = {
        color: ["#f95d5d", "#fde269", "#41cffe"],
        tooltip: {
          trigger: "item",
          formatter: function(data) {
            return `${data.name} : ${self.formatNum(data.value)}`;
          }
        },
        calculable: true,
        series: [
          {
            name: "优势线路",
            type: "pie",
            center: "center",
            radius: ["30%", "70%"],
            label: {
              normal: {
                show: true,
                fontSize: 12,
                color: "#fff",
                baseline: "bottom",
                formatter: function(data) {
                  return `${data.name} : ${self.formatNum(data.value)}`;
                }
              },
              textStyle: {
                baseline: "bottom"
              }
            },
            labelLine: {
              length: 1,
              lineStyle: {
                color: "rgba(65, 207, 254, .3)",
                width: 1,
                type: "dashed"
              }
            },
            data: [
              {
                value: self.advantageData.ProvinceLineNumber,
                name: "省际干线"
              },
              {
                value: self.advantageData.CityLineNumber,
                name: "城际干线"
              },
              {
                value: self.advantageData.SameCityLineNumber,
                name: "同城配线路"
              }
            ]
          }
        ]
      };
      pieChart.setOption(pieOption, true);

      // 根据窗口大小变动图表
      window.onresize = function() {
        pieChart.resize();
      };
    },
    // 涉药运输评级折线图
    getLineChart() {
      let lineGrid = {
        left: '5%',
        right: '5%',
        top: '15%',
        bottom: '15%',
        containLabel: true
      };
      let xXAxis = {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.5)',
          }
        },
        axisLabel: {
          color: '#fff',
        },
        data: ['1季度', '2季度', '3季度', '4季度']
      };
      let yYAxis = {
        name: '',
        nameTextStyle: {
          color: '#777',
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.5)',
          }
        },
        type: 'value',
        axisLabel: {
          show: true,
          interval: '0',
          color: '#fff',
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,.5)',
            type: 'solid'
          },
        },
        min: 0,
        max: 100,
        splitNumber: 2
      };
      let lineChart = this.$echarts.init(document.getElementById('lineChart'));
      let lineChart2 = this.$echarts.init(document.getElementById('lineChart2'));
      let lineChart3 = this.$echarts.init(document.getElementById('lineChart3'));
      let lineChart4 = this.$echarts.init(document.getElementById('lineChart4'));
      let lineChart5 = this.$echarts.init(document.getElementById('lineChart5'));
      let lineChart6 = this.$echarts.init(document.getElementById('lineChart6'));
      // 货物提取准时率
      let lineOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '货物提取准时率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: [96.10, 94.50, 96.50, 92.60]
        }]
      };
      // 货物送达准时率
      let lineOption2 = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '货物送达准时率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: [91.50, 94.40, 93.60, 96.20]
        }]
      };
      // 运输包装完好率
      let lineOption3 = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '运输包装完好率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: [95.84, 94.23, 95.79, 94.79]
        }]
      };
      // 运输过程信息可追溯率
      let lineOption4 = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '运输过程信息可追溯率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: [99, 99, 99, 99]
        }]
      };
      // 冷藏药品温度控制合格率
      let lineOption5 = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '冷藏药品温度控制合格率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: []
        }]
      };
      // 客户有效投诉率
      let lineOption6 = {
        tooltip: {
          trigger: 'axis'
        },
        grid: lineGrid,
        xAxis: xXAxis,
        yAxis: yYAxis,
        series: [{
          name: '客户有效投诉率',
          type: 'line',
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: '#21cdab'
            }
          },
          data: [0.029, 0.029, 0.028, 0.028]
        }]
      };

      lineChart.setOption(lineOption, true);
      lineChart2.setOption(lineOption2, true);
      lineChart3.setOption(lineOption3, true);
      lineChart4.setOption(lineOption4, true);
      lineChart5.setOption(lineOption5, true);
      lineChart6.setOption(lineOption6, true);
    },
    // 获取优势路线数据
    getAdvantageLine() {
      const self = this;
      this.$http
        .get(
          self.JiajiUrl +
            "/api/enterprise/getlinedata?guid=20181010150908090001,20181010151304750001,20181010151613920001,20181010154311020001,20181010154559430001,20181011182723600001"
        )
        .then(function(rs) {
          self.advantageData = rs.Data;
          self.getPieChart();
        });
    },
    // 获取省际干线一览数据
    getTrunkData(val) {
      const self = this;
      let routetype = val;
      self.tabsnumber = val;
      let pageindex = 1;
      let pagesize = 50;

      this.$http
        .get(
          self.JiajiUrl +
            "/api/enterprise/getlineinfo?guid=20181010150908090001,20181010151304750001,20181010151613920001,20181010154311020001,20181010154559430001,20181011182723600001&RouteType=" +
            routetype +
            "&PageIndex=" +
            pageindex +
            "&PageSize=" +
            pagesize
        )
        .then(function(rs) {
          self.interprovincials = rs.Datas;
          self.intercities = rs.Datas;
          self.samecities = rs.Datas;

          if (!self.swiperLoaded) {
            self.$nextTick(function() {
              new Swiper(".swiper-container", {
                loop: true,
                slidesPerView: 4,
                slidesPerGroup: 1,
                autoplay: {
                  delay: 1000,
                  disableOnInteraction: false
                },
                direction: "vertical"
              });
            });
            self.swiperLoaded = true;
          }
        });
    },

    // 千分位
    formatNum(strNum){
      if ((strNum||'').length <= 3) {
        return strNum;
      }
      if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
        return strNum;
      }
      var a = RegExp.$1,
          b = RegExp.$2,
          c = RegExp.$3;
      var re = new RegExp();
      re.compile("(\\d)(\\d{3})(,|$)");
      while (re.test(b)) {
        b = b.replace(re, "$1,$2$3");
      }
      return a + "" + b + "" + c;
    },
  }
};
</script>

<style scoped>
b {
  font-weight: normal;
}

.spacing-h {
  height: 2%;
}

.spacing-w {
  width: 2%;
}

.wrapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/visualization/background.jpg");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  overflow-y: hidden;
}

.header {
  display: flex;
  height: 9.26%;
  background: url("../../assets/images/visualization/bg-header.png") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  padding: 0 2%;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header a {
  float: left;
  width: 16.33%;
  position: absolute;
  left: 2%;
}

.header a img {
  width: 100%;
}

.header h2 {
  height: 100%;
  font-size: 43px;
  letter-spacing: 5px;
  line-height: 116%;
  font-weight: 700;
  /*background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(174, 207, 210, 1)), to(rgba(255, 255, 255, 1)));*/
  /*-webkit-background-clip: text;*/
  /*-moz-background-clip: text;*/
  /*background-clip: text;*/
  /*-webkit-text-fill-color: transparent;*/
  color: #fff;
  text-align: center;
  /*padding: 0 17%;*/
  display: flex;
  align-items: center;
}

.container {
  position: relative;
  height: 82.5%;
  margin: 1% 0;
  padding: 0 2%;
}

.container:before,
.container:after {
  content: "";
  position: absolute;
  top: 3%;
  width: 2%;
  height: 94%;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}

.container:before {
  left: 0;
  background-image: url(../../assets/images/visualization/left.gif);
}

.container:after {
  right: 0;
  background-image: url(../../assets/images/visualization/right.gif);
}

.part-title {
  display: flex;
  font-size: 16px;
  color: #88e4f6;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  position: relative;
  align-items: center;
}

.part-title p {
  width: 60%;
  line-height: initial;
  text-align: center;
}

.part-title i {
  position: absolute;
  width: 60%;
  height: 100%;
}

.part-title i:before,
.part-title i:after {
  content: "";
  position: absolute;
  top: 30%;
  width: 5.33%;
  height: 40%;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
}

.part-title i:before {
  left: 4%;
  background-image: url("../../assets/images/visualization/bg-title-l.png");
}

.part-title i:after {
  right: 8%;
  background-image: url("../../assets/images/visualization/bg-title-r.png");
}

.part-content {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
}

.container-left {
  float: left;
  width: 24%;
  height: 100%;
}

.service-capability {
  height: 68%;
}

.service-capability .part-title {
  height: 8.77%;
  background-image: url("../../assets/images/visualization/bg-title1.png");
}

.service-capability .part-content {
  height: 91.23%;
  padding: 0 5.7%;
}

.service-capability h3 {
  display: flex;
  height: 15%;
  font-size: 24px;
  color: #fff;
  justify-content: center;
  align-items: center;
}

.service-capability h3 b {
  font-size: 36px;
  color: #81daeb;
  padding: 0 5px;
  text-shadow: 0 0 20px #81daeb;
}

.service-capability dl {
  height: 21.25%;
  border-bottom: 1px solid #44878c;
}

.service-capability dl:last-child {
  border-bottom: 0;
}

.service-capability dd {
  display: flex;
  color: #fff;
  padding: 0 5% 0 3%;
  white-space: nowrap;
  height: 50%;
  align-items: center;
}

.service-capability dd span {
  flex: 2;
}

.service-capability dd b {
  flex: 1;
  color: #21cdab;
  text-align: right;
  text-shadow: 0 0 20px #21cdab;
}

.service-capability dd em {
  flex: 0.5;
  text-align: right;
}

.service-capability dd.max-text,
.service-capability dd.min-text b {
  font-size: 18px;
}

.service-capability dd.max-text b {
  font-size: 24px;
}

.service-capability dd.min-text {
  font-size: 15px;
}

.advantage-line {
  height: 30%;
}

.advantage-line .part-title {
  height: 18.87%;
  background-image: url("../../assets/images/visualization/bg-title1.png");
}

.advantage-line .part-content {
  height: 81.13%;
}

.advantage-line .part-content ul {
  display: flex;
  height: 30%;
  align-items: center;
}

.advantage-line .part-content ul li {
  flex: 1;
  color: #fff;
  text-align: center;
}

.advantage-line .part-content ul li b {
  color: #21cdab;
  line-height: 1.5;
}

.container-middle {
  float: left;
  width: 50%;
  height: 100%;
  margin: 0 1%;
}

.echart-map {
  height: 68%;
}

.trunk-list {
  height: 30%;
  overflow: hidden;
}

.trunk-header {
  display: flex;
  border-bottom: 1px solid #44878b;
  align-items: center;
}

.trunk-body .swiper-slide {
  border-top: 1px solid rgba(79, 161, 164, 0.2);
}

.trunk-body .swiper-slide:first-child {
  border-top: 0;
}

.trunk-body .table-row {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 13px;
}

.trunk-header p:first-child,
.trunk-body .table-row p:first-child {
  text-align: left;
}

.trunk-header p,
.trunk-body .table-row p {
  flex: 1;
  color: #fff;
  padding: 0 2%;
  text-align: center;
}

.container-right {
  float: left;
  width: 24%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.service-quality {
  height: 100%;
}

.service-quality .part-title {
  height: 5.61%;
  background-image: url("../../assets/images/visualization/bg-title2.png");
  justify-content: flex-end;
}

.service-quality .part-title i:before {
  left: 8%;
}

.service-quality .part-title i:after {
  right: 4%;
}

.service-quality .part-content {
  height: 94.39%;
}

.service-quality .part-content .score {
  display: flex;
  height: 10%;
  font-size: 24px;
  color: #fff;
  align-items: center;
  justify-content: center;
}

.service-quality .part-content .score b {
  font-size: 28px;
  color: #81daeb;
  padding-left: 15px;
  text-shadow: 0 0 20px #81daeb;
}

.footer {
  display: flex;
  height: 4.25%;
  background: url("../../assets/images/visualization/bg-footer.png") no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  font-size: 14px;
  color: #fff;
  align-items: center;
  justify-content: center;
}
.line-title{
  height: 3.66%;
  color: #fff;
  overflow: hidden;
  padding: 0 5%;
}
.line-title b{
  font-weight: normal;
}
.line-title i{
  float: right;
  color: #21cdab;
}
.map-btn{
  position: absolute;
  top: calc((100% - 36px) / 2);
  color:#fff;
  height:36px;
  width:36px;
  border-radius: 50%;
  line-height: 36px;
  text-align: center;
  z-index:19820710;
  cursor: pointer;
}
.map-btnL{
  left: 2px;
}
.map-btnR{
  right: 2px;
}
.map-btn::before{
  display: inline-block;
  content: '';
  width: 10px;
  height: 10px;
  border-top: 1px solid #fff;
}
.map-btnL::before{
  border-left: 1px solid #fff;
  transform: rotate(-45deg);
}
.map-btnR::before{
  border-right: 1px solid #fff;
  transform: rotate(45deg);
}
.map-btn:hover{
  background: rgba(31,45,61,.5);
}
</style>
