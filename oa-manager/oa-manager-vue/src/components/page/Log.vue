<template>
  <div>
    <!--顶部搜索框部分-->
    <el-row>
      <!--设置 inline 属性可以让表单域变为行内的表单域-->
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">  
        <el-form-item >
          <el-input placeholder="请输入搜索内容" ></el-input>  
        </el-form-item>  
        <el-form-item>  
          <el-button type="primary" icon="search" @click="dialogFormVisible = false">搜索</el-button>
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
          inline-template
          :context="_self"
          label="序号"
          width="160"
          align="center"
          fixed>
          <span>{{$index+addIndex}}</span>
        </el-table-column>   
        <el-table-column label="日志ID" prop="id" align="center"  v-if="false"></el-table-column>
        <el-table-column label="操作时间" prop="createTime" align="center" ></el-table-column>
        <el-table-column label="日志内容" prop="content" align="center" ></el-table-column>
        <el-table-column
          label="操作"
          width="238"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

		<!--分页器-->
			<!--分页器-->
		<el-row  type="flex" class="row-bg" justify="center">
			<div class="block" >
				<el-pagination
					@current-change="handleCurrentChange"
          :page-size="pageSize"
					layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
  		</div>
		</el-row>

  </div>
</template>

<script>

  import dateFormat from '../../tools/dateFormat';
  export default {
    name: 'log',
    data() {
    return {
      total: 1,
      pageSize: 10,
      addIndex: 1,
      tableData: [],
      searchForm: {},
      formLabelWidth: '80px'
    }
  },

    //vue实例创建时执行该生命周期方法
  created: function () {
    this.getLogs('/api/v1/logs');
    this.getLogs('/api/v1/logs?page=1&pagesize='+this.pageSize);
  },
  methods: {

    //获取日志信息列表
    getLogs(url) {

      this.$http.get(url)
      .then((response) => {

        let resultCode = response.data.extData.resultCode;

        if (resultCode === 1) {
          this.$message({
            type: 'success',
            message: '获取日志列表成功'
          });     
          if (url === '/api/v1/logs') {
            this.total = response.data.extData.logList.count;
          } else {
            let data = [];
            //获取返回的日志信息列表数据
            let result = response.data.extData.logList.rows;
            
            for (let i = 0; i < result.length; i++) {

              let log = {};
              log.id = result[i].id; //日志ID
              //使用日期格式转换工具将时间戳转换成日期格式
              console.log('转换之前的日期：'+result[i].createTime);
              log.createTime = dateFormat(result[i].createTime); //日志创建时间
              console.log('转换之后的日期：'+log.createTime);
              // log.createTime = result[i].createTime;
              log.content = result[i].content; //日志内容
              data[i] = log;
            }   
            this.tableData = data;
          }
        } else {

          this.$message({
            type: 'error',
            message: '获取日志列表失败'
          });  
        }

      //服务器请求错误
      }).catch((error) => {

        this.$message({
          type: 'error',
          message: '获取日志列表失败'
        });  
        console.log(error);
      });
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
            this.refreshData();
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

    //分页器中页码改变的监听事件
    handleCurrentChange(val) {
      this.currentPage = val;
      this.addIndex = (this.currentPage - 1) * this.pageSize +1;
      this.getLogs('/api/v1/logs?page='+this.currentPage+'&pagesize='+this.pageSize);
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
