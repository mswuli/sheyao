<template>
  <div style="height: 100%;">
    <div class="wrapper">
      <div class="header">
        <a href="" class="logo">
          <img src="@/assets/images/visualization/logo.png" alt="医药四方云">
        </a>
        <h2>上海佳吉快运有限公司</h2>
      </div>
      <div class="container">
        <div class="container-left">
          <!-- 涉药运输服务能力 -->
          <div class="service-capability">
            <h2 class="part-title"><p>涉药运输服务能力</p><i></i></h2>
            <div class="part-content">
              <h3>医药客户 <b>{{ ability.total }}</b> 家</h3>
              <dl>
                <dd class="max-text">
                  <span>分拨中心</span><b>{{ ability.center }}</b><em>家</em>
                </dd>
                <dd class="max-text">
                  <span>物流网点</span><b>{{ ability.outlet }}</b><em>家</em>
                </dd>
              </dl>
              <dl>
                <dd class="max-text">
                  <span>自有运营车辆</span><b>{{ ability.vehicle }}</b><em>辆</em>
                </dd>
                <dd class="min-text">
                  <span>冷藏车</span><b>{{ ability.truck }}</b><em>辆</em>
                </dd>
              </dl>
              <dl>
                <!--<dd class="max-text">-->
                  <!--<span>累计货量</span><b>{{ ability.volume }}</b><em>万件</em>-->
                <!--</dd>-->
                <dd class="max-text">
                  <span>医药货量</span><b>{{ ability.medicine }}</b><em>万件</em>
                </dd>
                <dd class="min-text">
                  <p>货物包含药品、医疗耗材、医疗器械</p>
                </dd>
              </dl>
              <dl>
                <dd class="max-text">
                  <span>年配送货值</span><b>＞{{ ability.value }}</b><em>亿元</em>
                </dd>
                <dd class="max-text">
                  <span>年物流业务收入</span><b>{{ ability.income }}</b><em>亿元</em>
                </dd>
              </dl>
            </div>
          </div>
          <div class="spacing-h"></div>
          <!-- 优势线路 -->
          <div class="advantage-line">
            <h2 class="part-title"><p>优势线路</p><i></i></h2>
            <div class="part-content">
              <echarts-pie v-bind:piedata="advantageData"></echarts-pie>
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
            <echarts-map></echarts-map>
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
            <h2 class="part-title"><p>涉药运输服务质量</p><i></i></h2>
            <div class="part-content">
              <div class="score">
                <p>涉药运输评级<b>待评定</b></p>
              </div>
              <echarts-line></echarts-line>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <p> Copyright © 2006-2015 深圳传世般若科技有限公司 </p>
      </div>
    </div>
  </div>
</template>
<script>
  import echartsPie from './echarts/pie.vue';
  import echartsLine from './echarts/line.vue';
  import echartsMap from './echarts/map.vue';

  import Swiper from "swiper";

  export default {
    components: {echartsPie, echartsLine, echartsMap},
    data() {
      return {
        ability: {
          total: 1460,
          center: 69,
          outlet: '2,501',
          vehicle: '7,908',
          truck: 0,
          volume: '2,215',
          medicine: '2,215',
          value: 160,
          income: 3.8
        },
        advantageData: {},
        interprovincials: [],
        intercities: [],
        samecities: [],
        tabsnumber: '1',
        swiperLoaded: false
      }
    },
    mounted() {
      this.getAdvantageLine();
      this.getTrunkData('1');
    },
    computed: {
      JiajiUrl() {
        return `${this.apiUrls.jiajiUrl.baseURL}`;
      }
    },
    methods: {
      getAdvantageLine() {
        const self = this;
        this.$http
          .get(self.JiajiUrl + "/api/enterprise/getlinedata?guid=20181010150908090001,20181010151304750001,20181010151613920001,20181010154311020001,20181010154559430001,20181011182723600001")
          .then(function (rs) {
            self.advantageData = rs.Data;
          });
      },
      getTrunkData(val) {
        const self = this;
        let routetype = val;
        self.tabsnumber = val;
        let pageindex = 1;
        let pagesize = 50;

        this.$http
          .get(self.JiajiUrl + "/api/enterprise/getlineinfo?guid=20181010150908090001,20181010151304750001,20181010151613920001,20181010154311020001,20181010154559430001,20181011182723600001&RouteType=" + routetype + "&PageIndex=" + pageindex + "&PageSize=" + pagesize)
          .then(function (rs) {
            self.interprovincials = rs.Datas;
            self.intercities = rs.Datas;
            self.samecities = rs.Datas;

            if(!self.swiperLoaded){
              self.$nextTick(function () {
                new Swiper(".swiper-container", {
                  loop: true,
                  slidesPerView: 4,
                  slidesPerGroup: 1,
                  autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                  },
                  direction: "vertical"
                });
              });
              self.swiperLoaded = true;
            }
          })
      }
    }
  }
</script>
<style scoped>
  b{
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
    content: '';
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
    /*font-size: 21px;*/
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
    content: '';
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
    background: rgba(255, 255, 255, .05);
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
    /*height: 20%;*/
    height: 21.25%;
    border-bottom: 1px solid #44878c;
  }

  /*.service-capability dl:nth-child(4) {*/
    /*height: 25%;*/
  /*}*/

  /*.service-capability dl:nth-child(4) dd {*/
    /*height: 33.3%;*/
  /*}*/

  .service-capability dl:last-child {
    border-bottom: 0;
  }

  .service-capability dd {
    display: flex;
    color: #fff;
    padding: 0 5% 0 3%;
    /*line-height: 32px;*/
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
    flex: .5;
    text-align: right;
  }

  /*.service-capability dd.max-text,*/
  /*.service-capability dd.min-text b{*/
  /*font-size: 36px;*/
  /*}*/
  /*.service-capability dd.max-text b{*/
  /*font-size: 48px;*/
  /*}*/
  /*.service-capability dd.min-text{*/
  /*font-size: 30px;*/
  /*}*/

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
    border-top: 1px solid rgba(79, 161, 164, .2);
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
    /*font-size: 36px;*/
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
</style>
