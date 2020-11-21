<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="title">
        HousePriceAnalysis
      </div>
      <a-button type="link" block @click="gotoLogin">
        login
      </a-button>
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
      <a-layout-content>
        <HousePriceTable v-if="selectedKeys=='1'"></HousePriceTable>
        <HousePriceChart v-if="selectedKeys=='2'"></HousePriceChart>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonApi } from "@/api/index";
import HousePriceTable from "../components/HousePriceTable/HousePriceTable.vue";
import HousePriceChart from "../components/HousePriceChart/HousePriceChart.vue";

export default defineComponent({
  name: "Home",
  components: {
    HousePriceTable,
    HousePriceChart
  },
  data: function() {
    return {
      selectedKeys: <any>["1"]
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push("/login");
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

