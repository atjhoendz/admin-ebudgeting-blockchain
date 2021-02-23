<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <CCard>
        <CCardHeader class="h4">
          {{ title }}
        </CCardHeader>
        <CCardBody>
          <CForm>
            <slot></slot>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'CardForm',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
