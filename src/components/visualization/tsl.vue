<template>
  <div>
    <div class="tsl-wrapper">
      <h2 class="tsl-title">陕西医药集散中心（陕西天士力医药物流中心）</h2>
      <div class="tsl-content">
        <div class="tsl-left">
          <div class="tsl-left_top tsl-con">
            <div class="tsl-con_bg"></div>
            <div class="tsl-con_title">仓库总体使用情况</div>
            <div id="OverallWarehouse"></div>
          </div>
          <div class="tsl-left_bottom tsl-con">
            <div class="tsl-con_bg"></div>
            <div class="tsl-con_title">仓配基本能力</div>
            <div class="warehouse-ability">
              <h3>上游委托企业<b class="blue">30</b>家</h3>
              <h3>下游客户<b class="blue">1.3</b>万家</h3>
              <dl>
                <dt>仓储能力</dt>
                <dd v-for="(item, index) in warehouse" :key="index">
                  <span>{{ item.title }}</span>
                  <p><b class="blue">{{ item.number }}</b>{{ item.unit }}</p>
                </dd>
              </dl>
              <dl>
                <dt>集散能力</dt>
                <dd v-for="(item, index) in distribution" :key="index">
                  <span>{{ item.title }}</span>
                  <p><b class="blue">{{ item.number }}</b>{{ item.unit }}</p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="tsl-right">
          <div class="tsl-right_top">
            <div class="tsl-right_top1 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">仓库存储能力</div>
              <div class="StorageWarehouse-group">
                <div id="StorageWarehouse"></div>
              </div>
            </div>
            <div class="tsl-right_top2 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">季度库容平均使用率</div>
              <div id="QuarterlyInventory"></div>
            </div>
          </div>
          <div class="tsl-right_middle">
            <div class="tsl-right_middle1 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">处理中订单分布一览</div>
              <div id="ProcessingOrder" style="width: 100%; height: 24.05vh"></div>
            </div>
            <div class="tsl-right_middle2 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">配送时长占比</div>
              <div id="DeliveryTime" style="width: 95%; height: 24.05vh"></div>
            </div>
            <div class="tsl-right_middle3 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">回单情况<i class="unit">单位：单</i></div>
              <div id="ReturnOrder" style="width: 100%; height: 24.55vh"></div>
            </div>
          </div>
          <div class="tsl-right_bottom">
            <div class="tsl-right_bottom1 tsl-con">
              <div class="tsl-con_bg"></div>
              <div class="tsl-con_title">服务质量KPI</div>
              <div id="ServiceQuality" style="width: 100%; height: 27.1vh"></div>
            </div>
            <div class="tsl-right_bottom2 tsl-con">
              <div class="tsl-con_bg"></div>
              <!-- 温湿度监控/云设备监控 -->
              <div class="tsl-swiper">
                <div class="tsl-con_title">{{ stypeSwiperTitle }}</div>
                  <div class="swiper-container">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide" v-for="(item, index) in showArray">
                        <img :src="item.imgUrl">
                        <p><b :class="item.color">{{ item.number }}</b>次</p>
                      </div>
                    </div>
                    <div class="swiper-pagination swiper-pagination1"></div>
                    <div class="swiper-button-prev" @click="onChangeSwiperGroup"></div>
                    <div class="swiper-button-next" @click="onChangeSwiperGroup"></div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import jQuery from "jquery";

export default {
  data() {
    return {
      stypeSwiperTitle: '温湿度监控',
      swiper:{},
      stype:1,
      swiperLoaded: false,
      imgArray: [
        {
          title:'当日累计异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title:'冷冻仓异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title:'冷藏仓异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title:'温度异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title:'阴凉异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }
      ],
      imgArray2: [
        {
          title: '当日累计异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title: '订单异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title: '设备异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }, {
          title: '系统接口异常',
          imgUrl: require('@/assets/images/tsl/icon2.png'),
          number: 0,
          color: 'green'
        }
      ],
      showArray:[],

      warehouse: [
        {
          title: "平均订单处理效率",
          unit: "分钟/单",
          number: 84
        },
        {
          title: "集散订单周转效率",
          unit: "分钟/单",
          number: 50
        },
        {
          title: "日出库订单数",
          unit: "单",
          number: 690
        },
        {
          title: "日入库订单数",
          unit: "单",
          number: 143
        },
        {
          title: "日出库件数",
          unit: "件",
          number: 5232
        },
        {
          title: "日入库件数",
          unit: "件",
          number: 5540
        }
      ],
      distribution: [
        {
          title: "医药货量(万件)/年",
          unit: "万件",
          number: 233.143
        },
        {
          title: "运营车辆",
          unit: "辆",
          number: 52
        },
        {
          title: "冷藏车",
          unit: "辆",
          number: 25
        },
        {
          title: "分拨中心",
          unit: "家",
          number: 0
        },
        {
          title: "网点数量(乡镇区域)",
          unit: "个",
          number: 0
        },
        {
          title: "辐射省份",
          unit: "个",
          number: 6
        },
        {
          title: "辐射城市",
          unit: "个",
          number: 89
        }
      ],
      Pie1: [
        { value: 126925, name: "已存放件数" },
        { value: 123075, name: "可存放件数" }
      ],
      barStyle: {
        toolTip: {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          },
          position: function(point, params, dom, rect, size){
            //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            var x = point[0];//
            var y = point[1];
            var viewWidth = size.viewSize[0];
            var viewHeight = size.viewSize[1];
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            var posX = 0;//x坐标位置
            var posY = 0;//y坐标位置
            
            if(x<boxWidth){//左边放不开
                posX = 5;    
            }else{//左边放的下
                posX = x-boxWidth; 
            }
            
            if(y<boxHeight){//上边放不开
                posY = 5; 
            }else{//上边放得下
                posY = y-boxHeight;
            }
            
            return [posX,posY];
          }
        },
        labelTop: {
          normal: {
            show: true,
            position: 'insideTop',
            color: '#fff'
          }
        },
        labelBottom: {
          normal: {
            show: true,
            position: 'outside',
            color: '#fff'
          }
        },
        whiteFont: {
          textStyle: {
            color: '#fff'
          }
        },
        nameWhiteFont: {
          color: '#fff'
        },
        lineColor: {
          lineStyle: {
            color: 'rgba(65, 207, 254, .15)'
          }
        },
        gridPosition: {
          top: '18%',
          left: '3%',
          right: '3%',
          bottom: '15%',
          containLabel: true
        }
      },
      StorageWarehouse: {
        value1: [6434, 11140, 128980, 6617, 0, 0, 33176, 0, 0],  //已用
        value11: [38.9, 77.3, 52.9, 66.2, 0, 0, 37.3, 0, 0],  //百分比
        value2: [16504, 14400, 253420, 9982, 6412, 0, 88900, 0, 0], //总量
      },
      QuarterlyInventory: {
        value: [138870, 149500, 142589, 126925],
        value2: [55.5, 59.8, 57.0, 50.7],
        total: [250000, 250000, 250000, 250000]
      },
      ReturnOrder: {
        value: [555, 597, 495],   // 已回单
        value2: [560, 603, 500]   // 应回单
      },
      deliveryTimeData: [
        {value: 9310, name:'24小时内送达'},
        {value: 410, name:'3日内送达'},
        {value: 201, name:'5日内送达'},
        {value: 79, name:'5日外送达'},
      ]
    };
  },
  mounted() {
    this.getEcharts();

    this.getSwiper(this.imgArray , 1);
  },
  methods: {
    getSwiper(data) {
      let self = this;
      this.showArray = data;
        
      if(Object.keys(this.swiper).length === 0){
        self.swiper = new Swiper('.swiper-container', {
          direction: "horizontal",
          loop: false,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + data[index].title + '</span>';
            },
          },
          on: {
            reachBeginning: function(){
              self.onChangeSwiperGroup();
            },
          },
          observer:true,
          observeParents:true,
        });
      }
    },

    onChangeSwiperGroup(){
      let self = this;

      if(self.stype == 1) {
        self.stype = 2;
        self.stypeSwiperTitle = '云设备监控';
        self.getSwiper(self.imgArray2);
      } else {
        self.stype = 1;
        self.stypeSwiperTitle = '温湿度监控';
        self.getSwiper(self.imgArray);
      }

      self.$nextTick(function(){
        self.swiper.updateSlides();
      });
    },

    // echarts图表集合
    getEcharts() {
      // 仓库总体使用情况
      let overallWarehouseChart = this.$echarts.init(document.getElementById("OverallWarehouse"));
      var percent = ((this.Pie1[1].value / 250000) * 100).toFixed(2) + '%';
      let optionPie = {
        title: {
          text: percent + '\n使用率',
          x: 'center',
          y: '33%',
          textStyle: {
            fontWeight: 'bold',
            color: '#fff',
            fontSize: window.screen.width > 1600 ? 18 : 16,
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          bottom: '0%',
          icon: "square",
          itemWidth: 10,
          itemHeight: 10,
          data: ["可存放件数", "已存放件数"],
          textStyle: {
            color: "#fff",
            fontSize: window.screen.width > 1600 ? 16 : 14,
          }
        },
        color: ['#ab85db', '#41cffe'],
        series: [
          {
            name: "仓库总体使用情况",
            type: "pie",
            radius: ["45%", "65%"],
            center: ["50%", "45%"],
            label: {
              normal: {
                show: true,
                formatter: ((x) => {
                  return (x.data.value/10000).toFixed(1) + '万件'
                }),
                textStyle: {
                  fontSize: window.screen.width > 1600 ? 16 : 13,
                  color: '#fff'
                }
              }
            },
            labelLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(65, 207, 254, .3)'
              },
              length: 7,
              length2: 4,
            },
            data: this.Pie1,
          }
        ]
      };
      overallWarehouseChart.setOption(optionPie, true);

      // 仓库存储能力
      let storageWarehouseChart = this.$echarts.init(document.getElementById("StorageWarehouse"));
      var self = this;
      let thousandValue1 = [];
      let thousandValue2 = [];
      this.StorageWarehouse.value1.forEach((x,index) => {
        x = (x / 10000).toFixed(1);
        thousandValue1.push(x)
      });
      this.StorageWarehouse.value2.forEach((x,index) => {
        x = (x / 10000).toFixed(1);
        thousandValue2.push(x)
      });
      let option = {
        tooltip: {
          show: true,
          tirgger: 'axis',
          formatter:((x) => {
            return `${x.name}<br>总容量：${thousandValue2[x.dataIndex]}万件<br>已用容量：${thousandValue1[x.dataIndex]}万件(${this.StorageWarehouse.value11[x.dataIndex]}%)`
          })
        },
        grid: {
          top: '18%',
          left: '0%',
          right: '0%',
          bottom: '10%',
          containLabel: true
        },
        xAxis:  {
          type: 'category',
          // offset: 10,
          data: ['零库','整库','立库','冷藏库','冷冻库','缓冲区','中药库','贵细库','原料库'],
          axisTick: false,
          axisLabel: this.barStyle.whiteFont,
          axisLine: this.barStyle.lineColor,
        },
        yAxis: [
          {
          show: false
        }
        ],
        series: [
          {
            name: '已用容量',
            type: 'bar',
            barWidth: window.screen.width > 1600 ? 25 : 20,
            itemStyle: {
              normal: {
                color: '#67dbff',
                borderWidth: 2,
                borderColor: 'transparent'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: ((x) => {
                  return thousandValue1[x.dataIndex];
                }),
                color: '#fff',
                position: 'top',
                fontSize: window.screen.width > 1600 ? 14 : 10
              }
            },
            data: this.StorageWarehouse.value11
          },
          {
            name: '已用容量',
            type: 'bar',
            barWidth: window.screen.width > 1600 ? 25 : 20,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#67dbff',
                borderWidth: 2,
                borderColor: 'transparent',
              }
            },
            label: {
              normal: {
                show: true,
                formatter: ((x) => {
                  if(x.value == 0){
                    return ''
                  }else{
                    return x.value + '%'
                  }
                }),
                color: '#fff',
                position: 'left',
                fontSize: window.screen.width > 1600 ? 14 : 10
              }
            },
            data: this.StorageWarehouse.value11
          },
          {
            name: '总容量',
            type: 'bar',
            barWidth: window.screen.width > 1600 ? 25 : 20,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: 'none',
                borderWidth: 1,
                borderColor: '#00c1de',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function(item) {
                  var val1 = thousandValue2[item.dataIndex];
                  var val2 = '万件';
                  return '{minFont|' + val1 + '} {maxFont|' + val2 + '}';
                },
                rich: {
                  minFont: {
                    fontSize: window.screen.width > 1600 ? 13 : 11,
                    color: '#fff'
                  },
                  maxFont: {
                    fontSize: window.screen.width > 1600 ? 14 : 12,
                    color: '#fff'
                  }
                },
              }
            },
            data: [100,100,100,100,100,100,100,100,100]
          }
        ]
      };
      storageWarehouseChart.setOption(option, true);

      // 季度库容平均使用率
      let quarterlyInventoryChart = this.$echarts.init(document.getElementById("QuarterlyInventory"));
      let thousand = [];
      this.QuarterlyInventory.value.forEach((x, index) => {
        x = (x / 10000).toFixed(1);
        thousand.push(x)
      });
      let QuarterTotal = [];
      this.QuarterlyInventory.total.forEach((x,index) => {
        x = (x / 10000).toFixed(1);
        QuarterTotal.push(x)
      });
      let option4 = {
        tooltip : {
          formatter:((x) => {
            return `${x.name}<br>折合件数：${(self.QuarterlyInventory.value[x.dataIndex]/10000).toFixed(1)}万件<br>仓库使用率：${this.QuarterlyInventory.value2[x.seriesIndex]}%`;
          })
        },
        grid: {
          top: '18%',
          left: '0%',
          right: '0%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Q1','Q2','Q3','Q4'],
            // offset: 10,
            axisTick: false,
            axisLabel: this.barStyle.whiteFont,
            axisLine: this.barStyle.lineColor
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value',
            name: '(万件)',
            nameGap: 8,
            splitLine: {show: false},
            axisTick: false,
            nameTextStyle: this.barStyle.nameWhiteFont,
            axisLabel: this.barStyle.whiteFont,
            axisLine: this.barStyle.lineColor
          },
          {
            show: false,
            type: 'value',
            name: '%',
            min: 0,
            max: 100,
            interval: 20,
            splitLine: {show: false},
            axisTick: false,
            nameTextStyle: this.barStyle.nameWhiteFont,
            axisLabel: this.barStyle.whiteFont,
            axisLine: this.barStyle.lineColor
          }
        ],
        series: [
          {
            name:'折合件数',
            type:'bar',
            barWidth: window.screen.width > 1600 ? 25 : 20,
            itemStyle: {
              color: '#5383ec'  
            },
            label: {
              normal: {
                show: 'true',
                formatter: '{c}',
                position: 'top',
                color: '#fff',
                fontSize: window.screen.width > 1600 ? 14 : 10,
                formatter: function(item) {
                  return (self.QuarterlyInventory.value[item.dataIndex]/10000).toFixed(1)
                }
              }  
            },
            data: this.QuarterlyInventory.value2
          },
          {
            name:'仓库使用率',
            type:'bar',
            yAxisIndex: 1,
            barWidth: window.screen.width > 1600 ? 25 : 20,
            barGap: '-100%',
            itemStyle: {
              color: '#67dbff'  
            },
            label: {
              normal: {
                show: 'true',
                formatter: '{c}%',
                position: 'left',
                color: '#fff',
                fontSize: window.screen.width > 1600 ? 14 : 10
              }  
            },
            data: this.QuarterlyInventory.value2
          },
          {
            name: '总容量',
            type: 'bar',
            barWidth: window.screen.width > 1600 ? 25 : 20,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: 'none',
                borderWidth: 1,
                borderColor: '#00c1de',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function(item) {
                  var val1 = QuarterTotal[item.dataIndex];
                  var val2 = '万件';
                  return '{minFont|' + val1 + '} {maxFont|' + val2 + '}';
                },
                rich: {
                  minFont: {
                    fontSize: window.screen.width > 1600 ? 13 : 11,
                    color: '#fff'
                  },
                  maxFont: {
                    fontSize: window.screen.width > 1600 ? 14 : 12,
                    color: '#fff'
                  }
                },
              }
            },
            data: [100,100,100,100]
          }
        ]
      };
      quarterlyInventoryChart.setOption(option4, true);

      // 处理中订单分布一览
      let ProcessingOrderChart = this.$echarts.init(document.getElementById("ProcessingOrder"));
      let option5 = {
        tooltip : this.barStyle.toolTip,
        grid: this.barStyle.gridPosition,
        xAxis: {
          data: ['待受理', '待调度', '待配送', '在途中', '待回单'],
          axisTick: false,
          axisLabel: this.barStyle.whiteFont,
          axisLine: this.barStyle.lineColor
        },
        yAxis: {
          name: "(单)",
          nameGap: 8,
          splitLine: {show: false},
          axisTick: false,
          nameTextStyle: this.barStyle.nameWhiteFont,
          axisLabel: this.barStyle.whiteFont,
          axisLine: this.barStyle.lineColor
        },
        series: [{
          type: 'bar',
            barWidth: window.screen.width > 1600 ? 25 : 18,
          itemStyle:{
            normal:{
              // color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //   offset: 0,
              //   color: '#d93a82'
              // }, {
              //   offset: 0.8,
              //   color: '#7ca2f5'
              // }], false)
              color: '#7ca2f5'
            }
          },
          label: this.barStyle.labelBottom,
          data: [37, 52, 391, 97, 101]
        }]
      };
      ProcessingOrderChart.setOption(option5, true);

      // 配送时长占比 
      let DeliveryTimeChart = this.$echarts.init(document.getElementById("DeliveryTime"));  
      let optionPie2 = {
        color: ['#5383ec', '#67dbff', '#ab85db', '#afdee4'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          right: 'right',
          top: 'middle',
          icon: 'square',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
            fontSize: window.screen.width > 1600 ? 14 : 12
          },
          data: ['24小时内送达','3日内送达','5日内送达','5日外送达']
        },
        series : [
          {
            name: '配送时长占比',
            type: 'pie',
            radius : '49%',
            center: ['35%', '50%'],
            label: {
              normal: {
                formatter: '{d}%',
                color: '#fff'
              }
            },
            labelLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(65, 207, 254, .3)'
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.deliveryTimeData,
          }
        ]
      };  
      DeliveryTimeChart.setOption(optionPie2, true);

      // 回单情况
      let BBPercent = [];
      this.ReturnOrder.value.forEach((x, i) => {
        let item = ((x / this.ReturnOrder.value2[i])*100).toFixed(1);
        BBPercent.push(item);
      })
      let ReturnOrderChart = this.$echarts.init(document.getElementById("ReturnOrder"));
      let option6 = {
        color: ['#67dbff'],
        tooltip : {
          show:true,
          formatter:((x) => {
            return `${x.name}<br>应回单：${this.ReturnOrder.value2[x.dataIndex]}单<br>已回单：${this.ReturnOrder.value[x.dataIndex]}单(${BBPercent[x.dataIndex]}%)`;
          })
        },
        grid: {
          top: '18%',
          left: '0%',
          right: '0%',
          bottom: '10%',
          containLabel: true
        },
        xAxis:  {
          type: 'category',
          data: ['9月','10月','11月'],
          axisTick: false,
          axisLabel: this.barStyle.whiteFont,
          axisLine: this.barStyle.lineColor
        },
        yAxis: {
          show: false,
          type: 'value',
          splitLine: {show: false},
          axisTick: false,
          splitNumber: 4,
          nameTextStyle: this.barStyle.nameWhiteFont,
          axisLabel: this.barStyle.whiteFont,
          axisLine: this.barStyle.lineColor
        },
        series: [
          {
            name: '已回单',
            type: 'bar',
            barWidth: '25px',
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                fontSize: window.screen.width > 1600 ? 14 : 12,
                formatter: function(item){
                  return ((self.ReturnOrder.value[item.dataIndex] / self.ReturnOrder.value2[item.dataIndex])*100).toFixed(0) + '%';
                },
                color: '#fff',
                position: 'left'
              }
            },
            data: BBPercent,
          },
          {
            name: '已回单',
            type: 'bar',
            barWidth: '25px',
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                position: 'insideTop',
                color: '#051620',
                fontSize: window.screen.width > 1600 ? 14 : 10,
                formatter: function(item) {
                  return self.ReturnOrder.value[item.dataIndex]
                }
              }
            },
            data: BBPercent
          },
          {
            name: '应回单',
            type: 'bar',
            barWidth: 25,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: 'none',
                borderWidth: 1,
                borderColor: '#00c1de',
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#fff',
                fontSize: window.screen.width > 1600 ? 14 : 10,
                formatter: function(item) {
                  return self.ReturnOrder.value2[item.dataIndex]
                }
              }
            },
            data: [100,100,100]
          },
        ]
      };

      ReturnOrderChart.setOption(option6, true);

      // 服务质量KPI
      let ServiceQualityChart = this.$echarts.init(document.getElementById("ServiceQuality"));
      var data_dongtai = [
        {
          name: "准时送达率",
          value: 98.23
        }, {
          name: "差错退回率",
          value: 0.03
        }, {
          name: "包装完好率",
          value: 98.52
        }, {
          name: "破损率",
          value: 0.50
        }
      ];
      var data_jingtai = [
        {
          name: "货物提取准时率",
          value: 99.19
        }, {
          name: "运输过程可追溯率",
          value: 100
        }, {
          name: "客户投诉率",
          value: 0.01
        }, {
          name: "冷链温控合格率",
          value: 100
        }
      ];
      var labelShow = {
        normal: {
          show: true,
          position: 'center',
          formatter: '{c}%',
          textStyle: {
            fontSize: 14
          },
          padding: [0, 0, 10]
        }
      };
      var labelHide = {
        normal: {
          color: '#252c45'
        },
        // emphasis: {
        //   color: 'rgba(0,0,0,0)'
        // }
      };
      var radius = window.screen.width > 1600 ? [45, 60] : [25, 40];

      var label_dongtai = [];
      for (var i = 0; i < data_dongtai.length; i++) {
        label_dongtai.push(data_dongtai[i].name);
      };
      var laebl_jingtai = [];
      for (var i = 0; i < data_jingtai.length; i++) {
        laebl_jingtai.push(data_jingtai[i].name);
      };
      let optionPie3 = {
        color: ['#67dbff', '#afdee4', '#5383ec', '#afdee4', '#5383ec', '#ab85db', '#afdee4', '#67dbff'],
        series: []
      };
      for (var i = 0; i < data_dongtai.length; i++) {
        optionPie3.series.push({
          type: 'pie',
          center: [15 + i * 25 + '%', '20%'],
          radius: radius,
          x: '0%',
          hoverAnimation: false,
          data: [{
            name: data_dongtai[i].name,
            value: 100 - data_dongtai[i].value,
            label: {
              show: true,
              formatter: function(item){
                return item.data.name
              },
              color: '#fff',
              fontSize: window.screen.width > 1600 ? 16 : 12,
              padding: window.screen.width > 1600 ? [170, 0, 0] : [120, 0, 0],
              position: 'center',
            },
            labelLine: {
              normal: {show: false},
              emphasis: {show: false}
            },
            itemStyle: labelHide
          }, {
            name: data_dongtai[i].name,
            value: data_dongtai[i].value,
            label: labelShow,
            labelLine: {show: false},
          }]
        });
      };
      for (var i = 0; i < data_jingtai.length; i++) {
        optionPie3.series.push({
          type: 'pie',
          center: [15 + i * 25 + '%', '70%'],
          radius: radius,
          x: '0%',
          hoverAnimation: false,
          data: [{
            name: data_jingtai[i].name,
            value: 100 - data_jingtai[i].value,
            label: {
              show: true,
              formatter: function(item){
                return item.data.name
              },
              color: '#fff',
              fontSize: window.screen.width > 1600 ? 16 : 12,
              padding: window.screen.width > 1600 ? [170, 0, 0] : [120, 0, 0],
              position: 'center',
            },
            labelLine: {
              normal: {show: false},
              emphasis: {show: false}
            },
            itemStyle: labelHide
          }, {
            name: data_jingtai[i].name,
            value: data_jingtai[i].value,
            label: labelShow,
            labelLine: {show: false},
          }]
        });
      };
      ServiceQualityChart.setOption(optionPie3, true);

      // 根据窗口大小变动图表
      window.onresize = function () {
        overallWarehouseChart.resize();
        storageWarehouseChart.resize();
        quarterlyInventoryChart.resize();
        ProcessingOrderChart.resize();
        DeliveryTimeChart.resize();
        ReturnOrderChart.resize();
        ServiceQualityChart.resize();
      };
    },
  }
};
</script>
<style >
.tsl-swiper{
  padding: 0 1vw;
}
.tsl-swiper .swiper-container{
  height: 27vh;
}
.tsl-swiper .swiper-slide{
  text-align: center;
  padding-top: 11vh;
}
.tsl-swiper .swiper-slide p{
  color: #fff;
  line-height: 5vh;
}
.tsl-swiper .swiper-slide b{
  font-size: 24px;
  padding-right: 5px;
}
.tsl-swiper .swiper-slide b.red{
  color: #f73d38;
}
.tsl-swiper .swiper-slide b.green{
  color: #35cf6f;
}
.tsl-swiper .swiper-pagination-fraction, 
.tsl-swiper .swiper-pagination-custom, 
.tsl-swiper .swiper-container-horizontal > .swiper-pagination-bullets{
  top: 2vh;
}
.tsl-swiper .swiper-pagination{
  display: flex;
  justify-content: space-between;
}
.tsl-swiper .swiper-pagination-bullet{
  display: inline-flex;
  width: 4.1vw;
  height: 5.2vh;
  font-size: 16px;
  color: #fff;
  border: 1px solid #5383ec;
  border-radius: 8px;
  background: transparent;
  opacity: 1;
  justify-content: center;
  align-items: center;
  padding: 0 .5vw;
}
.tsl-swiper .swiper-pagination-bullet.swiper-pagination-bullet-active{
  background: #5383ec;
}

.tsl-wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/tsl/tsl-bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.tsl-title {
  height: 10.37vh;
  line-height: 10.37vh;
  font-size: 40px;
  color: #fff;
  text-align: center;
}
.tsl-content {
  padding: 0 3.5vw 0.75vh;
}
.tsl-con {
  position: relative;
  border: 1px solid rgba(65, 207, 254, 0.1);
  background-color: rgba(93, 111, 179, 0.1);
  margin-bottom: 1.85vh;
}
.tsl-con_bg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.tsl-con::before,
.tsl-con::after,
.tsl-con_bg::before,
.tsl-con_bg::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-width: 2px;
  border-style: solid;
}
.tsl-con::before {
  top: 0;
  left: 0;
  border-color: #41cffe transparent transparent #41cffe;
}
.tsl-con::after {
  top: 0;
  right: 0;
  border-color: #41cffe #41cffe transparent transparent;
}
.tsl-con_bg::before {
  bottom: 0;
  left: 0;
  border-color: transparent transparent #41cffe #41cffe;
}
.tsl-con_bg::after {
  bottom: 0;
  right: 0;
  border-color: transparent #41cffe #41cffe transparent;
}
.tsl-left {
  float: left;
  width: 20.5vw;
  margin-right: 1vw;
}
.tsl-left_top {
  height: 24.6vh;
}
.tsl-left_bottom {
  height: 60.5vh;
}
.tsl-right {
  float: right;
  width: 71.5vw;
}
.tsl-right .tsl-con {
  float: left;
  height: 100%;
}
.tsl-right_top {
  height: 24.6vh;
}
.tsl-right_top1 {
  width: 49.5vw;
  margin-right: 1vw;
}
.tsl-right_top2 {
  width: 21vw;
}
.tsl-right_middle {
  /* height: 20.05vh; */
  height: 28.05vh;
}
.tsl-right_middle1 {
  width: 27.5vw;
}
.tsl-right_middle2,
.tsl-right_middle3 {
  width: 21vw;
  margin-left: 1vw;
}
.tsl-right_bottom {
  /* height: 38.6vh; */
  height: 30.6vh;
}
.tsl-right_bottom1 {
  width: 42vw;
  margin-right: 1vw;
}
.tsl-right_bottom2 {
  width: 28.5vw;
}
.tsl-con_title {
  height: 2.7vh;
  line-height: 2.7vh;
  font-size: 21px;
  color: #88e4f6;
  text-shadow: 0px 0px 8px rgba(0, 230, 366, 1);
  text-align: center;
  margin-top: 1vh;
  position: relative;
  z-index: 2;
}
.tsl-con_title i{
  position: absolute;
  font-size: 12px;
  color: #88e4f6;
  left: 2vh;
  top: 3.5vh;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}
.blue {
  color: #88e4f6;
  /* text-shadow: 0px 0px 8px rgba(0, 230, 366, 1); */
}
.warehouse-ability {
  padding: 0 1.8vw;
  position: relative;
  z-index: 2;
}
.warehouse-ability h3 {
  height: 3vh;
  line-height: 3vh;
  font-size: 20px;
  color: #fff;
  text-align: center;
  /* text-shadow: 0px 0px 8px rgba(0, 230, 366, 0.8); */
}
.warehouse-ability h3 b {
  font-size: 28px;
  padding: 0 1vw;
}
.warehouse-ability dl dt {
  height: 3.5vh;
  line-height: 3.5vh;
  font-size: 18px;
  color: #fff;
  text-align: center;
  /* text-shadow: 0px 0px 8px rgba(0, 230, 366, 0.8); */
}
.warehouse-ability dl dd {
  display: flex;
  height: 3.3vh;
  line-height: 3.3vh;
  font-size: 16px;
  color: #fff;
  /* text-shadow: 0px 0px 8px rgba(0, 230, 366, 0.8); */
}
.warehouse-ability dl dd span {
  flex: 1;
}
.warehouse-ability dl dd p {
  text-align: right;
}
.warehouse-ability dl dd p b {
  padding-right: 3px;
}
#OverallWarehouse{
  width: 100%;
  height: calc(100% - 3.7vh);
}
.StorageWarehouse-group{
  overflow: hidden;
}
.StorageWarehouse-group > div{
  width: 100%;
  height: 20.9vh; /*24.6vh - 3.7vh*/
}
#QuarterlyInventory{
  height: 20.9vh;
}
@media screen and (max-width: 1600px) {
  .tsl-title{
    font-size: 28px;
  }
  .tsl-con_title{
    height: 2.5vh;
    line-height: 2.5vh;
    font-size: 18px;
    margin-top: 1vh;
  }
  .warehouse-ability h3{
    font-size: 14px;
    line-height: 4vh;
    height: 4vh;
  }
  .warehouse-ability h3 b{
    font-size: 22px;
  }
  .warehouse-ability dl dd{
    font-size: 14px;
    height: 3vh;
    line-height: 3vh;
  }
  .warehouse-ability {
    padding: 0 1vw;
  }
  .tsl-swiper .swiper-pagination-bullet{
    font-size: 14px;
    padding: 0 .2vw;
  }
}
@media screen and (max-width: 1920px) {
  .tsl-swiper .swiper-pagination-bullet{
    padding: 0 .3vw;
  }
}
</style>