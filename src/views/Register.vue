<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleRegister } from '@/api'

const router = useRouter()

const formData = ref({
  user_name: '',
  email: '',
  password: '',
  nick_name: '',
  phone_number: '',
  avatar: '/default-avatar.png' // 默认头像
})

const loading = ref(false)
const errorMsg = ref('')

const onSubmit = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    const res = await handleRegister(formData.value)
    console.log('注册成功:', res)

    // 注册成功后自动登录
    router.push('/login')
  } catch (error) {
    console.error('注册失败:', error)
    errorMsg.value = error.response?.data?.msg || error.message || '注册失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <!-- 左侧机器人图片 -->
      <div class="left-panel">
        <img src="/robot.png" alt="机器人" class="robot-image" />
      </div>

      <!-- 右侧注册表单 -->
      <div class="right-panel">
        <div class="form-content">
          <!-- Logo 和标题 -->
          <div class="header">
            <div class="logo-container">
              <div class="logo">SEBO</div>
              <h1 class="title">赛宝 AI 智能体</h1>
            </div>
            <h2 class="welcome">欢迎注册</h2>
          </div>

          <!-- 注册表单 -->
          <form class="register-form" @submit.prevent="onSubmit">
            <!-- 错误提示 -->
            <div v-if="errorMsg" class="error-message">{{ errorMsg }}</div>

            <!-- 用户账号 -->
            <div class="input-group">
              <span class="input-icon user-icon"></span>
              <input
                v-model="formData.user_name"
                type="text"
                class="input-field"
                placeholder="请输入用户账号"
                required
              />
            </div>

            <!-- 邮箱 -->
            <div class="input-group">
              <span class="input-icon email-icon"></span>
              <input
                v-model="formData.email"
                type="email"
                class="input-field"
                placeholder="请输入邮箱地址"
                required
              />
            </div>

            <!-- 密码 -->
            <div class="input-group">
              <span class="input-icon lock-icon"></span>
              <input
                v-model="formData.password"
                type="password"
                class="input-field"
                placeholder="请输入密码"
                required
              />
            </div>

            <!-- 用户昵称 -->
            <div class="input-group">
              <span class="input-icon nick-icon"></span>
              <input
                v-model="formData.nick_name"
                type="text"
                class="input-field"
                placeholder="请输入用户昵称"
                required
              />
            </div>

            <!-- 联系电话 -->
            <div class="input-group">
              <span class="input-icon phone-icon"></span>
              <input
                v-model="formData.phone_number"
                type="tel"
                class="input-field"
                placeholder="请输入联系电话"
                required
              />
            </div>

            <!-- 注册按钮 -->
            <button type="submit" class="register-btn" :disabled="loading">
              <span>{{ loading ? '注册中...' : '注册' }}</span>
            </button>

            <!-- 返回登录 -->
            <div class="login-link">
              <span>已有账号？</span>
              <router-link to="/login">去登录</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.register-box {
  display: flex;
  width: 100%;
  max-width: 1400px;
  min-height: 600px;
  padding: 40px;
}

.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.robot-image {
  max-width: 500px;
  height: auto;
}

.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-content {
  width: 100%;
  max-width: 360px;
  padding: 40px;
}

.header {
  margin-bottom: 40px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00a8ff 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.title {
  font-size: 24px;
  color: #4facfe;
  margin: 0;
  font-weight: 600;
}

.welcome {
  font-size: 20px;
  color: #333;
  margin: 0;
  text-align: right;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px 16px;
  gap: 12px;
}

.input-icon {
  width: 20px;
  height: 20px;
  opacity: 0.5;
}

.user-icon {
  background-image: url('/user-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.lock-icon {
  background-image: url('/lock-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.email-icon {
  background-image: url('/email-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.nick-icon {
  background-image: url('/nick-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.phone-icon {
  background-image: url('/phone-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.input-field {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: #333;
}

.input-field::placeholder {
  color: #999;
}

.register-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 22px;
  background: linear-gradient(90deg, #6ec3ff 0%, #00a8ff 100%);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.register-btn:hover {
  opacity: 0.9;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #4facfe;
  text-decoration: none;
  margin-left: 4px;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}
</style>
