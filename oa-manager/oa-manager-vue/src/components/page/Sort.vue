<template>
  <div>
    <!--顶部筛选条件部分-->
    <el-row>
      <!--设置 inline 属性可以让表单域变为行内的表单域-->
      <el-form :inline="true" class="demo-form-inline" >  
        <el-form-item>  
          <span>请选择：</span>
        </el-form-item>
        <!--排序方式选择的单选框-->
        <el-form-item >
          <el-radio-group v-model="sortFlag" @change="onRadioChange">
						<el-radio :label="1">类型排序</el-radio>
						<el-radio :label="2">产品排序</el-radio>
        	</el-radio-group>
        </el-form-item>  

        <!--产品类型选择的下拉框-->
        <el-form-item label="产品类型 " :label-width="formLabelWidth" v-show="selectVisible" >
            <el-select v-model="categoryName" placeholder="请选择产品类型" @change="onSelectChange">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
  			</el-form-item>
     </el-form>  
    </el-row>
    
    <!--中间产品排序的表格部分-->
    <el-row>
      <el-table 
        :data="productTableData"
        border
        style="width: 100%"
        v-show="productTableVisible">
        <el-table-column  
          fixed
          type="selection"  
          width="50">  
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
          fixed>
        </el-table-column>  
        <el-table-column label="产品ID" prop="id" align="center"  v-if="false"></el-table-column>
        <el-table-column label="产品名称" prop="name" align="center" ></el-table-column>
        <el-table-column label="产品类型" prop="categoryName" align="center" ></el-table-column>
        <el-table-column label="产品描述" prop="desc" align="center"></el-table-column>
        <el-table-column label="产品网址" prop="url" align="center" ></el-table-column>
        <el-table-column label="注意事项" prop="tip" align="center" ></el-table-column>
        <el-table-column label="所属网段" prop="netSegment" align="center" ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button @click="onProductUp(scope.$index, scope.row)" type="text" size="small" v-show="scope.$index > 0">上移</el-button>
            <el-button @click="onProductDown(scope.$index, scope.row)" type="text" size="small" v-show="scope.$index <= productTableData.length-1">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

     <!--中间产品类型排序的表格部分-->
    <el-row>
      <el-table 
        :data="categoryTableData"
        border
        style="width: 100%"
        v-show="categoryTableVisible">
        <el-table-column  
          type="selection"  
          width="50">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="366"
          align="center">   
        </el-table-column>  
        <el-table-column label="产品类型ID" prop="id" align="center"  v-if="false" ></el-table-column>
        <el-table-column label="产品类型排序ID" prop="orderId" align="center"  v-if="false" ></el-table-column>
        <el-table-column label="产品类型名称" prop="name" align="center" ></el-table-column>
        <el-table-column
          label="操作"
          width="286"
          align="center">
          <template slot-scope="scope">
            <el-button @click="onCategoryUp(scope.$index, scope.row)" type="text" size="small" v-show="scope.row.orderId >= 0 ">上移</el-button>
            <el-button @click="onCategoryDown(scope.$index, scope.row)" type="text" size="small" v-show="scope.row.orderId < total">下移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    
    <!--底部分页器部分-->
		<!--分页器-->
		<el-row  type="flex" class="row-bg" justify="center">
			<div class="block" >
				<el-pagination
					@current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
					layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
  		</div>
		</el-row>
  </div>
</template>

<script>
  export default {
    name: 'sort',
    data() {

      return {
        total: 1,
        currentPage: 1,
        pageSize: 5,
        sortFlag: '',
        categoryName: '',
        categoryTableVisible: true,
        productTableVisible: false,
        selectVisible: false,
        keyWord: '', //搜索的关键字
        categoryTableData: [], 
        productTableData: [],
        categoryList: {},
        formLabelWidth: '80px'
      }
    },

    //vue实例创建时执行该生命周期方法
    created: function () {
      this.sortFlag = 1;
      this.categoryTableVisible = true;
      this.productTableVisible = false;
      this.selectVisible = false;
      //this.refreshData();
      this.getCategorys('/api/v1/categorys');
      this.getCategorys('/api/v1/categorys?page=1'+'&pagesize='+this.pageSize);
    

    },

    methods: {

      //获取产品列表数据
      getProducts(url) {
        let data = [];

        this.$http.get(url)
        .then((response) => {

          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {
            this.$message({
              type: 'success',
              message: '获取产品信息列表成功'
            });  

            if (url.indexOf('?') === -1) {
              this.total = response.data.extData.productList.count;
            } else {
              //获取返回的产品信息列表数据
              let result = response.data.extData.productList.rows;
      
              //将产品信息列表数据先按照categoryId升序排序
              //若categoryId相同，则按照sortId升序排序
              result.sort(function(a,b) {
                if (a.categoryId!==b.categoryId) {
                  return a.categoryId-b.categoryId;
                } else {
                  return a.sortId-b.sortId;
                }
              });

              //解析产品信息列表数据，并将其赋值给productTableData
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
              this.productTableData = data;
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

      //获取产品类型列表数据
      getCategorys(url) {
        console.log(url)
        let data = [];
         //获取分类信息列表
        this.$http.get(url)
        .then((response) => {

          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {
            this.$message({
              type: 'success',
              message: '获取产品类型列表成功'
            });  

            if (url.indexOf('?') === -1) {
              this.total = response.data.extData.categoryList.count;
            }
            //获取返回的产品类型列表数据
            let result = response.data.extData.categoryList.rows;

            if (url === '/api/v1/categorys') {
              //获取产品类型列表的记录数
              this.total = response.data.extData.categoryList.count;
              this.categoryList = result;
            } else {

              //将获取的数据按sortId升序排序
              result.sort(function(a,b) {
                return a.sortId-b.sortId;
              });

              //解析产品信息列表数据，并将其赋值给categoryTableData
              //使数据显示在表格上
              for (let i = 0; i < result.length; i++) {

                let category = {};
                category.id = result[i].id; //产品类型ID
                category.name = result[i].name; //产品类型名称
                category.orderId = i; //产品类型排序ID
                data[i] = category;
              }   
              this.categoryTableData = data;
            }  
          } else {
            this.$message({
              type: 'error',
              message: '获取产品类型列表失败'
            });
          }
        }).catch((error) => {
          
          this.$message({
            type: 'error',
            message: '获取产品类型列表失败'
          });
          console.log(error);
        });
    
      },

      //单选框选择监听事件
      onRadioChange(value) {
        console.log("改变后的值："+value);
        if (value === 1) {
          this.categoryTableVisible = true;
          this.productTableVisible = false;
          this.selectVisible = false;
          //this.categoryName = '';
          this.getCategorys('/api/v1/categorys');
          this.getCategorys('/api/v1/categorys?page=1&pagesize='+this.pageSize);

          console.log("类型列表");
        } else {
          this.categoryTableVisible = false;
          this.productTableVisible = true;
          this.selectVisible = true;
          this.categoryName = this.categoryList[0].name;
          let categoryId = 1; //给categoryId赋初值，默认为1
          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.categoryList[0].name) {
              categoryId = this.categoryList[i].id;
            }
          }

          this.currentPage = 1;
          this.getProducts('/api/v1/products/'+categoryId);
          this.getProducts('/api/v1/products/'+categoryId+'?page=1&pagesize='+this.pageSize);
          console.log("产品列表");
        }
      },

      //下拉框选择监听事件
      onSelectChange(value) {
        this.categoryTableVisible = false;
        this.productTableVisible = true;

        //this.getProductTableData(value);
        this.categoryName = value;
        let categoryId = 1; //给categoryId赋初值，默认为1
        for (let i=0;i<this.categoryList.length;i++) {
          if (this.categoryList[i].name === value) {
            categoryId = this.categoryList[i].id;
          }
        }
        this.getProducts('/api/v1/products/'+categoryId);
        this.getProducts('/api/v1/products/'+categoryId+'?page=1&pagesize='+this.pageSize);
        console.log("选择的值："+value);
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        if (this.categoryTableVisible === true) {
          this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
        } else if (this.productTableVisible === true) {

          let categoryId = 1; //给categoryId赋初值，默认为1
          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.categoryName) {
              categoryId = this.categoryList[i].id;
            }
          }
          this.getProducts('/api/v1/products/'+categoryId+'?page='+this.currentPage+'&pagesize='+this.pageSize);
        }
      },

      //产品排序中的上移按钮点击事件
      onProductUp(index, row) {
        
      },

      //产品排序中的下移按钮的点击事件
      onProductDown(index, row) {

      },

      //类型排序中的上移按钮点击事件
      onCategoryUp(index, row) {
        
      },

      //类型排序中的下移按钮点击事件
      onCategoryDown(index, row) {
        
      }
    }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
