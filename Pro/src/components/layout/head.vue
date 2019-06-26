<template>
  <div>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <img src="../../../static/logo.png">
      </div>
    </el-col>
    <el-col :span="16">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="back">退出</a>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  methods: {
    //   退出返回主页
    back () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.$router.push('/login')
          window.localStorage.removeItem('token')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>

<style>
</style>
