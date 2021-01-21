<template>
  <card-form title="Form Input Data Provinsi">
    <CRow>
      <CCol sm="12">
        <CInput label="Nama Provinsi" placeholder="Masukkan nama provinsi">
        </CInput>
      </CCol>
    </CRow>
    <CButton color="primary"> Simpan </CButton>
  </card-form>
</template>

<script>
import CardForm from "../../components/CardForm.vue";
export default {
  components: { CardForm },
  name: "TambahDataProvinsi",
  data() {
    return {};
  },
};
</script>

<style></style>
