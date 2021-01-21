<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <CCard>
        <CCardHeader class="h4">
          Edit Data Pengguna
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput label="Username" placeholder="Masukkan username">
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput label="Nama Lengkap" placeholder="Masukkan nama lengkap">
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput label="NIP" placeholder="Masukkan NIP"> </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Password"
                placeholder="Masukkan password"
                type="password"
              >
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CSelect label="Jabatan" :options="options"></CSelect>
            </CCol>
          </CRow>
          <CButton color="primary"> Simpan </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="12" md="6" lg="5">
      <CCard>
        <CCardHeader class="h4">
          Edit Password
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Password Lama"
                placeholder="Masukkan password lama"
              >
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Password Baru"
                placeholder="Masukkan password baru"
              >
              </CInput>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Konfirmasi Password Baru"
                placeholder="Masukkan ulang password baru"
              >
              </CInput>
            </CCol>
          </CRow>
          <CButton color="primary">Simpan</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
const options = [
  { label: "Admin", value: "admin" },
  { label: "Kep. Keuangan", value: "kep-keuangan" },
];

export default {
  name: "EditDataPengguna",
  data() {
    return {
      options,
    };
  },
};
</script>

<style></style>
