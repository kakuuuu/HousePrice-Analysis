import { createApp,h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Button, Layout, Menu, Form, Input, Table } from "ant-design-vue";

const app = createApp(App);
app.use(store).use(router);

app
  .use(Button)
  .use(Layout)
  .use(Menu)
  .use(Form)
  .use(Input)
  .use(Table);




app.mount("#app");
