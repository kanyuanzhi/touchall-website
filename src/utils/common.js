import store from '@/store'

export function departmentIDtoName(idList) {
  if (!idList || idList.length <= 0) {
    return ''
  }
  const nameList = idList.map(v => {
    return store.getters.departmentDict[v]
  })
  return nameList.join('，')
}
