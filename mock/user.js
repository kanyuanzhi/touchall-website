const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    id: 1,
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    username: 'admin',
    department: [1, 3],
    contact: '53245325',
    created_at: 1639364773153,
    updated_at: 1639364873153
  },
  'editor-token': {
    id: 3,
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    username: 'editor',
    department: [1, 2],
    contact: '53245325',
    created_at: 1639364773153,
    updated_at: 1639364873153
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // user register
  {
    url: '/vue-admin-template/user/register',
    type: 'post',
    response: config => {
      const { username, password, checkPassword } = config.body
      const token = 'qqq'

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: {
          id: parseInt(Math.random() * 1000),
          roles: ['admin'],
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: 'Super Admin',
          username: 'admin',
          department: [],
          contact: '53245325',
          created_at: 1639364773153,
          updated_at: 1639364873153
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // user update account
  {
    url: '/vue-admin-template/user/updateAccount',
    type: 'post',
    response: config => {
      const { username, roles } = config.body
      return {
        code: 20000,
        data: {
          roles: roles,
          created_at: 1639364773153,
          updated_at: 1639364873153
        }
      }
    }
  },

  {
    url: '/vue-admin-template/user/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: [users['admin-token'], users['editor-token']]
      }
    }
  },

  {
    url: '/vue-admin-template/user/delete',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: [users['admin-token'], users['editor-token']]
      }
    }
  }
]
