<template>
  <div class="table-main">
    <div>
      <a-form layout="inline" :model="formInline" @submit="getHouseList(formInline.city)" @submit.native.prevent>
        <a-form-item>
          <a-input v-model:value="formInline.city" placeholder="">
            <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.city == '' "
          >
            Search
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table :columns="columns" :data-source="houseList">
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonApi } from "@/api/index";

const columns = [
  {
    title: '名称',
    dataIndex: 'title',
  },
  {
    title: '数目',
    dataIndex: 'number',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '城市',
    dataIndex: 'city',
  },
  {
    title: '地址',
    dataIndex: 'info',
  }
];



export default defineComponent({
  name: "Home",
  components: {},
  data: function() {
    return {
      houseList: <any> [],
      formInline:<any> {
        city:""
      },
      columns
    };
  },
  created() {
    this.getHouseList('hz');
  },
  methods: {
    getHouseList(city:string) {
      commonApi
        .getHouseList({
          city: city
        })
        .then(res => {
          // console.log("axios");
          // console.log(res);
          this.houseList=res.data;
          console.log(this.houseList);
          
        });
    }
  }
});
</script>
