<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <CCard>
        <CCardHeader class="h4">
          Edit Data Provinsi
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="12">
              <CInput
                label="Nama Provinsi"
                placeholder="Masukkan nama provinsi"
              >
              </CInput>
            </CCol>
          </CRow>
          <CButton color="primary"> Simpan </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: "EditDataProvinsi",
  data() {
    return {};
  },
};
</script>

<style></style>
