<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        :items="items"
        :fields="fields"
        title="Data Pengguna"
        routeEndpoint="data-pengguna"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
const fields = [
  { key: "no", _style: "width:10px" },
  { key: "username", _style: "min-width:200px" },
  "registered",
  { key: "role", _style: "min-width:100px" },
  { key: "proses", _style: "width:50px" },
];

import CardListData from "../../components/CardListData";
import { itemsPengguna } from "../../sample-data/data";

export default {
  name: "DataPengguna",
  components: {
    CardListData,
  },
  data() {
    return {
      items: itemsPengguna.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
};
</script>

<style></style>
