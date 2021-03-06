import request from '@/utils/request'

export function getList() {
  return request({
    url: '/terminals',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/terminal',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/terminal',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/terminal',
    method: 'delete',
    params: { id }
  })
}
