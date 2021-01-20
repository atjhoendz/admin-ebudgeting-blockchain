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
          path: 'tambah-data',
          name: 'Tambah Data Pengguna',
          component: TambahDataPengguna
        },
        {
          path: 'edit-data',
          name: 'Edit Data Pengguna',
          component: EditDataPengguna
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

