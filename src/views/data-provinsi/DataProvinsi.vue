<template>
  <CRow>
    <CCol sm="12" md="5" lg="5">
      <card-list-data
        :items="items"
        :fields="fields"
        :width="5"
        title="Data Provinsi"
        routeEndpoint="data-provinsi"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../../components/CardListData.vue";
import { itemsProvinsi } from "../../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-provinsi", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  components: { CardListData },
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
