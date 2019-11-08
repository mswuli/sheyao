<template>
<div>
  <c-menu name="4"></c-menu>
  <div class="inner-banner">
    <img src="../assets/images/banner-warehouse.jpg" alt="">
  </div>
  <div class="capacity-wrap inner-wrap">
    <Tabs :animated="false" v-model="currentTabValue">
      <!-- <TabPane label="找药仓" name="tab1">
        <div class="capacity-content">
          <div class="search-box">
            <div class="search-box-row">
              <Row :gutter="16">
                <Col span="6">
                <div class="text-input displayflex">
                  <span class="prepend">仓储商名称</span>
                  <div class="flex1">
                    <input type="text" v-model="searchObject.ChineseName">
                  </div>
                </div>
                </Col>
                <Col span="6">
                <div class="text-input displayflex">
                  <span class="prepend">所在地</span>
                  <div class="flex1">
                    <Cascader :data="nationalData" @on-change='venue' trigger="hover" ></Cascader>
                  </div>
                </div>
                </Col>
                <Col span="6">
                <div class="text-input displayflex">
                  <span class="prepend">请输入面积</span>
                  <div class="flex1">
                    <input type="text" v-model="searchObject.MinTotalAreaAge">
                  </div>
                  <span class="append">m²</span>
                </div>
                </Col>
                <Col span="6" class="text-right">
                <button @click="searchWareHouse" class="search-btn"><Icon type="ios-search" />查询</button>
                </Col>
              </Row>
            </div>
          </div>
          // <div class="screening-result">
          //  <b>全部</b>
          //  <span>湖北<i>×</i></span>
          //  <span>武汉七曜<i>×</i></span>
          // </div>
          <div class="city-search-wrap">
            // 位置
            <dl class="city-search displayflex">
              <dt class="flexitem">位置：</dt>
              <dd class="flex1">
                <a @click="searchBox('Province','')" :class='{active:search.Province==""}'>不限</a>
                <a v-for="item in areaGroupSum"  :class='{active:search.Province==item.provinceCode}'
                   @click='searchBox("Province", item.provinceCode)'>{{item.name}}<i>{{item.count}}</i>家</a>
              </dd>
            </dl>
            // 类型
            <dl class="city-search displayflex">
              <dt class="flexitem">类型：</dt>
              <dd class="flex1">
                <a @click='searchBox("StorageType", "")' :class='{active:search.StorageType==""}'>不限</a>
                <a @click='searchBox("StorageType", "01")' :class='{active:search.StorageType=="01"}'>普通仓</a>
                // <a @click='searchBox("StorageType", "02")' :class='{active:search.StorageType=="02"}'>冷藏仓</a>
                <a @click='searchBox("StorageType", "03")' :class='{active:search.StorageType=="03"}'>阴凉仓</a>
              </dd>
            </dl>
            // 库型
            <dl class="city-search displayflex" style="display:none;">
              <dt class="flexitem">库型：</dt>
              <dd class="flex1">
                <a @click='searchBox("WareHouseType", "")' :class='{active:search.WareHouseType==""}'>不限</a>
                <a @click='searchBox("WareHouseType", "01")' :class='{active:search.WareHouseType=="01"}'>平库</a>
                <a @click='searchBox("WareHouseType", "02")' :class='{active:search.WareHouseType=="02"}'>楼库</a>
                <a @click='searchBox("WareHouseType", "03")' :class='{active:search.WareHouseType=="03"}'>立体库</a>
              </dd>
            </dl>
            // 面积
            <dl class="city-search displayflex">
              <dt class="flexitem">面积：</dt>
              <dd class="flex1">
                <a @click='searchBox("TotalAreaAge", "")' :class='{active:search.TotalAreaAge==""}'>不限</a>
                <a @click='searchBox("TotalAreaAge", "1")' :class='{active:search.TotalAreaAge=="1"}'>≤1000平米</a>
                <a @click='searchBox("TotalAreaAge", "2")' :class='{active:search.TotalAreaAge=="2"}'>1000-5000平米</a>
                <a @click='searchBox("TotalAreaAge", "3")' :class='{active:search.TotalAreaAge=="3"}'>5000-10000平米</a>
                <a @click='searchBox("TotalAreaAge", "4")' :class='{active:search.TotalAreaAge=="4"}'>10000-20000平米</a>
                <a @click='searchBox("TotalAreaAge", "5")' :class='{active:search.TotalAreaAge=="5"}'>≥20000平米</a>
              </dd>
            </dl>
            // 月台
            <dl class="city-search displayflex">
              <dt class="flexitem">月台：</dt>
              <dd class="flex1">
                <a @click='searchBox("Platform", "")' :class='{active:search.Platform==""}'>不限</a>
                <a @click='searchBox("Platform", "1")' :class='{active:search.Platform=="1"}'>无月台</a>
                <a @click='searchBox("Platform", "2")' :class='{active:search.Platform=="2"}'>单面月台</a>
                <a @click='searchBox("Platform", "3")' :class='{active:search.Platform=="3"}'>双面月台</a>
              </dd>
            </dl>
            // 租金
            <dl class="city-search displayflex">
              <dt class="flexitem">租金：</dt>
              <dd class="flex1">
                <a @click='searchBox("LeasingPrice", "")' :class='{active:search.LeasingPrice==""}'>不限</a>
                <a @click='searchBox("LeasingPrice", "1")' :class='{active:search.LeasingPrice=="1"}'>≤15元/㎡/月</a>
                <a @click='searchBox("LeasingPrice", "2")' :class='{active:search.LeasingPrice=="2"}'>15-20元/㎡/月</a>
                <a @click='searchBox("LeasingPrice", "3")' :class='{active:search.LeasingPrice=="3"}'>20-25元/㎡/月</a>
                <a @click='searchBox("LeasingPrice", "4")' :class='{active:search.LeasingPrice=="4"}'>25-30元/㎡/月</a>
                <a @click='searchBox("LeasingPrice", "5")' :class='{active:search.LeasingPrice=="5"}'>≥30元/㎡/月</a>
              </dd>
            </dl>
          </div>
          <div class="list-count">全国共<i>{{national.member}}</i>家</div>

          // 列表 start
          <div class="recommend-list-wrap">
            <dl class="recommend-list" v-for='item in list'>
              <dt class="recommend-img rela-img">
                <img v-if='item.path!="" && item.path!="[]"' :src="getImages(item.path)">
                <img v-else src="../assets/images/default-img.png">
              </dt>
              <dd class="recommend-text displayflex">
                <div class="recommend-text-info flex1">
                  <h2>{{item.ChineseName}}</h2>
                  <p class="address"><i class="iconfont icon-address"></i>{{item.Venue}}</p>
                  <div class="progress-frame">
                    <span>信息完整度</span>
                    <div class="progress">
                      <div class="progress-bar" :style="{ 'width': getDataIntegrity(item) }"></div>
                    </div>
                    <div class="progress-value">{{getDataIntegrity(item)}}</div>
                  </div>
                  <p>总面积 <strong>{{item.TotalAreaAge}}</strong>㎡
                    <span v-if="item.StorageType =='02'"> · 仓库体积 <strong>{{item.TotalVolume}}</strong> m³</span></p>
                  <p>{{ item.WareHouseType | WareHouseType}}
                    | {{item.StorageType | StorageType}}
                    | {{item.Platform | Platform}}
                    | {{item.BuildingStructure | BuildingStructure}}
                    | {{item.FireFighting | FireFighting}}
                    | 层高 {{item.FloorHeight | FloorHeight}}</p>
                  <p>
                    <b><i class="empty">空</i>{{item.checked}}</b>
                  </p>
                </div>
                <div class="recommend-text-price flex1">
                  <ul>
                    <li><b class="red">¥ <strong>{{item.LeasingPrice == undefined ? '暂无':item.LeasingPrice}}</strong></b>  <i v-show="item.LeasingPrice != undefined">起 元/㎡/月</i></li>
                  </ul>
                </div>
                <div class="warehouse-btn">
                  <a @click="detailGo(item.GUID)"><Icon type="ios-search" />查看详情</a>
                </div>
              </dd>
            </dl>
          </div>

          <div class="list-more">
            <a>查看更多</a>
          </div>
        </div>
      </TabPane> -->
      <TabPane label="全国仓储网" name="tab2">
        <div class="capacity-content2">
          <div class="city-search-wrap">
            <span>全国共<i>{{national.member}}</i>座仓</span>
            <!-- // 位置 -->
            <dl class="city-search displayflex">
              <dt class="flexitem">位置：</dt>
              <dd class="flex1">
                <a @click="searchBox('CorpProvince','')" :class='{active:search.CorpProvince==""}'>不限</a>
                <a v-for="item in areaGroupSum"  :class='{active:search.CorpProvince==item.name}'
                   @click='searchBox("CorpProvince", item.name)'>{{item.name}}<i>{{item.count}}</i>座</a>
              </dd>
            </dl>
          </div>
          <!-- <div class="list-count">全国共<i>{{national.member}}</i>家</div> -->
          <div class="capacity-total">
            <!-- <span class="iconfont icon-member">仓储网成员<b>{{ national.member }}</b>家</span> -->
            <!-- <span class="iconfont icon-line">冷库<b>{{ national.coldStorage }}</b>m³</span> -->
            <span class="iconfont icon-warehouse">仓库总面积<b>{{ national.totalArea | amount }}</b>平米，其中冷库<b>{{ national.coldStorage | amount}}</b>立方米</span>
            <span class="iconfont icon-company">覆盖<b>{{ national.city | amount}}</b>个省份</span>
          </div>
          <div class="capacity-content2-main">
            <div class="capacity-content2-left">
              <table class="table" v-show="warehouseTable">
                <thead>
                  <tr>
                    <td>序号</td>
                    <td>公司名称</td>
                    <td>所属地</td>
                    <!-- <td>仓库总数</td> -->
                    <td>GSP仓库数</td>
                    <td>三方资格</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(capacity, index) in capacitys" :key="index">
                    <td>{{(index+1)+(search.PageIndex-1)*search.PageSize }}</td>
                    <td class="text-left">{{ capacity.name }}</td>
                    <td class="text-left">{{ capacity.venue }}</td>
                    <!-- <td><a @click="handleCapacity(capacity.tenantGuid)">{{ capacity.number }}个仓</a><span>{{capacity.area| amount}}平米</span></td> -->
                    <td><a @click="handleCapacity(capacity.tenantGuid)">{{ capacity.number }}座仓</a><span>{{capacity.area| amount}}平米</span></td>
                    <td>{{ capacity.TplFlag == 'Y' ? '有':'无' }}</td>
                    <!-- <td><a @click="handleCapacity(capacity.tenantGuid)">{{ capacity.number }}个仓</a></td>
                    <td>{{ capacity.area }}万平方米</td> -->
                  </tr>
                </tbody>
              </table>
              <div class="capacity-table-detail" v-show="tableCapacityDetail">
                <div class="title">
                  <b>{{tenantStoreDetial.corpName}}</b>
                  <a @click="handleBack"></a>
                </div>
                <div class="score displayflex">
                  <b class="flex1">自建 {{tenantStoreDetial.totalArea | amount}}平米</b>
                  <b class="flex1">租赁 {{tenantStoreDetial.totalArea | amount}}平米</b>
                  <b class="flex1">总计 {{tenantStoreDetial.totalArea | amount}}平米</b>
                </div>
                <div class="warehouse-table-detail-main">
                  <dl v-for="number in numbers">
                    <dt class="displayflex">
                        <p class="flex1">{{ number.city }}<i>{{ number.main }}</i></p>
                        <!-- <p class="flex1" v-show="number.area">{{ number.area | amount}}平米</p> -->
                        <p class="flex1" v-show="number.kind">{{ number.kind }}个品种</p>
                        <p class="flex1" v-show="number.item">{{ number.item }}件</p>
                      </dt>
                    <dt class="displayflex text-left">{{ number.address }}</dt>
                    <dd class="displayflex">
                      <div class="flex1">
                        <p>{{ number.warehouse1 }}</p>
                        <p>{{ number.warehouse2 }}</p>
                        <p>{{ number.warehouse3 }}</p>
                      </div>
                      <div class="flex1">
                        <p v-show="number.area1">{{ number.area1 | amount}}平米</p>
                        <p v-show="number.area2">{{ number.area2 | amount}}立方米</p>
                        <p>{{ number.area3 }}</p>
                      </div>
                      <div class="flex1">
                        <p>{{ number.kind1 }}</p>
                        <p>{{ number.kind2 }}</p>
                        <p>{{ number.kind3 }}</p>
                      </div>
                      <div class="flex1">
                        <p>{{ number.item1 }}</p>
                        <p>{{ number.item2 }}</p>
                        <p>{{ number.item3 }}</p>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div v-if="$store.state.user.LoginType==false" class="list-more">
                <a :href="loginUrl">查看更多</a>
              </div>
              <div v-else>
                <Page show-total
                  :current="search.PageIndex"
                  :page-size="search.PageSize"
                  :total="search.total"
                  @on-change="getData"></Page>
              </div>
            </div>
            <div class="capacity-content2-right">
              <b style="cursor:pointer;" @click="drawLine(false)">{{mapTitle}}仓储分布</b>
              <div id="myChart"></div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</div>
</template>

<script>
import cmService from '@/service/warehouse'
import Cmenu from '@/components/common/menu.vue';
const checkProperties = [
  'LogCenterName', 'ChineseName', 'Contacts', 'ContactTel', 'WareHouseType',
  'TotalAreaAge', 'CanRentedArea', 'Minleasedrea', 'StorageType', 'LeasingPrice',
  'venue', 'Address', 'WarehouseIntroduction', 'Platform', 'BuildingStructure', 'FloorHeight',
  'FireFighting', 'ServiceRange', 'SecuritySystem', 'FireFightingSystem', 'GoodsCategory', 'PictContent', 'TotalVolume'
];
export default {
  components: {
    'c-menu': Cmenu
  },
  data() {
    return {
      // currentTabValue: 'tab1',
      currentTabValue: 'tab2',
      nationalData: this.$store.state.provinces,
      //Venue: "",
      //Province: "",
      //City: "",
      //District: "",
      search: {
        Province: "",//仓库所在省
				CorpProvince: "",//公司所在省
				City: "",
        District: "",
				StorageType: "",
				WareHouseType: "",
				Platform: "",
				FireFighting: "",
				BuildingStructure: "",
				LeasingPrice: "",
				TotalAreaAge: "",
				minFloorHeight: 0,
				maxFloorHeight: 0,
				PageIndex: 1,
				PageSize: 7,
				total: 0
			},
      city: [
        {
          value: 'beijing',
          label: '北京',
          children: [{
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [{
              value: 'nanjing',
              label: '南京',
              children: [{
                value: 'fuzimiao',
                label: '夫子庙',
              }]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [{
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ]
        }
      ],
      capacitys: [
        {
          name: '',
          number: '',
          area: ''
        }
      ],
      national: {
        member: '',
        coldStorage: '',
        totalArea: '',
        city: ''
      },
      tableCapacityDetail: false,
      warehouseTable: true,
      company: {
        address: '湖北-武汉',
        car: '25',
        line: '5',
        photo: '5'
      },
      numbers: [
        {
          city: '西安仓',
          main: '主仓',
          area: '1',
          kind: '5230',
          item: '2488903',
          address: '地址：XX区XX大道XX路XX号',
          warehouse1: '阴凉库',
          warehouse2: '冷藏库',
          warehouse3: '周转率',
          area1: '0.7',
          area2: '0.3',
          area3: '1.61',
          kind1: '5000',
          kind2: '230',
          item1: '2483213',
          item2: '5690'
        }, {
          city: '榆林仓',
          area: '0.5',
          kind: '3000',
          item: '1483213',
          address: '地址：XX区XX大道XX路XX号',
          warehouse1: '阴凉库',
          warehouse3: '周转率',
          area1: '0.7',
          area3: '1.61',
          kind1: '5000',
          item1: '2483213'
        }, {
          city: '榆林仓',
          area: '0.5',
          kind: '3000',
          item: '1483213',
          address: '地址：XX区XX大道XX路XX号',
          warehouse1: '阴凉库',
          warehouse3: '周转率',
          area1: '0.7',
          area3: '1.61',
          kind1: '5000',
          item1: '2483213'
        }
      ],
      searchObject:{
        Province: "",
        ChineseName: null,
        MinTotalAreaAge: null,
        CityAreaName: null
      },
      list: [],
      chartObj: null,
      chartObjOption: null,
      mapTitle: "全国",
      areaGroupSum:[],
      tenantGroup: null,
      tenantStoreDetial: {
        corpName: '',
        totalArea: ''
      },
      fistLoad: true
    }
  },
  mounted() {
    this.getData();
    this.drawLine(true);

    this.$store.commit('navIndex', 4);
  },
  methods: {
    getImages(pict){
      if (pict) {
        const images = JSON.parse(pict);
        if(!images.length){
          return false;
        }
        const firstImg = images.find(c => c);

        if (firstImg) {
          return this.imgurl.cangm + (firstImg.original || {}).url;
        }
      }
      return false;
    },
    venue(val, txt) {
      //this.Venue = txt.map(c => c.label).join("/");
      this.search.Province = val[0] == undefined ? "" : val[0];
      this.search.City = val[1] == undefined ? "" : val[1];
      this.search.District = val[2] == undefined ? "" : val[2];
    },
    //查询按钮事件
    searchWareHouse () {
      let self = this;
      self.list = [];
      self.getData();
    },
    //仓库类型查询
    searchBox: function(propName, value) {
      let self = this;
      if(propName){
			  this.search[propName] = value;
        self.list = [];
      }

      this.getData();
      this.getProviceMap(value);
      return false;
    },
    /*tab1 找药仓 列表数据 ,mounted初始里调用，点击界面条件时调用 */
    getData: function(pageNo) {
			var self = this;
      self.handleBack();
      this.search = Object.assign(self.searchObject,this.search);
      this.search.PageIndex = pageNo || 1;
      let url = "/api/csxj/warehousesum";
      this.axios.post(url, self.searchObject, this.apiUrls.yaoqiURL)
      .then(function (d) {

        self.search.total = d.total;
        /*全国仓储网列表*/
        self.capacitys = [];
        for(let t of d.datas){
          self.capacitys.push({
            tenantGuid: t.CorpGuid,
            name: t.CorpName,
            venue: t.CorpProvince + t.CorpCity,
            area: t.TotalAreaAge,
            number: t.Store,
            TplFlag: t.TplFlag
          });
        }//end for


        if(self.$route.params.guid){
          if(self.$route.params.guid != 'null'){
            if(self.fistLoad){
              self.handleCapacity(self.$route.params.guid);
              self.fistLoad = false
            }
          }
        }
      });
		},
    getProviceMap(cityname){
      if (cityname==''){
        this.mapTitle = '全国';
        this.drawLine(true);
        return;
      }

      var myChart = this.$echarts.init(document.getElementById('myChart'));
      this.chartObj = myChart;

      // 绘制图表
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            // console.log(params, 2)
            return params.name + '<br>仓库数量：' + params.value[2] + '座' + '<br>' + '仓库总面积：' + params.value[3] + 'm²<br>' + '冷库体积：' + params.value[4] + 'm³';
          }
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#e2d5c4',
              borderColor: '#cfc3bc'
            },
            emphasis: {
              areaColor: '#f4dbba'
            }
          }
        },
        series: [{
          name: '公司情况',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [],
          symbolSize: function(val) {
            return 5;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
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
              color: '#4fa1a4',
              shadowBlur: 10,
              shadowColor: '#4fa1a4'
            }
          },
          zlevel: 1
        }]
      };
      var _this = this;
      var chinaData = '/static/mapdata/china.json'
      $.getJSON(chinaData, function(geoJson) {
        _this.$echarts.registerMap('china', geoJson);
        myChart.setOption(option);

        _this.chartObjOption = option;
        _this.getMapData(null);
      });

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
        var value = {
          name: city,
          id: cityMap[city]
        }
        mapType.push(value);
      }

      var city = cityname;
        var dataId;
        var uploadedDataURL = "/static/mapdata/geometryProvince/";
        aaa();

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
                _this.getMapData(mapType[i].id);
              });
              break;
            }
          };
        }

    },
    detailGo(guid) {
      this.$router.push(`/warehouseDetail/` + guid);
    },
    getDataIntegrity(val) {
      return (checkProperties.filter(c => val[c] && val[c].length > 0).length / checkProperties.length * 100).toFixed(0) + '%';
    },
    handleCapacity(tenantGuid) {
      let self = this;
      if(!self.tenantGroup){
        return;
      }
      if(self.tenantGroup[tenantGuid]){
        self.tenantStoreDetial.corpName = self.tenantGroup[tenantGuid].name;
        self.tenantStoreDetial.totalArea = self.tenantGroup[tenantGuid].totalArea;

        self.numbers = [];
        for(let item of self.tenantGroup[tenantGuid].store){
          let wh = JSON.parse(item);
          let info = {
            city: wh.ChineseName,
            area: wh.TotalAreaAge,
            kind: wh.VarietiesCount,//品种数
            item: wh.PKGS,//件数
            address: '地址: ' + wh.Address
          };

          switch (wh.StorageType){
            case "03":
            case "04":
              info.warehouse2 = '冷藏库';
              info.area2 = wh.TotalVolume;
              break;
            case "01":
              info.warehouse1 = '常温库';
              info.area1 = wh.TotalAreaAge;
              break;
          }
          self.numbers.push(info);
        }//end for
        this.tableCapacityDetail = true;
        this.warehouseTable = false;
      }
      //this.tableCapacityDetail = !this.tableCapacityDetail
    },
    handleBack() {
      this.tableCapacityDetail = false;
      this.warehouseTable = true;
    },
    drawLine(isFirstLoad) {
      if (!isFirstLoad) {
        if (this.mapTitle == "全国") {
          return;
        } else {
          this.mapTitle = "全国";
        }
      }
      var myChart = this.$echarts.init(document.getElementById('myChart'));
      this.chartObj = myChart;

      // 绘制图表
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + '<br>仓库数量：' + params.value[2] + '座' + '<br>' + '仓库总面积：' + params.value[3] + 'm²<br>' + '冷库体积：' + params.value[4] + 'm³';
          }
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#e2d5c4',
              borderColor: '#cfc3bc'
            },
            emphasis: {
              areaColor: '#f4dbba'
            }
          }
        },
        series: [{
          name: '公司情况',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [],
          symbolSize: function(val) {
            return 5;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
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
              color: '#4fa1a4',
              shadowBlur: 10,
              shadowColor: '#4fa1a4'
            }
          },
          zlevel: 1
        }]
      };
      var _this = this;
      var chinaData = '/static/mapdata/china.json'
      $.getJSON(chinaData, function(geoJson) {
        _this.$echarts.registerMap('china', geoJson);
        myChart.setOption(option);

        _this.chartObjOption = option;
        _this.getMapData(null);
      });

      var cityMap = {
        "北京": "110000",
        "天津": "120000",
        "河北": "130000",
        "山西": "140000",
        "内蒙古": "150000",

        "辽宁": "210000",
        "吉林": "220000",
        "黑龙江": "230000",

        "上海": "310000",
        "江苏": "320000",
        "浙江": "330000",
        "安徽": "340000",
        "福建": "350000",
        "江西": "360000",
        "山东": "370000",

        "河南": "410000",
        "湖北": "420000",
        "湖南": "430000",
        "广东": "440000",
        "广西": "450000",
        "海南": "460000",

        "重庆": "500000",
        "四川": "510000",
        "贵州": "520000",
        "云南": "530000",
        "西藏": "540000",

        "陕西": "610000",
        "甘肃": "620000",
        "青海": "630000",
        "宁夏": "640000",
        "新疆": "650000"
      };
      var mapType = [];
      for (var city in cityMap) {
        var value = {
          name: city,
          id: cityMap[city]
        }
        mapType.push(value);
      }
      myChart.on('click', function(params) {
        var city = params.name;
        var dataId;
        var uploadedDataURL = "/static/mapdata/geometryProvince/";
        if (params.seriesType == 'effectScatter') {
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
                _this.getMapData(mapType[i].id);
              });
              break;
            }
          };
        }
      });
    },
    /*tab2 地图上面的数据请求与组织*/
    getMapData(provinceCode) {

      let self = this;
      //let url = "api/warehouse/search";
      let url = "/api/csxj/warehousealliance";
      let data = {PageIndex: 1, PageSize: 2000};
      this.axios.post(url, data, this.apiUrls.yaoqiURL).then(d => {

        let tenant = self.groupByCorp(d.datas);
        self.tenantGroup = tenant;

        let groupData = self.group(d.datas, provinceCode);//数据分组计算
        if (provinceCode == null){
          //找药仓-位置
          let provinceArr = [];
          for(let p in groupData){
            provinceArr.push({name:p, count:groupData[p].count,provinceCode: groupData[p].provinceCode});
          }
          self.national.city = provinceArr.length;

          self.areaGroupSum = provinceArr;
        }

        self.GetWareHouseData(d.datas);

        /*获取区域坐标，并更新地图*/
        self.getCoordinate(groupData).then((res)=>{
          //地图运力分布数据
          self.chartObjOption.series[0].data = res;

          self.chartObj.setOption(self.chartObjOption, true);

        });
      });
    },
    /*tab2 表格数据的请求与组织*/
    GetWareHouseData(data) {
      let self = this;
        self.national.member = data.length || 0; //总仓储家数
        //self.national.city = self.cityTotal(data);//覆盖城市

        //冷库总体积
        let coldSum = data.reduce( (accumulator, currentValue) => {
          return accumulator + (currentValue.TotalVolume ? currentValue.TotalVolume : 0) ;
        },0);
        self.national.coldStorage = coldSum;

        //仓库总面积
        let sum = data.reduce( (accumulator, currentValue) =>{
          return accumulator + currentValue.TotalAreaAge;
        },0);
        self.national.totalArea = sum;
    },
      /*对仓库数据进行统计*/
    group (data, areaCode) {
      let dist = {};
      data.map((item) => {
        if (item.CityAreaName) {
          if (areaCode) {
            if (item['Province'] != areaCode) {
              return;
            }
          }

          let citys = item.CityAreaName.split('/');

          var area = citys[areaCode ? 1 : 0];
          if (dist[area]) {
            dist[area].count += 1;
            dist[area].area += item.TotalAreaAge;
            dist[area].volume += item.TotalVolume;
          } else {
            dist[area] = {count: 1 ,provinceCode:item.Province,area: item.TotalAreaAge, volume: 0};
          }
        }
      });
      return dist;
    },
    /*按区域统计数量*/
    cityTotal (data, areaCode) {
      let dist = {};
      let cityDistinct = 0;
      data.map((item) => {
        if (item.Province) {

          let area = item.Province;//citys[1];
          if (dist[area]) {
            dist[area] += 1;
          } else {
            dist[area] = 1;
            cityDistinct += 1;
          }
        }
      });
      return cityDistinct;
    },
    /*将数据按会员进行分组*/
    groupByCorp (data) {
      let dist = {};
      data.map((item) => {

        let CorpGuid = item.CorpGuid;

        if(item.CorpName){
          if (dist[CorpGuid]) {
            dist[CorpGuid].warehouseCount += 1;
            dist[CorpGuid].totalArea += item.StorageType == '03' ? item.TotalVolume : item.TotalAreaAge;
            dist[CorpGuid].store.push(JSON.stringify(item));
          } else {
            dist[CorpGuid] = {
              name: item.CorpName,
              warehouseCount: 1,
              totalArea: item.StorageType == '03' || item.StorageType == '04' ? item.TotalVolume : item.TotalAreaAge,
              store:[JSON.stringify(item)],
              venue: item.CityAreaName,
              TplFlag: item.TplFlag
            };
          }
        }

      });

      return dist;
    },

    async getCoordinate  (result) {
      let data = [];
      const axios = require('axios');

      for (let key in result) {
        if (!key) {
          continue;
        }
        // console.log(result,1);
        let cachInfo = this.getCacheCityCoord(key);
        if (cachInfo && cachInfo.length) {
          data.push({
            name: key,
            value: cachInfo.concat([result[key].count]).concat([result[key].area,result[key].volume]),
          });
        }else{
          await axios.get("https://api3.cs4pl.com:9443/api/BaiduMap/Position/" + key).then(d => {

            let coord = [parseFloat(d.lng),parseFloat(d.lat)];
            localStorage.setItem(key, JSON.stringify(coord));
            data.push({
              name: key,
              value: coord.concat([result[key].count]).concat([result[key].area,result[key].volume]),
            });
          });//end ajax
        }// end if
      }
      return  data;
    },
    getCacheCityCoord(areaName) {
      if(localStorage.getItem(areaName)){

        return JSON.parse(localStorage.getItem(areaName));
        //let coord = [parseFloat(cache.lng),parseFloat(cache.lat)];
        //return coord;
      }
      return false
    }
  },
  computed: {
    loginUrl() {
      return `${this.apiUrls.loginUrl.baseURL}NavigateValue=${location.href}`;
    }
  },
  created() {

    let self = this;
    if(this.$route.params.guid){
      if(this.$route.params.guid != 'null'){
        //this.currentTabValue = 'tab2';
        self.handleCapacity(this.$route.params.guid);
      }
    }
  },
  activated() {
		this.created();
	}
}
</script>
