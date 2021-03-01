<template>
  <div>
    <card-form title="Edit Data Kategori">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Kategori"
            placeholder="Masukkan nama kategori"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama kategori harus diisi."
            @keyup.enter="updateData"
            :readonly="readOnly"
          >
          </CInput>
        </CCol>
      </CRow>
      <CSpinner color="info" v-if="isLoading" />
      <CButton color="primary" v-if="!isLoading" @click="updateData()">
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
      isDeleting: false,
      isLoading: false,
      readOnly: true,
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
        const result = await KategoriService.get(this.$route.query.id);

        this.formData.nama = result.data.nama;
        this.readOnly = false;
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Tidak berhasil mendapatkan data.',
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
        const result = await KategoriService.update(
          this.$route.query.id,
          this.formData,
        );

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-kategori' });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil diperbarui',
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
