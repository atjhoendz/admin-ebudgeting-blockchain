<template>
  <CRow>
    <CCol sm="12" md="7" lg="7">
      <card-list-data
        title="Data Anggaran"
        :fields="fields"
        :items="items"
        :routeEndpoint="routeEndpoint"
        :isLoading="isLoading"
      >
        <template #proses="{item}">
          <CButtonGroup>
            <CButton color="success" :to="editByID(item.key)">Edit</CButton>
            <CButton color="danger" @click="confirmDelete(item.key)"
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
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../../components/CardListData.vue';
import ToastMsg from '../../components/ToastMsg.vue';
import { AnggaranService } from '../../services/anggaran.service';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama_lembaga', label: 'Nama Lembaga', _style: 'min-width:200px' },
  {
    key: 'sisa_anggaran',
    label: 'Sisa Anggaran',
    _style: 'min-width:200px',
  },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  name: 'DataAnggaran',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fields,
      routeEndpoint: 'data-anggaran',
      listToasts: [],
      isLoading: false,
      showModalDelete: false,
      isDeleting: false,
      keyForDelete: '',
    };
  },
  methods: {
    async getAll() {
      this.isLoading = true;

      try {
        const data = await AnggaranService.getAll();

        this.items = data.map(item => {
          item.Record.sisa_anggaran = parseInt(
            item.Record.sisa_anggaran,
          ).toLocaleString('id', {
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
        const result = await AnggaranService.delete(this.keyForDelete);

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
