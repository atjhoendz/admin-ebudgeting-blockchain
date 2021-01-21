export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Master']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Provinsi',
        to: '/data-provinsi',
        icon: 'cil-building',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-provinsi'
          },
          {
            name: 'Tambah Data',
            to: '/data-provinsi/tambah'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Kategori',
        to: '/data-kategori',
        icon: 'cil-library',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-kategori'
          },
          {
            name: 'Tambah Data',
            to: '/data-kategori/tambah'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Lembaga',
        to: '/data-lembaga',
        icon: 'cil-institution',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-lembaga'
          },
          {
            name: 'Tambah Data',
            to: '/data-lembaga/tambah'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Anggaran',
        to: '/data-anggaran',
        icon: 'cil-dollar',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-anggaran'
          },
          {
            name: 'Tambah Data',
            to: '/data-anggaran/tambah-data'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data PMK',
        to: '/data-pmk',
        icon: 'cil-list',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-pmk'
          },
          {
            name: 'Tambah Data',
            to: '/data-pmk/tambah-data'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Penomoran',
        to: '/data-penomoran',
        icon: 'cil-list-numbered',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-penomoran'
          },
          {
            name: 'Tambah Data',
            to: '/data-penomoran/tambah-data'
          }
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['User']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Data Pengguna',
        to: '/data-pengguna',
        icon: 'cil-user',
        items: [
          {
            name: 'Lihat Data',
            to: '/data-pengguna'
          },
          {
            name: 'Tambah Data',
            to: '/data-pengguna/tambah'
          }
        ]
      },
    ]
  }
]