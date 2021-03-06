import request from '@/utils/request'

export function getList() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}
