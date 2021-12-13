<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="修改资料" name="account">
                <account />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="password">
                <password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Password from './components/Password'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account, Password },
  data() {
    return {
      departmentDict: {},
      departmentOptions: [],
      activeTab: 'account'
    }
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
  created() {

  }
}
</script>

