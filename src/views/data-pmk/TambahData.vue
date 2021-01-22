<template>
  <card-form title="Form Input Data PMK">
    <CRow>
      <CCol col="12">
        <CSelect
          label="Kategori"
          placeholder="Pilih kategori"
          :options="optionsKategori"
        ></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Tahun" placeholder="Pilih tahun"></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Jenis PMK" placeholder="Pilih jenis pmk"></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Golongan" placeholder="Pilih golongan"></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect
          label="Kategori Tiket"
          placeholder="Pilih kategori tiket"
        ></CSelect>
      </CCol>
      <CCol col="12">
        <CInput label="Asal" placeholder="Masukkan asal"></CInput>
      </CCol>
      <CCol col="12">
        <CInput label="Tujuan" placeholder="Masukkan tujuan"></CInput>
      </CCol>
      <CCol col="12">
        <CSelect label="Provinsi" placeholder="Pilih provinsi"></CSelect>
      </CCol>
      <CCol col="12">
        <CSelect label="Satuan" placeholder="Pilih satuan"></CSelect>
      </CCol>
      <CCol col="12">
        <CInput label="Biaya" placeholder="Masukkan biaya"></CInput>
      </CCol>
      <CCol col="12">
        <CInput
          label="Dalam Kota"
          placeholder="Masukkan info dalam kota"
        ></CInput>
      </CCol>
      <CCol col="12">
        <CInput
          label="Luar Kota"
          placeholder="Masukkan info luar kota"
        ></CInput>
      </CCol>
    </CRow>
    <CButton color="primary"> Simpan </CButton>
  </card-form>
</template>

<script>
import CardForm from "../../components/CardForm";
import { itemsKategori } from "../../sample-data/data";

export default {
  name: "TambahDataPMK",
  components: { CardForm },
  computed: {
    optionsKategori() {
      return itemsKategori.map((item) => {
        return {
          label: item["nama-kategori"],
          value: item["nama-kategori"],
        };
      });
    },
  },
};
</script>

<style></style>
