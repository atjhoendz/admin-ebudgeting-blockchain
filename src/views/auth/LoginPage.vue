<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="4" class="text-center mb-4">
          <img
            src="@/assets/icons/logo_full_dark.svg"
            height="70px"
            alt="logo"
          />
        </CCol>
      </CRow>
      <CRow class="justify-content-center">
        <CCol md="6" lg="5" sm="10" col="12">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username"
                    v-model="username"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    @keyup.enter="makeLogin"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" @click="makeLogin"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { AuthService } from '@/services/auth.service';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async makeLogin() {
      try {
        await AuthService.makeLogin({
          username: this.username,
          password: this.password,
        });
        await this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
