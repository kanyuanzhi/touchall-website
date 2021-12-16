import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function updatePassword(data) {
  return request({
    url: '/vue-admin-template/user/updatePassword',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/vue-admin-template/user/updateAccount',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'get'
  })
}

export function deleteUser(username) {
  return request({
    url: '/vue-admin-template/user/delete',
    method: 'delete',
    params: { username }
  })
}

