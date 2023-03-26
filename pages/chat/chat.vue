<template>
	<view>
		<view class="contents" id="list-box">
			<view class="talk-list">
				<view v-for="(item,index) in messageList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class=" item.type == 1 ? 'push':'pull' ">
						<image :src="item.pic" mode="aspectFill" class="pic"></image>
						<chatContent :content="item.message" :viewStyle="0" :type="item.type"></chatContent>					
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
				<view class="icon_item">
					<image src="../../static/chat/tupian.png" mode="aspectFit" class="icon"></image>
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
		props: {
			chatData: {
				type: Number,
				default: () => 0
			}
		},
		components:{
			chatContent
		},
		data() {
			return {
				messageList: [
					{
						id: 1,
						message: "Hello, how are you?",
						type: 1,
						pic: "https://picsum.photos/200/300"
					},
					{
						id: 2,
						message: "I'm fine, thank you. And you?",
						type: 2,
						pic: "https://picsum.photos/200/300"
					},
					{
						id: 3,
						message: "I'm good too. Thanks for asking.",
						type: 1,
						pic: "https://picsum.photos/200/300"
					}
				],
				message: ''
			}
		},
		methods: {
			send() {
				if(this.message){
					this.messageList.push({
						id: this.messageList.length + 1,
						message: this.message,
						type: 1,
						pic: "https://picsum.photos/200/300"
					})
					this.message = ''
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../lib/global.scss";

	page {
		background-color: #F3F3F3;
		font-size: 28rpx;
	}
	.contents{
			width: 100%;
				height: auto;
				padding-bottom: 100rpx;
				box-sizing: content-box;
				
				/* 兼容iPhoneX */
				margin-bottom: 0;  
				margin-bottom: constant(safe-area-inset-bottom);  
				margin-bottom: env(safe-area-inset-bottom); 
				.talk-list{
						padding-bottom: 20rpx;
						
						/* 消息项，基础类 */
						.item{
							padding: 20rpx 20rpx 0 20rpx;
							align-items:flex-start;
							align-content:flex-start;
							color: #333;
							
							.pic{
								width: 92rpx;
								height: 92rpx;
								border-radius: 50%;
								border: #fff solid 1px;
							}
							
							
							
							/* 收到的消息 */
							&.pull{
								.content{
									margin-left: 32rpx;									
								}
							}
							
							/* 发出的消息 */
							&.push{
								/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
								flex-direction: row-reverse;
								
								.content{
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
