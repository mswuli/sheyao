<template>
  <div style="height: 70%;">
    <div id="pieChart" :style="{width: '100%', height: '100%'}"></div>
  </div>
</template>
<script>
  export default {
    props:{
      piedata:{
        type: Object,
        default: ()=>{return {
          ProvinceLineNumber:0,
          CityLineNumber: 0,
          SameCityLineNumber:0
        };}
      }
    },
    name: 'echartsPie',
    data() {
      return {}
    },
    mounted() {
      // this.drawPie();
    },
    methods: {
      drawPie() {
        const self = this;

        // 基于准备好的dom，初始化echarts实例
        let pieChart = this.$echarts.init(document.getElementById('pieChart'))
        // 绘制图表
        pieChart.setOption({
          // backgroundColor: '#000'
          color: ['#f95d5d', '#fde269', '#41cffe'],
          tooltip: {
            trigger: 'item',
            // formatter: "{b} : {c} ({d}%)"
            formatter: function (data) {
              return `${data.name} : ${formatNum(data.value)}`;
            }
          },
          calculable: true,
          series: [
            {
              name: '优势线路',
              type: 'pie',
              center: 'center',
              radius: ['30%', '70%'],
              label: {
                normal: {
                  show: true,
                  fontSize: 12,
                  color: '#fff',
                  baseline: 'bottom',
                  formatter: function (data) {
                    return `${data.name} : ${formatNum(data.value)}`;
                  }
                },
                textStyle: {
                  baseline: 'bottom',
                }
              },
              labelLine: {
                length : 1,
                lineStyle: {
                  color: 'rgba(65, 207, 254, .3)',
                  width: 1,
                  type: 'dashed'
                }
              },
              data: [
                {value: self.piedata.ProvinceLineNumber, name: '省际干线'},
                {value: self.piedata.CityLineNumber, name: '城际干线'},
                {value: self.piedata.SameCityLineNumber, name: '同城配线路'}
              ]
            }
          ]
        });

        // 千分位
        function formatNum(strNum) {
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
        }
      }
    },
    watch:{
      piedata(){
        this.drawPie();
      }
    }
  }
</script>
