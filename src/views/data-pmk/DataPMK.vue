<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data PMK"
        :fields="fields"
        :items="itemsPMK"
        routeEndpoint="data-pmk"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsPMK } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nomor-pmk", _style: "min-width:200px" },
  { key: "tanggal", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DataPMK",
  components: { CardListData },
  data() {
    return {
      itemsPMK,
      fields,
    };
  },
};
</script>

<style></style>
