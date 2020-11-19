<template>
  <div>
    <div class="table-form">
      <a-form layout="inline" :model="formInline" @submit="getHouseList(formInline.city)" @submit.native.prevent>
        <a-form-item>
          <a-input v-model:value="formInline.city" placeholder="例hz(杭州)、sh(上海)">
            <template #prefix>
              <UserOutlined style="color:rgba(0,0,0,.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="formInline.city == '' ">
            Search
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div id="main1">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { commonApi } from "@/api/index";
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'


export default {
  components: {
    // BaiduMap
  },
  data() {
    return {
      houseList: [],
      formInline: {
        city: ""
      },
      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
    };
  },
  created() {
    this.getHouseList("hz");
  },
  mounted() {
    this.printChart();
  },
  methods: {
    printChart() {
      var myChart = echarts.init(document.getElementById('main1'));

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      };
      myChart.setOption(option);
    },
    getHouseList(city) {
      commonApi
        .getHouseList({
          city: city
        })
        .then(res => {
          this.houseList = res.data;
        });
    }

  }

}
</script>

<style lang="scss" scoped>
#main1 {
  width: 500px;
  height: 500px;
}
// .bm-view {
//   width: 100%;
//   height: 300px;
// }
</style>

