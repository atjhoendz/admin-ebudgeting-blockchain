<template>
  <div>
    <card-form title="Form Input Data Pengguna">
      <CRow>
        <CCol sm="12">
          <CInput
            label="Username"
            placeholder="Masukkan username"
            v-model.trim="$v.formData.username.$model"
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
            v-model.trim="$v.formData.nama_lengkap.$model"
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
            v-model.trim="$v.formData.nip.$model"
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
            :type="typePassword"
            v-model.trim="$v.formData.password.$model"
            :is-valid="validate('password')"
            :invalid-feedback="passwordMsg"
            autocomplete="nope"
          >
            <template #append-content>
              <div @click="isPasswordShow = !isPasswordShow" class="inputPwd">
                {{ isPasswordShow ? 'hide' : 'show' }}
              </div>
            </template>
          </CInput>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CSelect
            label="Jabatan"
            placeholder="Pilih jabatan"
            :options="options"
            :value="formData.jabatan"
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
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import CardForm from '../../components/CardForm.vue';
import { UsersService } from '../../services/user.service';
import { userValidations } from '../../validations/validationRules';
import { ValidationMessage } from '../../validations/message';
import { options } from './jabatanOptions';
import ToastMsg from '../../components/ToastMsg.vue';

export default {
  components: { CardForm, ToastMsg },
  name: 'TambahDataPengguna',
  data() {
    return {
      options,
      formData: {
        docType: 'user',
        username: '',
        nama_lengkap: '',
        password: '',
        nip: '',
        jabatan: '',
      },
      showLoading: false,
      listToasts: [],
      isPasswordShow: false,
    };
  },
  validations: userValidations,
  computed: {
    usernameMsg() {
      if (!this.$v.formData.username.required) {
        return ValidationMessage.required('Username');
      } else if (!this.$v.formData.username.minLength) {
        return ValidationMessage.minLength(4);
      }
      return null;
    },
    nipMsg() {
      if (!this.$v.formData.nip.required) {
        return ValidationMessage.required('NIP');
      } else if (!this.$v.formData.nip.numeric) {
        return ValidationMessage.numeric('NIP');
      } else if (
        !this.$v.formData.nip.minLength ||
        !this.$v.formData.nip.maxLength
      ) {
        return ValidationMessage.lengthNumeric('NIP', 18);
      }
      return null;
    },
    passwordMsg() {
      if (!this.$v.formData.password.required) {
        return ValidationMessage.required('Password');
      } else if (!this.$v.formData.password.minLength) {
        return ValidationMessage.minLength(6);
      } else if (!this.$v.formData.password.goodPassword) {
        return ValidationMessage.password('huruf', 'angka');
      }
      return null;
    },
    typePassword() {
      if (this.isPasswordShow) return 'text';
      return 'password';
    },
  },
  methods: {
    validate(type) {
      if (this.$v.formData[type].$error) {
        return !this.$v.formData[type].$invalid;
      }
      return null;
    },
    setJabatan(value) {
      this.formData.jabatan = value;
      this.$v.formData.jabatan.$touch();
    },
    async addData() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) {
        return;
      }

      this.showLoading = true;

      try {
        const result = await UsersService.addData(this.formData);

        const toast = {
          message: result.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);
        return this.$router.push({ path: '/data-pengguna' });
      } catch (err) {
        const toast = {
          message: err.response.data.message,
          color: 'danger',
        };

        this.listToasts.push(toast);
      }
      this.showLoading = false;
    },
  },
};
</script>

<style scoped>
.inputPwd:hover {
  cursor: pointer;
}
</style>
