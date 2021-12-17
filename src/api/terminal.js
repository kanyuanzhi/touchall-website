import request from '@/utils/request'

export function getList() {
  return request({
    url: '/terminals',
    method: 'get'
  })
}
