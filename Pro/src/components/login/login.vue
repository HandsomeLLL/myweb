<template>
  <div class="bg">
    <div class="content">
      <h1>用户登录</h1>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="listdata"
        ref="ruleForm"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="listdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="listdata.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click.prevent="mypost">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      listdata: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    mypost () {
      this.$http({
        method: 'post',
        url: 'http://localhost:8888/api/private/v1/login',
        data: this.listdata
      })
        .then(res => {
          let { data, meta } = res.data
          if (meta.status === 200) {
            // 储存一个token
            window.localStorage.setItem('token', data.token)
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$router.push('/')
          } else {
            console.log(res)
            this.$message.error(meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  background-color: #324152;
  position: relative;
}
.content {
  width: 580px;
  height: 440px;
  padding: 40px;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
</style>
