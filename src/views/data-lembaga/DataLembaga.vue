<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data Lembaga"
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
import { itemsLembaga } from '../../sample-data/data';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama-lembaga', _style: 'min-width:200px' },
  { key: 'jml-anggaran', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  name: 'DataLembaga',
  components: { CardListData },
  data() {
    return {
      items: itemsLembaga.map(item => {
        return { ...item };
      }),
      fields,
      routeEndpoint: 'data-lembaga',
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
