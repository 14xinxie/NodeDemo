<template>
  <div>
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
            {{nickName}}
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    </div>
</div>
<!-- <div class="mainbox" v-for="i in 4" v-key="asas"> -->
  <span>$i</span>
  <div class="mainbox">
    <h2 class="title recom">
        OA办公
    </h2>
   
    <ul class="mainlist fn_clear">
        <li>
            <dl>
                <dt><a href="http://mail.oa.com/" target="_blank">OA邮箱</a></dt>
                <dd>
                    <a href="http://mail.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">
                        用于同事间传递正式、重要信息的办公系统。公司员工可使用OA邮箱收发工作邮件、传递需求清单等内容。
                    </div>
                    <a class="btn" href="http://mail.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt><a href="http://a32.oa.com/" target="_blank">事务申请系统</a></dt>
                <dd>
                    <a href="http://a32.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">整合各类申请事务，从发起到审批，一个平台，轻松搞定。记录详细，反馈及时。无纸化，更高效。</div>
                    <a class="btn" href="http://a32.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li class="last">
            <dl>
                <dt><a href="http://project.oa.com/" target="_blank">项目主页系统</a></dt>
                <dd>
                    <a href="http://project.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">项目团队在整个项目周期内对项目的相关信息，包括文档、成本、成员等信息进行统一的归纳汇总和管理的系统。</div>
                    <a class="btn" href="http://project.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt><a href="http://freedoc.oa.duoyi.com/" target="_blank">自由文档系统</a></dt>
                <dd>
                    <a href="http://freedoc.oa.duoyi.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">用于对文档的整理和协同处理的文档管理系统，为您提供一个方便、安全的文档存储服务。</div>
                    <b class="text">*该系统只能在外网使用</b>
                    <a class="btn" href="http://freedoc.oa.duoyi.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
    </ul>
  <!-- </div> -->
</div>


<div class="mainbox">
    <h2 class="title recom">
        OA办公
    </h2>
   
    <ul class="mainlist fn_clear">
        <li>
            <dl>
                <dt><a href="http://mail.oa.com/" target="_blank">OA邮箱</a></dt>
                <dd>
                    <a href="http://mail.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">
                        用于同事间传递正式、重要信息的办公系统。公司员工可使用OA邮箱收发工作邮件、传递需求清单等内容。
                    </div>
                    <a class="btn" href="http://mail.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt><a href="http://a32.oa.com/" target="_blank">事务申请系统</a></dt>
                <dd>
                    <a href="http://a32.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">整合各类申请事务，从发起到审批，一个平台，轻松搞定。记录详细，反馈及时。无纸化，更高效。</div>
                    <a class="btn" href="http://a32.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li class="last">
            <dl>
                <dt><a href="http://project.oa.com/" target="_blank">项目主页系统</a></dt>
                <dd>
                    <a href="http://project.oa.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">项目团队在整个项目周期内对项目的相关信息，包括文档、成本、成员等信息进行统一的归纳汇总和管理的系统。</div>
                    <a class="btn" href="http://project.oa.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt><a href="http://freedoc.oa.duoyi.com/" target="_blank">自由文档系统</a></dt>
                <dd>
                    <a href="http://freedoc.oa.duoyi.com/" target="_blank"><img  class="fn_left"></a>
                    <div class="cont">用于对文档的整理和协同处理的文档管理系统，为您提供一个方便、安全的文档存储服务。</div>
                    <b class="text">*该系统只能在外网使用</b>
                    <a class="btn" href="http://freedoc.oa.duoyi.com/" target="_blank">进入网站</a>
                </dd>
            </dl>
        </li>
    </ul>
</div>


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
        categoryList: [],
        productList: []
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
      this.getProducts('/api/v1/products');
    },
    methods: {
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
      //获取产品信息列表数据
      getProducts(url) {

        this.$http.get('/api/v1/categorys')
        .then((response) => {
          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {
            this.$message({
              type: 'success',
              message: '获取产品类型信息列表成功'
            });  

            //获取返回的产品信息列表数据
            let result = response.data.extData.categoryList.rows;
            this.categoryList = result;
          } else {
            this.$message({
              type: 'error',
              message: '获取产品类型信息列表失败'
            });
          }

        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '获取产品类型信息列表失败'
          });
          console.log(error);
        })

        this.$http.get(url)
        .then((response) => {

          console.log("数据来了");
          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {
            this.$message({
              type: 'success',
              message: '获取产品信息列表成功'
            });  

            //获取返回的产品信息列表数据
            let result = response.data.extData.productList.rows;

            if (url === '/api/v1/products') {
              //获取产品信息列表的记录数
              this.total = response.data.extData.productList.count;
            } else {
              //将产品信息列表数据先按照categoryId升序排序
              //若categoryId相同，则按照sortId升序排序
              result.sort(function(a,b) {
                if (a.categoryId!==b.categoryId) {
                  return a.categoryId-b.categoryId;
                } else {
                  return a.sortId-b.sortId;
                }
              });

              //解析产品信息列表数据，并将其赋值给tableData
              //使数据显示在表格上
              for (let i = 0; i < result.length; i++) {

                let product = {};
                product.id = result[i].id; //产品ID
                product.name = result[i].name; //产品名称
                product.categoryName = result[i].Category.name; //产品类型
                product.desc = result[i].desc; //产品描述
                product.url = result[i].url; //产品网址
                product.tip = result[i].tip; // 产品注意事项
                product.netSegment = result[i].netSegment; //产品所属网段
                data[i] = product;
              }   
              this.tableData = data;
            }
            
          } else {
            this.$message({
              type: 'error',
              message: '获取产品信息列表失败'
            });
          }
          //服务器请求错误                        
        }).catch((error) => {    

          this.$message({
            type: 'error',
            message: '获取产品信息列表失败'
          });
          console.log(error);

        });
      },
    

    }
  }
</script>
>
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
    /* position: absolute;
    display: inline-block;
    bottom: 5%;
    right: 8%; */
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
 /* .user-info {
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
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu-item{
        text-align: center;
    } */
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

  .user-logo {
    position: absolute;
    left: 0;
    top: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
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