<template>
  <view class="container">
    <view class="avatar">
		<img :src="userInfo.img" alt="" srcset="">
	</view>
    <view class="info">
      <view class="name">{{userInfo.name}}</view>
      <view class="desc">{{userInfo.signature}}</view>
    </view>
    <view class="list">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="icon"></view>
        <view class="text">{{item}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		userInfo:{
			name: '张三',
			signature: '这个人很懒，什么都没有留下',
			img:""
		},
      list: ['我的订单', '我的收藏', '我的地址', '联系客服']
    }
  }
  ,
  methods:{
	  initData(){
		  this.userInfo.name=uni.getStorageSync('name');
		  this.userInfo.img=uni.getStorageSync('imgUrl');
		  this.userInfo.signature=uni.getStorageSync('signature');
	  }
  },
  mounted() {
  	this.initData()
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
}

.avatar img{
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background-color: #ccc;
}

.info {
  margin-top: 30rpx;
  text-align: center;
}

.name {
  font-size: 36rpx;
  font-weight: bold;
}

.desc {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #999;
}

.list {
  margin-top: 50rpx;
  width: 100%;
}

.item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.item .icon {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
  background-color: #ccc;
}

.item .text {
  font-size: 32rpx;
}
</style>
