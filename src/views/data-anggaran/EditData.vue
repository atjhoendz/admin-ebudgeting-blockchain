<template>
  <div>
    <card-form title="Edit Data Anggaran">
      <CRow>
        <CCol sm="12">
          <CSelect
            label="Nama Lembaga"
            placeholder="Pilih nama lembaga"
            description="Daftar lembaga yang tersedia"
            :options="options"
            :value="formData.nama_lembaga"
            @update:value="setNamaLembaga($event)"
            :is-valid="validate('nama_lembaga')"
            invalid-feedback="Nama lembaga harus dipilih."
            :disabled="readOnly"
          ></CSelect>
        </CCol>
        <CCol sm="12">
          <CInput
            label="Sisa Anggaran"
            placeholder="Masukkan sisa anggaran"
            type="number"
            v-model.trim="$v.formData.sisa_anggaran.$model"
            :is-valid="validate('sisa_anggaran')"
            :invalid-feedback="sisaAnggaranMsg"
            :readonly="readOnly"
            @keyup.enter="updateData"
          >
          </CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isLoading" />
      <CButton color="primary" @click="updateData()" v-if="!isLoading">
        Simpan
      </CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm';
import { AnggaranService } from '../../services/anggaran.service';
import { ValidationMessage } from '../../validations/message';
import { anggaranValidations } from '../../validations/validationRules';
import ToastMsg from '../../components/ToastMsg';
import { LembagaService } from '../../services/lembaga.service';

export default {
  name: 'EditDataAnggaran',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'anggaran',
        nama_lembaga: '',
        sisa_anggaran: '',
      },
      options: [],
      listToasts: [],
      isLoading: false,
      readOnly: true,
    };
  },
  validations: anggaranValidations,
  computed: {
    sisaAnggaranMsg: function() {
      if (!this.$v.formData.sisa_anggaran.required) {
        return ValidationMessage.required('Sisa Anggaran');
      } else if (!this.$v.formData.sisa_anggaran.numeric) {
        return ValidationMessage.numeric('Sisa Anggaran');
      }
      return null;
    },
  },
  methods: {
    validate(type) {
      if (this.$v.formData[type].$error) {
        return !this.$v.formData[type].$invalid;
      }
      return null;
    },
    setNamaLembaga(value) {
      this.formData.nama_lembaga = value;
      this.$v.formData.nama_lembaga.$touch();
    },
    async getDataLembaga() {
      try {
        const dataLembaga = await LembagaService.getAll();
        const dataAnggaran = await AnggaranService.getAll();

        const namaLembagaInAnggaran = dataAnggaran.map(item => {
          return item.Record.nama_lembaga;
        });

        this.options = dataLembaga
          .filter(item => {
            return (
              !namaLembagaInAnggaran.includes(item.Record.nama) ||
              item.Record.nama === this.formData.nama_lembaga
            );
          })
          .map(item => {
            return {
              label: item.Record.nama,
              value: item.Record.nama,
            };
          });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Mendapatkan data lembaga tidak berhasil',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
    },
    async getDataAnggaran() {
      this.isLoading = true;

      try {
        const result = await AnggaranService.get(this.$route.query.id);

        this.formData = result.data;

        await this.getDataLembaga();
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Mendapatkan data anggaran tidak berhasil',
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
        this.formData.sisa_anggaran = parseInt(this.formData.sisa_anggaran);
        const result = await AnggaranService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-anggaran' });
      } catch (err) {
        const toast = {
          message: `Terjadi masalah. ${err.response.data.message}`,
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getDataAnggaran();
  },
};
</script>

<style></style>
