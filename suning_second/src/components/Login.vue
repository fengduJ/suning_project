<template>
	<div class="index">
		<div class="loginPage" style="width: 100%;">
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
								<span>欢迎登录,</span>
								<span>万高口袋车服系统</span>
							</div>
						</div>
						<div class="middle">
							<div>
								<span id="span">用户名:</span>
								<input placeholder="请输入您的用户名" class="username" v-on:blur="checkUser"  v-model="username"/>
							</div>
							<div style="margin-bottom: 20px;">
								<span id="span">密码:</span>
								<input placeholder="请输入您的密码" class="psw" v-model="userpwd"/>
							</div>
							<div class="register">
								<router-link to="/register">
									<p class="reg">注册</p>
								</router-link>

								<p></p>
								<p class="backpsw" @click="backpsw">忘记密码?</p>
							</div>
						</div>
						<div class="down">
							<button @click="down">确定</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="backPsw" v-if="none_1">
			<div class="backpswCon" v-hights="height?'normal':'small'">
				<div class="close" @click="close">X</div>
				<div class="modal_content" v-if="show_1">
					<div>
						<label for="phone1" style="float: left;">注册手机号：</label><br />
						<input id="phone1" type="text" autocomplete="off" placeholder="请输入已绑定的手机号" v-model="telphone"/>
					</div>
					<div>
						<label for="code1" style="float: left;">验证码：</label>
						<div class="code1">
							<input id="code1" type="text" autocomplete="off" placeholder="短信验证码" v-model="code1"/>
							<input id="btnSendCode1" type="button" class="btn btn-default" :value="valcon" @click="btnSendCode1" />
						</div>
					</div>
					<div class="next">
						<button id="confirm" @click="next">确定</button>
					</div>
				</div>
				<div class="tab" v-if="none_2">
					<table>
						<tbody>
							<tr>
								<th>用户名:</th>
								<td><input placeholder="请输入用户名" style="width: 300px;" class="newUsername" v-model="newUsername"/></td>
							</tr>
							<tr>
								<th>新密码:</th>
								<td><input placeholder="请输入新密码" style="width: 300px;" class="newPsw" v-model="newPsw"/></td>
							</tr>
							<tr>
								<th>确认密码:</th>
								<td><input placeholder="请再次输入密码" style="width: 300px;" class="connewPsw" v-model="connewPsw"/></td>
							</tr>
						</tbody>
					</table>
					<div class="next1">
						<button @click="next1">确定</button>
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
		name: 'Login',
		data() {
			return {
				phoneReg: '',
				//计时器
				isDisabled:false,
				valcon:'获取验证码',
				count: 60,
				InterValObj1: 0, //timer变量，控制时间
				curCount1: 0, //当前剩余秒数
				code1:'',
				random:'0000',
				username:'',
				userpwd:'',
				telphone:'',
				
				newUsername:'',
				newPsw:'',
				connewPsw:'',
				
				none_1:false,    //  #backPsw
				none_2:false,    // .tab
				show_1:true,     //  .modal_content
				
				height:true
			}
		},
		mounted() {
			this.phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
		},
		directives:{
			'hights':{
				bind(el,binding,vnode){
					if(binding.value == 'small'){
						el.style.height = '290px'
					}
				}
			}
		},
		methods: {
			// 登录的确定按钮
			down: function() {
				let username = this.username;
				let userpwd = this.userpwd;
				if(username == '' || userpwd == '') {
					alert('请填写完整信息')
				} else {
                  axios.post('/loginuser.action?username='+ username + '&userpwd=' + userpwd)
                    .then((res)=>{
                    	console.log(res);
                    		if(res.data[0].state == 'success') {
								this.$router.push('/index')
							} else {
								alert('请确认用户名和密码正确')
							}
                    }).catch((error)=>{
                    	console.log(error)
                    })

                
				}

			},
			//忘记密码
			backpsw: function() {
                 this.none_1 = true;
                 this.none_2 = false;
                 this.show_1 = true;
			},

			// 验证登录名是否存在
			checkUser: function() {
				let username = this.username;
                axios.post('/valNameuser.action?username='+username)
                    .then((res)=>{
                       if(res.data[0].state == 'success') {
						      alert('用户名不存在')
					    }
                    }).catch((error)=>{
                    	console.log(error)
                    })


			},
			// 关闭
			close: function() {
                this.none_1 = false;
			},
			// 获取验证码
			btnSendCode1: function() {
				this.curCount1 = this.count;
				let phone = this.telphone;
				if(!this.phoneReg.test(phone)) {
					alert(" 请输入有效的手机号码");
					return false;
				}
				//设置button效果，开始计时
				this.isDisabled = true;
				this.valcon = (this.curCount1 + "秒再获取");
				console.log(this.valcon)
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

                 axios.post('getValidatauser.action?phone='+phone)
                    .then((res)=>{
                    	if(res.data[0].state == 'success') {
						     that.random = data[1].random;
					      }
                    })
              
			},
			// 输入验证码
			next: function() {
				let code1 = this.code1;
				if(this.random == code1) {
					this.none_2 = true ;   // .tab
					this.show_1 = false ;    //  .modal_content
					this.height = false;
				} else {
					alert('验证码输入错误')
				}
			},
			// 获取与输入的验证码 对比
			next1: function() {
				let code1 = this.code1;
				let random = this.random;
				let username = this.newUsername;
				let newPsw = this.newPsw;
				let connewPsw = this.connewPsw;
				if(newPsw != connewPsw) {
					alert('两次输入的密码不一致');
					return false;
				}
				if(newPsw == '' || username == '' || connewPsw == '') {
					alert('请填写完整信息');
					return false;
				} else {
                    axios.post('backAuthorityuser.action?username='+username + '&userpwd=' + newPsw + '&number=' + code1 + '&random=' + random)
                         .then((res)=>{
                         	   if(res.data[0].state == 'success') {
		                         this.none_1 = false;
								} else {
									alert('密码找回失败，稍后重试');
								}
                         }).catch((error)=>{
                         	console.log(error)
                         })
				}

			}

		}

	}
</script>

<style scoped>
	#span {
		text-align: start;
		margin-left: 10px;
	}
	
	a {
		display: inline-block;
		width: 100px;
		padding-left: 5px;
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
		overflow-y: hidden;
		position: relative;
	}
	
	.loginPage {
		height: 100%;
		width: 100%;
		background: url(../assets/loginBg.png) no-repeat;
		background-size: 100% 100%;
		padding: 5% 9% 5% 6%;
		box-sizing: border-box;
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
		height: 40px;
		align-items: center;
		margin-top: -5px;
	}
	
	.contains .middle div:last-child input {
		width: 15px;
		height: 15px;
	}
	
	.contains .middle input::-webkit-input-placeholder {
		color: #999;
	}
	
	.contains .middle div span {
		height: 30px;
		line-height: 30px;
	}
	
	.contains .down {
		margin-top: 60px;
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
	
	.register {
		display: flex;
	}
	
	.register p {
		width: 100%;
		color: #0087f4;
	}
	
	.register .reg,
	.register .backpsw {
		cursor: pointer
	}
	
	.register .backpsw {
		text-align: end;
	}
	
	#backPsw {
		position: absolute;
		top: 0.01%;
		z-index: 1000000;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
	}
	
	#backPsw .backpswCon {
		height: 320px;
		width: 450px;
		padding: 25px;
		margin: 200px auto;
		background: #fff;
		border-radius: 10px;
	}
	/*忘记密码*/
	
	.modal_content {
		width: 90%;
		margin: 0 5%;
		padding: 20px 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	
	.modal_content>div {
		margin-bottom: 20px;
	}
	
	.modal_content>h5:first-child {
		margin: 20px 0px;
	}
	
	#dialog label {
		color: #666;
	}
	
	#phone1 {
		display: block;
		width: 100%;
		height: 50px;
		background: none;
		padding-top: 30px;
		border: 0;
		outline: none;
		text-indent: 30px;
		margin-top: -30px;
		font-size: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, .2);
		border-radius: 0;
	}
	
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
	
	.next,
	.next1 {
		text-align: center;
		margin: 20px 0;
	}
	
	.next button,
	.next1 button {
		width: 100%;
		height: 45px;
		padding: 0;
		margin: 0;
		background: #007BFF;
		color: #fff;
		border: 0;
		outline: none;
		border-radius: 10px;
		cursor: pointer;
	}
	/*------------------------------*/
	
	.next1 button {
		width: 80%;
	}
	
	.show {
		display: block;
	}
	
	.none {
		display: none;
	}
	.backpswCon .tab{
		  margin-top: 30px;
		  background: deepskyblue
	}
	
	.backpswCon table {
		margin-bottom: 20px;
	}
	.backpswCon .close{
		font-size: 16px;
	}
	
	.backpswCon table tbody {
		width: 300px;
	}
	
	.backpswCon table td {
		height: 50px;
		width: 80%;
	}
	
	.backpswCon table th {
		height: 50px;
		width: 20%;
	}
	
	.backpswCon table td input {
		border-radius: 5px;
		width: 150px;
		outline: none;
		border: 0.5px solid #F6F6F6;
		text-indent: 10px;
		height: 40px;
		background: #F6F6F6;
	}
</style>