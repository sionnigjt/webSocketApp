<template>
  <!-- 登陆 -->
  <div class="wrapper">
    <div class="login">
      <div class="top">
          <img src="./rqk.png"><span>chat</span>
      </div>
      <div class="form">
          <input type="text" v-model="userinfo.name" class="text" 
          placeholder="账号" ref="user"><br/>
          <input type="password" v-model="userinfo.password" class="text" 
          placeholder="密码"><br/>
		  <button @click="check_login" class="btn">登录</button>
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
import {mapGetters} from 'vuex'
import {login} from '@/server/api/login.js'

export default {
  name: 'login',
  data(){
    return {
      userinfo:{
        name:'',
        password:''
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },

  methods:{
    validate({user,pwd}){
      if(user==''){
        this.$store.dispatch('setShowWarn','输入不能为空')
        return false
      }
      if(pwd==''){
        this.$store.dispatch('setShowWarn','密码不能为空')
        return false
      }
      return true
    },
    async check_login(){
      // //登录
      // const res= await login(this.userinfo)
      // // this.callback(res)
	  const res= await login(this.userinfo)
	  if(res){
		  uni.navigateTo({
		  	url:"/pages/index/index"
		  })
	  }
	  else{
		  this.$store.dispatch('setShowWarn','登录中....')
	  }
    }
 
    }
 
}
</script>
<style scoped lang="scss" type="text/css">
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.login{
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}
.top{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;  font-size: 24px;
  font-weight: bold;
  color: #333;

  font-weight: bold;
  color: #333;
  img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input{
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 16px;
    padding-left: 10px;
    &:focus{
      outline: none;
      border-bottom: 1px solid #333;
    }
  }
  button{
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: #4caf50;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    &:hover{
      background-color: #3e8e41;
    }
  }
  .left,.right{
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    &:hover{
      color: #333;
    }
  }
  .right{
    margin-left: auto;
  }
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  span{
    color: #4caf50;
    margin-left: 5px;
    cursor: pointer;
    &:hover{
      color: #3e8e
  }
}
}
.footer{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  span{
    color: #4caf50;
    margin-left: 5px;
    cursor: pointer;
    &:hover{
      color: #3e8e41;
    }
  }
}

</style>
