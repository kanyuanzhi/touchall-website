const roles = {
  'd1': {
    id: 1,
    introduction: 'I am a super administrator',
    name: 'root',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd2': {
    id: 2,
    introduction: 'I am an editor',
    name: 'admin',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd3': {
    id: 3,
    introduction: 'I am an editor',
    name: 'operator',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd4': {
    id: 4,
    introduction: 'I am an editor',
    name: 'guest',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
}

module.exports = [
  //  create
  {
    url: '/vue-admin-template/role',
    type: 'post',
    response: config => {
      const { name, introduction } = config.body
      return {
        code: 20000,
        data: {
          introduction: introduction,
          name: name,
          created_at: 1639364773153,
          updated_at: 1639364873153
        }
      }
    }
  },

  // getList
  {
    url: '/vue-admin-template/role',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: [roles['d1'], roles['d2'], roles['d3'], roles['d4']]
      }
    }
  },

  // update
  {
    url: '/vue-admin-template/role',
    type: 'put',
    response: config => {
      const { id, introduction } = config.body
      return {
        code: 20000,
        data: {
          id: id,
          introduction: introduction
        }
      }
    }
  }
]
