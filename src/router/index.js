import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/home'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true, roles: ['admin','waiter'] }
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
    path: '/goods',
    component: Layout,
    redirect: '/goods/repast',
    alwaysShow: true, // will always show the root menu
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: 'documentation',
      roles: ['admin', 'waiter',] // you can set roles in root nav
    },
    children: [
      {
        path: 'repast',
        component: () => import('@/views/supermarketfood/goods/repast'),
        name: 'repast',
        meta: {
          title: '美食商品',
          roles: ['admin','waiter'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'supermarket',
        component: () => import('@/views/supermarketfood/goods/supermarket'),
        name: 'supermarket',
        meta: {
          title: '超市商品',
          roles:['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'addproduct',
        component: () => import('@/views/supermarketfood/goods/addproduct'),
        name: 'addproduct',
        meta: {
          title: '商品信息',
          roles:['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/determined',
    alwaysShow: true, // will always show the root menu
    name: 'orders',
    meta: {
      title: '订单管理',
      icon: 'guide',
      roles: ['admin','waiter'] // you can set roles in root nav
    },
    children: [
      {
        path: 'determined',
        component: () => import('@/views/supermarketfood/orders/determined'),
        name: 'determined',
        meta: {
          title: '待接单',
          roles: ['admin','waiter'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'cancelled',
        component: () => import('@/views/supermarketfood/orders/cancelled'),
        name: 'cancelled',
        meta: {
          title: '待发货',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'sendgoods',
        component: () => import('@/views/supermarketfood/orders/sendgoods'),
        name: 'sendgoods',
        meta: {
          title: '待收货',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'pending',
        component: () => import('@/views/supermarketfood/orders/pending'),
        name: 'pending',
        meta: {
          title: '完成订单',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'cuidan',
        component: () => import('@/views/supermarketfood/orders/cuidan'),
        name: 'cuidan',
        meta: {
          title: '催货订单',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'backmoney',
        component: () => import('@/views/supermarketfood/orders/backmoney'),
        name: 'backmoney',
        meta: {
          title: '申请退款',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'ordercan',
        component: () => import('@/views/supermarketfood/orders/ordercan'),
        name: 'ordercan',
        meta: {
          title: '已取消订单',
          roles: ['admin','waiter']
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: '/orderDetail',
         name: 'orderDetail',
        component: () => import('@/views/supermarketfood/orders/orderDetail'),
      },
    ]
  },
  {
    path: '/goodsCategory',
    component: Layout,
    redirect: '/goodsCategory',
    meta: {
      title: '商品类别管理',
      icon: 'user',
      roles: ['admin','waiter'] // you can set roles in root nav
    },
    children: [
      {
        path: 'goodsCategory',
        component: () => import('@/views/supermarketfood/goodsCategory/goodsCategory'),
        name: 'goodsCategory',
        meta: { title: '商品类别管理', icon: 'dashboard', affix: true ,roles: ['admin','waiter']}
      }
    ]
  },
  {
    path: '/riders',
    component: Layout,
    redirect: '/riders',
    meta: {
      title: '骑手管理',
      icon: 'user',
      roles: ['admin','waiter'] // you can set roles in root nav
    },
    children: [
      {
        path: 'riders',
        component: () => import('@/views/supermarketfood/riders/riders'),
        name: 'riders',
        meta: { title: '骑手管理', icon: 'dashboard', affix: true ,roles: ['admin','waiter']}
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal',
    alwaysShow: true, // will always show the root menu
    name: 'personal',
    meta: {
      title: '管理中心',
      icon: 'guide',
      roles: ['admin','waiter'] // you can set roles in root nav
    },
    children: [
      {
        path: 'personal',
        component: () => import('@/views/supermarketfood/personal/personal'),
        name: 'personal',
        meta: { title: '个人中心',roles: ['admin','waiter'] }
      },
      {
        path: 'waiter',
        component: () => import('@/views/supermarketfood/personal/waiter'),
        name: 'waiter',
        meta: { title: '员工管理' ,roles: ['admin']}
      }
    ]
  },
  {
    path: '/income',
    component: Layout,
    redirect: '/income',
    meta: {
      title: '收入统计',
      icon: 'guide',
      roles: ['admin','waiter'] // you can set roles in root nav
    },
    children: [
      {
        path: 'income',
        component: () => import('@/views/supermarketfood/income/income'),
        name: 'income',
        meta: { title: '收入统计', icon: 'dashboard', affix: true ,roles: ['admin','waiter']}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  // {
  //   path: '/orderDetail',
  //    name: 'orderDetail',
  //   component: () => import('@/views/supermarketfood/orders/orderDetail')
  // },
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
