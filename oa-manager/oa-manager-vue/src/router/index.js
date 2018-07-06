import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/register',
      component: resolve => require(['../components/page/Register.vue'], resolve)
    },
    {
      path: '/index',
      component: resolve => require(['../components/page/Index.vue'], resolve)
    },
    {
      path: '/admin',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [{
          path: '/',
          component: resolve => require(['../components/page/Product.vue'], resolve)
        },
        {
          path: '/admin/category',
          component: resolve => require(['../components/page/Category.vue'], resolve)
        },
        {
          path: '/admin/sort',
          component: resolve => require(['../components/page/Sort.vue'], resolve)
        },
        {
          path: '/admin/log',
          component: resolve => require(['../components/page/Log.vue'], resolve)
        }
          
      ]
    }

  ]
});

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    console.log("登录验证中");
   

    let user = JSON.parse(sessionStorage.getItem('user'));

    console.log("用户信息：" + JSON.stringify(user));

   
    if ((to.path === '/'|| to.path === '/register')) {
      next();

     //如果session中的用户信息不为空
    } else if (user !== null) {

      //如果用户为管理员
      if (user.role === 1) {
        next();
      } else if (user.role === 0 && to.path.indexOf('/admin') !== -1) {
        next({
          path: '/'
        });
      } else {
        next();
      }

    } else {

      next({
        path: '/'
      });
    }
});

export default router