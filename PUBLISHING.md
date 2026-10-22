# 发布与维护清单

当前版本 `0.1.3` 已发布到 npm，GitHub `v0.1.3` 标签已推送，社区市场条目已收录。后续更新代码时先递增版本号，再发布新包。

这个项目有三个不同的发布动作。按顺序完成，用户才能获得最稳定的安装体验。

## 1. GitHub 仓库

1. 确认 `assets/background.mp4` 具有公开再分发许可。
2. 在 GitHub 创建公开仓库 `haihaiaicode/dsh-cutesnowgirl-background`。
3. 推送 `main` 分支。
4. 在仓库 About 设置中添加 topic：`dsh-plugin`、`deepseek-harness`、`video-background`。
5. 等待 GitHub Actions 的 Verify 工作流通过。

当前公开仓库及 Verify 工作流已经通过检查。

## 2. npm 包

发布后续版本需要在本机完成登录及 npm 的一次性验证：

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

文件内容使用仓库根目录的 `marketplace-entry.yml`。不要手工修改该目录的 README。收录 PR [#8082](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/8082) 已合并；后续代码版本更新通常只需发布新 npm 包，只有条目元数据变化时才需要再提交目录 PR。

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
