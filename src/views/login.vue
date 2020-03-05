<template>
	<div class="login_container"><!-- 设置背景颜色，高 -->
		<div class="login_box"><!--设置盒子大小，位置  -->
			<div class="avatar_box"><!-- 设置图标盒子 图标区域 -->
				<img src="~assets/logo.png"/>
			</div>
			<div><!-- 登录区域 -->
				<el-form :model="loginFrom" :rules="loginFromRules" ref="loginfromref" label-width="0px" class="login_from">
					<!-- 用户名 -->
				  <el-form-item prop="username">
				    <el-input v-model="loginFrom.username"  prefix-icon="iconfont icon-user"></el-input>
				  </el-form-item>
				  <!-- 密码-->
				  <el-form-item prop="password">
				    <el-input v-model="loginFrom.password"  prefix-icon="iconfont icon-lock_fill" type="password"></el-input>
				  </el-form-item>
				  <!-- 按钮区域-->
				<el-form-item class="btm">
				  <el-button type="primary" @click="login">登录</el-button>
				  <el-button type="info" @click="resetLoginFrom">重置</el-button>
				</el-form-item>
				  
				  </el-form>
			</div>
		</div>
	</div>
    
</template>
<script>
	
export default {
    name:'login',
	data(){
		return{
			loginFrom:{
				username:'',
				password:''
			},
			loginFromRules:{
				username:[ { required: true, message: '请输入登录名称', trigger: 'blur' },
			        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
				password:[{ required: true, message: '请输入登录密码', trigger: 'blur' },
			        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
			}
		}
	},
	methods:{
		

		resetLoginFrom(){
			console.log("点到我了")
			this.$refs.loginfromref.resetFields();
		},
		login(){
			this.$refs.loginfromref.validate(valid=>{
				if(!valid) return;
				this.$axios.login({
						username:this.loginFrom.username,
						password:this.loginFrom.password
				}).then( (response)=>{/* 箭头函数跟普通函数的this指向不同 */
					if(response==null||response==""){
						 this.$message.error('账号密码错误')
					}else{
						console.log(response);
						console.log(response.data.token)
						 this.$message.success('登录成功')
						 window.sessionStorage.setItem("token",response.data.token)
						 this.$router.push("/Home")
					}
						
  })
  .catch(function (error) {
    console.log(error);
  });
				console.log(this.loginFrom.username)
			})
		}
	}
	
	
}
</script>
<style scoped>
.login_container{
	background-color: cornflowerblue;
	height: 100%;
}
.login_box{
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.login_box .avatar_box{
		height: 130px;
		width: 130px;
		border: 1px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left: 50%;
		background-color: #FFFFFF;
		transform: translate(-50%,-50%);
}
.login_box .avatar_box img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #EEEEEE;
}
.login_from{
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;/* 盒子溢出处理 */
}
.btm{
	display: flex;/* 弹性布局 */
	justify-content: flex-end;
}
</style>