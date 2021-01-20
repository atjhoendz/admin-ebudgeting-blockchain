<template>
  <CRow>
    <CCol col="12">
      <CCard>
        <CCardHeader class="d-flex">
          <span class="h4 mr-auto my-auto">Data Pengguna</span>
          <CButton
            color="primary"
            class="d-md-down-none"
            to="/data-pengguna/tambah-data"
            >Tambah Data</CButton
          >
          <CButton
            color="primary"
            class="d-lg-none"
            to="/data-pengguna/tambah-data"
          >
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
            <template #proses>
              <td>
                <CButtonGroup>
                  <CButton color="success" to="/data-pengguna/edit-data"
                    >Edit</CButton
                  >
                  <CButton color="danger">Hapus</CButton>
                </CButtonGroup>
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
  { key: "proses", _style: "width:50px" },
];

export default {
  name: "DataPengguna",
  data() {
    return {
      items: items.map((item) => {
        return { ...item };
      }),
      fields,
    };
  },
};
</script>

<style></style>
