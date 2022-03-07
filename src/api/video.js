import request from '@/utils/request'

export function getList() {
  return request({
    url: '/videos',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/video',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/video',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/video',
    method: 'delete',
    params: { id }
  })
}
