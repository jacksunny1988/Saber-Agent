<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { getUserConversationList, createConversation } from '@/api/chat'

const props = defineProps({
  currentChatId: {
    type: [String, Number],
    default: null
  }
})

const emit = defineEmits(['select-chat', 'new-chat'])

const router = useRouter()
const userStore = useUserStore()

// 会话列表
const conversations = ref([])
const loading = ref(false)

/**
 * 获取会话列表
 */
const loadConversations = async () => {
  loading.value = true
  try {
    const userId = userStore.userId
    if (!userId) {
      console.error('未找到用户 ID，请先登录')
      return
    }
    const res = await getUserConversationList(userId)
    if (res.code === 200) {
      // 新 API 返回的数据结构为 { conversations: [...] }
      conversations.value = res.data?.conversations || []
    }
  } catch (error) {
    console.error('获取会话列表失败:', error)
    // API 开发中，暂时使用 mock 数据
    conversations.value = [
      { id: 1, title: '考勤规则是什么', dialogue_type: 'NORMAL' },
      { id: 2, title: '上下班时间是几点', dialogue_type: 'NORMAL' },
      { id: 3, title: '年假有几天呀', dialogue_type: 'NORMAL' },
      { id: 4, title: '加班可以调休吗', dialogue_type: 'NORMAL' },
      { id: 5, title: '请病假扣多少钱', dialogue_type: 'NORMAL' }
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
      // 新建会话成功后跳转到新会话
      router.push(`/chat/${res.data.id}`)
      // 重新加载会话列表
      loadConversations()
    }
  } catch (error) {
    console.error('创建会话失败:', error)
  }
}

/**
 * 点击会话项，跳转路由
 */
const selectConversation = (id) => {
  router.push(`/chat/${id}`)
}

/**
 * 退出登录
 */
const handleLogout = () => {
  userStore.logout()
  // 这里可能需要通知父组件进行路由跳转
  // 暂时保持原有行为
  window.location.reload()
}

onMounted(() => {
  loadConversations()
})
</script>

<template>
  <aside class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="bot-info">
        <img src="/bot1.png" alt="赛小宝" class="bot-avatar" />
        <div class="bot-text">
          <h2 class="bot-name">赛小宝</h2>
          <h4 class="bot-subtitle">你的智能助手</h4>
        </div>
      </div>
    </div>

    <!-- 新建会话按钮 -->
    <button class="new-chat-btn" @click="handleNewConversation">
      + 新建会话
    </button>

    <!-- 历史对话列表 -->
    <div class="conversation-list">
      <div class="conversations">
        <div
          v-for="conv in conversations"
          :key="conv.id"
          :class="['conversation-item', { active: currentChatId === conv.id }]"
          @click="selectConversation(conv.id)"
        >
          <svg class="chat-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span class="conversation-title">{{ conv.title }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
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

.bot-text {
  display: flex;
  flex-direction: column;
}

.bot-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.bot-subtitle {
  font-size: 13px;
  color: #666;
  margin: 2px 0 0;
}

.new-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: rgba(24, 144, 255, 0.15);
  border: 1px solid rgba(24, 144, 255, 0.3);
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
