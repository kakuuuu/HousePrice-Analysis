import { createApp,h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import echarts from 'echarts';
// import { plugin } from 'echarts-for-vue';
import { Button, Layout, Menu, Form, Input, Table } from "ant-design-vue";

const app = createApp(App);
app.use(store).use(router);
// app.use(plugin, { echarts, h });
app
  .use(Button)
  .use(Layout)
  .use(Menu)
  .use(Form)
  .use(Input)
  .use(Table);




app.mount("#app");
