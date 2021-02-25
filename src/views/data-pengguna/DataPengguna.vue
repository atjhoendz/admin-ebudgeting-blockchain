<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        :items="items"
        :fields="fields"
        :isLoading="isLoading"
        title="Data Pengguna"
        routeEndpoint="data-pengguna"
      ></card-list-data>
    </CCol>
  </CRow>
</template>

<script>
const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'username', _style: 'min-width:200px' },
  { key: 'nama_lengkap', label: 'Nama Lengkap' },
  { key: 'nip', label: 'NIP' },
  { key: 'jabatan', _style: 'min-width:100px' },
  { key: 'proses', _style: 'width:50px' },
];

import CardListData from '../../components/CardListData';
import { UsersService } from '../../services/user.service';

export default {
  name: 'DataPengguna',
  components: {
    CardListData,
  },
  data() {
    return {
      items: [],
      fields,
      isLoading: true,
    };
  },
  async mounted() {
    await this.getAll();
  },
  methods: {
    async getAll() {
      const data = await UsersService.getAll();
      this.items = data.map(item => {
        const newItem = {
          key: item.Key,
          ...item.Record,
        };
        return newItem;
      });
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
