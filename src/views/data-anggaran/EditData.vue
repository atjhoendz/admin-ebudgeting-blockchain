<template>
  <card-form title="Edit Data Anggaran">
    <CRow>
      <CCol sm="12">
        <CSelect
          label="Nama Lembaga"
          placeholder="Pilih nama lembaga"
          :options="options"
        ></CSelect>
      </CCol>
      <CCol sm="12">
        <CInput
          label="Sisa Anggaran"
          placeholder="Masukkan sisa anggaran"
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
import { itemsLembaga } from "../../sample-data/data";

const options = itemsLembaga.map((item) => {
  return {
    label: item["nama-lembaga"],
    value: item["nama-anggaran"],
  };
});

export default {
  name: "EditDataAnggaran",
  components: { CardForm },
  data() {
    return {
      options,
    };
  },
};
</script>

<style></style>
