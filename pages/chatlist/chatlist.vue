<template>
  <view class="chatlist">
    <!-- 顶部导航栏 -->
    <view class="nav">
      <view class="left">
        <image class="avatar" src="../../static/logo.png"></image>
        <text class="nickname">用户名</text>
      </view>
      <view class="right">
        <input class="search" type="text" placeholder="搜索"></input>
        <image class="menu" src="../../static/logo.png"></image>
      </view>
    </view>
    <view class="gap"></view>
    <!-- 聊天列表 -->
    <scroll-view class="list" scroll-y="true">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="left">
          <image class="avatar" :src="item.avatar"></image>
          <text class="nickname">{{ item.nickname }}</text>
        </view>
        <view class="right">
          <text class="message">{{ item.message }}</text>
          <text class="unread">{{ item.unread }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {

  data() {
    return {
      list: [
        {
          avatar: "../../static/logo.png",
          nickname: "聊天对象1",
          message: "最新消息1",
          unread: 2
        },
        {
          avatar: "../../static/logo.png",
          nickname: "聊天对象2",
          message: "最新消息2",
          unread: 1
        },
        {
          avatar: "../../static/logo.png",
          nickname: "聊天对象3",
          message: "最新消息3",
          unread: 0
        }
      ]
    };
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

.gap {
  height: 10px;
  background-color: #f5f5f5;
}
</style>
