<template>
  <card-form title="Form Input Data PMK">
    <CRow>
      <CCol sm="12">
        <CInput
          label="Nomor PMK"
          placeholder="Masukkan nomor pmk"
          type="number"
        >
        </CInput>
      </CCol>
      <CCol sm="12">
        <CInput label="Tanggal" placeholder="" type="date"> </CInput>
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
