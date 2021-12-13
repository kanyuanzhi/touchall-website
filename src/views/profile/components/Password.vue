<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-form ref="passwordForm" :model="passwordForm" class="password-form" :rules="passwordRules" label-width="120px">
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input
            ref="oldPassword"
            v-model="passwordForm.oldPassword"
            name="oldPassword"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            ref="newPassword"
            v-model="passwordForm.newPassword"
            type="text"
            name="newPassword"
            tabindex="2"
          />
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="checkNewPassword">
          <el-input
            ref="checkNewPassword"
            v-model="passwordForm.checkNewPassword"
            type="text"
            name="checkNewPassword"
            tabindex="3"
          />
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click.native.prevent="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码位数不能少于6位'))
      } else {
        callback()
      }
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkNewPassword: ''
      },
      passwordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        checkNewPassword: [{ required: true, trigger: 'blur', validator: validateCheckPassword }]
      }
    }
  },
  created() {

  },
  methods: {
    submit() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/updatePassword', this.passwordForm).then(() => {
            this.$message.success('修改密码成功，请重新登录！')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.warning('请按提示输入正确的密码！')
          return false
        }
      })
      // this.$message({
      //   message: 'User information has been updated successfully',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
    },
    cancel() {
      this.username = this.$store.getters.username
      this.name = this.$store.getters.name
      this.department = this.$store.getters.department
      this.contact = this.$store.getters.contact
      this.introduction = this.$store.getters.introduction
      this.avatar = this.$store.getters.avatar
    }
  }
}
</script>

<style lang="scss" scoped>
.password-form {
  width: 100%;
  padding-top: 20px;
  display: table;
}
</style>
