const departments = {
  'd1': {
    id: 1,
    introduction: 'I am a super administrator',
    name: '财务部',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd2': {
    id: 2,
    introduction: 'I am an editor',
    name: '后勤部',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd3': {
    id: 3,
    introduction: 'I am an editor',
    name: '销售部',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd4': {
    id: 4,
    introduction: 'I am an editor',
    name: '研发部',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'd5': {
    id: 5,
    introduction: 'I am an editor',
    name: '市场部',
    created_at: 1639364773153,
    updated_at: 1639364873153
  }
}

module.exports = [
  // user update account
  {
    url: '/vue-admin-template/department',
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

  {
    url: '/vue-admin-template/department/',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: [departments['d1'], departments['d2'], departments['d3'], departments['d4'], departments['d5']]
      }
    }
  },

  {
    url: '/vue-admin-template/department',
    type: 'delete',
    response: config => {
      const { name } = config.query
      return {
        code: 20000,
        data: ''
      }
    }
  },

  {
    url: '/vue-admin-template/department',
    type: 'put',
    response: config => {
      const { name, introduction } = config.body
      return {
        code: 20000,
        data: {
          name: name,
          introduction: introduction
        }
      }
    }
  }
]
