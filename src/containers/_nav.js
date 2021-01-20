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
        name: 'Data Pemohon',
        route: '/',
        icon: 'cil-drop',
        items: [
          {
            name: 'Tambah Data',
            to: '/'
          }
        ]
      },
    ]
  }
]