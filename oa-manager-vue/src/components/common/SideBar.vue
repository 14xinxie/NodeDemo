<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.value">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.value">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/admin',
                        title: '产品信息管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/admin/category',
                        title: '产品类型管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/admin/sort',
                        title: '产品排序管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '/admin/Log',
                        title: '日志管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: '设置',
                        subs: [
                            {
                                index: 'modifyUser',
                                title: '修改用户信息'
                            },
                            {
                                index: 'modifyPassword',
                                title: '修改密码'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
              return this.$route.path;
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
