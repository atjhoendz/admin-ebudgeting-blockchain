<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data Lembaga"
        :fields="fields"
        :items="items"
        routeEndpoint="data-lembaga"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsLembaga } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-lembaga", _style: "min-width:200px" },
  { key: "jml-anggaran", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "Data Lembaga",
  components: { CardListData },
  data() {
    return {
      items: itemsLembaga.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
};
</script>

<style></style>
