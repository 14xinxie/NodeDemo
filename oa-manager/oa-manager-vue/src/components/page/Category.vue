<template>
  <div>
    <!--顶部搜索框部分-->
    <el-row>
      <!--设置 inline 属性可以让表单域变为行内的表单域-->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" style="margin-left:100dp">  
        <el-form-item >
          <el-input  placeholder="请输入搜索内容" class="searchInput"  ></el-input>  
        </el-form-item>  
        <el-form-item>  
          <el-button type="primary" icon="search" @click="dialogFormVisible = false">搜索</el-button>
          <el-button type="success" icon="plus" @click="addFormVisible = true">新增</el-button>
        </el-form-item>  
      </el-form> 
    </el-row>
    
    <!--中间的表格部分-->
    <el-row>
      <el-table 
        :data="tableData"
        border
        style="width: 100%">
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
        <el-table-column label="产品类型ID" prop="id" align="center"  v-if="false"></el-table-column>
        <el-table-column label="产品类型名称" prop="name" align="center" ></el-table-column>
       
        <el-table-column
          label="操作"
          width="286"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

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

    <!--编辑产品类型信息的对话框部分-->
    <el-dialog title="产品类型信息" :visible.sync="editFormVisible" @close="closeDialog('editForm')">
      <el-form :model="editForm" :rules="editRule" ref="editForm">
          <!--设置为隐藏项-->
          <el-form-item label="产品ID" :label-width="formLabelWidth" prop="desc" style="display:none" >
            <el-input type="text" autosize v-model="editForm.id" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="产品类型名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.name" auto-complete="off" ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="closeDialog('editForm')">取 消</el-button>
        <el-button type="primary" @click="onEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>

     <!--新增产品类型信息的对话框部分-->
    <el-dialog title="产品详细信息" :visible.sync="addFormVisible" @close="closeDialog('addForm')" center="true">
      <el-form :model="addForm" :rules="addRule" ref="addForm">

        <!--新增表单的左半部分-->
          <el-form-item label="产品名称" :label-width="formLabelWidth" prop="addName">
            <el-input v-model="addForm.addName" auto-complete="off" ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="closeDialog('addForm')">取 消</el-button>
        <el-button type="primary" @click="onAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'category',
    data() {

    //校验产品名称
    let validateName = (rule, value, callback) => {

      console.log("校验产品名称："+value);
      if (value === '') {
        callback(new Error('请输入产品名称'));
      } else {
        callback();
      }
    };

    return {
      currentPage: 1,
      total: 1,
      pageSize: 10,
      tableData: [],
      editFormVisible: false,
      addFormVisible: false,
      searchForm: {},
      editForm: {},
      addForm: {},
      editRule: {
      name : [
        { validator: validateName, trigger: 'blur'}
      ]
      },
      addRule: {
        addName : [
          { required: true, message: '请填写产品名称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px'
    }
  },

    //vue实例创建时执行该生命周期方法
  created: function () {
    this.getCategorys('/api/v1/categorys');
    this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
  },
  methods: {

    //重新从数据库获取数据，刷新表格的数据
    getCategorys(url) {

      //获取产品分类信息列表
      this.$http.get(url)
      .then((response) => {

        let resultCode = response.data.extData.resultCode;

        if (resultCode === 1) {
          this.$message({
            type: 'success',
            message: '获取产品类型列表成功'
          });     

          let data = [];
          //获取返回的产品类型列表数据
          let result = response.data.extData.categoryList.rows;

          if (url === '/api/v1/categorys') {
            this.total = response.data.extData.categoryList.count;
          } else {
            //将产品类型列表数据按sortId升序排序
            result.sort(function(a,b) {
              return a.sortId-b.sortId;
            });
            for (let i = 0; i < result.length; i++) {

              let category = {};
              category.id = result[i].id; //产品ID
              category.name = result[i].name; //产品名称
              data[i] = category;
            }   
            this.tableData = data;
          }
          
        } else {

          this.$message({
            type: 'error',
            message: '获取产品类型列表失败'
          });  
        }

      //服务器请求错误
      }).catch((error) => {

        this.$message({
          type: 'error',
          message: '获取产品类型列表失败'
        });  
        console.log(error);
      });
    },

    //编辑按钮点击事件
    handleEdit(index, row) {

      this.editFormVisible = true; //将editFormVisible标志位置为true，弹出编辑表单
      //console.log('被点击的产品信息：'+JSON.stringify(row));
      this.editForm = row;

    },

    //删除按钮点击事件
    handleDelete(index, row) {

      //弹出删除确认消息提示框
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      //点击确认
      }).then(() => {

        this.$http.delete('/api/v1/category/'+row.id)
        .then((response) => {

          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;

          if (resultCode === 1) {

            this.$message({
              type: 'success',
              message: '删除成功'
            });     
            //刷新表格数据
            this.getCategorys('/api/v1/categorys');
            this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
          } else {

            this.$message({
              type: 'error',
              message: '删除失败'
            });     
          }
          
        //服务器请求错误
        }).catch((error) => {

          this.$message({
            type: 'error',
            message: '删除失败'
          });     
          console.log(error);
        });

      //点击取消
      }).catch(() => {

        this.$message({
          type: 'info',
          message: '已取消删除'
        });     
      });
    },

    //编辑表单里的确定按钮点击事件
    onEdit(formName) {

      this.$refs[formName].validate((valid) => {
        //编辑表单验证通过
        if (valid) {
    
          //确定编辑时提交的表单数据
          let editData = {
            name: this.editForm.name
          }; 

          this.$http.put("/api/v1/category/"+this.editForm.id,editData)
          .then((response) => {

            //获取返回的结果码
            let resultCode = response.data.extData.resultCode;
        
            if (resultCode === 1 ) {
              this.$message({
                type: 'success',
                message: '修改成功'
              }); 
              //刷新表格数据
              this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
            } else {

              console.log("结果码出错了。。。");
              this.$message({
                type: 'error',
                message: '修改失败'
              });  
            }

          //服务器请求错误
          }).catch((error) => {

            this.$message({
              type: 'error',
              message: '修改失败'
            });  
            console.log(error);
          });

          this.editFormVisible = false; //将editFormVisible标志位置为false，关闭编辑表单
        
        //编辑表单验证未通过
        } else {
          console.log("表单验证未通过");
        }
      });
    },

    //新增表单里的确定按钮点击事件
    onAdd(formName) {

      this.$refs[formName].validate((valid) => {
        //新增表单验证通过
        if (valid) {

          //获得产品的类型的数量
          let count = this.tableData.length;
          //确定新增时提交的表单数据
          let addData = {
            name: this.addForm.addName,
            sortId: count+1
          }; 
        
          this.$http.post("/api/v1/category",addData)
          .then((response) => {
            
            //获取返回的结果码
            let resultCode = response.data.extData.resultCode;

            if (resultCode === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });     

              //刷新表格数据
              
              this.getCategorys('/api/v1/categorys');
              this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
            } else {  
              this.$message({
                type: 'error',
                message: '添加失败'
              });  
            }
            console.log("新增产品返回的数据："+JSON.stringify(response.data));

          //服务器请求错误
          }).catch((error) => {

            this.$message({
              type: 'error',
              message: '添加失败'
            }); 
          });

          this.addFormVisible = false;
        //新增表单验证不通过
        } else {
          console.log("新增表单验证不通过");
        }
      });
    },

    //关闭编辑和新增表单的对话框时执行此方法
    closeDialog(formName) {
      if (formName === 'editForm') {
        this.editFormVisible = false;
      } else if (formName === 'addForm') {
        this.addFormVisible = false;
      }

      //重置表单数据
      this.$refs[formName].resetFields();
    },

    handleCurrentChange(val) {
      console.log("类型列表当前："+val);
      this.currentPage = val;
      this.getCategorys('/api/v1/categorys?page='+this.currentPage+'&pagesize='+this.pageSize);
    },
    uploadError() {
      console.log("上传失败。。。");
    },

    uploadSuccess() {
      console.log("上传成功。。。");
    }
  }
}
</script>

<!--本组件有效-->
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
  .searchInput {
    width: 500dp
  }

</style>
