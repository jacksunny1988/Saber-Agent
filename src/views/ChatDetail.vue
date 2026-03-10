<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { sendMessage } from '@/api/chat'

const props = defineProps({
  chatId: {
    type: [String, Number],
    default: null
  }
})

const userStore = useUserStore()

// 输入框相关
const messageInput = ref('')
const sending = ref(false)

// 功能开关
const features = ref({
  webSearch: false,
  knowledgeBase: false,
  agent: false
})

// 消息列表
const messages = ref([])

/**
 * 发送消息
 */
const handleSendMessage = async () => {
  if (!messageInput.value.trim()) return

  sending.value = true
  try {
    const res = await sendMessage({
      conversation_id: props.chatId,
      content: messageInput.value.trim(),
      features: features.value
    })
    if (res.code === 200) {
      messageInput.value = ''
      // 待后续实现：添加消息到列表
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    messageInput.value = ''
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  // 组件加载时无需特殊处理，chatId 通过 props 传入
})
</script>

<template>
  <main class="chat-detail-container">
    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 欢迎区域（当没有消息时显示） -->
      <div class="welcome-section" v-if="messages.length === 0">
        <div class="welcome-content">
          <img src="/send-icon.png" alt="欢迎" class="welcome-robot" />
          <h1 class="welcome-title">你好，<br>我是你的智能助手赛小宝</h1>
          <p class="welcome-desc">快和我交流吧！我可以为你完成年假查询，员工手册等等事情，成为你的高效助手。</p>
        </div>
      </div>

      <!-- 消息列表（待实现） -->
      <div class="messages-section" v-else>
        <!-- 消息列表内容待后续实现 -->
      </div>
    </div>

    <!-- 输入框区域 -->
    <div class="input-section">
      <div class="input-wrapper">
        <!-- 输入框和发送按钮 -->
        <div class="input-box">
          <textarea
            v-model="messageInput"
            placeholder="发消息或输入 / 选择技能"
            rows="1"
            @keydown.enter.exact.prevent="handleSendMessage"
          ></textarea>
          <button
            class="send-btn"
            :disabled="!messageInput.trim() || sending"
            @click="handleSendMessage"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
        <!-- 功能标签 -->
        <div class="feature-tags">
          <label :class="['feature-tag', { active: features.webSearch }]">
            <input v-model="features.webSearch" type="checkbox" hidden />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>联网搜索</span>
          </label>
          <label :class="['feature-tag', { active: features.knowledgeBase }]">
            <input v-model="features.knowledgeBase" type="checkbox" hidden />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>知识库</span>
          </label>
          <label :class="['feature-tag', { active: features.agent }]">
            <input v-model="features.agent" type="checkbox" hidden />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2v20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span>智能体</span>
          </label>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chat-detail-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: linear-gradient(135deg, #e8f4fc 0%, #d0e8f5 50%, #e8f4fc 100%);
  overflow: hidden;
}

/* ========== 主内容区 ========== */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.welcome-content {
  text-align: center;
  max-width: 600px;
}

.welcome-robot {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  object-fit: contain;
}

.welcome-text {
  margin-bottom: 16px;
}

.welcome-title {
  font-size: 28px;
  color: #1890ff;
  font-weight: 500;
  margin: 16px 0 12px;
  line-height: 1.4;
}

.welcome-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.messages-section {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* ========== 输入框区域 ========== */
.input-section {
  padding: 0 24px 32px;
}

.input-wrapper {
  background: #fff;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(24, 144, 255, 0.15);
}

.input-box {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  min-height: 36px;
}

.input-box textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  min-height: 24px;
  max-height: 150px;
  font-family: inherit;
}

.input-box textarea::placeholder {
  color: #999;
}

.send-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #e8f4fc;
  color: #1890ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;
}

.send-btn:hover:not(:disabled) {
  background: #1890ff;
  color: #fff;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.feature-tags {
  display: flex;
  gap: 8px;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f9f9f9;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  border: 1px solid transparent;
}

.feature-tag:hover {
  background: rgba(24, 144, 255, 0.08);
  border-color: rgba(24, 144, 255, 0.2);
}

.feature-tag.active {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  border-color: rgba(24, 144, 255, 0.3);
}

.feature-tag svg {
  color: currentColor;
}

/* ========== 滚动条样式 ========== */
.messages-section::-webkit-scrollbar {
  width: 4px;
}

.messages-section::-webkit-scrollbar-track {
  background: transparent;
}

.messages-section::-webkit-scrollbar-thumb {
  background: rgba(24, 144, 255, 0.2);
  border-radius: 2px;
}

.messages-section::-webkit-scrollbar-thumb:hover {
  background: rgba(24, 144, 255, 0.3);
}
</style>
