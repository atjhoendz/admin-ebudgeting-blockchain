<template>
  <CRow>
    <CCol sm="12" lg="6">
      <CWidgetSimple header="Message" text="Selamat Datang di Halaman Admin">
      </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="3" v-for="data in dataDashboard" :key="data.title">
      <CWidgetSimple :header="data.title" :text="data.text"> </CWidgetSimple>
    </CCol>
    <CCol col="12">
      <card-list-data
        :fields="fields"
        :items="items"
        :showProses="false"
        :showButton="false"
        title="Data Pengguna"
      >
      </card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from "../components/CardListData.vue";
import { itemsPengguna } from "../sample-data/data";

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "username", _style: "min-width:200px" },
  "registered",
  { key: "role", _style: "min-width:100px" },
];

const dataDashboard = [
  {
    title: "Data Provinsi",
    text: "34",
  },
  {
    title: "Data Kategori",
    text: "10",
  },
  {
    title: "Data Lembaga",
    text: "16",
  },
  {
    title: "Data Anggaran",
    text: "20",
  },
  {
    title: "Data PMK",
    text: "5",
  },
  {
    title: "Data Penomoran",
    text: "5",
  },
];

export default {
  name: "Dashboard",
  components: { CardListData },
  data() {
    return {
      dataDashboard,
      items: itemsPengguna.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
  methods: {},
};
</script>
