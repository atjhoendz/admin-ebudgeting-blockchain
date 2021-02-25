<template>
  <CRow>
    <CCol sm="12" md="5" lg="5">
      <card-list-data
        :items="items"
        :fields="fields"
        :width="5"
        title="Data Provinsi"
        :isLoading="isLoading"
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
import { ProvinsiService } from '../../services/provinsi.service';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama', label: 'Nama Provinsi', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  components: { CardListData },
  name: 'DataProvinsi',
  data() {
    return {
      items: [],
      fields,
      routeEndpoint: 'data-provinsi',
      isLoading: false,
    };
  },
  methods: {
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`;
    },
    deleteByID(id) {
      console.log(id);
    },
    async getAll() {
      try {
        this.isLoading = true;
        const data = await ProvinsiService.getAll();
        this.items = data.map(item => {
          const newItem = {
            key: item.Key,
            ...item.Record,
          };
          return newItem;
        });
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
  async mounted() {
    await this.getAll();
  },
};
</script>

<style></style>
