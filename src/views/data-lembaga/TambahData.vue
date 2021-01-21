<template>
  <card-form title="Form Input Data Lembaga">
    <CRow>
      <CCol sm="12">
        <CInput label="Nama Lembaga" placeholder="Masukkan nama lembaga">
        </CInput>
      </CCol>
      <CCol sm="12">
        <CInput
          label="Jumlah Anggaran"
          placeholder="Masukkan jumlah anggaran"
          type="number"
        >
        </CInput>
      </CCol>
    </CRow>
    <CButton color="primary"> Simpan </CButton>
  </card-form>
</template>

<script>
import CardForm from "../../components/CardForm";
export default {
  name: "TambahDataLembaga",
  components: { CardForm },
};
</script>

<style></style>
