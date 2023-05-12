<template>
	<!-- 登陆 -->
	<div class="wrapper">
		<div class="login">
			<div class="top">
				<img src="http://sion.link:9000/img/2023-05-12/70f165d5-2e58-4b70-a611-9a8a80bae33f.png" alt="" srcset="">chat</img>
			</div>
			<div class="form">
				<input type="text" v-model="userinfo.name" class="text" placeholder="账号" ref="user"><br />
				<input type="password" v-model="userinfo.password" class="text" placeholder="密码"><br />
				<button @click="checkLogin" class="btn">登录</button>
				<router-link to="" class="left">忘记密码?</router-link>
				<router-link to="/pages/register/register" class="right">新用户注册</router-link>
			</div>
			<div class="footer">
				<p>登录即代表已阅读并同意<span>服务条款</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		login
	} from '../../server/api/login.js'

	export default {
		name: 'login',
		data() {
			return {
				userinfo: {
					name: '',
					password: ''
				}
			}
		},
		methods: {
			async checkLogin() {
				try {
					// 1. 登录
					const res = await login(this.userinfo)
			
					console.log(res)
					if(res.statusCode===200){
						//根据信息显示
						uni.showToast({ 
						    title: '登录成功', 
						    duration: 200
						});
						// 处理登录结果，保存到本地存储中
						uni.setStorageSync("userId", res.data.userId);
						uni.setStorageSync("imgUrl", res.data.imgUrl);
						uni.setStorageSync("name", res.data.name);
						uni.setStorageSync("signature",res.data.signature);
						// 跳转到聊天列表页
						uni.switchTab({
							url: '/pages/chatlist/chatlist',
							duration:"200"
						})
						
					}
					else{
						//根据信息显示
						uni.showToast({ 
						    title: '账号或密码错误', 
							icon:'error',
						    duration: 2000
						});
					}
					
				} catch (error) {
					console.log(error)
					uni.showToast({ 
					    title: '网络错误', 
						icon:'error',
					    duration: 2000
					});
				}
			}


		}

	}
</script>
<style scoped lang="scss" type="text/css">
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90vh;
		background-color: #f5f5f5;
		overflow: hidden;

	}

	.login {
		width: 80vw;
		height: 500px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20px;
	}

	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		font-size: 24px;
		font-weight: bold;
		color: #333;

		font-weight: bold;
		color: #333;

		img {
			width: 50px;
			height: 50px;
			margin-right: 10px;
		}
	}

	.form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		input {
			width: 100%;
			height: 40px;
			border: none;
			border-bottom: 1px solid #ccc;
			margin-bottom: 20px;
			font-size: 16px;
			padding-left: 10px;

			&:focus {
				outline: none;
				border-bottom: 1px solid #333;
			}
		}

		button {
			width: 100%;
			height: 40px;
			border: none;
			border-radius: 20px;
			background-color: #4caf50;
			color: #fff;
			font-size: 16px;
			cursor: pointer;

			&:active {
				background-color: #3e8e41;
			}
		}

		.left,
		.right {
			margin-top: 20px;
			font-size: 14px;
			color: #666;

			&:hover {
				color: #333;
			}
		}

		.right {
			margin-left: auto;
		}
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #666;

		span {
			color: #4caf50;
			margin-left: 5px;
			cursor: pointer;

			&:active {
				color: #3e8e
			}
		}
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #666;

		span {
			color: #4caf50;
			margin-left: 5px;
			cursor: pointer;

			&:hover {
				color: #3e8e41;
			}
		}
	}
</style>