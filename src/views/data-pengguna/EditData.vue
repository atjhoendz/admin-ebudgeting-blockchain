<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <CForm>
        <CCard>
          <CCardHeader class="h4">
            Edit Data Pengguna
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Username"
                  placeholder="Masukkan username"
                  v-model.trim="$v.formData.username.$model"
                  :is-valid="validate('username')"
                  :invalid-feedback="usernameMsg"
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
                  :is-valid="validate('nama_lengkap')"
                  invalid-feedback="Nama Lengkap harus diisi."
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
                  :is-valid="validate('nip')"
                  :invalid-feedback="nipMsg"
                >
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  label="Jabatan"
                  :options="options"
                  :value="formData.jabatan"
                  @update:value="setJabatan($event)"
                  :is-valid="validate('jabatan')"
                  invalid-feedback="Jabatan harus diisi."
                ></CSelect>
              </CCol>
            </CRow>
            <CSpinner color="info" v-if="showLoadingUser" />
            <CButton color="primary" @click="update()" v-if="!showLoadingUser">
              Simpan
            </CButton>
          </CCardBody>
        </CCard>
      </CForm>
    </CCol>
    <CCol sm="12" md="6" lg="5">
      <CForm>
        <CCard>
          <CCardHeader class="h4">
            Edit Password
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Password Lama"
                  placeholder="Masukkan password lama"
                  type="password"
                  v-model.trim="$v.passwordLama.$model"
                  :is-valid="validate('passwordLama')"
                  :invalid-feedback="passwordLamaMsg"
                ></CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  type="password"
                  v-model.trim="$v.passwordBaru.password.$model"
                  :is-valid="validate('password')"
                  :invalid-feedback="passwordBaruMsg"
                >
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Konfirmasi Password Baru"
                  placeholder="Masukkan ulang password baru"
                  type="password"
                  v-model.trim="$v.passwordBaru.konfirmasi.$model"
                  :is-valid="validate('konfirmasi')"
                  invalid-feedback="Konfirmasi password tidak sama."
                >
                </CInput>
              </CCol>
            </CRow>
            <CSpinner color="info" v-if="showLoadingPassword" />
            <CButton
              color="primary"
              v-if="!showLoadingPassword"
              @click="updatePassword()"
              >Simpan</CButton
            >
          </CCardBody>
        </CCard>
      </CForm>
    </CCol>
    <toast-msg
      :showTime="10000"
      :showToast="showToast"
      :message="message"
      :color="isError"
    />
  </CRow>
</template>

<script>
import { UsersService } from '../../services/user.service';
import { options } from './jabatanOptions';
import { userValidations } from '../../validations/validationRules';
import { ValidationMessage } from '../../validations/message';
import ToastMsg from '../../components/ToastMsg.vue';

export default {
  name: 'EditDataPengguna',
  components: {
    ToastMsg,
  },
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
      passwordLama: '',
      passwordBaru: {
        password: '',
        konfirmasi: '',
      },
      showLoadingUser: false,
      showLoadingPassword: false,
      message: '',
      error: false,
      showToast: false,
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
    passwordBaruMsg() {
      if (!this.$v.passwordBaru.password.required) {
        return ValidationMessage.required('Password Baru');
      } else if (!this.$v.passwordBaru.password.minLength) {
        return ValidationMessage.minLength(6);
      } else if (!this.$v.passwordBaru.password.goodPassword) {
        return ValidationMessage.password('huruf', 'angka');
      }
      return null;
    },
    passwordLamaMsg() {
      if (!this.$v.passwordLama.required) {
        return ValidationMessage.required('Password Lama');
      } else if (!this.$v.passwordLama.minLength) {
        return ValidationMessage.minLength(6);
      } else if (!this.$v.passwordLama.goodPassword) {
        return ValidationMessage.password('huruf', 'angka');
      }
      return null;
    },
    isError() {
      return this.error ? 'danger' : 'success';
    },
  },
  methods: {
    validate(type) {
      if (this.$v[type]?.$error) {
        return !this.$v[type].$invalid;
      }

      if (this.$v.passwordBaru[type]?.$error) {
        return !this.$v.passwordBaru[type].$invalid;
      }

      if (this.$v.formData[type]?.$error) {
        return !this.$v.formData[type].$invalid;
      }
      return null;
    },
    setJabatan(value) {
      this.formData.jabatan = value;
      this.$v.formData.jabatan.$touch();
    },
    async getData(id) {
      try {
        const response = await UsersService.get(id);

        this.formData = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async update() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.showLoadingUser = true;

      try {
        const id = this.$route.query.id;
        const response = await UsersService.update(id, this.formData);

        this.showLoadingUser = false;
        this.error = false;
        this.message = response.message;
        this.showToast = true;
      } catch (err) {
        this.showLoadingUser = false;
        this.error = true;
        this.message = 'Data tidak berhasil diperbarui.';
        this.showToast = true;
      }

      setTimeout(() => {
        this.messageUser = '';
      }, 60000);
    },
    async updatePassword() {
      this.$v.passwordBaru.$touch();
      this.$v.passwordLama.$touch();

      if (this.$v.passwordBaru.$invalid || this.$v.passwordLama.$invalid)
        return;

      this.showLoadingPassword = true;
      try {
        const id = this.$route.query.id;
        const password_lama = this.passwordLama;
        this.formData.password = this.passwordBaru.password;
        const dataPwd = { password_lama, ...this.formData };
        const response = await UsersService.updatePassword(id, dataPwd);

        this.showLoadingPassword = false;
        this.error = false;
        this.message = response.message;
        this.showToast = true;
      } catch (err) {
        this.showLoadingPassword = false;
        this.error = true;
        this.message = err.message;
        this.showToast = true;
      }

      setTimeout(() => {
        this.messagePwd = '';
      }, 60000);
    },
  },
  async mounted() {
    await this.getData(this.$route.query.id);
  },
};
</script>

<style></style>
