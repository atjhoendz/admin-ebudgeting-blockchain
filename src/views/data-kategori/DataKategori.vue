<template>
  <CRow>
    <CCol sm="12" md="5" lg="5">
      <card-list-data
        title="Data Kategori"
        :fields="fields"
        :items="items"
        :routeEndpoint="routeEndpoint"
        ><template #proses="{item}">
          <CButtonGroup>
            <CButton color="success" :to="editByID(item.key)">Edit</CButton>
            <CButton color="danger" @click="deleteByID(item.key)"
              >Hapus</CButton
            >
          </CButtonGroup>
        </template></card-list-data
      >
    </CCol>
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue';
import { itemsKategori } from '../../sample-data/data';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama-kategori', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px' },
];

export default {
  name: 'DataKategori',
  components: { CardListData },
  data() {
    return {
      items: itemsKategori.map(item => {
        return { ...item };
      }),
      fields,
      routeEndpoint: 'data-kategori',
    };
  },
  methods: {
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`;
    },
    deleteByID(id) {
      console.log(id);
    },
  },
};
</script>

<style></style>
