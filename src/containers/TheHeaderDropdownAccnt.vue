<template>
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
</template>

<script>
import { AuthService } from '../services/auth.service';

export default {
  name: 'TheHeaderDropdownAccnt',
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    async makeLogout() {
      try {
        await AuthService.makeLogout();
      } catch (err) {
        console.log(err);
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
