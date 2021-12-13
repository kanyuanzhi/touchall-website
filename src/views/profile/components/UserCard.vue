<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>我的资料</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <!--          <div>Hello</div>-->
          <!--          {{ user.role }}-->
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ username }}</div>
        <div class="user-role text-center text-muted">{{ roles.join('|') }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-user" />
          <span>姓名</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ name }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-office-building" />
          <span>部门</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ departmentIDtoName(department) }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-mobile-phone" />
          <span>联系方式</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ contact }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-reading" />
          <span>个人简介</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ introduction }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import { departmentIDtoName } from '@/utils/common'

export default {
  components: { PanThumb },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'username',
      'name',
      'department',
      'contact',
      'introduction',
      'avatar',
      'roles'
    ])
  },
  methods: {
    departmentIDtoName(idList) {
      return departmentIDtoName(idList)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
  text-align: center;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
