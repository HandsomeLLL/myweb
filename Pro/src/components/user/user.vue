<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="myrow">
      <el-col :span="6">
        <div>
          <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
            <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click.prevent="addtalk">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="username" label="用户状态" width="80">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="grd(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="操作">
        <template slot-scope="scope">
          <el-row>
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              @click.prevent="reset(scope.row.id)"
            ></el-button>
            {{scope.row}}
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              @click.prevent="shanchu(scope.row.id)"
              v-model="scope.row.id"
              size="mini"
            ></el-button>
            <!-- 管理用户按钮 -->
            <el-button
              type="success"
              plain
              icon="el-icon-check"
              size="mini"
              @click.prevent="pickuser(scope.row.id)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- :current-page="currentPage4" -->
    <el-pagination
      @size-change="sizechange"
      @current-change="reflash"
      :page-sizes="[3, 5, 10, 12]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增对话 -->
    <el-dialog title="添加用户" :visible.sync="adddialog">
      {{fordata}}
      <el-form :model="fordata" :rules="rules" ref="fordata">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="fordata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="fordata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="fordata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="fordata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialog = false">取 消</el-button>
        <el-button type="primary" @click="adduuu">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="resetdialog">
      {{fordata}}
      <el-form :model="eidtdata" :rules="rules" ref="fordata">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="eidtdata.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="eidtdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="eidtdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetdialog = false">取 消</el-button>
        <el-button type="primary" @click.prevent="editd(eidtdata.id)">确 定</el-button>
        <!-- @click="resetmsg" -->
      </div>
    </el-dialog>
    <!-- 分配角色框 -->
    <el-dialog title="分配角色" :visible.sync="sharedialog">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">{{roledata.username}}</el-form-item>
        <el-form-item label="角色分配" :label-width="formLabelWidth">
          {{roledata.rid}}
          <el-select v-model="roledata.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in downlist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="sharedialog = false">取 消</el-button>
        <el-button type="primary" @click.prevent="gaidata">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script src="./userjs.js">
</script>

<style>
.myrow {
  margin-top: 20px;
}
</style>
