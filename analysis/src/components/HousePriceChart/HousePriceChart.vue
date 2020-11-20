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
    <div id="map">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { commonApi } from "@/api/index";
import BMap from 'BMap';
import '@/extension/bmap.min.js';


export default {
  components: {
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
  methods: {
    printChart() {
      var myChart = echarts.init(document.getElementById('map'));
      // 指定图表的配置项和数据

      let data = this.houseList.filter(item => { return item.unit == "元/㎡(均价)" });

      data = data.map(item => {
        return {
          name: item.title,
          value: [
            item.lng, item.lat, Number(item.number)
          ]
        }
      })
      data.sort((a,b)=>{
        return b.value[2]-a.value[2]  ;
      })

      var option = {
        backgroundColor: "transparent",
        title: {
          text: "楼盘房价",
          left: "right"
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return params.data.name + ":" + params.data.value[2]+"元/㎡(均价)";
          }
        }
        ,
        visualMap: [
          {
            type: 'piecewise',
            min: 0,
            max: 150000,
            inRange: {
              color: ['#0780cf','#fa6d1d','red'],
              symbolSize: [5, 50]
            },
            outOfRange: {
              symbolSize: [30, 100]
            },
            hoverLink: true,
            top:0

          }
        ]
        ,
        series: [
          {
            name: "houseprice",
            type: "scatter",
            coordinateSystem: "bmap",
            data: data,
            label: {
              formatter: "",
              position: "right"
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ],
        bmap: {
          center: [data[5].value[0], data[5].value[1]],
          zoom: 11,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "road",
                elementType: "all",
                stylers: {
                  lightness: 20
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#f49935"
                }
              },
              {
                featureType: "local",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1e5ff"
                }
              },
              {
                featureType: "city",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        }
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
          this.$nextTick(() => {
            this.printChart();
          })
        });
    }

  }

}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 90vh;
}
.table-form {
  margin: 5px 0 10px 0;
}

</style>

