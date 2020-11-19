<template>
  <div class="table-main">
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
          <a-form-item>
            <a-button type="primary" @click="exportExcle" :disabled="houseList.length==0">
              导出
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-table :columns="columns" :data-source="houseList" rowKey="lat">
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as XLSX from "xlsx";
import { commonApi } from "@/api/index";

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
  components: {},
  data: function() {
    return {
      houseList: <any>[],
      formInline: <any>{
        city: ""
      },
      // cityOptions: <any>[
      //   {
      //     city: "hz",
      //     title: "杭州"
      //   },
      //   {
      //     city: "sh",
      //     title: "上海"
      //   }
      // ],
      columns
    };
  },
  created() {
    this.getHouseList("hz");
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
    },
    exportExcle() {
      const excleData = this.houseList;

      // 设置表格样式，!cols为列宽
      const options = {
        "!cols": [
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 }
        ]
      };
      // 制作工作表的方式有很多种，以数组和对象为例
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excleData);
      // 使用指定的单元格作为起点插入数据，r：行， c：列，详情看官网文档
      worksheet["!cols"] = options["!cols"];
      // 新建一个工作簿
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "HousePriceTable.xlsx");
    }
  }
});
</script>

<style lang="scss" scoped>
.table-form {
  margin: 5px 0 10px 0;
}
</style>

