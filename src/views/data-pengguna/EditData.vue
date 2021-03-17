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
                  readonly
                  description="Username tidak dapat diubah."
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
                  :readonly="readOnly"
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
                  :readonly="readOnly"
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
                  :disabled="readOnly"
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
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  :type="typePwdBaru"
                  v-model.trim="$v.passwordBaru.password.$model"
                  :is-valid="validate('password')"
                  :invalid-feedback="passwordBaruMsg"
                >
                  <template #append-content>
                    <div
                      @click="isPwdBaruShow = !isPwdBaruShow"
                      class="inputPwdBaru"
                    >
                      {{ isPwdBaruShow ? 'hide' : 'show' }}
                    </div>
                  </template>
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Konfirmasi Password Baru"
                  placeholder="Masukkan ulang password baru"
                  :type="typePwdConfirm"
                  v-model.trim="$v.passwordBaru.konfirmasi.$model"
                  :is-valid="validate('konfirmasi')"
                  invalid-feedback="Konfirmasi password tidak sama."
                  @keyup.enter="updatePassword()"
                >
                  <template #append-content>
                    <div
                      @click="isPwdConfirmShow = !isPwdConfirmShow"
                      class="inputPwdConfirm"
                    >
                      {{ isPwdConfirmShow ? 'hide' : 'show' }}
                    </div>
                  </template>
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
    <toast-msg :listToasts="listToasts" />
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
      passwordBaru: {
        password: '',
        konfirmasi: '',
      },
      showLoadingUser: false,
      showLoadingPassword: false,
      listToasts: [],
      readOnly: true,
      isPwdBaruShow: false,
      isPwdConfirmShow: false,
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
    isError() {
      return this.error ? 'danger' : 'success';
    },
    typePwdBaru() {
      if (this.isPwdBaruShow) return 'text';
      return 'password';
    },
    typePwdConfirm() {
      if (this.isPwdConfirmShow) return 'text';
      return 'password';
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
        this.showLoadingUser = true;
        const response = await UsersService.get(id);

        this.formData = response.data;
        this.showLoadingUser = false;
        this.readOnly = false;
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil didapatkan.',
          color: 'danger',
        };

        this.listToasts.push(toast);
      }
    },
    async update() {
      this.$v.formData.$touch();

      if (this.$v.formData.$invalid) return;

      this.showLoadingUser = true;

      try {
        const id = this.$route.query.id;
        const response = await UsersService.update(id, this.formData);

        const toast = {
          message: response.message,
          color: 'success',
        };
        this.$store.commit('toast/ADD_TOAST', toast);

        return this.$router.push({ path: '/data-pengguna' });
      } catch (err) {
        const toast = {
          message: 'Data tidak berhasil diperbarui.',
          color: 'danger',
        };

        this.listToasts.push(toast);
      }
      this.showLoadingUser = false;
    },
    async updatePassword() {
      this.$v.passwordBaru.$touch();

      if (this.$v.passwordBaru.$invalid) return;

      this.showLoadingPassword = true;
      try {
        const id = this.$route.query.id;
        this.formData.password = this.passwordBaru.password;
        const response = await UsersService.updatePassword(id, this.formData);

        const toast = {
          message: response.message,
          color: 'success',
        };

        this.$store.commit('toast/ADD_TOAST', toast);
        return this.$router.push({ path: '/data-pengguna' });
      } catch (err) {
        const toast = {
          message: err.message,
          color: 'danger',
        };

        this.listToasts.push(toast);
      }
      this.showLoadingPassword = false;
    },
  },
  async mounted() {
    await this.getData(this.$route.query.id);
  },
};
</script>

<style scoped>
.inputPwdBaru:hover,
.inputPwdConfirm:hover {
  cursor: pointer;
}
</style>
