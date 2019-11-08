<template>
<div>
  <c-menu :activeNav="3"></c-menu>
  <div class="inner-banner">
    <img src="../assets/images/banner-warehouse.jpg" alt="">
  </div>
  <div class="warehouse-detail-wrap inner-wrap">
    <div class="pro-detail">
      <div class="pro_show_img fl">
        <Carousel v-model="value3" :autoplay="setting.autoplay" :autoplay-speed="setting.autoplaySpeed" :dots="setting.dots" :radius-dot="setting.radiusDot" :trigger="setting.trigger" :arrow="setting.arrow">
          <CarouselItem v-for="(item, key) in warehouseImgs" :key="item.name">
            <div class="demo-carousel">
              <img :src="item.url">
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="pro-wz fl">
        <h4>{{details.ChineseName}}</h4>
        <ul>
          <li>
            <span>仓库地区：</span>{{details.Venue}}
          </li>
          <li>
            <span>存储标准：</span>{{details.StorageType | StorageType}}
          </li>
          <li>
            <span>仓库类型：</span>{{details.WareHouseType | WareHouseType}}
          </li>
          <li>
            <span>结构：</span>{{details.BuildingStructure | BuildingStructure}}
          </li>
          <li>
            <span>总面积：</span>
            <b>{{details.TotalAreaAge|| '暂无'}}㎡</b>
            <span>可租面积：</span>
            <b>{{details.CanRentedArea|| '暂无'}}㎡</b>
            <span>起租面积：</span>
            <b>{{details.Minleasedrea || '暂无'}}㎡</b>
          </li>
          <li>
            <span>租金：</span>
            <b>{{details.LeasingPrice || '面议'}}/㎡/月</b>
          </li>
          <li>
            <i class="icon-star"></i>
            <i class="icon-star"></i>
            <i class="icon-star-empty"></i>
          </li>
          <li>
            <span>更新时间：</span>{{details.UPDATE_TIME | getYMD}} {{details.UPDATE_TIME | getHMS}}
          </li>
          <li v-show="false">
            <div class="btn-group flexitem">
              <a href="javascript:;">预约仓库</a>
            </div>
            <div class="btn-group flexitem">
              <a href="javascript:;"><i class="iconfont icon-star-hollow"></i>关注仓库</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 仓库简介 -->
    <div class="demand-detail-content">
      <div class="demand-detail-title">
        <b>仓库简介</b>
      </div>
      <dl class="recommend-detail-info displayflex">
        <dt class="flexitem rela-img">
          <img src="../assets/images/index-warehouse1.jpg">
        </dt>
        <dd class="flex1">
          <p v-html="details.WarehouseIntroduction"></p>
        </dd>
      </dl>
    </div>
    <!-- 基本信息 -->
    <div class="demand-detail-content">
      <div class="demand-detail-title">
        <b>基本信息</b>
      </div>
      <table class="table table-recommend">
        <tbody>
          <tr>
            <td>月台</td>
            <td>{{details.Platform | Platform}}</td>
            <td>服务范围</td>
            <td>{{details.ServiceRange | ServiceRange }}</td>
          </tr>
          <tr>
            <td>结构</td>
            <td>{{details.BuildingStructure | BuildingStructure }}</td>
            <td>库存类别</td>
            <td>{{details.GoodsCategory | GoodsCategory}}</td>
          </tr>
          <tr>
            <td>层高</td>
            <td v-if='details.FloorHeight'>{{details.FloorHeight | FloorHeight}}</td>
            <td v-else>{{'暂无'}}</td>
            <td>安保系统</td>
            <td>{{details.SecuritySystem | SecuritySystem}}</td>
          </tr>
          <tr>
            <td>消防</td>
            <td>{{details.FireFighting | FireFighting }}</td>
            <td>消防系统</td>
            <td>{{details.FireFightingSystem | FireFightingSystem}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import Cmenu from '@/components/common/menu.vue';

export default {
  components: {
    'c-menu': Cmenu
  },
  data() {
    return {
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 0,
        dots: "outside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover"
      },
      warehouseImgs: [
        {
          url: require('@/assets/images/warehouse1.jpg')
        },{
          url: require('@/assets/images/warehouse2.jpg')
        },
      ],
      details: {
        ChineseName: '',
        Venue: '',
        StorageType: '01',
        WareHouseType: '03',
        BuildingStructure: '3',
        TotalAreaAge: '',
        CanRentedArea: '',
        Minleasedrea: '',
        LeasingPrice: '',
        UPDATE_TIME: '2018-08-14 17:46:54',
        WarehouseIntroduction: '',
        Platform: '02',
        ServiceRange: ['warehouse','transport'],
        BuildingStructure: '1',
        GoodsCategory: ['fastProduct','medical'],
        FloorHeight: '2',
        SecuritySystem: ['monitor','security','patrol'],
        FireFighting: '1',
        FireFightingSystem: ['spray','smoke','fireHydrant','fireExtinguisher','fireAlarm']
      },
    }
  },
  mounted() {

    if(this.$route.params.guid){
      this.bindDetial();
    }
  },
  methods: {
    bindDetial() {
      let url = "/api/warehouse/details/" + this.$route.params.guid;
      this.axios.get(url, this.apiUrls.cangm)
      .then( (d) => {
        this.detials.Venue = d.Venue;

        this.warehouseImgs = [];
        if (d.PictContent) {
          const images = JSON.parse(d.PictContent);
          if(images.length){
            for(let img of images){
              if(img == null){
                continue;
              }
              self.warehouseImgs.push({
                url: self.imgurl.cangm + (img.original || {}).url
              });
            }
          }
        }
      });
    }
  }
}
</script>
