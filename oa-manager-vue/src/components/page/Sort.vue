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
          inline-template
          :context="_self"
          label="序号"
          width="80"
          align="center"
          fixed>
          <span>{{$index+addIndex}}</span>
        </el-table-column>  
        <el-table-column label="产品ID" prop="id" align="center"  v-if="false"></el-table-column>
        <el-table-column label="产品排序ID" prop="sortId" align="center"  v-if="false"></el-table-column>
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
            <el-button @click="onProductUp(scope.$index+addIndex)" type="text" size="small" v-show="(scope.$index+addIndex) > 1">上移</el-button>
            <el-button @click="onProductDown(scope.$index+addIndex)" type="text" size="small" v-show="(scope.$index+addIndex) < productList.length">下移</el-button>
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
          inline-template
          :context="_self"
          label="序号"
          width="366"
          align="center"> 
          <span>{{$index+addIndex}}</span>  
        </el-table-column>  
        <el-table-column label="产品类型ID" prop="id" align="center"  v-if="false" ></el-table-column>
        <el-table-column label="产品类型排序ID" prop="sortId" align="center"  v-if="false" ></el-table-column>
        <el-table-column label="产品类型名称" prop="name" align="center" ></el-table-column>
        <el-table-column
          label="操作"
          width="286"
          align="center">
          <template slot-scope="scope">
            <el-button @click="onCategoryUp(scope.$index+addIndex)" type="text" size="small" v-show="(scope.$index+addIndex) > 1">上移</el-button>
            <el-button @click="onCategoryDown(scope.$index+addIndex)" type="text" size="small" v-show="(scope.$index+addIndex) < categoryList.length">下移</el-button>
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
        addIndex: 1,
        sortFlag: '',
        categoryName: '',
        categoryTableVisible: true,
        productTableVisible: false,
        selectVisible: false,
        keyWord: '', //搜索的关键字
        categoryTableData: [], 
        productTableData: [],
        categoryList: [],
        productList: [],
        categoryId: 1,
        formLabelWidth: '80px'
      }
    },

    //vue实例创建时执行该生命周期方法
    created: function () {
      this.sortFlag = 1;
      this.categoryTableVisible = true;
      this.productTableVisible = false;
      this.selectVisible = false;
      this.getCategorys('/api/v1/categorys');
      //this.getCategorys('/api/v1/categorys?page=1'+'&pagesize='+this.pageSize);
    

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

            //获取返回的产品信息列表数据
            let result = response.data.extData.productList.rows;

            //将获取的数据按sortId升序排序
            result.sort(function(a,b) {
              return a.sortId-b.sortId;
            });

            //获取返回的产品信息列表数据的总记录数
            this.total = response.data.extData.productList.count;

            this.productList = result;

            //确定数组分割的开始索引
            let startIndex = (this.currentPage - 1) * this.pageSize;

            //确定数组分割的结束索引
            let endIndex = this.currentPage * this.pageSize;

            //使用数组的slice方法对result进行分割,以达到分页的效果
            let resultData = result.slice(startIndex, endIndex);
            
            //解析产品信息列表数据，并将其赋值给productTableData
            //使数据显示在表格上
            for (let i = 0; i < resultData.length; i++) {

              let product = {};
              product.id = resultData[i].id; //产品ID
              product.name = resultData[i].name; //产品名称
              product.categoryName = resultData[i].Category.name; //产品类型
              product.desc = resultData[i].desc; //产品描述
              product.url = resultData[i].url; //产品网址
              product.tip = resultData[i].tip; // 产品注意事项
              product.netSegment = resultData[i].netSegment; //产品所属网段
              product.sortId = resultData[i].sortId;
              data[i] = product;
            }   
            this.productTableData = data;
            
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

            //获取返回的产品类型列表数据
            let result = response.data.extData.categoryList.rows;

            //将获取的数据按sortId升序排序
            result.sort(function(a,b) {
              return a.sortId-b.sortId;
            });

         
            //获取产品类型列表的记录数
            this.total = response.data.extData.categoryList.count;
            this.categoryList = result;
      
            //确定数组分割的开始索引
            let startIndex = (this.currentPage - 1) * this.pageSize;

            //确定数组分割的结束索引
            let endIndex = this.currentPage * this.pageSize;

            //使用数组的slice方法对result进行分割,以达到分页的效果
            let resultData = result.slice(startIndex, endIndex);
            
            //解析产品信息列表数据，并将其赋值给categoryTableData
            //使数据显示在表格上
            for (let i = 0; i < resultData.length; i++) {

              let category = {};
              category.id = resultData[i].id; //产品类型ID
              category.name = resultData[i].name; //产品类型名称
              category.sortId = resultData[i].sortId; //产品类型排序ID
              data[i] = category;
            }   
            this.categoryTableData = data;

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

        this.currentPage = 1;
        if (value === 1) {
          this.categoryTableVisible = true;
          this.productTableVisible = false;
          this.selectVisible = false;
          this.getCategorys('/api/v1/categorys');

          console.log("类型列表");
        } else {
          this.categoryTableVisible = false;
          this.productTableVisible = true;
          this.selectVisible = true;
          this.categoryName = this.categoryList[0].name;

          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.categoryList[0].name) {
              this.categoryId = this.categoryList[i].id;
            }
          }
    
          this.getProducts('/api/v1/products/'+this.categoryId);
          
          console.log("产品列表");
        }
      },

      //下拉框选择监听事件
      onSelectChange(value) {
        this.categoryTableVisible = false;
        this.productTableVisible = true;

        this.categoryName = value;

        for (let i=0;i<this.categoryList.length;i++) {
          if (this.categoryList[i].name === value) {
            this.categoryId = this.categoryList[i].id;
          }
        }
        this.getProducts('/api/v1/products/'+this.categoryId);
         
        console.log("选择的值："+value);
      },

      handleCurrentChange(val) {

        this.currentPage = val;
        this.addIndex = (this.currentPage - 1) * this.pageSize +1;
        if (this.categoryTableVisible === true) {

          this.getCategorys('/api/v1/categorys');

        } else if (this.productTableVisible === true) {

          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.categoryName) {
              this.categoryId = this.categoryList[i].id;
            }
          }
          this.getProducts('/api/v1/products/'+this.categoryId);
        }
      },

      //产品排序中的上移按钮点击事件
      onProductUp(index) {
        
        //上一行数据的id
        let prevId = this.productList[index-2].id;
        //当前需要上移的数据的id
        let currId = this.productList[index-1].id;
        //上一行数据的sortId
        let prevSortId = this.productList[index-2].sortId;
        //当前需要上移的数据的sortId
        let currSorId = this.productList[index-1].sortId;

        let currData = {
          sortId: currSorId
        };
        let preData = {
          sortId: prevSortId
        };

        this.$http.put("/api/v1/product/"+prevId, currData)
        .then((response) => {
          let resultCode = response.data.extData.resultCode;
            if (resultCode === 1) {

              this.$message({
                type: 'success',
                message: '修改成功'
              });     

              this.$http.put("/api/v1/product/"+currId, preData)
              .then((response) => {
                let resultCode = response.data.extData.resultCode;
                if (resultCode === 1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });     

                  this.getProducts('/api/v1/products/'+this.categoryId);
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败'
                  });   
                }
              }).catch((err) => {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                });   
                console.log(err);
              });
          
            } else {

              this.$message({
                type: 'error',
                message: '修改失败'
              });    
            }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          });
          console.log(error);
        });


      },

      //产品排序中的下移按钮的点击事件
      onProductDown(index) {

        //下一行数据的id
        let nextId = this.productList[index].id;
        //当前需要上移的数据的id
        let currId = this.productList[index-1].id;
        //下一行数据的sortId
        let nextSortId = this.productList[index].sortId;
        //当前需要上移的数据的sortId
        let currSorId = this.productList[index-1].sortId;

        let currData = {
          sortId: currSorId
        };
        let nextData = {
          sortId: nextSortId
        };

        this.$http.put("/api/v1/product/"+nextId, currData)
        .then((response) => {
          let resultCode = response.data.extData.resultCode;
            if (resultCode === 1) {

              this.$message({
                type: 'success',
                message: '修改成功'
              });     

              this.$http.put("/api/v1/product/"+currId, nextData)
              .then((response) => {
                let resultCode = response.data.extData.resultCode;
                if (resultCode === 1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });     

                  this.getProducts('/api/v1/products/'+this.categoryId);
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败'
                  });   
                }
              }).catch((err) => {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                });   
                console.log(err);
              });
          
            } else {

              this.$message({
                type: 'error',
                message: '修改失败'
              });    
            }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          });
          console.log(error);
        });

      },

      //类型排序中的上移按钮点击事件
      onCategoryUp(index, row) {

         //上一行数据的id
        let prevId = this.categoryList[index-2].id;
        //当前需要上移的数据的id
        let currId = this.categoryList[index-1].id;
        //上一行数据的sortId
        let prevSortId = this.categoryList[index-2].sortId;
        //当前需要上移的数据的sortId
        let currSorId = this.categoryList[index-1].sortId;

        let currData = {
          sortId: currSorId
        };
        let preData = {
          sortId: prevSortId
        };

        this.$http.put("/api/v1/category/"+prevId, currData)
        .then((response) => {
          let resultCode = response.data.extData.resultCode;
            if (resultCode === 1) {

              this.$message({
                type: 'success',
                message: '修改成功'
              });     

              this.$http.put("/api/v1/category/"+currId, preData)
              .then((response) => {
                let resultCode = response.data.extData.resultCode;
                if (resultCode === 1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });     

                  this.getCategorys('/api/v1/categorys');
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败'
                  });   
                }
              }).catch((err) => {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                });   
                console.log(err);
              });
          
            } else {

              this.$message({
                type: 'error',
                message: '修改失败'
              });    
            }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          });
          console.log(error);
        });


      },

      //类型排序中的下移按钮点击事件
      onCategoryDown(index, row) {
        //下一行数据的id
        let nextId = this.categoryList[index].id;
        //当前需要上移的数据的id
        let currId = this.categoryList[index-1].id;
        //下一行数据的sortId
        let nextSortId = this.categoryList[index].sortId;
        //当前需要上移的数据的sortId
        let currSorId = this.categoryList[index-1].sortId;

        let currData = {
          sortId: currSorId
        };
        let nextData = {
          sortId: nextSortId
        };

        this.$http.put("/api/v1/category/"+nextId, currData)
        .then((response) => {
          let resultCode = response.data.extData.resultCode;
            if (resultCode === 1) {

              this.$message({
                type: 'success',
                message: '修改成功'
              });     

              this.$http.put("/api/v1/category/"+currId, nextData)
              .then((response) => {
                let resultCode = response.data.extData.resultCode;
                if (resultCode === 1) {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  });     

                  this.getCategorys('/api/v1/categorys');
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败'
                  });   
                }
              }).catch((err) => {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                });   
                console.log(err);
              });
          
            } else {

              this.$message({
                type: 'error',
                message: '修改失败'
              });    
            }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '修改失败'
          });
          console.log(error);
        });
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
