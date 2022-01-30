import request from '@/utils/request'

export function getList() {
  return request({
    url: '/terminal_groups',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/terminal_group',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/terminal_group',
    method: 'put',
    data
  })
}

export function updateMembers(data) {
  return request({
    url: '/terminal_group_members',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/terminal_group',
    method: 'delete',
    params: { id }
  })
}
