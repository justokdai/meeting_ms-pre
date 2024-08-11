<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import mainFooter from './components/mainFooter.vue';
import mainLogo from './components/mainLogo.vue';
import mainUser from './components/mainUser.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: 100px;">
        <div class="common-layout" style="height: 100%;">
          <el-container style="height: 100%;">
            <!-- 这里是Logo区 -->
            <el-aside width="200px">
              <mainLogo></mainLogo>
            </el-aside>
            <!-- 这里是 导航栏区 -->
            <el-main class="navigate">
              <RouterLink to="/index" class="sub">首页</RouterLink>
              <RouterLink to="/rental" class="sub">会议室预定</RouterLink>
              <RouterLink to="/approval" class="sub">会议室审批情况</RouterLink>
              <RouterLink to="/aboutus" class="sub">关于我们</RouterLink>

            </el-main>
            <!-- 这里是用户头像，也就是用户信息展示区 -->
            <el-aside width="150px">
              <mainUser></mainUser>
            </el-aside>
          </el-container>
        </div>
      </el-header>
      <el-main style="padding-right: 0;padding-left: 0;padding-top: 0;">
        <RouterView></RouterView>
      </el-main>
      <el-footer>
        <mainFooter></mainFooter>
      </el-footer>
    </el-container>
  </div>
</template>


<style scoped>
.navigate {
  display: flex;
  justify-content: flex-end;
  /* 让导航栏靠右显示 */
  align-items: center;
  /* 如果需要垂直居中 */
}

.navigate .sub {
  width: 200px;
}
</style>
