<template>
  <div class="Login">
    <a-form layout="horizontal" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
      <a-form-item>
        <a-input v-model:value="formInline.username" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color:rgba(0,0,0,.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formInline.password" type="password" placeholder="Password">
          <template #prefix>
            <LockOutlined style="color:rgba(0,0,0,.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="formInline.user === '' || formInline.password === ''">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
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
        username: "",
        password: ""
      }
    };
  },
  created() {    
  },
  methods: {
    handleSubmit() {
      commonApi.userLogin(this.formInline).then(res=>{
        if(!res.status){
          message.success(res.message);
          storage().set("token",res.data.token);
          storage("localstorage").set("token",res.data.token);
          this.$router.push('/admin');
        }else{
          this.formInline.username="";
          this.formInline.password="";
        }
      })
    },
  }
});
</script>

<style lang="scss" scoped>
.Login{
  width: 50%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-end;
}

</style>

