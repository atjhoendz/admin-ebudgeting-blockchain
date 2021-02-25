<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data Anggaran"
        :fields="fields"
        :items="itemsAnggaran"
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
import { itemsAnggaran } from '../../sample-data/data';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama-lembaga', _style: 'min-width:200px' },
  { key: 'sisa-anggaran', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px' },
];

export default {
  name: 'DataAnggaran',
  components: { CardListData },
  data() {
    return {
      itemsAnggaran,
      fields,
      routeEndpoint: 'data-anggaran',
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
