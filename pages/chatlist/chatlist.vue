<template>
	<view class="chatlist">

		<!-- 聊天列表 -->
		<uni-list>
			<uni-list :border="true" v-for="(item, index) in chatList" :key="index">
				<!-- 头像显示角标 -->
				<uni-list-chat :title="item.name" :avatar="item.imgUrl" :note="item.content" :time="formatTime(item.time)"
					badge-positon="left" :badge-text="item.unread" :clickable="true"
					@click="goToFriendChat(item.sendId)"></uni-list-chat>
			</uni-list>
		</uni-list>


	</view>
</template>

<script>
	import {
		getChatList
	} from '@/server/api/chatlist.js';
	export default {

		data() {
			return {
				chatList: [{
						id: "",
						imgUrl: "",
						name: "",
						content: "",
						unread: 0,
						sendId: 1,
						time: "",
					},

				],
				localUserName: '',
				localImgUrl: ''
			};
		},
		methods: {
			async initFirendList() {
				this.userId = uni.getStorageSync('userId');
				let res = await getChatList(this.userId)
				console.log(this.userId, res)
				if (res.statusCode == 200) {
					this.chatList = res.data
					// uni.setStorageSync("chatList", res.data);
					console.log(res.data)
				} else {

				}

			},
			goToFriendChat(id) {
				// console.log("go")
				uni.navigateTo({
					url: '/pages/chat/chat?friendId=' + id
				})
			},
			formatTime(timeString) {
				const date = new Date(timeString);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hour = String(date.getHours()).padStart(2, '0');
				const minute = String(date.getMinutes()).padStart(2, '0');
				return `${year}-${month}-${day} ${hour}:${minute}`;
			},
		
		},
		beforeMount() {
			this.initFirendList()
			this.localUserName = uni.getStorageSync("name")
			this.localImgUrl = uni.getStorageSync("imgUrl")
		},
		mounted() {
				this.initFirendList()
		},
		beforeUpdate() {
		
		}


	};
</script>

<style>
	.chatlist {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44px;
		padding: 0 15px;
		background-color: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
	}

	.left {
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.nickname {
		font-size: 16px;
		color: #333;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.search {
		width: 150px;
		height: 30px;
		border: none;
		border-radius: 15px;
		padding: 0 10px;
		margin-right: 10px;
		background-color: #f5f5f5;
		font-size: 14px;
		color: #999;
	}

	.menu {
		width: 30px;
		height: 30px;
	}

	.list {
		flex: 1;
		background-color: #f5f5f5;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		padding: 0 15px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.unread {
		display: inline-block;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border-radius: 50%;
		background-color: #f00;
		color: #fff;
		font-size: 12px;
		margin-left: 10px;
	}

	.friendId {
		display: none;
	}

	.gap {
		height: 10px;
		background-color: #f5f5f5;
	}
</style>