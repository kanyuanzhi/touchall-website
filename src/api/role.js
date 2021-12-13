import request from '@/utils/request'

export function getList() {
  return request({
    url: '/vue-admin-template/role/',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/vue-admin-template/role/',
    method: 'put',
    data
  })
}
