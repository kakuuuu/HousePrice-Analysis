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
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <HousePriceTable v-if="selectedKeys==1"></HousePriceTable>
        <!-- <div :style="{ padding: '24px', background: '#fff', minHeight: '80vh' }">
          content
        </div> -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonApi } from "../api/index";
import HousePriceTable from "../components/HousePriceTable/HousePriceTable.vue"

export default defineComponent({
  name: "Home",
  components: {
    HousePriceTable
  },
  data: function() {
    return {
      msg: <number>123,
      selectedKeys: <string>"1"
    };
  },
  created() {
    // this.getHouseList();
  },
  methods: {
    getHouseList() {
      commonApi
        .getHouseList({
          city: "hz"
        })
        .then(res => {
          console.log("axios");
          console.log(res);
        });
    }
  }
});
</script>
