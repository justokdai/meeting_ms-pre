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
            <el-aside width="400px" style="   display: flex; align-items: center; justify-content: center;">
              <mainLogo></mainLogo>
            </el-aside>
            <!-- 这里是 导航栏区 -->
            <el-main class="navigate">
              <RouterLink to="/index" class="sub">首页</RouterLink>
              <RouterLink to="/rental" class="sub">会议室预定</RouterLink>
              <RouterLink to="/approval" class="sub">会议室审批情况</RouterLink>
              <RouterLink to="/aboutus" class="sub">联系我们</RouterLink>
            </el-main>
            <el-link style="width: 100px;" href="http://localhost:5174/" type="primary">管理员入口</el-link>
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
        <!-- <mainFooter></mainFooter> -->
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

.el-header {
  background: rgb(238, 243, 245);
}

.navigate {
  display: flex;
  justify-content: center;
  /* 使导航项居中 */
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.navigate .sub {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
  /* 减小导航项之间的间距 */
  padding: 10px 15px;
  /* 控制导航项的内边距，影响宽度 */
  text-decoration: none;
  text-align: center;
}

.navigate .sub:hover {
  color: #409eff;
  text-decoration: underline;
}

.navigate .admin-link {
  font-size: 16px;
  color: #fff;
  background-color: #409eff;
  padding: 10px 15px;
  border-radius: 5px;
}

.navigate .admin-link:hover {
  background-color: #66b1ff;
}

.navigate .sub {
  width: 150px;
}
</style>
