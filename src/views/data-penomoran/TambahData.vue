<template>
  <div>
    <card-form title="Form Input Data Penomoran">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nomor PMK"
            placeholder="Masukkan nomor pmk"
            type="number"
            v-model.trim="$v.formData.nomor.$model"
            :is-valid="validate('nomor')"
            :invalid-feedback="nomorMsg"
          >
          </CInput>
        </CCol>
        <CCol sm="12">
          <CInput
            label="Tanggal"
            type="date"
            v-model.trim="$v.formData.tanggal.$model"
            :is-valid="validate('tanggal')"
            invalid-feedback="Tanggal harus diisi."
          >
          </CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isAdding" />
      <CButton color="primary" @click="addData" v-if="!isAdding">
        Simpan
      </CButton>
    </card-form>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm';
import ToastMsg from '../../components/ToastMsg';
import { PenomoranService } from '../../services/penomoran.service';
import { ValidationMessage } from '../../validations/message';
import { penomoranValidations } from '../../validations/validationRules';

export default {
  name: 'TambahDataPenomoran',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'penomoran',
        nomor: '',
        tanggal: '',
      },
      isAdding: false,
      listToasts: [],
    };
  },
  validations: penomoranValidations,
  computed: {
    nomorMsg: function() {
      if (!this.$v.formData.nomor.required) {
        return ValidationMessage.required('Nomor PMK');
      } else if (!this.$v.formData.nomor.numeric) {
        return ValidationMessage.numeric('Nomor PMK');
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
        const result = await PenomoranService.addData(this.formData);

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-penomoran' });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil ditambahkan',
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
