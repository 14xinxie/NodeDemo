<template>
	<div>
		<div class="crumbs crumbs-register">
			<el-breadcrumb separator="/" class="register-title">
        <el-breadcrumb-item>注册</el-breadcrumb-item>
      </el-breadcrumb>
		</div>
		<div class="register-wrap">
			<el-form ref="registerForm" :model="registerForm" :rules="registerRule" label-width="80px">
				<el-form-item prop="nickName" label="昵称">
					<el-input v-model="registerForm.nickName" placeholder="请输入昵称"></el-input>
				</el-form-item>
				<el-form-item prop="account" label="帐号">
					<el-input v-model="registerForm.account" placeholder="请输入帐号"></el-input>
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="确认密码">
					<el-input v-model="registerForm.checkPass" type="password" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="手机号">
					<el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('registerForm')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	//导入工具模块
	import Util from '../../tools/regExp';
	export default {
    name: 'register',
		data() { 

			//校验昵称
			let validateNickName = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入昵称"));
				} else {
					callback();
				}
			};

			//校验帐号
			let validateAccount = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入帐号"));
				} else if (!Util.accountReg.test(value)) {
					callback(new Error("帐号必须为字母或下划线开头的6-20位的数字和字母的组合"));
				} else {
					callback();
				}
			};

			//校验密码
			let validatePassWord = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else if (!Util.passwordReg.test(value)) {
					callback(new Error("密码必须为6-20位，且必须包含大小写字母和数字"));					
				} else {
					callback();
				}
			};

			//校验确认密码
			let validateCheckPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.registerForm.password) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};

			//校验手机号
			let validatePhone = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号'));
				} else if (!Util.phoneReg.test(value)){
					callback(new Error('请输入正确的手机号'));
				} else {
					callback();
				}
			};
	
      return {
				registerForm: {
					nickName: '',
					account: '',					
					password: '',
					checkPass: '',
					phone: ''
        },
				registerRule: {
					nickName: [
						{ required: true, validator: validateNickName, trigger: 'blur' }
					],
					account: [
						{ required: true, validator: validateAccount, trigger: 'blur' }
					],
					password: [
						{ required: true, validator: validatePassWord, trigger: 'blur' }
					],
					checkPass: [
						{ required: true, validator: validateCheckPass, trigger: 'blur' }
					],
					phone: [
						{ required: true, validator: validatePhone, trigger: 'blur' }
					]
				}
			}
    },

    methods:{

			//确定按钮点击事件
      onSubmit(formName) {		
				this.$refs[formName].validate((valid) => {
					//注册时提交的表单数据
					let registerData = {
						nickName: this.registerForm.nickName,
						account: this.registerForm.account,
						password: this.registerForm.password,
						phone: this.registerForm.phone
					};
					//表单验证通过
          if (valid) {
						this.$http.post("/api/v1/user/register",registerData)
						.then((response) => {
              
              let resultCode = response.data.extData.resultCode;

              let user = response.data.extData.user;

              if (resultCode === 1) {

                this.$message({
                  type: 'success',
                  message: '注册成功'
                });   

                //注册成功后直接登录进入系统首页
                //并将用户信息存入session中
                sessionStorage.setItem('user',JSON.stringify(user));

                //用户为普通用户
                if (user.role == 0) {
                  //注册成功后便直接跳转至首页;
                  this.$router.push('/index');
                  
                //用户为管理员用户
                } else {
                  //注册成功后便直接跳转至首页;
						      this.$router.push('/admin');
                }
                
              } else if (resultCode === 2) {
                this.$message({
                  type: 'error',
                  message: '该用户已存在'
                });  
              } else if (resultCode === 0) {
                this.$message({
                  type: 'error',
                  message: '注册失败'
                });  

                console.log("注册失败啦。。。");
              }
            //服务器请求错误
						}).catch((error) => {

              this.$message({
                type: 'error',
                message: '注册失败'
              });  
							console.log(error);
						});
					//表单验证未通过
          } else {
						console.log('表单验证未通过');
						return false;
          }
        });
			},
			
			//取消按钮点击事件
      onCancle() {
				//返回登录页面
        this.$router.push('/login');
			},	
    }
	}
</script>

<style>
	.crumbs-register {
		background-color: #324157;
		height: 50px;
		line-height: 50px;
	}
	.register-title {
		line-height: 50px;
		margin: 0 auto;
    width: 50px;
    font-size: 16px;
	}	
	.register-wrap {
		width: 400px;
		margin: 0 auto;
	}
</style>