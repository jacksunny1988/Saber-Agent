<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getConversationList, createConversation, sendMessage } from '@/api/chat'

const router = useRouter()
const userStore = useUserStore()

// 会话列表
const conversations = ref([])
const currentConversationId = ref(null)
const loading = ref(false)

// 输入框相关
const messageInput = ref('')
const sending = ref(false)

// 功能开关
const features = ref({
  webSearch: false,
  knowledgeBase: false,
  agent: false
})

/**
 * 获取会话列表
 */
const loadConversations = async () => {
  loading.value = true
  try {
    const res = await getConversationList()
    if (res.code === 200) {
      conversations.value = res.data || []
    }
  } catch (error) {
    console.error('获取会话列表失败:', error)
    // API 开发中，暂时使用 mock 数据
    conversations.value = [
      { id: 1, title: '考勤规则是什么', preview: '' },
      { id: 2, title: '上下班时间是几点', preview: '' },
      { id: 3, title: '年假有几天呀', preview: '' },
      { id: 4, title: '加班可以调休吗', preview: '' },
      { id: 5, title: '请病假扣多少钱', preview: '' }
    ]
  } finally {
    loading.value = false
  }
}

/**
 * 创建新会话
 */
const handleNewConversation = async () => {
  try {
    const res = await createConversation({ title: '新对话' })
    if (res.code === 200) {
      currentConversationId.value = res.data.id
      conversations.unshift({ id: res.data.id, title: '新对话', preview: '' })
    }
  } catch (error) {
    console.error('创建会话失败:', error)
    currentConversationId.value = null
  }
}

/**
 * 切换会话
 */
const selectConversation = (id) => {
  currentConversationId.value = id
}

/**
 * 发送消息
 */
const handleSendMessage = async () => {
  if (!messageInput.value.trim()) return

  sending.value = true
  try {
    const res = await sendMessage({
      conversation_id: currentConversationId.value,
      content: messageInput.value.trim(),
      features: features.value
    })
    if (res.code === 200) {
      messageInput.value = ''
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    messageInput.value = ''
  } finally {
    sending.value = false
  }
}

/**
 * 退出登录
 */
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

onMounted(() => {
  loadConversations()
})
</script>

<template>
  <div class="chat-container">
    <!-- 左侧边栏 -->
    <aside class="sidebar">
      <!-- Header -->
      <div class="sidebar-header">
        <div class="bot-info">
          <img src="/robot.png" alt="赛小宝" class="bot-avatar" />
          <div class="bot-text">
            <h2 class="bot-name">赛小宝</h2>
            <p class="bot-subtitle">你的智能助手</p>
          </div>
        </div>
        <button class="menu-btn" title="菜单">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </div>

      <!-- 新建会话按钮 -->
      <button class="new-chat-btn" @click="handleNewConversation">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>新建会话</span>
      </button>

      <!-- 历史对话列表 -->
      <div class="conversation-list">
        <h3 class="list-title">历史对话</h3>
        <div class="conversations">
          <div
            v-for="conv in conversations"
            :key="conv.id"
            :class="['conversation-item', { active: conv.id === currentConversationId }]"
            @click="selectConversation(conv.id)"
          >
            <svg class="chat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="conversation-title">{{ conv.title }}</span>
          </div>
        </div>
      </div>

      <!-- 底部用户信息 -->
      <div class="sidebar-footer">
        <div class="user-info">
          <span class="user-name">{{ userStore.userId || '用户' }}</span>
        </div>
        <button class="logout-btn" @click="handleLogout" title="退出登录">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 欢迎区域 -->
      <div class="welcome-section" v-if="!currentConversationId">
        <div class="welcome-content">
          <img src="/robot.png" alt="欢迎" class="welcome-robot" />
          <div class="welcome-text">
            <h2 class="welcome-title">你好，</h2>
            <p class="welcome-subtitle">我是你的智能助手赛小宝</p>
          </div>
          <p class="welcome-desc">快和我交流吧！我可以为你完成年假查询，员工手册等等事情，成为你的高效助手。</p>
        </div>
      </div>

      <!-- 输入框区域 -->
      <div class="input-section">
        <div class="input-wrapper">
          <!-- 输入框 -->
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
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chat-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #e8f4fc 0%, #d0e8f5 50%, #e8f4fc 100%);
  overflow: hidden;
}

/* ========== 左侧边栏 ========== */
.sidebar {
  width: 260px;
  min-width: 260px;
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(24, 144, 255, 0.15);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(24, 144, 255, 0.1);
}

.bot-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bot-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.bot-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.bot-subtitle {
  font-size: 11px;
  color: #666;
  margin: 2px 0 0;
}

.menu-btn {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(24, 144, 255, 0.2);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: rgba(24, 144, 255, 0.15);
}

.new-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 16px;
  padding: 12px 20px;
  background: #fff;
  border: none;
  border-radius: 12px;
  color: #1890ff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

.new-chat-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.25);
}

.conversation-list {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
}

.list-title {
  font-size: 12px;
  color: #888;
  font-weight: 500;
  padding: 8px 0 4px;
  margin: 0;
}

.conversations {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.conversation-item:hover {
  background: rgba(24, 144, 255, 0.1);
}

.conversation-item.active {
  background: rgba(24, 144, 255, 0.2);
}

.chat-icon {
  color: #1890ff;
  flex-shrink: 0;
  opacity: 0.8;
}

.conversation-title {
  font-size: 13px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid rgba(24, 144, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 13px;
  color: #666;
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 0, 0, 0.1);
  color: #ff4d4f;
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
  margin: 0;
  display: inline;
}

.welcome-subtitle {
  font-size: 28px;
  color: #1890ff;
  font-weight: 500;
  margin: 0;
  display: inline;
}

.welcome-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* ========== 输入框区域 ========== */
.input-section {
  padding: 0 24px 32px;
}

.input-wrapper {
  background: #fff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(24, 144, 255, 0.15);
}

.input-box {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 12px;
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
  background: linear-gradient(135deg, #6ec3ff 0%, #00a8ff 100%);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, transform 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: scale(1.05);
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
.conversations::-webkit-scrollbar {
  width: 4px;
}

.conversations::-webkit-scrollbar-track {
  background: transparent;
}

.conversations::-webkit-scrollbar-thumb {
  background: rgba(24, 144, 255, 0.2);
  border-radius: 2px;
}

.conversations::-webkit-scrollbar-thumb:hover {
  background: rgba(24, 144, 255, 0.3);
}
</style>
