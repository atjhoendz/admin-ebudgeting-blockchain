<template>
  <CRow>
    <CCol sm="12" md="8" lg="7">
      <card-list-data
        title="Data Penomoran"
        :fields="fields"
        :items="itemsPenomoran"
        :routeEndpoint="routeEndpoint"
      >
        <template #proses="{item}">
          <CButtonGroup>
            <CButton color="success" :to="editByID(item.key)">Edit</CButton>
            <CButton color="danger" @click="deleteByID(item.key)"
              >Hapus</CButton
            >
          </CButtonGroup>
        </template>
      </card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue';
import { itemsPenomoran } from '../../sample-data/data';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nomor-pmk', _style: 'min-width:200px' },
  { key: 'tanggal', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  name: 'DataPenomoran',
  components: { CardListData },
  data() {
    return {
      itemsPenomoran,
      fields,
      routeEndpoint: 'data-penomoran',
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
