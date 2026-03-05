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
  }

  function loadToken() {
    const savedToken = localStorage.getItem('access_token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  function logout() {
    token.value = ''
    userId.value = null
    localStorage.removeItem('access_token')
  }

  return { token, userId, setToken, loadToken, logout }
})
