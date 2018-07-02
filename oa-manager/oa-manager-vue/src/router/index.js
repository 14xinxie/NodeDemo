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
                    path: '/category',
                    component: resolve => require(['../components/page/Category.vue'], resolve)
                },
                {
                    path: '/sort',
                    component: resolve => require(['../components/page/Sort.vue'], resolve)
                },
                {
                    path: '/log',
                    component: resolve => require(['../components/page/Log.vue'], resolve)
                }
                
            ]
        }

    ]
});

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    console.log("登录验证中");
    console.log("用户信息：" + JSON.parse(sessionStorage.getItem('user')));
    if (to.path === '/') {
        next();
    } else if (sessionStorage.getItem('user') !== null) {
        next();
    } else {
        next({
            path: '/'
        });
    }
});

export default router