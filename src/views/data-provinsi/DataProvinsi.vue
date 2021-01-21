<template>
  <CRow>
    <CCol col="5">
      <CCard>
        <CCardHeader class="d-flex">
          <span class="h4 mr-auto my-auto">Data Provinsi</span>
          <CButton
            color="primary"
            class="d-md-down-none"
            to="/data-provinsi/tambah"
            >Tambah Data</CButton
          >
          <CButton color="primary" class="d-lg-none" to="/data-provinsi/tambah">
            <CIcon name="cil-plus" />
          </CButton>
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
            <template #proses="{index}">
              <td>
                <CButtonGroup>
                  <CButton color="success" :to="editByID(index)">Edit</CButton>
                  <CButton color="danger" :to="deleteByID(index)"
                    >Hapus</CButton
                  >
                </CButtonGroup>
              </td>
            </template>
            <template #no="{index}">
              <td>
                {{ index + 1 }}
              </td>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
const items = [
  { "nama-provinsi": "Samppa Nori" },
  { "nama-provinsi": "Estavan Lykos" },
  { "nama-provinsi": "Chetan Mohamed" },
  { "nama-provinsi": "Derick Maximinus" },
  { "nama-provinsi": "Friderik Dávid" },
  { "nama-provinsi": "Yiorgos Avraamu" },
  {
    "nama-provinsi": "Avram Tarasios",
    _classes: "table-success",
  },
  { "nama-provinsi": "Quintin Ed" },
  { "nama-provinsi": "Enéas Kwadwo" },
  { "nama-provinsi": "Agapetus Tadeáš" },
  {
    "nama-provinsi": "Carwyn Fachtna",
    _classes: "table-info",
  },
  { "nama-provinsi": "Nehemiah Tatius" },
  { "nama-provinsi": "Ebbe Gemariah" },
  { "nama-provinsi": "Eustorgios Amulius" },
  { "nama-provinsi": "Leopold Gáspár" },
  { "nama-provinsi": "Pompeius René" },
  { "nama-provinsi": "Paĉjo Jadon" },
  { "nama-provinsi": "Micheal Mercurius" },
  { "nama-provinsi": "Ganesha Dubhghall" },
  { "nama-provinsi": "Hiroto Šimun" },
  { "nama-provinsi": "Vishnu Serghei" },
  { "nama-provinsi": "Zbyněk Phoibos" },
  {
    "nama-provinsi": "Einar Randall",
    _classes: "table-danger",
  },
  { "nama-provinsi": "Félix Troels" },
  { "nama-provinsi": "Aulus Agmundr" },
];

const fields = [
  { key: "no", _style: "width:10px" },
  { key: "nama-provinsi", _style: "min-width:200px" },
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DataProvinsi",
  data() {
    return {
      items: items.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
  methods: {
    editByID(id) {
      return `/data-provinsi/edit?id=${id}`;
    },
    deleteByID(id) {
      return `/data-provinsi/hapus?id=${id}`;
    },
  },
};
</script>

<style></style>
