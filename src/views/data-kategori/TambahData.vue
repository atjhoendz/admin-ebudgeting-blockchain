<template>
  <card-form title="Form Input Data Kategori">
    <CRow>
      <CCol sm="12">
        <CInput label="Nama Kategori" placeholder="Masukkan nama kategori">
        </CInput>
      </CCol>
    </CRow>
    <CButton color="primary"> Simpan </CButton>
  </card-form>
</template>

<script>
import CardForm from "../../components/CardForm.vue";
export default {
  name: "TambahDataKategori",
  components: { CardForm },
};
</script>

<style></style>
