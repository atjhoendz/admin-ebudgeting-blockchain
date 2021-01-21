<template>
  <list-data
    :items="items"
    :fields="fields"
    :width="5"
    title="Data Provinsi"
    routeEndpoint="data-provinsi"
  ></list-data>
</template>

<script>
import ListData from "../../components/ListData.vue";
import { itemsProvinsi } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-provinsi", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  components: { ListData },
  name: "DataProvinsi",
  data() {
    return {
      items: itemsProvinsi.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
};
</script>

<style></style>
