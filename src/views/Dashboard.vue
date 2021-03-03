<template>
  <CRow>
    <CCol sm="12" lg="6">
      <CWidgetSimple header="Message" :text="message"> </CWidgetSimple>
    </CCol>
    <CCol sm="12" lg="3" v-for="data in dataDashboard" :key="data.title">
      <CWidgetSimple :header="data.title" :text="data.text">
        <CSpinner color="info" v-if="isLoading && !data.text.length" />
      </CWidgetSimple>
    </CCol>
    <CCol col="12">
      <card-list-data
        :fields="fields"
        :items="dataUser"
        :showProses="false"
        :showButton="false"
        :isLoading="isLoading && !dataUser.length"
        title="Data Pengguna"
        routeEndpoint="data-pengguna"
      >
      </card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
/* eslint-disable no-useless-catch */
import CardListData from '../components/CardListData.vue';
import { UsersService } from '../services/user.service';
import { ProvinsiService } from '../services/provinsi.service';
import { AnggaranService } from '../services/anggaran.service';
import { KategoriService } from '../services/kategori.service';
import { LembagaService } from '../services/lembaga.service';
import { PenomoranService } from '../services/penomoran.service';
import { PMKService } from '../services/pmk.service';
import ToastMsg from '../components/ToastMsg.vue';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama_lengkap', label: 'Nama', _style: 'min-width:200px' },
  { key: 'nip', label: 'NIP' },
  { key: 'jabatan', _style: 'min-width:100px' },
];

export default {
  name: 'Dashboard',
  components: { CardListData, ToastMsg },
  data() {
    return {
      dataDashboard: [
        {
          title: 'Data Provinsi',
          text: '',
        },
        {
          title: 'Data Kategori',
          text: '',
        },
        {
          title: 'Data Lembaga',
          text: '',
        },
        {
          title: 'Data Anggaran',
          text: '',
        },
        {
          title: 'Data PMK',
          text: '',
        },
        {
          title: 'Data Penomoran',
          text: '',
        },
      ],
      fields,
      message: 'Selamat Datang di Halaman Admin',
      dataUser: [],
      isLoading: true,
      listToasts: [],
    };
  },
  methods: {
    async getAllUser() {
      try {
        const data = await UsersService.getAll();
        this.dataUser = data.map(item => {
          return { ...item.Record };
        });
      } catch (err) {
        throw err;
      }
    },
    async getCountProvinsi() {
      try {
        const data = await ProvinsiService.getCountData();
        this.dataDashboard[0].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getCountKategori() {
      try {
        const data = await KategoriService.getCountData();
        this.dataDashboard[1].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getCountLembaga() {
      try {
        const data = await LembagaService.getCountData();
        this.dataDashboard[2].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getCountAnggaran() {
      try {
        const data = await AnggaranService.getCountData();
        this.dataDashboard[3].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getCountPMK() {
      try {
        const data = await PMKService.getCountData();
        this.dataDashboard[4].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getCountPenomoran() {
      try {
        const data = await PenomoranService.getCountData();
        this.dataDashboard[5].text = data.toString();
      } catch (err) {
        throw err;
      }
    },
    async getDataDashboard() {
      this.isLoading = true;
      try {
        await this.getAllUser();
        await this.getCountProvinsi();
        await this.getCountKategori();
        await this.getCountLembaga();
        await this.getCountAnggaran();
        await this.getCountPMK();
        await this.getCountPenomoran();
      } catch (err) {
        const toast = {
          message:
            'Terjadi masalah. Mendapatkan data dashboard tidak berhasil.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
    },
  },
  async mounted() {
    await this.getDataDashboard();
  },
};
</script>
