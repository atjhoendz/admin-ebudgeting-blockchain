<template>
  <div>
    <card-form title="Edit Data PMK">
      <CRow>
        <CCol col="12">
          <CSelect
            label="Kategori"
            placeholder="Pilih kategori"
            :options="kategoriOptions"
            :value="formData.nama_kategori"
            @update:value="setValue('nama_kategori', $event)"
            :is-valid="validate('nama_kategori')"
            invalid-feedback="Kategori PMK harus diisi."
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Tahun"
            placeholder="Masukkan tahun"
            type="number"
            v-model.trim="$v.formData.tahun.$model"
            :is-valid="validate('tahun')"
            :invalid-feedback="tahunMsg"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Jenis PMK"
            placeholder="Pilih jenis PMK"
            :options="jenisOptions"
            :value="formData.jenis_pmk"
            @update:value="setValue('jenis_pmk', $event)"
            :is-valid="validate('jenis_pmk')"
            invalid-feedback="Jenis PMK harus diisi"
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Golongan"
            placeholder="Pilih golongan"
            :options="golonganOptions"
            :value="formData.golongan_penginapan"
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Kategori Tiket"
            placeholder="Pilih kategori tiket"
            :options="tiketOptions"
            :value="formData.jenis_tiket"
            @update:value="setValue('jenis_tiket', $event)"
            :is-valid="validate('jenis_tiket')"
            invalid-feedback="Kategori tiket harus diisi."
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Asal"
            placeholder="Masukkan asal"
            v-model.trim="$v.formData.asal.$model"
            :is-valid="validate('asal')"
            invalid-feedback="Asal harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Tujuan"
            placeholder="Masukkan tujuan"
            v-model.trim="$v.formData.tujuan.$model"
            :is-valid="validate('tujuan')"
            invalid-feedback="Tujuan harus diisi."
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Provinsi Tujuan"
            placeholder="Pilih provinsi tujuan"
            :options="provinsiOptions"
            :value="formData.nama_provinsi"
            @update:value="setValue('nama_provinsi', $event)"
            :is-valid="validate('nama_provinsi')"
            invalid-feedback="Provinsi tujuan harus diisi."
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CSelect
            label="Satuan"
            placeholder="Pilih satuan"
            :options="satuanOptions"
            :value="formData.satuan"
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol col="12">
          <CInput
            label="Biaya"
            placeholder="Masukkan biaya"
            v-model.trim="$v.formData.biaya.$model"
            :is-valid="validate('biaya')"
            :invalid-feedback="biayaMsg"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Dalam Kota"
            placeholder="Masukkan info dalam kota"
            v-model="formData.dalam_kota"
            :readonly="readOnly"
          ></CInput>
        </CCol>
        <CCol col="12">
          <CInput
            label="Luar Kota"
            placeholder="Masukkan info luar kota"
            v-model="formData.luar_kota"
            :readonly="readOnly"
          ></CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isLoading" />
      <CButton color="primary" @click="updateData" v-if="!isLoading">
        Simpan
      </CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm';
import ToastMsg from '../../components/ToastMsg';
import { KategoriService } from '../../services/kategori.service';
import { ProvinsiService } from '../../services/provinsi.service';
import { PMKService } from '../../services/pmk.service';
import { ValidationMessage } from '../../validations/message';
import { pmkValidations } from '../../validations/validationRules';
import {
  jenisOptions,
  tiketOptions,
  satuanOptions,
  golonganOptions,
} from './options';

export default {
  name: 'EditDataPMK',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'pmk',
        nama_kategori: '',
        tahun: '',
        jenis_pmk: '',
        golongan_penginapan: '',
        jenis_tiket: '',
        asal: '',
        tujuan: '',
        satuan: '',
        biaya: '',
        nama_provinsi: '',
        dalam_kota: '',
        luar_kota: '',
      },
      jenisOptions,
      tiketOptions,
      satuanOptions,
      golonganOptions,
      kategoriOptions: [],
      provinsiOptions: [],
      isLoading: false,
      listToasts: [],
      readOnly: true,
    };
  },
  computed: {
    tahunMsg() {
      if (!this.$v.formData.tahun.required) {
        return ValidationMessage.required('Tahun');
      } else if (!this.$v.formData.tahun.numeric) {
        return ValidationMessage.numeric('Tahun');
      } else if (!this.$v.formData.tahun.validTahun) {
        return 'Tahun tidak valid.';
      }
      return null;
    },
    biayaMsg() {
      if (!this.$v.formData.biaya.required) {
        return ValidationMessage.required('Biaya');
      } else if (!this.$v.formData.biaya.numeric) {
        return ValidationMessage.numeric('Biaya');
      }
      return null;
    },
  },
  validations: pmkValidations,
  methods: {
    validate(type) {
      if (this.$v.formData[type].$error) {
        return !this.$v.formData[type].$invalid;
      }
      return null;
    },
    setValue(type, value) {
      this.formData[type] = value;
      this.$v.formData[type].$touch();
    },
    async getDataKategori() {
      try {
        const data = await KategoriService.getAll();

        this.kategoriOptions = data.map(item => {
          return {
            label: item.Record.nama,
            value: item.Record.nama,
          };
        });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data kategori tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
    },
    async getDataProvinsi() {
      try {
        const data = await ProvinsiService.getAll();

        this.provinsiOptions = data.map(item => {
          return {
            label: item.Record.nama,
            value: item.Record.nama,
          };
        });
      } catch (err) {
        const toast = {
          message: 'Terjadi Masalah. Data provinsi tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
    },
    async getDataPMK() {
      this.isLoading = true;

      try {
        await this.getDataKategori();
        await this.getDataProvinsi();

        const result = await PMKService.get(this.$route.query.id);

        this.formData = result.data;
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Mendapatkan data PMK tidak berhasil.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
      this.readOnly = false;
    },
    async updateData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.isLoading = true;

      try {
        this.formData.biaya = parseInt(this.formData.biaya);
        const result = await PMKService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-pmk' });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil diperbarui.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getDataPMK();
  },
};
</script>

<style></style>
