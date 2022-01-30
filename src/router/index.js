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
        meta: { title: '个人资料', icon: 'user' }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Setting',
    meta: { title: '管理员设置', icon: 'setting', noCache: true },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/setting/user'),
        meta: { title: '用户管理', icon: 'edit-profile' }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/setting/department'),
        meta: { title: '部门管理', icon: 'edit-department' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/setting/role/edit'),
        meta: { title: '权限管理', icon: 'edit-role' }
      },
      {
        path: 'role-distribute',
        name: 'RoleDistribute',
        component: () => import('@/views/setting/role/distribute'),
        meta: { title: '权限分配', icon: 'distribute-role' }
      }
    ]
  },

  {
    path: '/terminal',
    component: Layout,
    // redirect: '/example/table',
    name: 'Terminal',
    meta: { title: '终端管理', icon: 'terminal' },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/terminal/basic'),
        meta: { title: '基本信息', icon: 'basic-info' }
      },
      {
        path: 'running',
        name: 'Running',
        component: () => import('@/views/terminal/running'),
        meta: { title: '运行状态', icon: 'terminal-running' },
        children: [
          {
            path: 'overview-table',
            component: () => import('@/views/terminal/running/overview/table'),
            name: 'OverviewTable',
            meta: { title: '总览-表格' }
          },
          {
            path: 'overview-chart',
            component: () => import('@/views/terminal/running/overview/chart'),
            name: 'OverviewChart',
            meta: { title: '总览-图表' }
          },
          {
            path: 'cpu-total',
            component: () => import('@/views/terminal/running/cpu/total'),
            name: 'CPUTotal',
            meta: { title: 'CPU（平均）' }
          },
          {
            path: 'cpu-per',
            component: () => import('@/views/terminal/running/cpu/per'),
            name: 'CPUPer',
            meta: { title: 'CPU（单核）' }
          },
          {
            path: 'mem',
            component: () => import('@/views/terminal/running/mem'),
            name: 'Mem',
            meta: { title: '内存' }
          },
          {
            path: 'disk',
            component: () => import('@/views/terminal/running/disk'),
            name: 'Disk',
            meta: { title: '硬盘' }
          }]
      },
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/terminal/edit'),
        meta: { title: '编辑终端', icon: 'edit' }
      }
    ]
  },

  {
    path: '/terminal-group',
    component: Layout,
    name: 'TerminalGroup',
    meta: { title: '终端组管理', icon: 'terminals' },
    children: [
      {
        path: 'running',
        name: 'TerminalGroupRunning',
        component: () => import('@/views/terminal-group/running'),
        meta: { title: '运行状态', icon: 'terminal-running' }
      },
      {
        path: 'edit-members',
        name: 'EditMembers',
        component: () => import('@/views/terminal-group/edit-members'),
        meta: { title: '编辑成员', icon: 'edit' }
      },
      {
        path: 'edit',
        name: 'TerminalGroupEdit',
        component: () => import('@/views/terminal-group/edit'),
        meta: { title: '编辑终端组', icon: 'edit' }
      }
    ]
  },

  {
    path: '/remote-command',
    component: Layout,
    name: 'RemoteCommand',
    meta: { title: '远程命令', icon: 'command' },
    children: [
      {
        path: 'process',
        name: 'Process',
        component: () => import('@/views/remote-command/process'),
        meta: { title: '单个执行', icon: 'terminal' }
      },
      {
        path: 'batch-process',
        name: 'BatchProcess',
        component: () => import('@/views/remote-command/batch-process'),
        meta: { title: '批量执行', icon: 'terminals' }
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
