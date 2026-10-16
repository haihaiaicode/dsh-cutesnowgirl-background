# 发布清单

这个项目有三个不同的发布动作。按顺序完成，用户才能获得最稳定的安装体验。

## 1. GitHub 仓库

1. 确认 `assets/background.mp4` 具有公开再分发许可。
2. 在 GitHub 创建公开仓库 `haihaiaicode/dsh-cutesnowgirl-background`。
3. 推送 `main` 分支。
4. 在仓库 About 设置中添加 topic：`dsh-plugin`、`deepseek-harness`、`video-background`。
5. 等待 GitHub Actions 的 Verify 工作流通过。

公开仓库必须创建满 1 天，才能通过社区市场目录的自动检查。

## 2. npm 包

首次发布需要在本机完成登录：

```bash
npm login
npm whoami
npm run check
npm run pack:check
npm publish --access public
```

发布后验证：

```bash
npm view dsh-cutesnowgirl-background version
npm view dsh-cutesnowgirl-background repository.url
```

不要重复发布同一个版本。修改代码后先更新 `package.json` 的版本号，再发布新版本。

## 3. 社区插件市场

Fork [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)，只新增以下文件：

```text
data/plugins/haihaiaicode__dsh-cutesnowgirl-background.yml
```

文件内容使用仓库根目录的 `marketplace-entry.yml`。不要手工修改该目录的 README。提交 PR 后等待 CI 和维护者检查；合并后，`dshmarket` 通常在一天内同步。

## 用户安装方式

Harness Desktop 插件页：

```text
dsh-cutesnowgirl-background@latest
```

非 Desktop profile 的终端安装：

```bash
dsh plugin --profile <profile-name> add dsh-cutesnowgirl-background@latest
```

GitHub 源码安装标识：

```text
github:haihaiaicode/dsh-cutesnowgirl-background
```
