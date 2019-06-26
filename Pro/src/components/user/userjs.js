export default {
  data() {
    return {

      tableData: [],
      //   查询的关键字
      query: "",
      //   当前页码
      pagenum: 1,
      //   每页显示的条数
      pagesize: 5,
      total: 0,
      //   新增对话框的显隐
      adddialog: false,
      // 编辑对话框的显隐
      resetdialog: false,
      // 分配角色框的显隐
      sharedialog: false,
      //   框框的长度
      formLabelWidth: "80px",

      fordata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      eidtdata: {
        username: "",
        email: "",
        mobile: "",
        rid: ""
      },
      //角色数据
      roledata: {
        username: "",
        rid: ""
      },
      // 下拉框的空数组
      downlist: [],
      rules: {
        username: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    // 查询全部数据的方法
    getUdata() {
      this.$http({
        method: "get",
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
      }).then(res => {
        console.log(res);
        let {
          data
        } = res.data;
        // 判断data中的users的长度是否为0，如果为0，那么就把页数--，再重新获取一次数据
        if (data.users.length === 0 && this.pagenum != 1) {
          this.pagenum--
          this.getUdata()
        }
        this.tableData = data.users;
        this.total = data.total;
      });
    },
    // 	currentPage是当前所在的页码数
    reflash(currentPage) {
      console.log(currentPage);
      this.pagenum = currentPage;
      this.getUdata();
    },
    sizechange(pagesize) {
      this.pagesize = pagesize;
      this.getUdata();
    },
    search() {
      this.getUdata();
    },
    // 弹出框
    addtalk() {
      this.adddialog = true;
    },
    // 新增数据
    adduuu() {
      this.$refs.fordata.validate(valid => {
        if (valid) {
          this.$http({
              method: "post",
              url: "users",

              data: this.fordata
            })
            .then(res => {
              console.log(res);
              if (res.data.meta.status === 201) {
                this.getUdata();
                this.$message({
                  type: "success",
                  message: res.data.meta.msg
                });
                this.adddialog = false;
                // 清空面板
                this.fordata.username = "";
                this.fordata.password = "";
                this.fordata.email = "";
                this.fordata.mobile = "";
              }
            })
            .catch(err => {
              this.$message.error(res.data.meta.msg);
            });
          console.log(this.fordata);
        }
      });
    },
    // 删除信息
    shanchu(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$http({
            method: "delete",
            url: `users/${id}`,

          }).then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getUdata();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      //   console.log(id);
    },
    // 通过id查询被点击数据的信息
    reset(id) {
      this.$http({
        method: "get",
        url: `users/${id}`,

      }).then(res => {
        // console.log(res);
        let {
          data
        } = res.data;
        this.resetdialog = true;
        this.eidtdata = data;
        // this.roledata = data;


        // this.eidtdata.username = data.username;
        // this.eidtdata.email = data.email;
        // this.eidtdata.mobile = data.mobile;
      });
    },
    // 编辑信息
    editd(id) {
      this.$http({
        method: 'put',
        url: `users/${id}`,
        data: {
          email: this.eidtdata.email,
          mobile: this.eidtdata.mobile,
        },


      }).then(res => {
        console.log(res);
        this.resetdialog = false
        this.getUdata()
        this.roledata = res.data.data
      })
    },
    // 分配角色
    pickuser(id) {
      this.$http({
        method: "get",
        url: `users/${id}`,

      }).then(res => {
        let {
          data
        } = res.data
        this.roledata = data
        this.sharedialog = true
        console.log(this.roledata);

      });
      this.$http({
        method: "get",
        url: `users/roles`,

      }).then(res => {
        let {
          data
        } = res.data
        this.downlist = data
        console.log(this.downlist);

      });

    },
    // 修改他的角色
    gaidata() {
      this.$http({
        method: "put",
        url: `users/${this.roledata.id}/role`,
        data: {
          rid: this.roledata.rid
        },

      }).then(res => {

        console.log(res);
        this.sharedialog = false

      });
    },
    grd(id, type) {
      this.$http({
        method: "put",
        url: `users/${id}/state/${type}`,
        data: {
          rid: this.roledata.rid
        },

      }).then(res => {
        let {
          meta
        } = res.data
        this.$message({
          message: meta.msg,
          type: "success"
        })

      })
    }
  },

  mounted() {
    this.getUdata();
  }
}
