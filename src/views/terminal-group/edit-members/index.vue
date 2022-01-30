<template>
  <div>
    <el-button style="width: 100%;border-radius: 0;font-weight: bold;" type="success" @click="drawer=true">
      选择终端组（当前选择终端组：{{
        terminalGroupSelected
      }}）
    </el-button>
    <div class="app-container">
      <div class="dndList">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-card body-style="margin-bottom:20px;" header="已拥有成员">
              <draggable :set-data="setData" :list="list1" group="article" class="dragArea">
                <div v-for="element in list1" :key="element.id" class="list-complete-item1">
                  <div class="list-complete-item-handle">
                    {{ element.id }} {{ element.name }} {{ element.manager }} {{ element.ip }} {{ element.os }}
                  </div>
                  <div style="position:absolute;right:0px;">
                    <span style="float: right ;margin-top: -15px;margin-right:10px;" @click="deleteEle(element)">
                      <i style="color:rgb(255,255,255)" class="el-icon-delete" />
                    </span>
                  </div>
                </div>
              </draggable>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card body-style="margin-bottom:20px;" header="未拥有成员">
              <draggable :list="list2" group="article" class="dragArea">
                <div v-for="element in list2" :key="element.id" class="list-complete-item2">
                  <div class="list-complete-item-handle2" @click="pushEle(element)">
                    {{ element.id }} {{ element.name }} {{ element.manager }} {{ element.ip }} {{ element.os }}
                  </div>
                </div>
              </draggable>
            </el-card>
          </el-col>
          <el-col :span="24">
            <div style="width: 100%;text-align: center">
              <el-button style="margin-top: 20px;" type="primary" size="medium" @click="confirmUpdate">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <terminal-group-list-drawer :drawer="drawer" @row-click="onRowClick" @drawer-close="v=>{this.drawer=v}" />
  </div>
</template>

<script>
import { getList } from '@/api/terminal'
import { updateMembers } from '@/api/terminalGroup'

import TerminalGroupListDrawer from '@/components/Drawer/TerminalGroupListDrawer'
import draggable from 'vuedraggable'

export default {
  components: {
    TerminalGroupListDrawer,
    draggable
  },
  data() {
    return {
      terminalGroupSelected: '未选择',
      terminalGroupID: null,

      drawer: false,

      AllTerminals: {},
      AllTerminalIDs: [],

      list1: [],
      list2: []
    }
  },
  // mounted() {
  //
  // },
  created() {
    this.fetchData()
  },
  methods: {
    onRowClick(row) {
      this.list1 = []
      this.list2 = []
      this.terminalGroupSelected = [row['index'], row['name'], row['manager']].join(' ')
      this.terminalGroupID = row['id']
      for (let i = 0; i < row['members'].length; i++) {
        const id = row['members'][i]
        this.list1.push({
          id: id,
          name: this.AllTerminals[id]['name'],
          manager: this.AllTerminals[id]['manager'],
          ip: this.AllTerminals[id]['net_basic']['ip'],
          os: this.AllTerminals[id]['host_basic']['os']
        })
      }
      for (let i = 0; i < this.AllTerminalIDs.length; i++) {
        const id = this.AllTerminalIDs[i]
        if (row['members'].indexOf(id) === -1) {
          this.list2.push({
            id: id,
            name: this.AllTerminals[id]['name'],
            manager: this.AllTerminals[id]['manager'],
            ip: this.AllTerminals[id]['net_basic']['ip'],
            os: this.AllTerminals[id]['host_basic']['os']
          })
        }
      }
    },
    fetchData() {
      getList().then(res => {
        const { data } = res
        for (let i = 0; i < data.length; i++) {
          this.AllTerminals[data[i]['id']] = data[i]
          this.AllTerminalIDs.push(data[i]['id'])
        }
        const row = this.$store.getters.terminalGroupSelected
        if (row !== null) {
          this.onRowClick(row)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    isNotInList1(v) {
      return this.list1.every(k => v.id !== k.id)
    },
    isNotInList2(v) {
      return this.list2.every(k => v.id !== k.id)
    },
    deleteEle(ele) {
      for (const item of this.list1) {
        if (item.id === ele.id) {
          const index = this.list1.indexOf(item)
          this.list1.splice(index, 1)
          break
        }
      }
      if (this.isNotInList2(ele)) {
        this.list2.unshift(ele)
      }
    },
    pushEle(ele) {
      for (const item of this.list2) {
        if (item.id === ele.id) {
          const index = this.list2.indexOf(item)
          this.list2.splice(index, 1)
          break
        }
      }
      if (this.isNotInList1(ele)) {
        this.list1.push(ele)
      }
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    confirmUpdate() {
      const members = []
      for (let i = 0; i < this.list1.length; i++) {
        members.push(this.list1[i]['id'])
      }
      updateMembers({ group_id: this.terminalGroupID, terminal_ids: members }).then(res => {
        this.$message.success('update members successfully')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  .dragArea {
    min-height: 50px;
    padding-bottom: 10px;
    height: calc(60vh);
    overflow-y: auto
  }
}

.list-complete-item1 {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 8px 12px;
  margin-top: 10px;
  transition: all 1s;
  background-color: rgba(32, 160, 255, 0.9);
  color: white;
  border-radius: 10px;

}

.list-complete-item2 {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 8px 12px;
  margin-top: 10px;
  transition: all 1s;
  background-color: #E6A23C;
  color: white;
  border-radius: 10px;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
  background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}

</style>
