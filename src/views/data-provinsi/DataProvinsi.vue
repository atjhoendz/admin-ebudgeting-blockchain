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
import ToastMsg from '../../components/ToastMsg';
import { ProvinsiService } from '../../services/provinsi.service';

const fields = [
  { key: 'no', _style: 'width:10px' },
  { key: 'nama', label: 'Nama Provinsi', _style: 'min-width:200px' },
  { key: 'proses', _style: 'width:50px; text-align:center' },
];

export default {
  components: { CardListData, ToastMsg },
  name: 'DataProvinsi',
  data() {
    return {
      items: [],
      fields,
      routeEndpoint: 'data-provinsi',
      isLoading: false,
      isDeleting: false,
      showModalDelete: false,
      keyForDelete: '',
      listToasts: [],
    };
  },
  methods: {
    editByID(id) {
      return `${this.routeEndpoint}/edit?id=${id}`;
    },
    async deleteData() {
      this.isDeleting = true;

      try {
        const result = await ProvinsiService.delete(this.keyForDelete);

        const toast = {
          message: result.message,
          color: 'success',
        };
        this.listToasts.push(toast);

        await this.getAll();
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Data tidak berhasil dihapus',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isDeleting = false;
      this.showModalDelete = false;
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
      } catch (err) {
        const toast = {
          message: 'Terjadi masalah. Tidak berhasil mendapatkan data.',
          color: 'danger',
        };
        this.listToasts.push(toast);
      }
      this.isLoading = false;
    },
    confirmDelete(key) {
      this.showModalDelete = true;
      this.keyForDelete = key;
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
