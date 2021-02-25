<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data PMK"
        :fields="fields"
        :items="itemsPMK"
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
import { itemsPMK } from '../../sample-data/data';

const fields = [
  { key: 'no', _style: 'width:10px' },
  'kategori-pmk',
  'jns-pmk',
  'tahun',
  'asal',
  'tujuan',
  'provinsi',
  'satuan',
  'biaya',
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  name: 'DataPMK',
  components: { CardListData },
  data() {
    return {
      itemsPMK,
      fields,
      routeEndpoint: 'data-pmk',
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
