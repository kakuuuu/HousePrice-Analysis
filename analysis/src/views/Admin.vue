<template>

  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="title">
        HousePriceAnalysis
      </div>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <desktop-outlined />
          <span>更新</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <div class="updateform">
          <a-form layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-item >
              <a-input v-model:value="formInline.city" placeholder="City">
                <template #prefix>
                  <UserOutlined style="color:rgba(0,0,0,.25)" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :disabled="formInline.user === '' || formInline.password === ''">
                更新
              </a-button>
            </a-form-item>
          </a-form>

        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonApi } from "@/api/index";
import storage from "@/utils/storage";
import { message } from "ant-design-vue";

export default defineComponent({
  data() {
    return {
      formInline: {
        city: ""
      },
      selectedKeys: <any>["1"]
    };
  },
  methods: {
    handleSubmit() {
      commonApi.updateHouseList(this.formInline).then(res=>{
        if(!res.status){
          message.success(res.desc);
        }
      })
    }
  },
  created() {
  },
});
</script>

<style lang="scss" scoped>
.updateform{
  margin: 20px auto;
}

</style>

