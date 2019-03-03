<template>
	<div class="loginPage">
		<div class="contains">
			<div class="logo">
				<img src="../assets/logoActive.png" />
			</div>

			<div class="left">
				<img src="../assets/pluginImg1.png" style="width: 520px;height: 401px;" />
			</div>
			<div class="right">
				<div>
					<div class="up">
						<div>Hello!</div>
						<div>
							<span>欢迎注册,</span>
							<span>万高口袋车服系统</span>
						</div>
					</div>
					<div class="middle">
						<div>
							<span style="text-align: start;margin-left: 10px;">用户名:</span>
							<input placeholder="请输入您的用户名"  v-model="username" @blur="checkName"/>
						</div>
						<div>
							<span style="text-align: start;margin-left: 10px;" >密码:</span>
							<input placeholder="请输入您的密码" v-model="pwd"/>
						</div>
						<div>
							<span style="text-align: start;margin-left: 10px;" >手机号:</span>
							<input placeholder="请输入您的手机号" v-model="telphone"/>
						</div>

						<div></div>
						
					</div>
				    <div>
						<div class="code1">
							<input id="code1" type="text" autocomplete="off" placeholder="短信验证码" v-model="number" />
							<input id="btnSendCode1" type="button" class="btn btn-default" :value="valcon" @click="getcode" :disabled="isDisabled"/>
						</div>
					</div>
					<div class="down">
						<button @click="reg">注册</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//	import MyAjax from "../assets/MyAjax.js";
    import axios from '../axios_auth';
	export default {
		name: 'Register',
		data() {
			return {
				phoneReg: '',
				username:'',
				pwd:'',
				telphone:'',
				random:'0000',
				number:'',
				
				//计时器
				isDisabled:false,
				valcon:'获取验证码',
				count: 60,
				InterValObj1: 0, //timer变量，控制时间
				curCount1: 0, //当前剩余秒数
			}
		},
		mounted() {
			this.phoneReg = /(^1[3|4|5|7|8]\d{9}$)/;
		},
		methods: {
			//用户名是否重复
			checkName(){
			   let phone = this.telphone;
				axios.post('/valNameuser.action?phone='+phone)
				   .then((res)=>{
				   	   if(res.data[0].state == 'fail') {
							alert('用户名已存在');
						}
				   }).catch((error)=>{
				   	    console.log(error)
				   })
		   },
			//获取验证码
			getcode: function() {
				this.curCount1 = this.count;
				let phone = this.telphone;
				if(!this.phoneReg.test(phone)) {
					alert(" 请输入有效的手机号码");
					return false;
				}
				//设置button效果，开始计时
				this.isDisabled = true;
				this.valcon = (this.curCount1 + "秒再获取");
				let that  = this;       // 必须重定向
				that.InterValObj1 = setInterval(function() {
					if(that.curCount1 == 0) {
						clearInterval(that.InterValObj1); //停止计时器
						that.isDisabled = false; //启用按钮
						that.valcon = "重新发送";
					} else {
						that.curCount1--;
						that.valcon = (that.curCount1 + "秒再获取");
					}
				}, 1000); 
				
				axios.post('/getValidatauser.action?phone='+phone)
				   .then((res)=>{
				   	   if(res.data[0].state == 'success') {
						    that.random = data[1].random;
					   }
				   }).catch((error)=>{
				   	    console.log(error)
				   })
				
			},
			//注册按钮
			reg(){
				let username = this.username;
				let userpwd = this.pwd;
				let phone = this.telphone;
				let random = this.random;
				let number = this.number;
				if(username == '' || userpwd == '' || phone == '' || number == '') {
					alert('请输入完整信息');
				} else {
				  axios.post('/addAuthorityuser.action?username=' + username + '&userpwd=' + userpwd + '&phone=' + phone + '&random=' + random + '&number=' + number)
				   .then((res)=>{
				   	   if(res.data[0].state == 'success') {
					        alert('注册成功')
							this.$router.push('/')
						}
				   }).catch((error)=>{
				   	    console.log(error)
				   })
					
				}
			}

		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		text-decoration: none;
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
		overflow-y: hidden;
	}
	
	.loginPage {
		height: 100%;
		width: 100%;
		background: url(../assets/loginBg.png) no-repeat;
		background-size: 100% 100%;
		padding: 5% 9% 5% 6%;
	}
	
	.contains {
		position: relative;
		width: 100%;
		display: flex;
		background-color: #fff;
		align-items: center;
		border-radius: 10px;
		padding: 8% 0 5% 0;
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 8px 5.76px 0.24px rgba(223, 199, 197, 0.3);
	}
	
	.logo {
		position: absolute;
		top: 5%;
		left: 4%;
	}
	
	.logo img {
		width: 144px;
		height: 52px;
	}
	
	.contains .left {
		width: 57%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.contains .right {
		width: 43%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.contains .up div:first-child {
		font-size: 26px;
		font-weight: 500;
	}
	
	.contains .up div:last-child {
		margin-top: 10px;
		font-size: 24px;
		font-weight: 500;
	}
	
	.contains .up span:first-child {
		color: #CDCDCD;
	}
	
	.contains .up span:last-child {
		color: #E66867;
	}
	
	.contains .middle {
		margin-top: 40px;
	}
	
	.contains .middle div {
		display: flex;
		flex-direction: column;
		height: 70px;
		margin-bottom: 10px;
		width: 100%;
	}
	
	.contains .middle div input {
		border-radius: 5px;
		width: 100%;
		outline: none;
		border: 0.5px solid #F6F6F6;
		text-indent: 10px;
		height: 40px;
		background: #F6F6F6;
	}
	
	.contains .middle div:last-child {
		flex-direction: row;
		justify-content: flex-end;
		height: 10px;
		align-items: center;
		margin-top: -5px;
	}
	/*.contains .middle div:last-child input {
				width: 15px;
				height: 15px;
			}*/
	
	.contains .middle input::-webkit-input-placeholder {
		color: #999;
	}
	
	.contains .middle div span {
		height: 30px;
		line-height: 30px;
	}
	
	.contains .down {
		margin-top: 20px;
		width: 100%;
	}
	
	.contains .down button {
		text-align: center;
		border-radius: 20px;
		background-color: #ffe901;
		height: 40px;
		line-height: 40px;
		width: 100%;
		color: #333;
		font-size: 16px;
		border: none;
		outline: none;
		box-shadow: 0px 6px 5.76px 0.24px rgba(227, 222, 167, 0.3);
		cursor: pointer
	}
	
	.codes {
		height: 40px;
		padding-left: 30%;
		color: #0087f4;
	}
	
	.codes input {
		height: 36px;
		width: 90px;
		outline: none;
		text-indent: 10px;
		border: 1px solid #ccc;
		margin-right: 10%;
	}
	
	.codes span {
		cursor: pointer
	}
	/*-------------------------------*/
	
	.code1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		background: none;
		padding-top: 30px;
		margin-top: -30px;
		font-size: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, .2);
		border-radius: 0;
	}
	
	#code1 {
		width: calc(100% - 90px);
		height: 40px;
		background: none;
		padding-top: 20px;
		text-indent: 30px;
		border: 0;
		outline: none;
		margin-top: -20px;
		font-size: 16px;
	}
	
	#btnSendCode1 {
		width: 90px;
		height: 30px;
		padding: 0 5px;
		margin: -15px 0;
		font-size: 14px;
		text-align: center;
		background: transparent;
		border-radius: 30px;
		color: #a07941;
		border-color: #a07941;
	}
	
	::-webkit-input-placeholder {
		/* WebKit browsers */
		font-size: 14px;
		color: rgba(0, 0, 0, .4);
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		font-size: 14px;
		color: rgba(0, 0, 0, .4);
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		font-size: 14px;
		color: rgba(0, 0, 0, .4);
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		font-size: 14px;
		color: rgba(0, 0, 0, .4);
	}
</style>