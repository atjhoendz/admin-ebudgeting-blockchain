<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        :items="items"
        :fields="fields"
        :isLoading="isLoading"
        title="Data Pengguna"
        routeEndpoint="data-pengguna"
        @clicked="confirmDelete"
      ></card-list-data>
    </CCol>
    <CModal title="Hapus" color="warning" :show.sync="showModalDelete" centered>
      Apakah anda yakin untuk menghapus data ini?
      <template #footer>
        <CButton @click="showModalDelete = false" color="secondary"
          >Batal</CButton
        >
        <CSpinner color="info" v-if="isDeleting" />
        <CButton @click="deleteData()" color="danger" v-if="!isDeleting"
          >Hapus</CButton
        >
      </template>
    </CModal>
    <toast-msg
      :showToast="showMessage"
      color="success"
      :message="infoMessage"
    />
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
import ToastMsg from '../../components/ToastMsg';

export default {
  name: 'DataPengguna',
  components: {
    CardListData,
    ToastMsg,
  },
  data() {
    return {
      items: [],
      fields,
      isLoading: false,
      showModalDelete: false,
      keyForDelete: '',
      isDeleting: false,
      showMessage: false,
      infoMessage: '',
    };
  },
  async mounted() {
    await this.getAll();
  },
  methods: {
    async getAll() {
      this.isLoading = true;
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
    async confirmDelete(value) {
      this.showModalDelete = true;
      this.keyForDelete = value;
    },
    async deleteData() {
      this.isDeleting = true;
      const result = await UsersService.delete(this.keyForDelete);

      this.infoMessage = result.message;
      this.showMessage = true;

      this.showModalDelete = false;
      this.isDeleting = false;

      await this.getAll();
    },
  },
};
</script>

<style></style>
