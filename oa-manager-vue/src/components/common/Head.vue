<template>
  <div class="header">
    <div class="logo">OA产品管理系统</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user-logo" src="../../../static/img/img.jpg">
            <span class="user-name">{{uNickName}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: 'linxin'
      }
    },
    computed:{
      uNickName() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let nickName = user.nickName;
        console.log("首页中session用户信息："+JSON.stringify(user));
        return nickName ? nickName : this.name;
      }
    },
    methods:{
      handleCommand(command) {
        if (command == 'loginout') {
          sessionStorage.removeItem('user')
          this.$router.push('/');
        } else if (command == 'userCenter') {
          this.$router.push('/userCenter');
        }
      }
    }
  }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-name {
      position: relative;
      left: -10px;
    }
    .user-info .user-logo{
        position: absolute;
        left:-10px;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
  
    .el-dropdown-menu-item{
        text-align: center;
    }
</style>
