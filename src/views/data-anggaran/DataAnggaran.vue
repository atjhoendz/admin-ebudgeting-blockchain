<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data Anggaran"
        :fields="fields"
        :items="itemsAnggaran"
        routeEndpoint="data-anggaran"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsAnggaran } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-lembaga", _style: "min-width:200px" },
  { key: "sisa-anggaran", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DataAnggaran",
  components: { CardListData },
  data() {
    return { itemsAnggaran, fields };
  },
};
</script>

<style></style>
