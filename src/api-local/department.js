import request from '@/utils/request'

export function getList() {
  return request({
    url: '/vue-admin-template/department/',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/vue-admin-template/department/',
    method: 'post',
    data
  })
}

export function del(departmentName) {
  return request({
    url: '/vue-admin-template/department/',
    method: 'delete',
    params: { departmentName }
  })
}

export function update(data) {
  return request({
    url: '/vue-admin-template/department/',
    method: 'put',
    data
  })
}
