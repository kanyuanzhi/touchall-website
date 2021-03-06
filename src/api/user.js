import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/user/account',
    method: 'put',
    data
  })
}

export function updateRoles(data) {
  return request({
    url: '/user/roles',
    method: 'put',
    data
  })
}

export function getList(data) {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function deleteUser(token) {
  return request({
    url: '/user',
    method: 'delete',
    params: { token }
  })
}

