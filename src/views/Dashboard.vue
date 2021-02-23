<template>
  <CRow>
    <CCol sm="12" lg="6">
      <CWidgetSimple header="Message" :text="message"> </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="3" v-for="data in dataDashboard" :key="data.title">
      <CWidgetSimple :header="data.title" :text="data.text"> </CWidgetSimple>
    </CCol>
    <CCol col="12">
      <card-list-data
        :fields="fields"
        :items="dataUser"
        :showProses="false"
        :showButton="false"
        :isLoading="isLoading"
        title="Data Pengguna"
        routeEndpoint="data-pengguna"
      >
      </card-list-data>
    </CCol>
  </CRow>
</template>

<script>
import CardListData from '../components/CardListData.vue';
import { UsersService } from '../services/user.service';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama_lengkap', label: 'Nama', _style: 'min-width:200px' },
  { key: 'nip', label: 'NIP' },
  { key: 'jabatan', _style: 'min-width:100px' },
];

const dataDashboard = [
  {
    title: 'Data Provinsi',
    text: '34',
  },
  {
    title: 'Data Kategori',
    text: '10',
  },
  {
    title: 'Data Lembaga',
    text: '16',
  },
  {
    title: 'Data Anggaran',
    text: '20',
  },
  {
    title: 'Data PMK',
    text: '5',
  },
  {
    title: 'Data Penomoran',
    text: '5',
  },
];

export default {
  name: 'Dashboard',
  components: { CardListData },
  data() {
    return {
      dataDashboard,
      fields,
      message: 'Selamat Datang di Halaman Admin',
      dataUser: [],
      isLoading: true,
    };
  },
  async mounted() {
    await this.getAllUser();
  },
  methods: {
    async getAllUser() {
      const data = await UsersService.getAll();
      this.dataUser = data.map(item => {
        return { ...item.Record };
      });
      this.isLoading = false;
    },
  },
};
</script>
