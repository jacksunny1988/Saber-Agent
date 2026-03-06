import request from '@/utils/request'

/**
 * 获取历史对话列表
 * @returns {Promise}
 */
export function getConversationList() {
  return request({
    url: '/chat/conversations',
    method: 'get'
  })
}

/**
 * 创建新对话
 * @param {Object} data - 对话信息
 * @returns {Promise}
 */
export function createConversation(data) {
  return request({
    url: '/chat/conversations',
    method: 'post',
    data
  })
}

/**
 * 获取对话详情
 * @param {number} id - 对话 ID
 * @returns {Promise}
 */
export function getConversationDetail(id) {
  return request({
    url: `/chat/conversations/${id}`,
    method: 'get'
  })
}

/**
 * 发送消息
 * @param {Object} data - 消息数据 { conversation_id, content, ... }
 * @returns {Promise}
 */
export function sendMessage(data) {
  return request({
    url: '/chat/messages',
    method: 'post',
    data
  })
}

/**
 * 获取对话消息列表
 * @param {number} conversationId - 对话 ID
 * @param {Object} params - 查询参数
 * @returns {Promise}
 */
export function getConversationMessages(conversationId, params) {
  return request({
    url: `/chat/conversations/${conversationId}/messages`,
    method: 'get',
    params
  })
}
