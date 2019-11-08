<template>
  <div>
    <c-menu></c-menu>
    <div class="user-center-wrap inner-wrap">
      <div class="user-center-left">
        <ul>
          <li v-for="panel in panels">
            <h2 class="user-center-title"><i class="iconfont" :class="panel.icons"></i>{{ panel.title }}</h2>
            <p><a>{{ panel.order }}单</a></p>
            <p><a>{{ panel.piece }}件</a></p>
          </li>
        </ul>
        <dl>
          <dt class="user-center-title"><i class="iconfont" :class="panel.icons"></i>{{ panel.title }}</dt>
          <dd>
            <b>当日</b>
            <p><a>{{ panel.todayOrder }}单</a></p>
            <p><a>{{ panel.todayPiece }}件</a></p>
          </dd>
          <dd>
            <b>总计</b>
            <p><a>{{ panel.todayOrder }}单</a></p>
            <p><a>{{ panel.todayPiece }}件</a></p>
          </dd>
        </dl>
        <div class="user-center-echarts">
          <Tabs :animated="false">
            <TabPane label="发货趋势图">
              <div id="normaChart" :style="{width: '770px', height: '430px'}"></div>
            </TabPane>
            <TabPane label="异常趋势图">
              <div id="abnormalChart" :style="{width: '770px', height: '430px'}"></div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div class="user-center-right">
        <h2 class="user-center-title"><i class="iconfont icon-function"></i>交互功能</h2>
        <dl class="user-conter-release user-center-right-con">
          <dt>发布信息</dt>
          <dd>
            <a>发布运力需求</a>
            <a>发布仓储需求</a>
          </dd>
        </dl>
        <dl class="user-conter-acceptance user-center-right-con">
          <dt>信息受理</dt>
          <dd>
            <p>仓储信息接单<a>30条</a></p>
            <p>运力承运申请<a>30条</a></p>
          </dd>
        </dl>
        <dl class="user-conter-published user-center-right-con">
          <dt>已发布信息管理</dt>
          <dd>
            <p>运力需求<a>30条</a></p>
            <p>仓储需求<a>30条</a></p>
          </dd>
        </dl>
        <dl class="user-conter-message user-center-right-con">
          <dt>消息提醒</dt>
          <dd v-if="messages.length > 0">
            <a v-for="message in messages">
              <span>{{ message.date | getYMD }}</span> {{ message.info }}
            </a>
          </dd>
          <dd v-else>
            <a style="text-align:center"><span>暂无数据</span></a>
          </dd>
        </dl>
        <div class="wait-function">
          <b class="iconfont icon-wait_function">即将开放，敬请期待</b>
        </div>
      </div>
      <div class="common-function">
        <h2>常用功能</h2>
        <div class="common-function-btn">
          <a>陆运订单录入</a>
          <a>空运订单录入</a>
          <a>订单管理</a>
          <a>物流财务</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cmenu from "@/components/common/menu.vue";

export default {
  components: {
    "c-menu": Cmenu
  },
  data() {
    return {
      panels: [
        {
          icons: "icon-pending",
          title: "待受理",
          order: "0",
          piece: "0"
        },
        {
          icons: "icon-scheduling",
          title: "待调度",
          order: "0",
          piece: "0"
        },
        {
          icons: "icon-distribution",
          title: "配送中",
          order: "0",
          piece: "0"
        },
        {
          icons: "icon-not_delivered",
          title: "超期未送达",
          order: "0"
        },
        {
          icons: "icon-abnormal_return",
          title: "异常退回",
          order: "0"
        },
        {
          icons: "icon-refusal",
          title: "拒签收",
          order: "0"
        }
      ],
      panel: {
        icons: "icon-received",
        title: "已签收",
        todayOrder: "0",
        todayPiece: "0",
        totalOrder: "0",
        totalPiece: "0"
      },
      messages: [],
      data1:[],
      data2:[]
    };
  },
  computed: {
    TenantGuid() {
      return this.$store.state.user.TenantGuid;
    }
  },
  mounted() {
    this.normaChart();
    this.abnormaChart();
    this.StatisticsSearch();
    this.ShipmentsSearch();
    this.PlatformCenterSearch();
  },
  methods: {
    normaChart() {
      var normaChart = this.$echarts.init(
        document.getElementById("normaChart")
      );
      // 绘制图表
      var option = {
        title: {
          text: "2018年发货情况",
          textStyle: {
            fontSize: 30,
            color: "#4AA8E5"
          },
          top: "20",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            {
              name: "货量",
              icon: "rectangle",
              textStyle: { fontWeight: "bold" }
            },
            {
              name: "单量",
              icon: "rectangle",
              textStyle: { fontWeight: "bold" }
            }
          ],
          bottom: "20"
        },
        grid: {
          top: "100",
          left: "3%",
          right: "4%",
          // bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "货量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#4FA1A4"
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: this.data1
          },
          {
            name: "单量",
            type: "line",
            itemStyle: {
              normal: {
                color: "#FDD180"
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#333"
              }
            },
            data: this.data2
          }
        ]
      };
      normaChart.setOption(option);
    },
    abnormaChart() {
      var abnormalChart = this.$echarts.init(
        document.getElementById("abnormalChart")
      );
      // 绘制图表
      var option = {
        title: {
          text: "2018年异常情况",
          textStyle: {
            fontSize: 30,
            color: "#DC322E"
          },
          top: "20",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            {
              name: "货量",
              icon: "rectangle",
              textStyle: { fontWeight: "bold" }
            },
            {
              name: "单量",
              icon: "rectangle",
              textStyle: { fontWeight: "bold" }
            }
          ],
          bottom: "20"
        },
        grid: {
          top: "100",
          left: "3%",
          right: "4%",
          // bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // interval: 50,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "货量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#4FA1A4"
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [12, 20, 50, 24, 32, 31, 24, 34, 59, 80, 9, 19]
          },
          {
            name: "单量",
            type: "line",
            itemStyle: {
              normal: {
                color: "#FDD180"
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#333"
              }
            },
            data: [12, 10, 50, 24, 32, 31, 90, 34, 59, 20, 9, 8]
          }
        ]
      };
      abnormalChart.setOption(option);
    },
    //统计查询
    StatisticsSearch() {
      const self=this;
      this.$http
        .post(`/api/StatisticsQuery/GetStatistics?tenantGuid=${this.TenantGuid}`)
        .then(function(rs) {
          if (rs.data.length > 0) {
            var model=rs.data[0];
            self.panels=[{
              icons: "icon-pending",title: "待受理",order: model.DsLOrder,piece: model.DsLPKGS},
              {icons: "icon-scheduling",title: "待调度",order: model.DdOrder,piece: model.DdPKGS},
              {icons: "icon-distribution",title: "配送中",order: model.PsOrder,piece: model.PsPKGS},
              {icons: "icon-not_delivered",title: "超期未送达",order: model.CqOrder},
              {icons: "icon-abnormal_return",title: "异常退回",order: "0"},
              {icons: "icon-refusal",title: "拒签收",order: model.JsOrder}
            ];
            self.panel= {
              icons: "icon-received",title: "已签收",
              todayOrder: model.DrqsOrder,todayPiece: model.DrqsPKGS,
              totalOrder: model.ZqsOrder,totalPiece: model.ZqsPKGS
            }
          }
        });
    },
    //消息提醒
    PlatformCenterSearch(){
      const self=this;
      this.$http
        .post(`/api/StatisticsQuery/GetPlatformCenter?tenantGuid=${this.TenantGuid}`,)
        .then(rs => {
          if (rs.data.length > 0) {
            for(let model of rs.data)
            {
                self.messages.push({date:model.CreateTime,info:model.Content});
            }
          }else if(self.messages.length > 0){
            self.messages.splice(0, self.messages.length);
          }
        });
    },

    //出货量图形
    ShipmentsSearch(){
      const self=this;
      this.$http
        .post(`/api/StatisticsQuery/GetShipments?tenantGuid=${this.TenantGuid}`,)
        .then(rs => {
          if (rs.data.length > 0) {
                self.data1=rs.data[0].PieceNumList;
                self.data2=rs.data[0].OrderNumList;
                this.normaChart();
          }
        });
    }
  }
};
</script>