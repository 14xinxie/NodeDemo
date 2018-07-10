<template>
	<div class="login-wrap">
		<div class="ms-title">OA管理系统</div>
		<div class="ms-login">
				<div v-if="errorFlag">
					<span>{{errorInfo}}</span>
				</div>
			<el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-width="0px" class="demo-ruleForm">
				<el-form-item prop="account">
					<el-input v-model="loginForm.account" placeholder="帐号" ></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="login('loginForm')"></el-input>
				</el-form-item>
				<el-form-item  prop="validate">
					<el-input v-model="loginForm.validate" class="validate-code" placeholder="验证码" ></el-input>
					<div class="code" @click="refreshCode">
						<s-identify :identifyCode="identifyCode"></s-identify>
					</div>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="login('loginForm')">登录</el-button>
				</div>
				<p class="register-btn" @click="register()">注册</p>  
			</el-form>
		</div>
	</div>    
</template>

<script>
	export default {
		name: 'login',
		data() {

			//校验帐号
			let validateAccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入帐号'));
				} else  {
					callback();
				}
			};

			//校验密码
			let validatePassWord = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};

			//校验验证码
			let validateCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else if (value !== this.identifyCode) {
					callback(new Error('请输入正确的验证码'));
				} else {
					callback();
				}
			}

			return {
				identifyCodes: "1234567890",
				identifyCode: "",
				errorFlag : false,
				loginForm: {
					account: '',
					password: '',
					validate: ''                    
				},

				//登录表单的校验规则
				loginRule: {
					account: [
						{  validator: validateAccount, trigger: 'blur' }
					],
					password: [
						{ validator: validatePassWord, trigger: 'blur' }
					],
					validate: [
						{ validator: validateCode, trigger: 'blur' }
					]
				}
			}
		},

		//vue的生命周期函数，一个钩子函数
		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},

		methods: {
			//登陆按钮点击事件
			login(formName) {
				this.$refs[formName].validate((valid) => {
					//表单验证通过
					if (valid) {        
						//登录时提交的表单数据
						let loginData = {
							account: this.loginForm.account,
							password: this.loginForm.password
						};     

						this.$http.post('/api/v1/user/login',loginData)
						.then((response) => {
							//获取请求响应中携带的数据
							let result = response.data.extData;
							if (result.resultCode == 1) {

								sessionStorage.setItem('user',JSON.stringify(result.user));
								if (result.user.role == 1) {
                  this.$router.push('/admin');
								} else if (result.user.role == 0) {
                  this.$router.push('/index');
								}
							} else if (result.resultCode == 0) {

								//显示错误信息
								this.errorFlag = true;
								this.errorInfo = '密码错误';
							}
							
						}).catch((error) => {
              console.log(error);
						});
					//表单验证未通过
					} else {
            console.log('表单验证未通过');
            return false;
					}
				});
			},

			//注册按钮点击事件
			register() {
				this.$router.push('/register');
			},

			//产生一个min~max的随机数
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},

			//刷新验证码
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},

			//生成验证码
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
				}
				console.log(this.identifyCode);
			}
		}
	}
</script>

<style scoped>
	.login-wrap{
		position: relative;
		width:100%;
		height:100%;
	}
	.ms-title{
		position: absolute;
		top:50%;
		width:100%;
		margin-top: -230px;
		text-align: center;
		font-size:30px;
		color: #fff;

	}
	.ms-login{
		position: absolute;
		left:50%;
		top:50%;
		width:300px;
		height:240px;
		margin:-150px 0 0 -190px;
		padding:40px;
		border-radius: 5px;
		background: #fff;
	}
	.ms-login span {
		position: relative;
		margin-top: -25dp;
		color: red;
	}
	.login-btn{
		text-align: center;
	}
	.login-btn button{
		width:100%;
		height:36px;
	}
	.code {
		width: 112px;
		height: 35px;
		border: 1px solid #ccc;
		float: right;
		border-radius: 2px;
	}
	.validate-code {
		width: 136px;
		float: left;
	}
	.register-btn {
		font-size:14px;
		line-height:30px;
		color:#999;
		cursor: pointer;
		float:right;
	}
</style>