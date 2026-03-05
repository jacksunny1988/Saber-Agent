<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const rememberPassword = ref(false)
const showPassword = ref(false)

const handleLogin = () => {
  console.log('登录:', { username: username.value, password: password.value })
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 左侧机器人图片 -->
      <div class="left-panel">
        <img src="/robot.png" alt="机器人" class="robot-image" />
      </div>

      <!-- 右侧登录表单 -->
      <div class="right-panel">
        <div class="form-content">
          <!-- Logo 和标题 -->
          <div class="header">
            <div class="logo-container">
              <div class="logo">SEBO</div>
              <h1 class="title">赛宝 AI 智能体</h1>
            </div>
            <h2 class="welcome">欢迎登录</h2>
          </div>

          <!-- 登录表单 -->
          <form class="login-form" @submit.prevent="handleLogin">
            <!-- 用户名输入框 -->
            <div class="input-group">
              <span class="input-icon user-icon"></span>
              <input
                v-model="username"
                type="text"
                class="input-field"
                placeholder="请输入用户名"
              />
            </div>

            <!-- 密码输入框 -->
            <div class="input-group">
              <span class="input-icon lock-icon"></span>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="input-field"
                placeholder="请输入密码"
              />
              <button
                type="button"
                class="toggle-password"
                @click="togglePassword"
              >
                <span class="eye-icon"></span>
              </button>
            </div>

            <!-- 记住密码和忘记密码 -->
            <div class="form-options">
              <label class="remember-me">
                <input
                  v-model="rememberPassword"
                  type="checkbox"
                  class="checkbox"
                />
                <span class="checkmark"></span>
                记住密码
              </label>
              <a href="#" class="forgot-password">忘记密码？</a>
            </div>

            <!-- 登录按钮 -->
            <button type="submit" class="login-btn">
              <span>登录</span>
            </button>

            <!-- 注册账号 -->
            <div class="register-link">
              <a href="#">注册账号</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.login-box {
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

.login-form {
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

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-icon {
  width: 18px;
  height: 18px;
  opacity: 0.5;
  background-image: url('/eye-icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
}

.toggle-password:hover .eye-icon {
  opacity: 1;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #666;
}

.checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #ddd;
  border-radius: 2px;
  background: #fff;
  position: relative;
}

.checkbox:checked {
  background-image: url('/checkbox-checked.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-color: #4facfe;
}

.forgot-password {
  color: #4facfe;
  text-decoration: none;
  font-size: 12px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-btn {
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

.login-btn:hover {
  opacity: 0.9;
}

.register-link {
  text-align: center;
  font-size: 14px;
}

.register-link a {
  color: #999;
  text-decoration: none;
}

.register-link a:hover {
  color: #666;
}
</style>
