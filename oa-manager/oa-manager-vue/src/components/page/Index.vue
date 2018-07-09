<template>
  <div>
    <!--首页头部导航栏部分-->
    <div class="index-header">
      <div class="headerbox hzh_headbox">
        <h1 class="logo">公司OA产品</h1>

        <div class="inp-box">
          <input class="el-input__inner inp  " autocomplete="off" placeholder="请输入内容" type="text" >
          <button class="btn-search  el-button el-button--primary">搜索</button>
        </div>
       
        <div class="user-info">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <img class="user-logo" src="../../../static/img/img.jpg">  
              <span class="user-name">{{nickName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!--首页主体部分-->
    <div v-for="(category, key, index) in categoryList" v-bind:key="index">
      <div class="mainbox">
        <h2 class="title recom">
          {{category.name}}
        </h2>
        <ul class="mainlist fn_clear" >
          <div v-for="(product, key, index) in allProducts[category.name]" v-bind:key="index" v-if="product.Category.name === category.name && key % 3 === 2">
            <li class="last" >
              <dl>
                <dt><a :href="product.url" target="_blank">{{product.name}}</a></dt>
                <dd>
                  <a :href="product.url" target="_blank"><img  :src="product.iconName" class="fn_left"></a>
                  <div class="cont">
                    {{product.desc}}
                  </div>
                  <a class="btn" :href="product.url" target="_blank">进入网站</a>
                </dd>
              </dl>
            </li>
          </div>
          <div v-else-if="product.Category.name === category.name && key % 3 !== 2">
            <li>
              <dl>
                <dt><a :href="product.url" target="_blank">{{product.name}}</a></dt>
                <dd>
                  <a :href="product.url" target="_blank"><img :src="product.iconName" class="fn_left"></a>
                  <div class="cont">
                    {{product.desc}}
                  </div>
                  <a class="btn" :href="product.url" target="_blank">进入网站</a>
                </dd>
              </dl>
            </li>
          </div>
        </ul>
      </div>
    </div>

    <!--首页底部部分-->
    <div class="footer">
      <p>公司OA产品由网站产品部开发与维护。通过各OA系统，公司同事可享受便捷办公的同时，提高工作效率，获得个人与团队的进步，进而为公司创造更大价值。欢迎体验上述OA产品，感谢支持！</p>
    </div>
    <div class="fn_tip oa hide" style="width: 320px; height: 280px; margin: -160px 0 0 -140px;">
      <div class="title">下载OA助手</div>
      <img class="close"  onclick="$(this).parents('.fn_tip').hide()"/>
      <ul class="macont fn_clear" style="text-align: center; padding-top: 34px">
        <li style="float: none;"><img src="/images/oa-p.png"><span>扫描下载</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'linxin',
        baseUrl: 'http://localhost:5001/image/',
        categoryList: [],
        productList: [],
        allProducts: {},
      }
    },
    computed: {
      nickName() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let nickName = user.nickName;
        console.log("首页中session用户信息："+JSON.stringify(user));
        return nickName ? nickName : this.name;
      }
    },

    created: function () {

      //初始化数据
      this.initData();
    },
    methods: {

      //处理下拉菜单的点击事件
      handleCommand(command) {

        console.log('下拉框');
        if(command == 'loginout'){
          sessionStorage.removeItem('ms_username')
          sessionStorage.removeItem('ms_userId')
          this.$router.push('/login');
        } else if (command == 'userCenter') {
          this.$router.push('/userCenter');
        }
      },

      //初始化数据
      initData() {

        this.$http.get('/api/v1/products')
        .then((response) => {
          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {
            this.$message({
              type: 'success',
              message: '获取产品数据成功'
            });  
            //获取返回的产品信息列表数据
            let result = response.data.extData.productList.rows;

            //将获取的数据按sortId升序排序
            result.sort(function(a,b) {
              return a.sortId-b.sortId;
            });

            this.productList = result;

            this.$http.get('/api/v1/categorys')
            .then((response) => {
              let resultCode = response.data.extData.resultCode;

              if (resultCode === 1) {
                this.$message({
                  type: 'success',
                  message: '获取类型数据成功'
                });  
                //获取返回的产品信息列表数据
                let result = response.data.extData.categoryList.rows;

                //将获取的数据按sortId升序排序
                result.sort(function(a,b) {
                  return a.sortId-b.sortId;
                });
                this.categoryList = result;
                
                //将productList中的数据按照类型名分类整理到单独的数组中
                //以方便在vue代码中循环显示
                let products = [];
                for (let i=0; i<this.categoryList.length; i++) {
                  for (let j=0; j<this.productList.length; j++) {
    
                    if (this.productList[j].Category.name === this.categoryList[i].name) {

                      this.productList[j].iconName = this.baseUrl+this.productList[j].iconName; 

                      products.push(this.productList[j]);
                    }
                    this.allProducts[this.categoryList[i].name] = products;  
                  } 
                  products = [];
                }

              } else {
                this.$message({
                  type: 'error',
                  message: '获取类型数据失败'
                });
              }
            }).catch((err) => {
              this.$message({
                type: 'error',
                message: '获取产品数据失败'
              });
              console.log(err);
            });
          } else {
            this.$message({
              type: 'error',
              message: '获取产品数据失败'
            });
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '获取产品数据失败'
          });
          console.log(err);
        });
      }

    }
  }
</script>

<style scoped>
  .hzh_headbox{
    position: relative;
  }

  .inp-box{
    position: absolute;
    display: inline-block;
    bottom: 12%;
    right: 8%;
    width: auto;
  }

  .inp {
    display: inline-block;
    width: auto;
  }
  .inp :focus {
    border-color: #409eff;
  }

  .btn-search{
    display: inline-block;
    margin-left: 10px;
  }

  .user-info{
    position: absolute;
    right: -80px;
    bottom: 50px;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    left: 15px;
    top: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    left: 12px;
  }

  .el-dropdown-link{
    position: relative;
    top: 25px;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .el-dropdown-menu {
    margin: 55px -30px;
    border: 1px solid #d1dbe5;
  }

  .mainbox .title{
    padding-left: 6px; background: none;
  }
  .mainlist li .text{
    left: 20px;
  }
  .mainlist dd img{
    width: 72px; height: 72px;
  }
</style>