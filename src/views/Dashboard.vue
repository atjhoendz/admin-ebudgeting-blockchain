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
      <CCard>
        <CCardHeader class="h5">
          <strong>Data Pengguna</strong>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            :items="items"
            :fields="fields"
            table-filter
            items-per-page-select
            :items-per-page="5"
            hover
            sorter
            pagination
          >
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
const items = [
  { username: "Samppa Nori", registered: "2012/01/01", role: "Member" },
  { username: "Estavan Lykos", registered: "2012/02/01", role: "Staff" },
  { username: "Chetan Mohamed", registered: "2012/02/01", role: "Admin" },
  { username: "Derick Maximinus", registered: "2012/03/01", role: "Member" },
  { username: "Friderik Dávid", registered: "2012/01/21", role: "Staff" },
  { username: "Yiorgos Avraamu", registered: "2012/01/01", role: "Member" },
  {
    username: "Avram Tarasios",
    registered: "2012/02/01",
    role: "Staff",
    _classes: "table-success",
  },
  { username: "Quintin Ed", registered: "2012/02/01", role: "Admin" },
  { username: "Enéas Kwadwo", registered: "2012/03/01", role: "Member" },
  { username: "Agapetus Tadeáš", registered: "2012/01/21", role: "Staff" },
  {
    username: "Carwyn Fachtna",
    registered: "2012/01/01",
    role: "Member",
    _classes: "table-info",
  },
  { username: "Nehemiah Tatius", registered: "2012/02/01", role: "Staff" },
  { username: "Ebbe Gemariah", registered: "2012/02/01", role: "Admin" },
  { username: "Eustorgios Amulius", registered: "2012/03/01", role: "Member" },
  { username: "Leopold Gáspár", registered: "2012/01/21", role: "Staff" },
  { username: "Pompeius René", registered: "2012/01/01", role: "Member" },
  { username: "Paĉjo Jadon", registered: "2012/02/01", role: "Staff" },
  { username: "Micheal Mercurius", registered: "2012/02/01", role: "Admin" },
  { username: "Ganesha Dubhghall", registered: "2012/03/01", role: "Member" },
  { username: "Hiroto Šimun", registered: "2012/01/21", role: "Staff" },
  { username: "Vishnu Serghei", registered: "2012/01/01", role: "Member" },
  { username: "Zbyněk Phoibos", registered: "2012/02/01", role: "Staff" },
  {
    username: "Einar Randall",
    registered: "2012/02/01",
    role: "Admin",
    _classes: "table-danger",
  },
  { username: "Félix Troels", registered: "2012/03/21", role: "Staff" },
  { username: "Aulus Agmundr", registered: "2012/01/01", role: "Member" },
];

const fields = [
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
  components: {},
  data() {
    return {
      dataDashboard,
      items: items.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
  methods: {},
};
</script>
