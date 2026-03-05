import request from '@/utils/request'

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @returns {Promise}
 */
export function handleRegister(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data,
    skipToken: true  // 注册请求不需要 token
  })
}

/**
 * 用户登录
 * @param {Object} data - 登录信息 { user_name, password }
 * @returns {Promise}
 */
export function handleLogin(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
    skipToken: true  // 登录请求不需要 token
  })
}
