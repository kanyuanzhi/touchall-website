import { getList as getDepartmentList } from '@/api/department'
import store from '@/store'

export function getDepartmentDict() {
  return new Promise((resolve, reject) => {
    const departmentDict = {}
    const departmentOptions = []
    getDepartmentList().then(res => {
      const { data } = res
      data.map(v => {
        departmentDict[v.id] = v.name
        departmentOptions.push({ 'id': v.id, 'name': v.name })
      })
      resolve([departmentDict, departmentOptions])
    }).catch(error => {
      reject(error)
    })
  })
}

export function departmentIDtoName(idList) {
  const nameList = idList.map(v => {
    return store.getters.departmentDict[v]
  })
  return nameList.join('，')
}
