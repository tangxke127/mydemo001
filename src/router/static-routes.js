import util from '../libs/util'
import { login, updatePaswd } from 'biyi-admin'
import { biyiDicTree } from 'biyi-dic'
import Setting from '@/setting'
import cas from '@/libs/util-cas.js'
/**
 * 配置静态路由
 * 分为两种路由：
 * 1.路由出口在App.vue
 * 2.路由出口在main.vue
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 */

// 1.路由出口在App.vue
const singleRoutes = [
  {
    // 设置初始页面
    path: '',
    redirect: '/connect'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    props: { Setting: Setting, cas: cas },
    meta: {
      // 密码规则校验开关
      validatePaswd: true
    }
  },
  {
    path: '/update-password',
    name: 'update-password',
    component: updatePaswd
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-pages/404.vue')
  }
]

/**
 * 路由出口在main.vue，包括了菜单项和非菜单页面
 * 若该页面属于菜单页面，需要添加type: 'menu'属性
 */
const staticTree = [
  // {
  //   path: '/main',
  //   name: 'main-home',
  //   title: '比翼',
  //   icon: 'ios-paper',
  //   type: 'menu',
  //   component: () => import('../views/main/main.vue'),
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       title: '欢迎页demo',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/form-demo/index.vue')
  //     }
  //   ]
  // },
  {
    path: '/main',
    name: 'main-home',
    title: '比翼',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/connect',
        name: 'connect',
        title: '连接信息',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/connect/index.vue'),
        children: [
          {
            path: '/connectedit',
            name: 'connectedit',
            title: '连接信息编辑',
            icon: 'md-albums',
            // type: 'menu',
            component: () => import('../views/connect/edit.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/main',
    name: 'main-home',
    title: '比翼',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/datablock',
        name: 'datablock',
        title: '数据块信息',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/datablock/index.vue'),
        children: [
          {
            path: '/blockedit',
            name: 'blockedit',
            title: '数据块信息编辑',
            icon: 'md-albums',
            // type: 'menu',
            component: () => import('../views/datablock/edit.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/main',
    name: 'main-home',
    title: '比翼',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/linechart',
        name: 'linechart',
        title: '折线表',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/chartline/index.vue'),
      }
    ]
  },
  {
    path: '/main',
    name: 'main-home',
    title: '比翼',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/mapstatic',
        name: 'mapstatic',
        title: '静态地图展示',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/mapstatic/index.vue'),
        // src\views\chartmap\index.vue
      }
    ]
  },
  {
    path: '/main-home',
    name: 'main-home',
    title: '开源地图展示',
    icon: 'md-cube',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/defaultmap',
        name: 'defaultmap',
        title: '默认地图',
        icon: 'md-albums',
        type: 'menu',
        component: () => import('../views/mapopen/index01.vue')
      },
      {
        path: '/styindex',
        name: 'stymap',
        title: '个性化地图',
        icon: 'md-albums',
        type: 'menu',
        component: () => import('../views/mapopen/styindex.vue')
        // F:\study\前端\仓库\demo01\myonlydemo01\src\views\mapopen\styindex.vue
      },
    ]
  },
  {
    path: '/doc-home',
    name: 'doc-home',
    title: '文档操作',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/tablefile',
        name: 'tablefile',
        title: '导出表格',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/handlefile/index.vue'),
      },
      {
        path: '/weekfile',
        name: 'weekfile',
        title: '导出周报',
        icon: 'md-cube',
        type: 'menu',
        component: () => import('../views/handlefile/weekdoc.vue'),
        // F:\study\前端\仓库\demo01\myonlydemo01\src\views\handlefile\weekdoc.vue
      },
    ]
  },
  
  
  // biyiDicTree,

]
const staticMenuList = util.getMenuList(staticTree)
const staticMainRoutes = util.getMenuRoutes(staticTree)

// 汇总所有的路由
const staticRoutes = [...staticMainRoutes, ...singleRoutes]

export { staticRoutes, staticMenuList, staticTree }
