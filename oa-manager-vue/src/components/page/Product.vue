<template>
  <div>
    <!--顶部搜索框部分-->
    <el-row>
      <!--设置 inline 属性可以让表单域变为行内的表单域-->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" >  
        <el-form-item >  
          <el-input  style="margin-left:50dp" placeholder="请输入搜索内容"  v-model="schfilter"></el-input>  
        </el-form-item>  
        <el-form-item>  
          <el-button type="primary" icon="search" @click="onSearch()">搜索</el-button>
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
        <el-table-column label="产品名称" prop="name" align="center" ></el-table-column>
        <el-table-column label="产品类型" prop="categoryName" align="center" ></el-table-column>
        <el-table-column label="产品描述" prop="desc" align="center" ></el-table-column>
        <el-table-column label="产品网址" prop="url" align="center" ></el-table-column>
        <el-table-column label="注意事项" prop="tip" align="center" ></el-table-column>
        <el-table-column label="所属网段" prop="netSegment" align="center" ></el-table-column>
        <el-table-column label="产品图标名称" prop="iconName" align="center" v-if="false" ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
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

    <!--点击查看大图时的对话框-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!--编辑产品信息的对话框部分-->
    <el-dialog title="产品详细信息" :visible.sync="editFormVisible" @close="closeDialog('editForm')">
      <el-form :model="editForm" :rules="editRule" ref="editForm">
        <el-form-item label="产品图标" :label-width="formLabelWidth">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :disabled="uploadShow"
            :file-list="imageList"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> 
        <!--编辑表单的左半部分-->
        <el-col :span="12">
          <!--设置为隐藏项-->
          <el-form-item label="产品ID" :label-width="formLabelWidth" prop="desc" style="display:none" >
            <el-input type="text" autosize v-model="editForm.id" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editForm.name" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="产品描述" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" autosize v-model="editForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="注意事项" :label-width="formLabelWidth" prop="tip">
            <el-input  v-model="editForm.tip" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        
        <!--编辑表单的右半部分-->
        <el-col :span="12">
          <el-form-item label="产品类型" :label-width="formLabelWidth" prop="categoryName" >
            <el-select v-model="editForm.categoryName" placeholder="请选择产品类型">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name"  :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品网址" :label-width="formLabelWidth" prop="url">
            <el-input v-model="editForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属网段" :label-width="formLabelWidth" prop="netSegment">
            <el-select v-model="editForm.netSegment" placeholder="请选择网段">
              <el-option v-for="item in netSegments" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="closeDialog('editForm')">取 消</el-button>
        <el-button type="primary" @click="onEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>

     <!--新增产品信息的对话框部分-->
    <el-dialog title="产品详细信息" :visible.sync="addFormVisible" @close="closeDialog('addForm')" center="true">
      <el-form :model="addForm" :rules="addRule" ref="addForm">
        <el-form-item label="产品图标" :label-width="formLabelWidth" >
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :disabled="uploadShow"
            :file-list="imageList"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item> 
        <!--新增表单的左半部分-->
        <el-col :span="12">
          <el-form-item label="产品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="产品描述" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" autosize v-model="addForm.desc" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="注意事项" :label-width="formLabelWidth" prop="tip">
            <el-input  v-model="addForm.tip" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        
        <!--新增表单的右半部分-->
        <el-col :span="12">
          <el-form-item label="产品类型" :label-width="formLabelWidth" prop="categoryName" >
            <el-select v-model="addForm.categoryName" placeholder="请选择产品类型">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" 
              :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品网址" :label-width="formLabelWidth" prop="url">
            <el-input v-model="addForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属网段" :label-width="formLabelWidth" prop="netSegment">
            <el-select v-model="addForm.netSegment" placeholder="请选择网段">
              <el-option v-for="item in netSegments" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
    name: 'product',
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

    //校验产品描述
    let validateDesc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入产品描述"));
      } else {
        callback();
      }
    };

    //校验注意事项
    let validateTip = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入注意事项"));
      } else {
        callback();
      }
    };

    //校验产品类型
    let validateCategoryName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择产品类型"))
      } else {
          console.log("选择的产品类型:"+value);
        callback();
      }
    };

    //校验产品网址
    let validateUrl = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入产品网址"));
      } else {
        callback();
      }
    };

    //校验所属网段
    let validateNetSegment = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入所属网段"));
      } else {
        callback();
      }
    };

    return {
      dialogImageUrl: '', //对话框大图的url地址
      dialogVisible: false, //显示大图的对话框是否可见的标志位
      baseUrl:'http://localhost:5001/image/',
      imageList: [], //上传的文件列表
      fileSize: 0, //上传的文件数量
      file: '',
      currentPage: 1,
      pageSize: 10,
      total: 1,
      addIndex: 1,
      schfilter: '', //搜索的关键字
      tableData: [],
      editFormVisible: false,
      addFormVisible: false,
      searchForm: {},
      editForm: {},
      addForm: {},
      editRule: {
        name : [
          { validator: validateName, trigger: 'blur'}
        ],
        desc : [
          { validator: validateDesc, trigger: 'blur'}
        ],
        tip : [
          { validator: validateTip, trigger: 'blur'}
        ],
        categoryName : [
          { validator: validateCategoryName, trigger: 'blur'}
        ],
        url : [
          { validator: validateUrl, trigger: 'blur'}
        ],
        netSegment : [
          { validator: validateNetSegment, trigger: 'blur'}
        ]
      },
      addRule: {
        name : [
          { required: true, message: '请填写产品名称', trigger: 'blur' }
        ],
        desc : [
          { required: true, message: '请填写产品描述', trigger: 'blur' }
        ],
        tip : [
          { required: true, message: '请填写注意事项', trigger: 'blur' }
        ],
        categoryName : [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        url : [
          { required: true, message: '请填写产品网址', trigger: 'blur' }
        ],
        netSegment : [
          { required: true, message: '请选择所属网段', trigger: 'blur' }
        ]
      },
      categoryList: [],
      netSegments: [
        {
          id: 1,
          name: "inside"
        },{
          id: 2,
          name: "outside"
        }
      ],
      formLabelWidth: '80px'
    }
  },

  computed: {
    
    //计算属性uploadShow
    uploadShow:function() {
      
      return this.fileSize > 0;
    },
    
  },
  //vue实例创建时执行该生命周期方法
  created: function () {
    this.getProducts('/api/v1/products');
    this.getProducts('/api/v1/products?page='+this.currentPage+'&pagesize='+this.pageSize);
    this.getCategorys('/api/v1/categorys');
  },

  watch: {  
    schfilter: function(val, oldVal){  
      this.tableData = this.tableData.filter( item => (~item.name.indexOf(val)));  
    }  
  },  
  
  methods: {

    //上传文件之前执行
    beforeUpload(file) {
      this.fileSize = 1;
      console.log('上传文件中...');
      this.file = file;
      //console.log(file);
    },

    //删除图片的点击事件
    handleRemove(file, fileList) {
      this.fileSize -= 1;
      console.log('删除...');
    },

    //预览大图的点击事件
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //获取产品信息列表数据
    getProducts(url) {
      let data = [];
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
              product.iconName = result[i].iconName; //产品图标名称
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
    

    //获取分类信息列表数据
    getCategorys(url) {

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
          this.categoryList = result;
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

    //编辑按钮点击事件
    handleEdit(index, row) {

      //初始化设置imageList为空
      this.imageList = [];
      this.editFormVisible = true; //将editFormVisible标志位置为true，弹出编辑表单
      this.editForm = row; //填充编辑表单
      this.dialogImageUrl = this.baseUrl+row.iconName;
      this.imageList.push({
        url: this.baseUrl+row.iconName+'',
        status: 'finished'
      });
  
      this.fileSize = 1;
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

        this.$http.delete('/api/v1/product/'+row.id)
        .then((response) => {

          //获取返回的结果码
          let resultCode = response.data.extData.resultCode;
          if (resultCode === 1) {

            this.$message({
              type: 'success',
              message: '删除成功'
            });     
            //刷新表格数据
            this.getProducts('/api/v1/products');
            this.getProducts('/api/v1/products?page='+this.currentPage+'&pagesize='+this.pageSize);

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

      console.log("被删除的id:"+row.id);
    },

    //编辑表单里的确定按钮点击事件
    onEdit(formName) {
      this.$refs[formName].validate((valid) => {
        //编辑表单验证通过
        if (valid) {
          let categoryId = 1; //给categoryId赋初值，默认为1
          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.editForm.categoryName) {
              categoryId = this.categoryList[i].id;
            }
          }

          //判断是否选取了文件上传
          if (this.file === '') {
            this.$message({
              type: 'info',
              message: '请先上传图片'
            }); 
            return;
          }
          
          //确定编辑时提交的表单数据
          let editFormData = new FormData();

          editFormData.append('name', this.editForm.name);
          editFormData.append('categoryId', categoryId);
          editFormData.append('desc', this.editForm.desc);
          editFormData.append('url', this.editForm.url);
          editFormData.append('tip', this.editForm.tip);
          editFormData.append('netSegment', this.editForm.netSegment);
          editFormData.append('iconFile', this.file);

          //设置formData提交的数据格式为multipart/form-data
          let confg = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };

          this.$http.put("/api/v1/product/"+this.editForm.id,editFormData,confg)
          .then((response) => {

            let resultCode = response.data.extData.resultCode;
            if (resultCode === 1) {

              this.$message({
                type: 'success',
                message: '修改成功'
              });     
              //刷新表格数据
              this.getProducts('/api/v1/products?page='+this.currentPage+'&pagesize='+this.pageSize);
            } else {

              this.$message({
                type: 'error',
                message: '修改失败'
              });    
            }

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

      //初始化设置imageList为空
      this.imageList = [];
      this.fileSize = 0;

      this.$refs[formName].validate((valid) => {

        //新增表单验证通过
        if (valid) {

          let categoryId = 1; //给categoryId赋初值，默认为1
          for (let i=0;i<this.categoryList.length;i++) {
            if (this.categoryList[i].name === this.addForm.categoryName) {
              categoryId = this.categoryList[i].id;
            }
          }

          //使用data变量暂存表格中的数据tableData
          let data = this.tableData;

          //用于统计某个产品类型下的产品数量
          let count = 0;

          //统计新增表单种选择的产品类型下产品的数量
          for(let i=0;i<data.length;i++) {
            if (data[i].categoryName === this.addForm.categoryName) {
              count++;
            }
          }

          if (this.file === '') {
            
            this.$message({
              type: 'info',
              message: '请先上传图片'
            }); 
            return;
          }
          

          let addFormData = new FormData();

          addFormData.append('name', this.addForm.name);
          addFormData.append('categoryId', categoryId);
          addFormData.append('desc', this.addForm.desc);
          addFormData.append('url', this.addForm.url);
          addFormData.append('tip', this.addForm.tip);
          addFormData.append('netSegment', this.addForm.netSegment);
          addFormData.append('sortId', count+1);
          addFormData.append('iconFile', this.file);

          //设置formData提交的数据格式为multipart/form-data
          let confg = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };

          this.$http.post("/api/v1/product",addFormData,confg)
          .then((response) => {
            
            let resultCode = response.data.extData.resultCode;

            if (resultCode === 1) {
              this.$message({
                type: 'success',
                message: '添加成功'
              });     
              //刷新表格数据
              this.getProducts('/api/v1/products');
              this.getProducts('/api/v1/products?page='+this.currentPage+'&pagesize='+this.pageSize);
            } else {

              this.$message({
                type: 'error',
                message: '添加失败'
              });     
            }

          //服务器请求出错
          }).catch((error) => {

            this.$message({
              type: 'error',
              message: '添加失败'
            });    
            console.log(error);
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
        this.imageList = []; //初始化设置imageList为空
        this.file = '';
      }
      //重置表单数据
      this.$refs[formName].resetFields();
    },

    handleCurrentChange(val) {
      this.currentPage = val;

      this.addIndex = (this.currentPage - 1) * this.pageSize +1;
      console.log(`当前页: ${val}`);
      this.getProducts('/api/v1/products?page='+this.currentPage+'&pagesize='+this.pageSize);
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

  .img-box{

    /* 设置inline-block使img填充div宽高，然后用+定位到右上角，block占据一整行，不能自适应内部元素宽高，
    inline使宽度自适应，但是无法设置宽高：宽高无效，+就无法定位到右上角 */
    display: inline-block;  

    border: 1px solid #ececec;
    position: relative;
     margin-left: 50px;
  }

  /* 设置最大宽度，以免溢出：：：：不要设置百分比80%，否则div会是img的125%，导致+定位到右侧 */
  .cover-img{
    max-width: 100px;
    min-width: 50px;
   
  }

  .image-remove{
    background-color: white;
    font-color: #ececec;
    font-size: 30px;
    width: 30px;
    height: 30px;
    text-align: center;

    border-radius: 100%;
    transform: rotate(45deg); 
    cursor:pointer;
    opacity: 0.5;
    /* top、right: 距离上侧2个像素，距离右侧两个像素，也就是右上角 */
    top:2px;
    right:2px;   
    /* 块元素:设置宽和高，inline元素设置宽高无效 */
    display: block; 
    /* 绝对定位，关联父元素的relative */
    position: absolute; 
  }
  .disabled .el-upload--picture-card {
    display: none;
}
</style>
