<template>
  <el-card>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <mybread one="权限管理" two="权限列表"></mybread>

    <!-- 表格 -->
    <el-table :data="quandata" border style="width: 100%">
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column label="层级" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="level" label="层级" width="200"></el-table-column>-->
      -->
    </el-table>
  </el-card>
</template>

<script>
import mybread from "../layout/mybread";
export default {
  components: {
    mybread: mybread
  },
  data() {
    return {
      quandata: []
    };
  },
  mounted() {
    this.$http({
      methdos: "get",
      url: "rights/list"
    }).then(res => {
      console.log(res);
      let { data } = res.data;
      this.quandata = data;
    });
  }
};
</script>

<style>
</style>
