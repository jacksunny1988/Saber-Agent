import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const userId = ref(null)

  function setToken(newToken, newUserId) {
    token.value = newToken
    userId.value = newUserId
    console.log('Token set:', newToken)
    localStorage.setItem('access_token', newToken)
    localStorage.setItem('user_id', newUserId)
  }

  function loadToken() {
    const savedToken = localStorage.getItem('access_token')
    const savedUserId = localStorage.getItem('user_id')
    if (savedToken) {
      token.value = savedToken
    }
    if (savedUserId) {
      userId.value = Number(savedUserId)
    }
  }

  function logout() {
    token.value = ''
    userId.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_id')
  }

  return { token, userId, setToken, loadToken, logout }
})
