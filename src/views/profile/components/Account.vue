<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <el-form ref="form" :model="accountForm" label-width="70px">
        <div class="pan-thumb">
          <pan-thumb :image="accountForm.avatar" />
        </div>
        <el-form-item align="center" label-width="0">
          <el-button size="small" plain type="primary" icon="el-icon-upload" @click="imagecropperShow=true"> 上传头像
          </el-button>
        </el-form-item>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :params="{username:accountForm.username}"
          :url="avatarServer"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
        <el-form-item label="用户名">
          <el-input v-model="accountForm.username" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="accountForm.name" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="accountForm.department" multiple placeholder="请选择">
            <el-option
              v-for="item in $store.getters.departmentOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="accountForm.contact" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="accountForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      accountForm: {
        username: this.$store.getters.username,
        name: this.$store.getters.name,
        department: this.$store.getters.department,
        contact: this.$store.getters.contact,
        introduction: this.$store.getters.introduction,
        avatar: this.$store.getters.avatar,
        token: this.$store.getters.token
      },

      avatarServer: this.$store.state.settings.avatarServer,

      imagecropperShow: false,
      imagecropperKey: 0,

      departmentOptions: null
    }
  },
  created() {

  },
  methods: {
    submit() {
      this.$store.dispatch('user/updateAccount', this.accountForm).then(() => {
        this.$message.success('更新个人资料成功')
      }).catch(() => {
      })
    },
    cancel() {
      this.accountForm.username = this.$store.getters.username
      this.accountForm.name = this.$store.getters.name
      this.accountForm.department = this.$store.getters.department
      this.accountForm.contact = this.$store.getters.contact
      this.accountForm.introduction = this.$store.getters.introduction
      this.accountForm.avatar = this.$store.getters.avatar
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      // this.avatar = resData.files.avatar
      this.accountForm.avatar = resData
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pan-thumb {
  margin: 5px auto 15px auto;
  display: table;
}
.el-select{
  width: 100%;
}
</style>
