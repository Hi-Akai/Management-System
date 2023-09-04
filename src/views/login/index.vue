<template>
  <div class="bgc-page">
    <div class="container">
      <div class="form-box register-box">
        <el-form
          ref="registerForm"
          :model="registerData"
          :rules="registerRules"
          status-icon
        >
          <el-form-item>
            <h1 class="form-title">账号注册信息</h1>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input
              v-model="registerData.nickname"
              placeholder="请输入昵称"
            />
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="registerData.username"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-button @click="submitForm('register')">注册</el-button>
        </el-form>
      </div>
      <div class="form-box login-box">
        <el-form
          ref="loginForm"
          :model="loginData"
          :rules="loginRules"
          status-icon
        >
          <el-form-item>
            <h1 class="form-title">账号登录信息</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="loginData.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-button :loading="loading" @click="submitForm('login')">
            登录
          </el-button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">去登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp">去注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
const loginData = ref({
  username: 'kaikai',
  password: '123123',
})
const registerData = ref({
  nickname: '',
  username: '',
  password: '',
})
const loading = ref(false)

//获取el-form组件
let loginForm = ref()
let registerForm = ref()

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('账号不能为空'))
    // } else if (!value.match(/^[a-zA-Z0-9]{6,10}$/)) {
    //   callback(new Error('账号必须为6-10位字母或数字'))
  } else {
    callback()
  }
}
const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
    // } else if (!value.match(/^[a-zA-Z0-9]{6,10}$/)) {
    //   callback(new Error('密码必须为6-10位字母或数字'))
  } else {
    callback()
  }
}
const submitForm = async (type: string) => {
  const formEl = type == 'login' ? loginForm.value : registerForm.value
  if (!formEl) return
  await formEl.validate(async (valid: any) => {
    if (valid) {
      try {
        loading.value = true
        await userStore.userLogin(
          type == 'login' ? loginData.value : registerData.value,
        )
        //判断登陆的时候，路由路径中是否带有query参数，如果有，就往该路径跳转，否则跳转主页（使用场景：用户临时退出登陆，没有关闭页面，而后再次登陆，就能回到之前退出的那个菜单）
        const redirect: any = $route.query.redirect
        $router.push({ path: redirect || '/' })
        ElNotification({
          type: 'success',
          title: type == 'login' ? '登录成功' : '注册成功！',
          message:
            type == 'login'
              ? `${getTime()}好，欢迎回来`
              : `${getTime()}好，欢迎`,
        })
        loading.value = false
      } catch (err) {
        loading.value = false
        ElNotification({
          type: 'error',
          message: (err as Error).message,
        })
      }
    } else {
      ElNotification({
        type: 'error',
        title: '提示信息',
        message: '请填写正确信息',
      })
    }
  })
}
let loginRules = reactive({
  username: [{ validator: validatePass, trigger: 'blur' }],
  password: [{ validator: validatePass2, trigger: 'blur' }],
})
let registerRules = reactive({
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 3, max: 6, message: '昵称长度为3-6位', trigger: 'blur' },
  ],
  username: [{ validator: validatePass, trigger: 'blur' }],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
})

onMounted(() => {
  const signUpButton = document.getElementById('signUp')
  const signInButton = document.getElementById('signIn')
  const container = document.getElementsByClassName('container')[0]

  signUpButton &&
    signUpButton.addEventListener('click', () => {
      loginData.value.username = ''
      loginData.value.password = ''
      container.classList.add('right-panel-active')
    })

  signInButton &&
    signInButton.addEventListener('click', () => {
      registerData.value.nickname = ''
      registerData.value.username = ''
      registerData.value.password = ''
      container.classList.remove('right-panel-active')
    })
})
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.bgc-page {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: $base_font_color;
}

.container {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  height: 480px;

  .login-box {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .register-box {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;

    .overlay {
      background: #ff416c;
      background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
      background: linear-gradient(to right, #ff4b2b, #ff416c);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 0 0;
      color: #ffffff;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;

      .overlay-panel {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 40px;
        text-align: center;
        top: 0;
        height: 100%;
        width: 50%;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
      }

      .overlay-left {
        transform: translateX(-20%);
      }

      .overlay-right {
        right: 0;
        transform: translateX(0);
      }
    }
  }
}

.form-box {
  position: absolute;
  top: 30px;
  transition: all 0.6s ease-in-out;
  background-color: #ffffff;

  ::v-deep .el-form {
    display: flex;
    align-items: center;
    flex-direction: column;

    .el-form-item {
      width: 80%;

      .el-input {
        background-color: #eee;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
        border-radius: 10px;

        .el-input__wrapper {
          background-color: #eee;
          border: none;
          box-shadow: none;
        }
      }
    }
  }
}

.right-panel-active {
  .login-box {
    transform: translateX(100%);
  }

  .register-box {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  .overlay-container {
    transform: translateX(-100%);

    .overlay {
      transform: translateX(50%);

      .overlay-left {
        transform: translateX(0);
      }

      .overlay-right {
        transform: translateX(20%);
      }
    }
  }
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
