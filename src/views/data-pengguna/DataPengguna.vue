<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        :items="items"
        :fields="fields"
        :isLoading="isLoading"
        title="Data Pengguna"
        :routeEndpoint="routeEndpoint"
      >
        <template #proses="{item}">
          <CButtonGroup>
            <CButton color="success" :to="editByID(item.key)">Edit</CButton>
            <CButton
              color="danger"
              @click="confirmDelete(item.key)"
              :disabled="checkCurrentUser(item.key)"
              >Hapus</CButton
            >
          </CButtonGroup>
        </template>
      </card-list-data>
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
  { key: 'proses', _style: 'width:50px; text-align:center' },
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
      routeEndpoint: 'data-pengguna',
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
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`;
    },
    checkCurrentUser(key) {
      return key == this.$store.state.user.currentUser.sub;
    },
  },
};
</script>

<style></style>
