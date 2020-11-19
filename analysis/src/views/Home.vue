<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider>
      <div class="title">
        HousePriceAnalysis
      </div>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <desktop-outlined />
          <span>表格</span>
        </a-menu-item>
        <a-menu-item key="2">
          <file-outlined />
          <span>地图可视化</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header>
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
            <a-form-item>
              <a-button type="primary" @click="exportExcle" :disabled="houseList.length==0">
                导出
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-layout-header> -->
      <a-layout-content style="margin: 0 16px">
        <HousePriceTable v-if="selectedKeys ==1" ref="HousePriceTable"></HousePriceTable>
        <HousePriceChart v-if="selectedKeys==2"></HousePriceChart>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonApi } from "@/api/index";
import HousePriceTable from "../components/HousePriceTable/HousePriceTable.vue";
import HousePriceChart from "../components/HousePriceChart/HousePriceChart.vue";

const columns = [
  {
    title: "名称",
    dataIndex: "title"
  },
  {
    title: "数目",
    dataIndex: "number"
  },
  {
    title: "单位",
    dataIndex: "unit"
  },
  {
    title: "城市",
    dataIndex: "city"
  },
  {
    title: "地址",
    dataIndex: "info"
  }
];

export default defineComponent({
  name: "Home",
  components: {
    HousePriceTable,
    HousePriceChart
  },
  data: function() {
    return {
      selectedKeys: <string>"1",
      houseList: <any>[],
      formInline: <any>{
        city: ""
      },
      columns
    };
  },
  created() {
    // this.getHouseList("hz");
  },
  mounted() {
    
  },
  methods: {
    getHouseList(city: string) {
      commonApi
        .getHouseList({
          city: city
        })
        .then(res => {
          this.houseList = res.data;
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  color: #ccc;
  padding: 10px 0;
}
</style>

