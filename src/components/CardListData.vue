<template>
  <CCard>
    <CCardHeader class="d-flex">
      <span class="h4 mr-auto my-auto">{{ title }}</span>
      <CButton
        v-if="showButton"
        color="primary"
        class="d-md-down-none"
        :to="urlTambahData"
        >Tambah Data</CButton
      >
      <CButton
        v-if="showButton"
        color="primary"
        class="d-lg-none"
        :to="urlTambahData"
      >
        <CIcon name="cil-plus" />
      </CButton>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"
        table-filter
        items-per-page-select
        :items-per-page="5"
        :loading="isLoading"
        hover
        sorter
        pagination
      >
        <template #proses="{item}" v-if="showProses">
          <td>
            <slot name="proses" :item="item"></slot>
          </td>
        </template>
        <template #no="{index}">
          <td>
            {{ index + 1 }}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: 'CardListData',
  props: {
    title: {
      type: String,
      required: true,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    routeEndpoint: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    showProses: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    urlTambahData: function() {
      return this.routeEndpoint + '/tambah';
    },
  },
};
</script>

<style></style>
