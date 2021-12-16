const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.username,
  id: state => state.user.id,
  name: state => state.user.name,
  departments: state => state.user.departments,
  contact: state => state.user.contact,
  introduction: state => state.user.introduction,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,

  departmentDict: state => state.department.departmentDict,
  departmentOptions: state => state.department.departmentOptions,

  permission_routes: state => state.permission.routes,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
