<template>
  <div>
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 父传 -->
    <mybread one="权限管理" two="角色列表"></mybread>
    <el-card>
      <!-- 搜索 -->

      <!-- 表格 -->
      <el-table :data="cardata" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- {{scope.row.children}} -->
            <el-row v-for="item1 in scope.row.children" :key="item1.id">
              <!-- 第一 -->
              <el-col :span="4">
                <!-- scope.row.id:就是角色权限rid  ；item1.id：就是里面的id -->
                <el-tag
                  @close="guan(scope.row.id,item1.id,scope)"
                  closable
                >{{item1.authName}}{{item1.id}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <!-- 第二个 -->
                  <el-col :span="5">
                    <el-tag
                      @close="guan(scope.row.id,item2.id,scope)"
                      closable
                      type="success"
                    >{{item2.authName}}{{item2.id}}</el-tag>
                  </el-col>
                  <!-- 第三个 -->
                  <el-col :span="19">
                    <el-tag
                      @close="guan(scope.row.id,item3.id,scope)"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      type="warning"
                    >{{item3.authName}}{{item3.id}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length==0">
              <el-col :span="24">
                <h3>没有分配权限</h3>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"></el-table-column>

        <el-table-column prop="roleName" label="角色名称" width="400"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>

        <el-table-column prop="mobile" label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            <!-- 分配按钮 -->
            <el-button @click="openadd" type="success" icon="el-icon-check" plain size="mini"></el-button>
            <el-row></el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出框 -->
      <el-dialog title="分配权限" :visible.sync="opendialog" width="30%">
        <!-- <span>这是一段信息</span> -->

        {{carlist}}
        <span slot="footer" class="dialog-footer">
          <el-button @click="opendialog = false">取 消</el-button>
          <el-button type="primary" @click="opendialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import mybread from "../layout/mybread";

import carlist from "./carlist";
export default {
  components: {
    mybread: mybread
  },
  data() {
    return {
      cardata: [],
      default: [],
      opendialog: false,
      // 点击分配权限获取数据的数组
      carlist: []
    };
  },
  methods: {
    getcar() {
      this.$http({
        method: "get",
        url: "roles"
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        this.cardata = data;
      });
    },
    guan(rid, id, scope) {
      this.$http({
        method: "delete",
        url: `roles/${rid}/rights/${id}`
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status == 200) {
          console.log(data);
          this.$message({
            type: "success",
            message: meta.msg
          });
          scope.row.children = data;
        }
      });
      console.log(rid, id);
    },
    openadd() {
      this.opendialog = true;
      this.$http({
        method: "get",
        url: `rights/tree`
      }).then(res => {
        let { data, meta } = res.data;
        this.carlist = data;
      });
    }
  },
  mounted() {
    this.getcar();
  }
};
</script>

<style>
.el-row {
  margin-bottom: 15px;
}
.el-tag {
  margin-right: 10px;
}
</style>
