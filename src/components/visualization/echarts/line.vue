<template>
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
</template>
<script>
  export default {
    name: 'echartsLine',
    data() {
      return {}
    },
    mounted() {
      this.drawLine();
      this.drawLine2();
      this.drawLine3();
      this.drawLine4();
      this.drawLine5();
      this.drawLine6();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart = this.$echarts.init(document.getElementById('lineChart'))
        // 绘制图表
        lineChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '货物提取准时率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: [96.10, 94.50, 96.50, 92.60]
          }]
        });
      },
      drawLine2() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart2 = this.$echarts.init(document.getElementById('lineChart2'))
        // 绘制图表
        lineChart2.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '货物送达准时率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: [91.50, 94.40, 93.60, 96.20]
          }]
        });
      },
      drawLine3() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart3 = this.$echarts.init(document.getElementById('lineChart3'))
        // 绘制图表
        lineChart3.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '运输包装完好率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: [95.84, 94.23, 95.79, 94.79]
          }]
        });
      },
      drawLine4() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart4 = this.$echarts.init(document.getElementById('lineChart4'))
        // 绘制图表
        lineChart4.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '运输过程信息可追溯率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: [99, 99, 99, 99]
          }]
        });
      },
      drawLine5() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart5 = this.$echarts.init(document.getElementById('lineChart5'))
        // 绘制图表
        lineChart5.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '冷藏药品温度控制合格率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: []
          }]
        });
      },
      drawLine6() {
        // 基于准备好的dom，初始化echarts实例
        let lineChart6 = this.$echarts.init(document.getElementById('lineChart6'))
        // 绘制图表
        lineChart6.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '5%',
            right: '5%',
            top: '15%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)',
              }
            },
            axisLabel: {
              color: '#fff',
              // fontSize: 16
            },
            data: ['1季度', '2季度', '3季度', '4季度']
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#777',
              // fontSize: 16
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
          },
          series: [{
            name: '客户有效投诉率',
            type: 'line',
            // smooth: true,
            // symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: '#21cdab'
              }
            },
            data: [0.029, 0.029, 0.028, 0.028]
          }]
        });
      }
    }
  }
</script>
<style scoped>
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
</style>
