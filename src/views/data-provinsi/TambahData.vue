<template>
  <div>
    <card-form title="Form Input Data Provinsi">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Nama Provinsi"
            placeholder="Masukkan nama provinsi"
            v-model.trim="$v.formData.nama.$model"
            :is-valid="validate('nama')"
            invalid-feedback="Nama provinsi harus diisi."
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
    <toast-msg
      :showTime="10000"
      :showToast="showToast"
      :color="isError"
      :message="message"
    />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm.vue';
import ToastMsg from '../../components/ToastMsg.vue';
import { ProvinsiService } from '../../services/provinsi.service';
import { provinsiValidations } from '../../validations/validationRules';

export default {
  components: { CardForm, ToastMsg },
  name: 'TambahDataProvinsi',
  data() {
    return {
      formData: {
        docType: 'provinsi',
        nama: '',
      },
      isAdding: false,
      error: false,
      showToast: false,
      message: '',
    };
  },
  computed: {
    isError: function() {
      return this.error ? 'danger' : 'success';
    },
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
        const result = await ProvinsiService.addData(this.formData);

        this.message = result.message;
        this.showToast = true;
        this.isAdding = false;
      } catch (err) {
        this.isAdding = false;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
