// Containers
const TheContainer = () => import('@/containers/TheContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');
const Login = () => import('@/views/auth/LoginPage');

// Data Pengguna
const DataPengguna = () => import('@/views/data-pengguna/DataPengguna.vue');
const TambahDataPengguna = () => import('@/views/data-pengguna/TambahData.vue');
const EditDataPengguna = () => import('@/views/data-pengguna/EditData.vue');

// Data Provinsi
const DataProvinsi = () => import('@/views/data-provinsi/DataProvinsi.vue');
const TambahDataProvinsi = () => import('@/views/data-provinsi/TambahData.vue');
const EditDataProvinsi = () => import('@/views/data-provinsi/EditData.vue');

// Data Kategori
const DataKategori = () => import('@/views/data-kategori/DataKategori.vue');
const TambahDataKategori = () => import('@/views/data-kategori/TambahData.vue');
const EditDataKategori = () => import('@/views/data-kategori/EditData.vue');

// Data Lembaga
const DataLembaga = () => import('@/views/data-lembaga/DataLembaga.vue');
const TambahDataLembaga = () => import('@/views/data-lembaga/TambahData.vue');
const EditDataLembaga = () => import('@/views/data-lembaga/EditData.vue');

// Data Anggaran
const DataAnggaran = () => import('@/views/data-anggaran/DataAnggaran.vue');
const TambahDataAnggaran = () => import('@/views/data-anggaran/TambahData.vue');
const EditDataAnggaran = () => import('@/views/data-anggaran/EditData.vue');

// Data Penomoran
const DataPenomoran = () => import('@/views/data-penomoran/DataPenomoran.vue');
const TambahDataPenomoran = () =>
  import('@/views/data-penomoran/TambahData.vue');
const EditDataPenomoran = () => import('@/views/data-penomoran/EditData.vue');

// Data PMK
const DataPMK = () => import('@/views/data-pmk/DataPMK.vue');
const TambahDataPMK = () => import('@/views/data-pmk/TambahData.vue');
const EditDataPMK = () => import('@/views/data-pmk/EditData.vue');

export const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: TheContainer,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    path: '/data-pengguna',
    name: 'Data Pengguna',
    redirect: '/data-pengguna',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataPengguna,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Pengguna',
        component: TambahDataPengguna,
      },
      {
        path: 'edit',
        name: 'Edit Data Pengguna',
        component: EditDataPengguna,
      },
    ],
  },
  {
    path: '/data-provinsi',
    name: 'Data Provinsi',
    redirect: '/data-provinsi',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataProvinsi,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Provinsi',
        component: TambahDataProvinsi,
      },
      {
        path: 'edit',
        name: 'Edit Data Provinsi',
        component: EditDataProvinsi,
      },
    ],
  },
  {
    path: '/data-kategori',
    name: 'Data Kategori',
    redirect: '/data-kategori',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataKategori,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Kategori',
        component: TambahDataKategori,
      },
      {
        path: 'edit',
        name: 'Edit Data Kategori',
        component: EditDataKategori,
      },
    ],
  },
  {
    path: '/data-lembaga',
    name: 'Data Lembaga',
    redirect: '/data-lembaga',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataLembaga,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Lembaga',
        component: TambahDataLembaga,
      },
      {
        path: 'edit',
        name: 'Edit Data Lembaga',
        component: EditDataLembaga,
      },
    ],
  },
  {
    path: '/data-anggaran',
    name: 'Data Anggaran',
    redirect: '/data-anggaran',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataAnggaran,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Anggaran',
        component: TambahDataAnggaran,
      },
      {
        path: 'edit',
        name: 'Edit Data Anggaran',
        component: EditDataAnggaran,
      },
    ],
  },
  {
    path: '/data-penomoran',
    name: 'Data Penomoran',
    redirect: '/data-penomoran',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataPenomoran,
      },
      {
        path: 'tambah',
        name: 'Tambah Data Penomoran',
        component: TambahDataPenomoran,
      },
      {
        path: 'edit',
        name: 'Edit Data Penomoran',
        component: EditDataPenomoran,
      },
    ],
  },
  {
    path: '/data-pmk',
    name: 'Data PMK',
    redirect: '/data-pmk',
    component: TheContainer,
    children: [
      {
        path: '/',
        component: DataPMK,
      },
      {
        path: 'tambah',
        name: 'Tambah Data PMK',
        component: TambahDataPMK,
      },
      {
        path: 'edit',
        name: 'Edit Data PMK',
        component: EditDataPMK,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];
