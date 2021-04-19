<template>
  <div>
    <CDropdown inNav class="c-header-nav-items" placement="bottom">
      <template #toggler-content>
        <span class="h4" style="color: #3c4b64">{{
          $store.state.user.currentUser.username
        }}</span>
      </template>
      <CDropdownItem @click="makeLogout()">
        <CIcon name="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdown>
    <toast-msg :listToasts="listToasts" />
  </div>
</template>

<script>
import { AuthService } from '../services/auth.service';
import ToastMsg from '../components/ToastMsg';

export default {
  name: 'TheHeaderDropdownAccnt',
  components: {
    ToastMsg,
  },
  data() {
    return {
      listToasts: [],
    };
  },
  methods: {
    async makeLogout() {
      try {
        await AuthService.makeLogout();
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Logout tidak berhasil.',
          color: 'danger',
        });
      }
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
