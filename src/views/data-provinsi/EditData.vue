<template>
  <card-form title="Edit Data Provinsi">
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
  name: "EditDataProvinsi",
  components: {
    CardForm,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
