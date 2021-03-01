<template>
  <div>
    <card-form title="Form Input Data Lembaga">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Lembaga"
            placeholder="Masukkan nama lembaga"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama lembaga harus diisi."
          >
          </CInput>
        </CCol>
        <CCol sm="12">
          <CInput
            label="Jumlah Anggaran"
            placeholder="Masukkan jumlah anggaran"
            type="number"
            v-model.trim="$v.formData.jumlah_anggaran.$model"
            :is-valid="validate('jumlah_anggaran')"
            :invalid-feedback="jmlAnggaranMsg"
            @keyup.enter="addData"
          >
          </CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isAdding" />
      <CButton color="primary" @click="addData()" v-if="!isAdding">
        Simpan
      </CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm';
import ToastMsg from '../../components/ToastMsg.vue';
import { LembagaService } from '../../services/lembaga.service';
import { ValidationMessage } from '../../validations/message';
import { lembagaValidations } from '../../validations/validationRules';

export default {
  name: 'TambahDataLembaga',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'lembaga',
        nama: '',
        jumlah_anggaran: null,
      },
      isAdding: false,
      listToasts: [],
    };
  },
  validations: lembagaValidations,
  computed: {
    jmlAnggaranMsg: function() {
      if (!this.$v.formData.jumlah_anggaran.required) {
        return ValidationMessage.required('Jumlah Anggaran');
      } else if (!this.$v.formData.jumlah_anggaran.numeric) {
        return ValidationMessage.numeric('Jumlah Anggaran');
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
    async addData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.isAdding = true;

      try {
        this.formData.jumlah_anggaran = parseInt(this.formData.jumlah_anggaran);
        const result = await LembagaService.addData(this.formData);

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-lembaga' });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil ditambahkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isAdding = false;
    },
  },
};
</script>

<style></style>
