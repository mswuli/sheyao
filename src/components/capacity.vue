<template>
  <div>
    <c-menu name="3"></c-menu>
    <div class="inner-banner">
      <img src="../assets/images/banner-news.jpg" alt="">
    </div>
    <div class="capacity-wrap inner-wrap">
      <Tabs :animated="false">
        <!-- <TabPane label="搜运力">
          <div class="capacity-content">
            <div class="search-box">
              <div class="search-box-row">
                <Row :gutter="16">
                  <Col span="8">
                    <div class="text-input displayflex">
                      <span class="prepend">物流商名称</span>
                      <div class="flex1">
                        <input type="text" v-model="chineseName">
                      </div>
                    </div>
                  </Col>
                  <Col span="8">
                    <div class="text-input displayflex">
                      <span class="prepend">所在地</span>
                      <div class="flex1">
                        <Cascader :data="nationalData" @on-change='venue' trigger="hover"></Cascader>
                      </div>
                    </div>
                  </Col>
                  <Col span="8" class="text-right">
                    <button class="search-btn" v-on:click="getCarrData()"><Icon type="ios-search" />查询</button>
                  </Col>
                </Row>
              </div>
              <div class="search-box-row">
                <div class="radio-group">
                  <span class="prepend">涉药运输评级</span>
                  <RadioGroup type="button" v-on:on-change="RadioAfun">
                    <Radio label="A" ></Radio>
                    <Radio label="AA"></Radio>
                    <Radio label="AAA"></Radio>
                    <Radio label="AAAA"></Radio>
                    <Radio label="AAAAA"></Radio>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div class="city-search-wrap">
              <span>全国共<i>{{TransportDeploy.TotalRecords}}</i>家</span>
              <dl class="city-search displayflex">
                <dt class="flexitem">位置：</dt>
                <dd class="flex1">
                  <a v-for="item in TransportDeploy.data" v-on:click="getCarrData('1',item.Province)">
                    {{item.ProvinceName}}<i>{{item.Number}}</i>家
                  </a>
                </dd>
              </dl>
            </div>
            <div class="screening-result" v-show="VenueShow || chineseNameShow">
              <b v-on:click="deleteGet()">全部</b>
              <span v-show="VenueShow">{{Venue}}<i v-on:click="deleteGet('1')">×</i></span>
              <span v-show="chineseNameShow">{{chineseName}}<i v-on:click="deleteGet('2')">×</i></span>
            </div>
            <div class="capacity-content-main">
              <table class="table" v-show="capacityTable1">
                <thead>
                  <tr>
                    <td>物流商名称</td>
                    <td>所在地</td>
                    <td>涉药运输评级</td>
                    <td>操作</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in capacitys.data">
                    <td>{{ item.TenanName }}</td>
                    <td>{{ item.Province_City }}</td>
                    <td>{{ item.Grade }}</td>
                    <td>
                      <a @click="handleCapacity1(item.Guid,item.Province_City,item.TenanName,item.Grade)" class="action-btn">详情</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="capacity-table-detail capacity-table-detail1" v-show="tableCapacityDetail1">
                <div class="title">
                  <b>{{company.TenanName}}</b>
                  <a @click="handleBack1"></a>
                </div>
                <div class="score">
                  <p>涉药运输评级<span>{{company.Grade}}</span></p>
                </div>
                <div class="capacity-table-detail-main">
                  <div class="capacity-table-detail-top">
                    <p>所在地：{{ company.address }}</p>
                    <p>车辆数：{{ company.CarNumber }}辆</p>
                    <p>线路：{{ company.RouteNumber }}条</p>
                    <ul>
                      <li v-for="line in company.Routes" class="over-wrap">{{ line.Name }}</li>
                    </ul>
                    <p>照片：{{ company.CarImgeNumber }}张</p>
                    <div class="license-img">
                      <div class="rela-img" v-for="license in company.CarImg">
                        <img :src="imgurlcs4pl+license.Name">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="$store.state.user.LoginType" class="list-more">
                  <a @click="showLogin">查看更多</a>
            </div>
            <div v-else>
                  <Page show-total
                    :current="pageNo"
                    :page-size="pageSize"
                    :total="capacitys.TotalRecords"
                    @on-change="getCarrData"></Page>
            </div>
          </div>
        </TabPane> -->
        <TabPane label="全国运力网">
          <div class="capacity-content2">
            <div class="city-search-wrap">
              <span>全国共<i>{{TransportDeploy.TotalRecords}}</i>家</span>
              <dl class="city-search displayflex">
                <dt class="flexitem">位置：</dt>
                <dd class="flex1">
                  <a @click="getCarrData(1,'',true)" :class='{active:Province2==""}'>不限</a>
                  <a v-for="item in TransportDeploy.data" v-show="item.Venes"  :class='{active:Province2==item.Venes}'
                    @click='getCarrData(1, item.Venes,true)'>{{item.Venes}}<i>{{item.TenantNum}}</i>家</a>
                </dd>
              </dl>
            </div>
            <div class="capacity-total">
              <!-- <span class="iconfont icon-transport_company">全国运力<b>{{ national.company }}</b>家</span>
              <span class="iconfont icon-line">线路总数<b>{{ national.line }}</b>条</span> -->
              <span class="iconfont icon-car2">车辆总数<b>{{ Cardata.Car | amount }}</b>辆，其中冷链车辆<b>{{ Cardata.ColdCar | amount }}</b>辆</span>
            </div>
            <div class="capacity-content2-main">
              <div class="capacity-content2-left">
                <table class="table" v-show="capacityTable2">
                  <thead>
                    <tr>
                      <td class="not-wrap">序号</td>
                      <td>物流商名称</td>
                      <td>所在地</td>
                      <td>涉药运输评级</td>
                      <td class="not-wrap">操作</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in capacitys.datas" :key="index">
                      <td>{{(index+1)+(pageIndex-1)*pageSize }}</td>
                      <td class="text-left"><p>{{ item.Name }}</p></td>
                      <td class="not-wrap">{{item.Venes}}{{item.City}}</td>
                      <!-- <td>{{ item.Grade }}</td> -->
                      <td class="not-wrap">待评定</td>
                      <td>
                        <a @click="handleCapacity(item.TenantGuid,item.Venes+item.City,item.Name,item.Car)" class="action-btn">详情</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="capacity-table-detail" v-show="tableCapacityDetail">
                  <div class="title">
                    <b>{{company.TenanName}}</b>
                    <a @click="handleBack"></a>
                  </div>
                  <div class="score">
                    <!--<p>涉药运输评级<span>{{company.Grade}}</span></p>-->
                    <p>涉药运输评级<span>待评定</span></p>
                  </div>
                  <div class="capacity-table-detail-main">
                    <div class="capacity-table-detail-top">
                      <p>所在地：{{ company.address }}</p>
                      <p>车辆数：{{ company.Car }}辆</p><br>
                      <p>照片：{{ company.CarImgeNumber }}张</p>
                      <p v-if="company.CarNumber > 0">线路：{{ company.CarNumber }}条</p>
                      <p v-else>线路：0条</p>
                    </div>
                    <div class="capacity-table-detail-bottom">
                      <div class="license-img" v-viewer>
                        <div class="rela-img" v-for="license in company.CarImg" v-show="license.PictContent && license.PictContent!='[]'&&license.PictContent!='null'">
                          <img :src="license.PictContent | imgurl(license.PlatformType)">
                        </div>
                      </div>
                      <ul v-show="company.CarNumber > 0">
                        <li v-for="line in company.Routes" class="over-wrap">{{ line.DispatchVenue}} - {{line.DestinationVenue}}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-show="pageShow">
                <div v-if="$store.state.user.LoginType==false" class="list-more">
                  <a :href="loginUrl">查看更多</a>
                </div>
                <div v-else>
                  <Page show-total
                    :current="pageNo"
                    :page-size="pageSize"
                    :total="capacitys.total"
                    @on-change="getCarrData"></Page>
                </div>
                </div>
              </div>
              <div class="capacity-content2-right">
                <b style="cursor:pointer;" @click="drawLine(false)">{{mapTitle}}运力分布</b>
                <div id="myChart"></div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <c-login :showLogin="showLoginDia" @resetVal="resetValf"></c-login>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
  </div>
</template>
<script>
import Cmenu from "@/components/common/menu.vue";
import {setLoginCookie,isLogin} from '@/util/commonFun';
import Vue from 'vue';
export default {
  components: { "c-menu": Cmenu },
  data() {
    const self = this;
    return {
      search: {
        Province: "",
        City: "",
        District: ""
      },
      nationalData: self.$store.state.provinces,
      Venue: "",
      Province: "",
      City: "",
      District: "",
      capacitys: {},
      national: {
        company: "340",
        line: "123",
        car: "2400"
      },
      Province2: "",
      capacityTable1: true,
      tableCapacityDetail1: false,
      showLoginDia: false,
      capacityTable2: true,
      tableCapacityDetail: false,
      company: {
        TenanName: "",
        Grade: "",
        address: "湖北-武汉",
        car: "25",
        line: "5",
        photo: "5",
        Routes: [],
        CarNumber: 0,
        CarImg: [],
        CarImgeNumber: 0
      },
      lines: [],
      licenses: [],
      TransportDeploy: [],
      chartObj: null,
      chartObjOption: null,
      mapTitle: "全国",
      chineseName: "",
      grade: "",
      VenueShow: "",
      chineseNameShow: "",
      pageSize: 7,
      pageIndex: 1,
      pageNo: 1,
      imgurlcs4pl: "",
      Cardata: {},
      pageShow: true,
      images: []
    };
  },
  mounted() {
    this.drawLine(true);
    this.GetTransportDeploy();
    this.getCarrData();
    this.imgurlcs4pl = this.imgurl.cs4pl;
    this.$store.commit("navIndex", 3);



  },
  methods: {
    venue(val, txt) {
      this.Venue = txt.map(c => c.label).join("/");
      this.Province = val[0] == undefined ? "" : val[0];
      this.City = val[1] == undefined ? "" : val[1];
      this.District = val[2] == undefined ? "" : val[2];
    },

    handleBack1() {
      this.tableCapacityDetail1 = false;
      this.capacityTable1 = true;
    },
    handleCapacity(Guid, address, TenanName, Grade) {
      this.tableCapacityDetail = true;
      this.capacityTable2 = false;
      this.pageShow = false;
      this.GetCarrDetail(Guid, address, TenanName, Grade);
    },
    handleBack() {
      this.tableCapacityDetail = false;
      this.capacityTable2 = true;
      this.pageShow = true;
    },
    drawLine(isFirstLoad) {
      if (!isFirstLoad) {
        if (this.mapTitle == "全国") {
          return;
        } else {
          this.mapTitle = "全国";
        }
      }
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      this.chartObj = myChart;
      // 经纬度
      var geoCoordMap = {
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
      };
      // 数据源
      var data = [{ name: "武汉", value: [2, 3] }];

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

      // 绘制图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return (
              params.name +
              "<br>" +
              params.value[2] +
              "辆车" +
              "<br>" +
              params.value[3] +
              "线路"
            );
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#e2d5c4",
              borderColor: "#cfc3bc"
            },
            emphasis: {
              areaColor: "#f4dbba"
            }
          }
        },
        series: [
          {
            name: "运力分布",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: function(val) {
              return 6; //val[2];
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
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
                color: "#4fa1a4",
                shadowBlur: 10,
                shadowColor: "#4fa1a4"
              }
            },
            zlevel: 1
          }
        ]
      };
      var _this = this;
      var chinaData = "/static/mapdata/china.json";
      $.getJSON(chinaData, function(geoJson) {
        _this.$echarts.registerMap("china", geoJson);
        myChart.setOption(option);
        _this.chartObj = myChart;
      });

      var cityMap = {
        北京: "110000",
        天津: "120000",
        河北: "130000",
        山西: "140000",
        内蒙古: "150000",

        辽宁: "210000",
        吉林: "220000",
        黑龙江: "230000",

        上海: "310000",
        江苏: "320000",
        浙江: "330000",
        安徽: "340000",
        福建: "350000",
        江西: "360000",
        山东: "370000",

        河南: "410000",
        湖北: "420000",
        湖南: "430000",
        广东: "440000",
        广西: "450000",
        海南: "460000",

        重庆: "500000",
        四川: "510000",
        贵州: "520000",
        云南: "530000",
        西藏: "540000",

        陕西: "610000",
        甘肃: "620000",
        青海: "630000",
        宁夏: "640000",
        新疆: "650000"
      };
      var mapType = [];
      for (var city in cityMap) {
        var value = { name: city, id: cityMap[city] };
        mapType.push(value);
      }
      myChart.on("click", function(params) {
        var city = params.name;

        var dataId;
        var uploadedDataURL = "/static/mapdata/geometryProvince/";
        if (params.seriesType == "effectScatter") {
          aaa();
        } else {
          aaa();
        }
        function aaa() {
          for (var i = 0; i < mapType.length; i++) {
            if (mapType[i].name == city) {
              dataId = mapType[i].id.substring(0, 2);
              $.getJSON(uploadedDataURL + dataId + ".json", function(geoJson) {
                _this.$echarts.registerMap(dataId, geoJson);
                option.geo.map = dataId;
                myChart.setOption(option, true);
                //更新地图数据
                _this.chartObjOption = option;
                _this.mapTitle = city;
                _this.getMapData(city);
              });

              break;
            }
          }
        }
      });
      _this.chartObjOption = option;
      _this.getMapData(null);
    },
    getMapData(provice) {
      let self = this;
      let url = "/api/csxj/transport";
      let data = {
        PageSize: 1000,
        PageIndex: 0,
        Venes: provice ? provice : ""
      };

      this.$http.post(url, data, this.apiUrls.yaoqiURL).then(function(res) {
        let data = res.datas;
        let dist = {};
        data.map(item => {
          let venes = provice ? item.City : item.Venes;
          if (dist[venes]) {
            dist[venes].car += item.Car;
            dist[venes].line += item.Line;
          } else {
            dist[venes] = {
              car: item.Car,
              line: item.Line
            };
          }
        });

        self.getCoordinate(dist).then(d => {
          //地图运力分布数据
          self.chartObjOption.series[0].data = d;
          //[{"name":"武汉市","value":[114.316200103,30.5810841269,6,3]}]//d.data;

          self.chartObj.setOption(self.chartObjOption, true);
        });
      });
    },
    async getCoordinate(result) {
      const axios = require("axios");
      let data = [];
      for (let key in result) {
        if (!key) {
          continue;
        }
        let cachInfo = this.getCacheCityCoord(key);

        if (cachInfo && cachInfo.length) {
          data.push({
            name: key,
            value: cachInfo.concat([result[key].car, result[key].line])
          });
        } else {
          await axios
            .get("https://api3.cs4pl.com:9443/api/BaiduMap/Position/" + key)
            .then(d => {
              let coord = [parseFloat(d.lng), parseFloat(d.lat)];
              localStorage.setItem(key, JSON.stringify(coord));
              data.push({
                name: key,
                value: coord.concat([result[key].car, result[key].line])
              });
            }); //end ajax
        } // end if
      }
      return data;
    },
    getCacheCityCoord(areaName) {
      if (localStorage.getItem(areaName)) {
        return JSON.parse(localStorage.getItem(areaName));
        //let coord = [parseFloat(cache.lng),parseFloat(cache.lat)];
        //return coord;
      }
      return false;
    },
    GetTransportDeploy(Province) {
      let self = this;
      let url = "/api/csxj/province";
      let data = {};
      self.TransportDeploy.data = [];
      self.axios.post(url, data, self.apiUrls.yaoqiURL).then(function(res) {
        Vue.set(self.TransportDeploy, 'TotalRecords', res.total)
        Vue.set(self.TransportDeploy, 'data', res.datas)
      });
    },
    getCarrData(pageNo, provice, showType) {
      let self = this;
      var type = true;
      self.pageIndex = pageNo || 1;
      if (showType) {
        type = false;
        self.handleBack();
        self.Province2 = provice;
      }

      if (provice) {
        self.Province2 = provice;
      }
      let url = "/api/csxj/transport";
      let data = {
        PageSize: self.pageSize,
        PageIndex: pageNo,
        Venes: self.Province2
      };
      this.$http.post(url, data, this.apiUrls.yaoqiURL).then(function(res) {
        self.capacitys = res;
        self.capacitys.total = parseInt(res.total);
        if (self.$route.params.guid && type) {
          let scs;
          res.datas.map(function(value, index, array) {
            if (value.TenantGuid == self.$route.params.guid) {
              scs = value;
              self.handleCapacity(
                self.$route.params.guid,
                scs.Venes + scs.City,
                scs.Name,
                scs.Car
              );
              return;
            }
          });
        }
      });
      this.$http
        .post("/api/csxj/transportsum", {}, this.apiUrls.yaoqiURL)
        .then(function(res) {
          self.Cardata = res.datas[0];
        });
      this.getProviceMap(provice);
    },
    getProviceMap(cityname) {
      if (cityname==''){
        this.mapTitle = '全国';
        this.drawLine(true);
        return;
      }
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      this.chartObj = myChart;
      // 绘制图表
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return (
              params.name +
              "<br>" +
              params.value[2] +
              "辆车" +
              "<br>" +
              params.value[3] +
              "线路"
            );
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#e2d5c4",
              borderColor: "#cfc3bc"
            },
            emphasis: {
              areaColor: "#f4dbba"
            }
          }
        },
        series: [
          {
            name: "运力分布",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: [],
            symbolSize: function(val) {
              return 6; //val[2];
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
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
                color: "#4fa1a4",
                shadowBlur: 10,
                shadowColor: "#4fa1a4"
              }
            },
            zlevel: 1
          }
        ]
      };

      var _this = this;
      var cityMap = {
        北京市: "110000",
        天津市: "120000",
        河北省: "130000",
        山西省: "140000",
        内蒙古自治区: "150000",

        辽宁省: "210000",
        吉林省: "220000",
        黑龙江省: "230000",

        上海市: "310000",
        江苏省: "320000",
        浙江省: "330000",
        安徽省: "340000",
        福建省: "350000",
        江西省: "360000",
        山东省: "370000",

        河南省: "410000",
        湖北省: "420000",
        湖南省: "430000",
        广东省: "440000",
        广西壮族自治区: "450000",
        海南省: "460000",

        重庆市: "500000",
        四川省: "510000",
        贵州省: "520000",
        云南省: "530000",
        西藏: "540000",

        陕西省: "610000",
        甘肃省: "620000",
        青海省: "630000",
        宁夏回族自治区: "640000",
        新疆维吾尔自治区: "650000"
      };
      var mapType = [];
      for (var city in cityMap) {
        var value = { name: city, id: cityMap[city] };
        mapType.push(value);
      }

      var city = cityname;
        var dataId;
        var uploadedDataURL = "/static/mapdata/geometryProvince/";
        for (var i = 0; i < mapType.length; i++) {
            if (mapType[i].name == city) {
              dataId = mapType[i].id.substring(0, 2);
              $.getJSON(uploadedDataURL + dataId + ".json", function(geoJson) {
                _this.$echarts.registerMap(dataId, geoJson);
                option.geo.map = dataId;
                myChart.setOption(option, true);
                //更新地图数据
                _this.chartObjOption = option;
                _this.mapTitle = city;
                _this.getMapData(city);
              });

              break;
            }
          }

    },
    GetCarrDetail(Guid, address, TenanName, Car) {
      let self = this;
      let url = "/api/csxj/mftenantlic";
      let data = {
        TenantGuid: Guid,
        pageSize: 99999
      };
      self.axios.post(url, data, this.apiUrls.yaoqiURL).then(function(res) {
        let to = 0;
        for (let i = 0; i < res.total; i++) {
          if (
            res.datas[i].PictContent &&
            res.datas[i].PictContent != "[]" &&
            res.datas[i].PictContent != "null"
          ) {
            to++;
          }
        }
        self.company.CarImg = res.datas;
        self.company.CarImgeNumber = to;
        self.company.address = address;
        self.company.TenanName = TenanName;
        self.company.Car = Car;
      });

      let url2 = "/api/csxj/mftransroute";
      self.axios.post(url2, data, this.apiUrls.yaoqiURL).then(function(res) {
        self.company.Routes = res.datas;
        self.company.CarNumber = res.total;
      });
    },
    RadioAfun(txt) {
      if (txt == "A") {
        txt = txt;
      } else if (txt == "AA") {
        txt = "2A";
      } else if (txt == "AAA") {
        txt = "3A";
      } else if (txt == "AAAA") {
        txt = "4A";
      } else if (txt == "AAAAA") {
        txt = "5A";
      }
      this.grade = txt;
    },
    deleteGet(vlaues) {
      if (vlaues == "1") {
        this.Venue = "";
      } else if (vlaues == "2") {
        this.chineseName = "";
      } else {
        this.Venue = "";
        this.chineseName = "";
      }

      this.getCarrData();
    },
    resetValf() {
      this.showLoginDia = false;
    },
    showLogin() {
      this.showLoginDia = true;
    }
  },
  computed: {
    loginUrl() {
      //更多按钮的点击，登录后跳转回来
      return `${this.apiUrls.loginUrl.baseURL}NavigateValue=${location.href}`;
    }
  }
};
</script>
