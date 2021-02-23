<template>
  <card-form title="Form Input Data Pengguna">
    <CRow>
      <CCol sm="12">
        <p :class="isError + ' text-center'" v-if="message">
          {{ message }}
        </p>
        <CInput
          label="Username"
          placeholder="Masukkan username"
          v-model.trim="$v.username.$model"
          :invalid-feedback="usernameMsg"
          :is-valid="validate('username')"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          v-model.trim="$v.nama_lengkap.$model"
          invalid-feedback="Nama Lengkap harus diisi."
          :is-valid="validate('nama_lengkap')"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="NIP"
          placeholder="Masukkan NIP"
          type="number"
          v-model.trim="$v.nip.$model"
          :invalid-feedback="nipMsg"
          :is-valid="validate('nip')"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Password"
          placeholder="Masukkan password"
          type="password"
          v-model.trim="$v.password.$model"
          :is-valid="validate('password')"
          :invalid-feedback="passwordMsg"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CSelect
          label="Jabatan"
          placeholder="Pilih jabatan"
          :options="options"
          :value="jabatan"
          @update:value="setJabatan($event)"
          :is-valid="validate('jabatan')"
          invalid-feedback="Jabatan harus dipilih"
        ></CSelect>
      </CCol>
    </CRow>
    <CSpinner color="info" v-if="showLoading" />
    <CButton color="primary" @click="addData()" v-if="!showLoading">
      Simpan
    </CButton>
  </card-form>
</template>

<script>
import CardForm from '../../components/CardForm.vue';
import { UsersService } from '../../services/user.service';
import {
  required,
  minLength,
  numeric,
  maxLength,
} from 'vuelidate/lib/validators';

const options = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Bagian Umum', value: 'BagianUmum' },
  { label: 'Admin Keuangan', value: 'AdminKeuangan' },
  { label: 'Kepala Keuangan', value: 'KepalaKeuangan' },
  { label: 'Kepala Biro AUPK', value: 'KepalaBiroAUPK' },
];

export default {
  components: { CardForm },
  name: 'TambahDataPengguna',
  data() {
    return {
      options,
      username: '',
      nama_lengkap: '',
      password: '',
      nip: '',
      jabatan: '',
      showLoading: false,
      message: '',
      error: false,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
    },
    nama_lengkap: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      goodPassword: password => {
        return /[a-z]/.test(password) && /[0-9]/.test(password);
      },
    },
    nip: {
      required,
      numeric,
      minLength: minLength(18),
      maxLength: maxLength(18),
    },
    jabatan: {
      required,
    },
  },
  computed: {
    usernameMsg() {
      const msgRequired = 'Username harus diisi.';
      const msgMinLenght = 'Minimal 4 karakter.';
      if (!this.$v.username.required) {
        return msgRequired;
      } else if (!this.$v.username.minLength) {
        return msgMinLenght;
      }
      return msgRequired + msgMinLenght;
    },
    nipMsg() {
      const msgRequired = 'NIP harus diisi.';
      const msgNumeric = 'NIP harus angka.';
      const msgLength = 'Panjang NIP harus 18 digit.';
      if (!this.$v.nip.required) {
        return msgRequired;
      } else if (!this.$v.nip.numeric) {
        return msgNumeric;
      } else if (!this.$v.nip.minLength || !this.$v.nip.maxLength) {
        return msgLength;
      }
      return msgRequired + msgNumeric + msgLength;
    },
    passwordMsg() {
      const msgRequired = 'Password harus diisi.';
      const msgMinLenght = 'Minimal 6 karakter.';
      const msgChar = 'Harus terdapat huruf dan angka.';
      if (!this.$v.password.required) {
        return msgRequired;
      } else if (!this.$v.password.minLength) {
        return msgMinLenght;
      } else if (!this.$v.password.goodPassword) {
        return msgChar;
      }
      return msgRequired + msgMinLenght + msgChar;
    },
    isError() {
      return this.error ? 'text-danger' : 'text-info';
    },
  },
  methods: {
    validate(type) {
      if (this.$v[type].$error) {
        return !this.$v[type].$invalid;
      }
      return null;
    },
    setJabatan(value) {
      this.jabatan = value;
      this.$v.jabatan.$touch();
    },
    async addData() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.showLoading = true;
      const formData = {
        docType: 'user',
        username: this.username,
        nama_lengkap: this.nama_lengkap,
        password: this.password,
        nip: this.nip,
        jabatan: this.jabatan,
      };

      try {
        const result = await UsersService.addData(formData);
        if (result.statusCode == 201) {
          this.message = result.message;
        }
        this.showLoading = false;
        this.error = false;
      } catch (err) {
        this.message = err.response.data.message;
        this.showLoading = false;
        this.error = true;
      }
    },
  },
};
</script>

<style></style>
