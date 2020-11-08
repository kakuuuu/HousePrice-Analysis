<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider >
      <div class="title">
        HousePriceAnalysis
      </div>
      
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <!-- <a-menu-item key="1">
          <pie-chart-outlined />
          <span>登录</span>
        </a-menu-item> -->
        <a-menu-item key="2">
          <!-- <desktop-outlined /> -->
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="9">
          <!-- <file-outlined /> -->
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">

        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          B .
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: {},
  data: function() {
    return {
      msg: <number>123,
      selectedKeys:<string>"2"
    };
  }
});
</script>

<style lang="less">
  .title{
    color:#fff;

  }
</style>
