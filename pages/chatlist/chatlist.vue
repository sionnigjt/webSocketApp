<template>
	<view class="chatlist">
		
	<uni-nav-bar background-color="#e3e3e3" color="#555555" height="80rpx" @clickLeft="gotoUser()" @clickRight="goToAddFriend()" :border="false" left-icon="person" right-icon="plusempty" title="聊天" />
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
				localImgUrl: '',
				isUpdate:false
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
		gotoUser(){
			uni.switchTab({
				url: '../my/my',
				duration:"200",
			})
		},
		goToAddFriend(){
			uni.navigateTo({
				url: '../addFriend/addFriend',
				
			})
		}
		},
		beforeMount() {
			this.initFirendList()
			this.localUserName = uni.getStorageSync("name")
			this.localImgUrl = uni.getStorageSync("imgUrl")
		},
		onShow() {
			// 正常进入该页面的获取数据
			this.initFirendList()
			// 从详情页返回该页面的获取数据
			uni.$on('refreshData',() => {
				this.initFirendList()
			})
		},

	};
</script>

<style>
	.chatlist {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	
</style>