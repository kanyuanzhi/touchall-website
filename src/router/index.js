import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: '????????????', icon: 'user' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Setting',
    meta: { title: '???????????????', icon: 'setting', noCache: true },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/setting/user'),
        meta: { title: '????????????', icon: 'edit-profile' }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/setting/department'),
        meta: { title: '????????????', icon: 'edit-department' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/setting/role/edit'),
        meta: { title: '????????????', icon: 'edit-role' }
      },
      {
        path: 'role-distribute',
        name: 'RoleDistribute',
        component: () => import('@/views/setting/role/distribute'),
        meta: { title: '????????????', icon: 'distribute-role' }
      }
    ]
  },

  {
    path: '/terminal',
    component: Layout,
    // redirect: '/example/table',
    name: 'Terminal',
    meta: { title: '????????????', icon: 'terminal' },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/terminal/basic'),
        meta: { title: '????????????', icon: 'basic-info' }
      },
      {
        path: 'running',
        name: 'Running',
        component: () => import('@/views/terminal/running'),
        meta: { title: '????????????', icon: 'terminal-running' },
        children: [
          {
            path: 'overview-table',
            component: () => import('@/views/terminal/running/overview/table'),
            name: 'OverviewTable',
            meta: { title: '??????-??????' }
          },
          {
            path: 'overview-chart',
            component: () => import('@/views/terminal/running/overview/chart'),
            name: 'OverviewChart',
            meta: { title: '??????-??????' }
          },
          {
            path: 'cpu-total',
            component: () => import('@/views/terminal/running/cpu/total'),
            name: 'CPUTotal',
            meta: { title: 'CPU????????????' }
          },
          {
            path: 'cpu-per',
            component: () => import('@/views/terminal/running/cpu/per'),
            name: 'CPUPer',
            meta: { title: 'CPU????????????' }
          },
          {
            path: 'mem',
            component: () => import('@/views/terminal/running/mem'),
            name: 'Mem',
            meta: { title: '??????' }
          },
          {
            path: 'disk',
            component: () => import('@/views/terminal/running/disk'),
            name: 'Disk',
            meta: { title: '??????' }
          }]
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/terminal/edit'),
        meta: { title: '????????????', icon: 'edit' }
      }
    ]
  },

  {
    path: '/terminal-group',
    component: Layout,
    name: 'TerminalGroup',
    meta: { title: '???????????????', icon: 'terminals' },
    children: [
      {
        path: 'running',
        name: 'TerminalGroupRunning',
        component: () => import('@/views/terminal-group/running'),
        meta: { title: '????????????', icon: 'terminal-running' }
      },
      {
        path: 'edit-members',
        name: 'EditMembers',
        component: () => import('@/views/terminal-group/edit-members'),
        meta: { title: '????????????', icon: 'edit' }
      },
      {
        path: 'edit',
        name: 'TerminalGroupEdit',
        component: () => import('@/views/terminal-group/edit'),
        meta: { title: '???????????????', icon: 'edit' }
      }
    ]
  },

  {
    path: '/remote-command',
    component: Layout,
    name: 'RemoteCommand',
    meta: { title: '????????????', icon: 'command' },
    children: [
      {
        path: 'process',
        name: 'Process',
        component: () => import('@/views/remote-command/process'),
        meta: { title: '????????????', icon: 'terminal' }
      },
      {
        path: 'batch-process',
        name: 'BatchProcess',
        component: () => import('@/views/remote-command/batch-process'),
        meta: { title: '????????????', icon: 'terminals' }
      }
    ]
  },

  {
    path: '/video',
    component: Layout,
    name: 'Video',
    meta: { title: '????????????', icon: 'video' },
    children: [
      {
        path: 'watch',
        name: 'VideoWatch',
        component: () => import('@/views/video/watch'),
        meta: { title: '????????????', icon: 'video-watch' }
      },
      {
        path: 'edit',
        name: 'VideoEdit',
        component: () => import('@/views/video/edit'),
        meta: { title: '????????????', icon: 'video-edit' }
      },
      {
        path: 'trace',
        name: 'PersonTrace',
        component: () => import('@/views/remote-command/batch-process'),
        meta: { title: '????????????', icon: 'video-edit' }
      }
    ]
  },

  {
    path: '/gantt',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Gantt',
        component: () => import('@/views/gantt/index'),
        meta: { title: '?????????', icon: 'form', affix: true }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form', affix: true }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true, roles: ['admin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
