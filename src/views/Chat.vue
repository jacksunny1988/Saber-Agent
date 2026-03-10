<script setup>
import { ref, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChatList from './ChatList.vue'
import ChatDetail from './ChatDetail.vue'

const route = useRoute()

// 当前选中的对话 ID
const currentChatId = ref(null)

// 提供给子组件的方法，用于更新当前对话 ID
const selectChat = (id) => {
  currentChatId.value = id
}

// 提供给 ChatDetail 的方法，用于新建会话后更新 ID
const updateCurrentChatId = (id) => {
  currentChatId.value = id
}

// 监听路由参数变化，支持 /chat/:chat_id 路由
watch(() => route.params.chat_id, (newId) => {
  if (newId) {
    currentChatId.value = newId
  } else {
    // 如果没有 chat_id 参数，重置为 null（新建对话状态）
    currentChatId.value = null
  }
}, { immediate: true })
</script>

<template>
  <div class="chat-container">
    <!-- 左侧历史对话列表 -->
    <ChatList
      :current-chat-id="currentChatId"
      @select-chat="selectChat"
      @new-chat="updateCurrentChatId"
    />

    <!-- 右侧对话详情 -->
    <ChatDetail
      :chat-id="currentChatId"
    />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #e8f4fc 0%, #d0e8f5 50%, #e8f4fc 100%);
  overflow: hidden;
}
</style>
