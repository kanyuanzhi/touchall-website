<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="username" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="name" />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="departments" />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="contact" />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="introduction" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">

      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters([
      'username',
      'name',
      'departments',
      'contact',
      'introduction'
    ])
  },
  data() {
    return {
      // username11: this.$store.getters.username,
      form: {
        username: this.username,
        name: this.name,
        departments: this.departments,
        contact: this.contact,
        introduction: this.introduction
      }
    }
  }
}
</script>

<style scoped>

</style>
