<template>
  <div>
    <card-form title="Edit Data Penomoran">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nomor PMK"
            placeholder="Masukkan nomor pmk"
            v-model.trim="$v.formData.nomor.$model"
            :is-valid="validate('nomor')"
            invalid-feedback="Nomor PMK harus diisi."
            :readonly="readOnly"
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
            :readonly="readOnly"
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
import ToastMsg from '../../components/ToastMsg';
import { PenomoranService } from '../../services/penomoran.service';
import { penomoranValidations } from '../../validations/validationRules';

export default {
  name: 'EditDataPenomoran',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'penomoran',
        nomor: '',
        tanggal: '',
      },
      listToasts: [],
      isLoading: false,
      readOnly: true,
    };
  },
  validations: penomoranValidations,
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
        const result = await PenomoranService.get(this.$route.query.id);

        this.formData = result.data;
        this.readOnly = false;
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Mendapatkan data tidak berhasil.',
          color: 'danger',
        };
        this.listToast.push(toast);
      }
      this.isLoading = false;
    },
    async updateData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.isLoading = true;

      try {
        const result = await PenomoranService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-penomoran' });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil ditambahkan.',
          color: 'danger',
        };

        this.listToast.push(toast);
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
