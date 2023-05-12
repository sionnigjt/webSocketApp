<template>
	<view class="friend">
		<uni-nav-bar @clickLeft="goBack()" @clickRight="goAplyFriend()" background-color="#e3e3e3" color="#555555" :border="false" left-icon="left" leftText="返回"  rightText="通知" title="标题" />
		<view class="friend-search">
			<input type="text" placeholder="搜索好友" v-model="searchText" @input="search" />
		</view>
		<view class="friend-list">
			<view class="friend-group">
				<view class="friend-group-title" @click="toggleFriendList">我的好友{{friendListFolded ? '▼' : '▲'}}</view>
				<view class="friend-item" v-for="(item, index) in friendList" :key="index" v-show="!friendListFolded"
					@click="goToFriendChat(item.friendId)">
					<image class="friend-avatar" :src="item.imgUrl" />
					<view class="friend-name">{{ item.name }}</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import {
		getFirendList
	} from '@/server/api/friend.js';
	export default {
		data() {
			return {
				friendList: [

				],
			
				oldFriendList:[],
				oldGroupList:[],
				friendListFolded: false,
				groupListFolded: false,
				searchText: '',
				userId: undefined
			};
		},
		methods: {
			toggleFriendList() {
				this.friendListFolded = !this.friendListFolded;
			},
			toggleGroupList() {
				this.groupListFolded = !this.groupListFolded;
			},
			search() {
				if (this.searchText === '') {
					this.friendList = this.oldFriendList;
					this.groupList = this.oldGroupList;
					this.friendListFolded = false;
					this.groupListFolded = false;
				} else {
					if (this.oldFriendList.length === 0 && this.oldGroupList.length === 0) {
						this.oldFriendList = this.friendList;
						this.oldGroupList = this.groupList;
					}
					let filteredFriendList = this.friendList.filter(item => item.name.includes(this.searchText));
					let filteredGroupList = this.groupList.filter(item => item.name.includes(this.searchText));
					this.friendList = filteredFriendList;
					this.groupList = filteredGroupList;
				}
			},
			goToGroupChat(id) {
				// uni.navigateTo({
				//   url: '/pages/chat/chat?groupId=' + id
				// })
			},
			goToFriendChat(id) {
				uni.navigateTo({
					url: '/pages/chat/chat?friendId=' + id
				})
			},
			async initFirendList() {
				this.userId = uni.getStorageSync('userId');
				let res = await getFirendList(this.userId)
				console.log(this.userId, res)
				if (res.statusCode == 200) {
					this.friendList = res.data
					this.oldFriendList=res.data
					this.oldGroupList=this.groupList
				} else {

				}

			},
			goAplyFriend(){
				uni.navigateTo({
					url:"/pages/addFriend/aplyFriend"
				})
			},goBack(){
				uni.switchTab({
					url:'/pages/chatlist/chatlist'
				})
			}
		},
		onShow() {
			this.initFirendList();
		},
	};
</script>

<style>
	.friend {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.friend-search {
		padding: 16rpx;
		padding-top: 5rpx;
		background-color: #f5f5f5;
	}

	.friend-search input {
		width: 100%;
		height: 60rpx;
		border-radius: 30rpx;
		padding: 0 30rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #333;
		border: none;
		outline: none;
	}

	.friend-list {
		flex: 1;
		overflow-y: auto;
	}

	.friend-group {
		margin-top: 20rpx;
	}

	.friend-group-title {
		padding: 20rpx;
		font-size: 28rpx;
		color: #999;
		background-color: #f5f5f5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.friend-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: #fff;
	}

	.friend-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.friend-name {
		font-size: 28rpx;
		color: #333;
	}
</style>

.friend-id {
font-size: 28rpx;
color: #999;
margin-left: 20rpx;
}
</style>