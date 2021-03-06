import request from '@/utils/request'

export function getList() {
  return request({
    url: '/departments',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/department',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/department',
    method: 'delete',
    params: { id }
  })
}

export function update(data) {
  return request({
    url: '/department',
    method: 'put',
    data
  })
}
