<template>
  <CRow>
    <CCol col="12">
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
  "kategori-pmk",
  "jns-pmk",
  "tahun",
  "asal",
  "tujuan",
  "provinsi",
  "satuan",
  "biaya",
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
