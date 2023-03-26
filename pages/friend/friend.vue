<template>
  <view class="friend">
    <view class="friend-search">
      <input type="text" placeholder="搜索好友" v-model="searchText" @input="search" />
    </view>
    <view class="friend-list">
      <view class="friend-group">
        <view class="friend-group-title" @click="toggleFriendList">我的好友{{friendListFolded ? '▼' : '▲'}}</view>
        <view class="friend-item" v-for="(item, index) in friendList" :key="index" v-show="!friendListFolded">
          <image class="friend-avatar" :src="item.avatar" />
          <view class="friend-name">{{ item.name }}</view>
        </view>
      </view>
      <view class="friend-group">
        <view class="friend-group-title" @click="toggleGroupList">我的群组{{groupListFolded ? '▼' : '▲'}}</view>
        <view class="friend-item" v-for="(item, index) in groupList" :key="index" v-show="!groupListFolded">
          <image class="friend-avatar" :src="item.avatar" />
          <view class="friend-name">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      friendList: [
        {
          name: "张三",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          name: "李四",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          name: "王五",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
      ],
      groupList: [
        {
          name: "前端交流群",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          name: "后端交流群",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          name: "产品交流群",
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
      ],
      
      friendListFolded: false,
      groupListFolded: false,
      searchText: '',
      oldFriendList: [],
      oldGroupList: [],
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
    }
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
  padding: 20rpx;
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
