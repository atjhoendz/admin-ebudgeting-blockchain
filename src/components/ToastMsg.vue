<template>
  <CToaster :autohide="showTime">
    <template v-if="showToast">
      <CToast :show="true" :header="title" :color="color">
        {{ message }}
      </CToast>
    </template>
  </CToaster>
</template>

<script>
export default {
  name: 'ToastMsg',
  props: {
    showTime: {
      type: Number,
      default: 5000,
    },
    showToast: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Information',
    },
    color: {
      type: String,
      default: 'info',
    },
    message: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
