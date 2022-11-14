# 公证签重构 —— 录单系统

### 公证签重构相关文档

#### 1. 需求文档（原型）

- [金融线运营中台](192.168.88.175/前台受理/金融线运营中台/)
- [金融赋强系统](192.168.88.175/前台受理/金融赋强系统/)
- [预开发变量](192.168.88.175/前台受理/预开发变量/)

#### 2. 公证签重构 API 文档

- [公证签重构 API 文档] (xxx)

### 功能分支开发/命名规范

1. 按功能将任务分配给相应成员开发，相关一个或多个功能会对应一个分支，成员将负责对应完整功能的实现；
2. 开发完后需代码评审，再 gitlab 发起合并申请，通过后可合并到 develop 分支
3. 组件命名采用驼峰命名，如'svgIcon'，路由命名使用横杠连接，如'business-list'

### 代码提交规范

代码提交注释规范：

- task+#禅道任务编号+任务标题，如：task#31519 【后端】服务产品-角色清洗-签署流程配置-移除签署流程配置接口
- bug+#禅道 bug 编号+bug 标题，如：bug#64953 订单号：HJ21122810490264985 补录订单开票异常 推送失败

### 代码回滚操作

- 第一步：拉一个新的分支保存当前分支的最新修改
- 第二步：使用 `git log` 或者在 `gitlab` 上找到你要回退的历史版本 `commit Id`
- 第三步：使用 `git reset --hard [commit Id]`
- 第四步：使用 `git push --force` 强制修改提交

**回滚操作请勿随意提交**

### 代码打包 vue-cli 在 生产模式 `npm run build:prod` 会有打包优化，包括文件加上 `Hash` 实现缓存

### Eslint 保存自动格式化

```json
// vscode设置：
// 设置使用eslint格式文件校验：命令面板 ——> 搜索setting.json ——> 替换如下代码
// 校验（全部、部分+自动）：设置 ——> 搜索format on save ——> 勾选
{
  "editor.fontFamily": "Consolas, 'Courier New', monospace,'Dengxian'",
  "git.ignoreMissingGitWarning": true,
  "explorer.confirmDelete": false,
  "window.zoomLevel": 0,
  "vetur.validation.template": false,
  "eslint.options": {
    "extensions": [".js", ".vue"]
  },
  "eslint.validate": ["javascript", "html", "vue"],
  "emmet.syntaxProfiles": {
    "javascript": "jsx",
    "vue": "html",
    "vue-html": "html"
  },
  "editor.fontSize": 18,
  "editor.snippetSuggestions": "top",
  "editor.codeActionsOnSave": {
    // eslint在保存文件时自动格式化代码
    "source.fixAll.eslint": true
  }
}
```

### 单元测试

1. 有哪些场景需要做单元测试？
2. 如何写合理的单元测试？
