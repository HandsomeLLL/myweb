<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <Head></Head>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <Side></Side>
      </el-aside>
      <!-- 内容的部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Head from '../layout/head'
import Side from '../layout/side'
export default {
  components: {
    Head: Head,
    Side: Side
  },
  mounted () {
    let token = window.localStorage.getItem('token')
    if (!token) {
      this.$message.error('您还没有登录')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
img {
  float: left;
}
h1 {
  margin: 0;
}
a {
  text-decoration: none;
  font-weight: 550;
  font-size: 20px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.hheight {
  height: 100%;
}
</style>
