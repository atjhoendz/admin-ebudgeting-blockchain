<template>
  <CRow>
    <CCol sm="12" md="5" lg="5">
      <card-list-data
        title="Data Kategori"
        :fields="fields"
        :items="items"
        routeEndpoint="data-kategori"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsKategori } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-kategori", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "Data Kategori",
  components: { CardListData },
  data() {
    return {
      items: itemsKategori.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
};
</script>

<style></style>
