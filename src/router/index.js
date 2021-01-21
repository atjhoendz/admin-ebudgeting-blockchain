import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/auth/LoginPage')

// Data Pengguna
const DataPengguna = () => import('@/views/data-pengguna/DataPengguna.vue')
const TambahDataPengguna = () => import('@/views/data-pengguna/TambahData.vue')
const EditDataPengguna = () => import('@/views/data-pengguna/EditData.vue')

// Data Provinsi
const DataProvinsi = () => import('@/views/data-provinsi/DataProvinsi.vue')
const TambahDataProvinsi = () => import('@/views/data-provinsi/TambahData.vue')
const EditDataProvinsi = () => import('@/views/data-provinsi/EditData.vue')

Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ]
    },
    {
      path: '/data-pengguna',
      name: 'Data Pengguna',
      redirect: '/data-pengguna',
      component: TheContainer,
      children: [
        {
          path: '/',
          component: DataPengguna
        },
        {
          path: 'tambah',
          name: 'Tambah Data Pengguna',
          component: TambahDataPengguna
        },
        {
          path: 'edit',
          name: 'Edit Data Pengguna',
          component: EditDataPengguna
        }
      ]
    },
    {
      path: '/data-provinsi',
      name: 'Data Provinsi',
      redirect: '/data-provinsi',
      component: TheContainer,
      children: [
        {
          path: '/',
          component: DataProvinsi
        },
        {
          path: 'tambah',
          name: 'Tambah Data Provinsi',
          component: TambahDataProvinsi
        },
        {
          path: 'edit',
          name: 'Edit Data Provinsi',
          component: EditDataProvinsi
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
}

