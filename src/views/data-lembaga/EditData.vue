<template>
  <div>
    <card-form title="Edit Data Lembaga">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Lembaga"
            placeholder="Masukkan nama lembaga"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama lembaga harus diisi."
            :readonly="readOnly"
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
import ToastMsg from '../../components/ToastMsg.vue';
import { LembagaService } from '../../services/lembaga.service';
import { lembagaValidations } from '../../validations/validationRules';
import { ValidationMessage } from '../../validations/message';

export default {
  name: 'EditDataLembaga',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'lembaga',
        nama: '',
        jumlah_anggaran: '',
      },
      listToasts: [],
      isLoading: false,
      readOnly: true,
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
    async getData() {
      this.isLoading = true;

      try {
        const result = await LembagaService.get(this.$route.query.id);

        this.formData.nama = result.data.nama;
        this.formData.jumlah_anggaran = result.data.jumlah_anggaran;
        this.readOnly = false;
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
    async updateData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.isLoading = true;

      try {
        this.formData.jumlah_anggaran = parseInt(this.formData.jumlah_anggaran);

        const result = await LembagaService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-lembaga' });
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
    await this.getData();
  },
};
</script>

<style></style>
