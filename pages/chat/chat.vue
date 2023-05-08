<template>
	<view>
		<uni-nav-bar fixed="true" :border="false" left-icon="left" leftText="返回" rightText="设置" title="标题"
			@clickLeft="goBack()" />
		<view class="contents" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in messageList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image :src="item.pic" mode="aspectFill" class="pic"></image>
						<chatContent :content="item.message" :viewStyle="item.viewStyle" :type="item.type">
						</chatContent>
					</view>
				</view>
			</view>
		</view>
		<view class="input">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="message" placeholder="请输入聊天内容"
						placeholder-style="color:#DDD;" :cursor-spacing="6">
				</view>
				<button class="send" @tap="send">发送</button>
			</view>
			<view class="add_input ">
				<view class="icon_item">
					<image src="../../static/chat/yuyin.png" mode="aspectFit" class="icon"></image>
				</view>
				<view class="icon_item" @click="sendFile()">
					<image src="../../static/chat/tupian.png" mode="aspectFit" class="icon" :tap="sendFile"></image>
				</view>
				<view class="icon_item">
					<image src="../../static/chat/biaoqing.png" mode="aspectFit" class="icon"></image>
				</view>
				<view class="icon_item">
					<image src="../../static/chat/zengjia.png" mode="aspectFit" class="icon"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import chatContent from "./chatContent/chatContent.vue"

	export default {

		onLoad: function(option) {
			this.friendId = option?.friendId;
			// 	if(option?.friendId>0){
			// 		uni.setStorageSync("friendId",this.friendId)
			// }else{
			// 			this.friendId=uni.getStorageSync('friendId');
			// }
			console.log(option?.friendId);
			this.imgUrl = uni.getStorageSync("imgUrl")

		},
		components: {
			chatContent
		},
		data() {
			return {
				messageList: [],
				message: '',
				friendId: 0,
				isInit: false,
				socketTask: null,
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			send() {
				let json = JSON.stringify({
					"message": this.message,
					"type": 0
				})
				if (this.message) {
					this.messageList.push({
						id: this.messageList.length + 1,
						message: this.message,
						type: 1,
						viewStyle: 0,
						pic: this.imgUrl
					})
					this.socketTask.send({
						data: json,
						success(res) {
							// console.log(res);
						},
						fail(err) {
							console.log(err);
						}
					})
					this.message = ''

				}
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 999999, //滚动到页面的目标位置（单位px）
						duration: 0 //滚动动画的时长，默认300ms，单位 ms
					});
				}, 100)

			},

			sendFile() {
				const pushImgData = (imgUrl) => {
					this.messageList.push({
						id: this.messageList.length + 1,
						message: imgUrl,
						type: 1,
						viewStyle: 1,
						pic: this.imgUrl
					});
					let json = JSON.stringify({
						"message": imgUrl,
						"type": 1
					})
					this.socketTask.send({
						data: json,
						success(res) {
							// console.log(res);
						},
						fail(err) {
							console.log(err);
						}
					})
				};
				let sendImg = ""
				uni.chooseImage({
					count: 1,
					success: function(res) {
						let tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'http://localhost:8080/api/file/uploadFile',
							filePath: tempFilePaths[0],
							name: 'file',
							success: function(res) {
								pushImgData(res.data)
							
								console.log('uploadFile success, res is:', res);
							},
							fail: function({
								errMsg
							}) {
								console.log('uploadFile fail, errMsg is', errMsg);
							}
						});
					}
				});
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 999999, //滚动到页面的目标位置（单位px）
						duration: 0 //滚动动画的时长，默认300ms，单位 ms
					});
				}, 100)
			},

			addData(data) {

			},
			onMessage() {
				this.socketTask.onOpen((res) => {
					this.socketTask.onMessage((res) => {

						let data = JSON.parse(res.data)
						this.messageList.push({
							id: 4,
							message: data.message,
							type: 2,
							viewStyle: 0,
							pic: data.imgUrl
						})
					})
				})


			}
		},
		mounted() {
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 9999, //滚动到页面的目标位置（单位px）
					duration: 20 //滚动动画的时长，默认300ms，单位 ms
				});
			}, 1)
			let userId = uni.getStorageSync('userId');
			this.socketTask = uni.connectSocket({
				url: `ws://localhost:8080/api/websocket/${userId}/${this.friendId}`,
				success(res) {
					// 这里是接口调用成功的回调，不是连接成功的回调，请注意
					console.log(res)

				},
				fail(err) {
					// 这里是接口调用失败的回调，不是连接失败的回调，请注意
				}
			})

			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			this.socketTask.onOpen((res) => {
				console.log("WebSocket连接正常打开中...！");
				// 注：只有连接正常打开中 ，才能正常成功发送消息
				this.socketTask.send({
					data: "init",
					async success() {
						console.log("消息发送成功");
					},
				});
				this.socketTask.onMessage((res) => {
					let data = JSON.parse(res.data)
					this.messageList.push({
						id: 5,
						message: data.message,
						type: data.type,
						viewStyle: data.viewStyle,
						pic: data.imgUrl,
					})
				})
			});

		},

		updated() {
			setTimeout(() => {
				uni.pageScrollTo({
					scrollTop: 999999, //滚动到页面的目标位置（单位px）
					duration: 0 //滚动动画的时长，默认300ms，单位 ms
				});
			}, 100)
			// this.onMessage()

		},
		beforeDestroy() {
			console.log("页面关闭了")
			this.socketTask.onOpen((res) => {
				this.socketTask.onClose(() => {
					console.log("websocket已经被关闭了");
				});
			})
			uni.closeSocket({
				code: 1000
			})

		}

	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";

	page {
		background-color: #F3F3F3;
		font-size: 28rpx;
	}

	.contents {
		width: 100%;
		height: auto;
		padding-bottom: 100rpx;
		box-sizing: content-box;

		/* 兼容iPhoneX */
		margin-bottom: 0;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);

		.talk-list {
			padding-bottom: 80rpx;

			/* 消息项，基础类 */
			.item {
				padding: 20rpx 20rpx 0 20rpx;
				align-items: flex-start;
				align-content: flex-start;
				color: #333;

				.pic {
					width: 92rpx;
					height: 92rpx;
					border-radius: 50%;
					border: #fff solid 1rpx;
				}



				/* 收到的消息 */
				&.pull {
					.content {
						margin-left: 32rpx;
					}
				}

				/* 发出的消息 */
				&.push {
					/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
					flex-direction: row-reverse;

					.content {
						margin-right: 32rpx;

					}
				}
			}
		}
	}

	.input {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		height: auto;
		z-index: 2;
		border-top: #e5e5e5 solid 1px;
		box-sizing: content-box;
		background-color: #F3F3F3;

		>view {
			padding: 0 20rpx;
			// height: 100rpx;
		}

		.content {
			background-color: #fff;
			height: 64rpx;
			padding: 0 10rpx;
			margin-top: 20rpx;
			border-radius: 32rpx;
			font-size: 28rpx;
		}

		.send {
			background-color: #42b983;
			color: #fff;
			height: 64rpx;
			margin-left: 20rpx;
			margin-top: 20rpx;
			border-radius: 32rpx;
			padding: 0;
			width: 120rpx;
			line-height: 62rpx;

			&:active {
				background-color: #5fc496;
			}
		}

	}

	.add_input {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		padding-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 5rpx;
		border-radius: 10rpx;

		// box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1);
		.icon_item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.icon {
				width: 60rpx;
				height: 60rpx;
			}

			.icon_text {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #666;
			}
		}
	}
</style>