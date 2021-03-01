<template>
  <div>
    <card-form title="Form Input Data Kategori">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Kategori"
            placeholder="Masukkan nama kategori"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama kategori harus diisi."
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
import CardForm from '../../components/CardForm.vue';
import ToastMsg from '../../components/ToastMsg.vue';
import { provinsiValidations } from '../../validations/validationRules';
import { KategoriService } from '../../services/kategori.service';

export default {
  name: 'TambahDataKategori',
  components: { CardForm, ToastMsg },
  data() {
    return {
      formData: {
        docType: 'kategori',
        nama: '',
      },
      listToasts: [],
      isAdding: false,
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
    async addData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      try {
        this.isAdding = true;
        const result = await KategoriService.addData(this.formData);

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-kategori' });
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
