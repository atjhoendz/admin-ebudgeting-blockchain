<template>
  <CRow>
    <CCol col="12">
      <card-list-data
        title="Data PMK"
        :fields="fields"
        :items="items"
        :routeEndpoint="routeEndpoint"
        :isLoading="isLoading"
        ><template #proses="{item}">
          <CButtonGroup>
            <CButton color="success" :to="editByID(item.key)">Edit</CButton>
            <CButton color="danger" @click="confirmDelete(item.key)"
              >Hapus</CButton
            >
          </CButtonGroup>
        </template></card-list-data
      >
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
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue';
import ToastMsg from '../../components/ToastMsg.vue';
import { PMKService } from '../../services/pmk.service';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama_kategori', label: 'Kategori PMK' },
  { key: 'jenis_pmk', label: 'Jenis PMK' },
  { key: 'tahun' },
  { key: 'asal' },
  { key: 'tujuan' },
  { key: 'nama_provinsi', label: 'Provinsi Tujuan' },
  { key: 'satuan' },
  { key: 'biaya' },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  name: 'DataPMK',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fields,
      routeEndpoint: 'data-pmk',
      listToasts: [],
      isDeleting: false,
      isLoading: false,
      keyForDelete: '',
      showModalDelete: false,
    };
  },
  methods: {
    async getAll() {
      this.isLoading = true;

      try {
        const data = await PMKService.getAll();

        this.items = data.map(item => {
          item.Record.biaya = parseInt(item.Record.biaya).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          });
          return {
            key: item.Key,
            ...item.Record,
          };
        });
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil didapatkan.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }

      this.isLoading = false;
    },
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`;
    },
    confirmDelete(key) {
      this.keyForDelete = key;
      this.showModalDelete = true;
    },
    async deleteData() {
      this.isDeleting = true;

      try {
        const result = await PMKService.delete(this.keyForDelete);

        const toast = {
          message: result.message,
          color: 'success',
        };
        this.listToasts.push(toast);

        await this.getAll();
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil dihapus.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isDeleting = false;
      this.showModalDelete = false;
    },
  },
  async mounted() {
    await this.getAll();
    if (this.$store.state.toast.listToasts.length) {
      this.listToasts = this.$store.state.toast.listToasts;
      this.$store.commit('toast/RESET');
    }
  },
};
</script>

<style></style>
