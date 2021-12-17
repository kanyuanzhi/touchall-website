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

export function BToGB(value) {
  return (value / 1024 / 1024 / 1024).toFixed(2)
}
