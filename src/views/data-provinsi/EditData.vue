<template>
  <div>
    <card-form title="Edit Data Provinsi">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Provinsi"
            placeholder="Masukkan nama provinsi"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama provinsi harus diisi."
            @keyup.enter="updateData"
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
import CardForm from '../../components/CardForm.vue';
import ToastMsg from '../../components/ToastMsg.vue';
import { ProvinsiService } from '../../services/provinsi.service';
import { provinsiValidations } from '../../validations/validationRules';

export default {
  name: 'EditDataProvinsi',
  components: {
    CardForm,
    ToastMsg,
  },
  data() {
    return {
      formData: {
        docType: 'provinsi',
        nama: '',
      },
      isLoading: false,
      readOnly: true,
      listToasts: [],
    };
  },
  validations: provinsiValidations,
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
        const result = await ProvinsiService.get(this.$route.query.id);

        this.formData.nama = result.data.nama;
        this.readOnly = false;
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    async updateData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.isLoading = true;

      try {
        const result = await ProvinsiService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);
        return this.$router.push({ path: '/data-provinsi' });
      } catch (err) {
        const toast = {
          message: 'Terjadi Masalah. Data tidak berhasil diperbarui.',
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
