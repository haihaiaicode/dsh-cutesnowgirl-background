# DeepSeek Harness 动态视频背景

为 DeepSeek Harness 工作界面添加动态视频背景和半透明输入框。插件只在开屏动画结束、工作区出现后启用，不修改 `app.asar`，也不替换 Harness 的插件加载器。

## 效果与行为

- 默认视频静音、循环、居中铺满。
- 550C 开屏动画或 Harness 原生开屏存在时，背景保持隐藏并暂停。
- 工作界面出现后才加载视频。视频本身不叠加全屏遮罩；回答区保持透明，段落、表格、思考过程、工具调用标题和代码内容使用局部浅灰白半透明衬底，不模糊背景。表格保留原有行列布局，四周留出均匀内边距；侧边栏使用轻透底色。
- 最上层输入框使用半透明磨砂底，只在输入框范围内模糊下方回答，避免文字重叠；深浅模式分别使用不同的输入框底色和实色文字，设置弹窗继续使用 Harness 自己的主题颜色。
- 窗口进入后台时暂停，回到前台后继续。
- 视频加载失败时自动移除背景层，不会挡住工作界面。
- 支持 HTTP Range 请求，Electron 可以正常流式读取 MP4。

## 安装

### Harness Desktop

在 **设置 → 插件 → 添加插件** 中输入：

```text
dsh-cutesnowgirl-background@latest
```

安装完成后按界面提示重启 Desktop。Desktop 管理的 `desktop` profile 应通过应用内插件管理器修改，不要手工运行 CLI 去覆盖它。

如果电脑上还挂着早期手工安装的本地视频背景，先确认 npm 插件安装成功，再停用旧挂载，避免两个背景同时播放。

### 其他 Harness profile

```bash
dsh plugin --profile <profile-name> add dsh-cutesnowgirl-background@latest
```

### 从 GitHub 安装

仓库发布后，也可以把仓库链接交给能操作本机的 AI，让它检查 `package.json` 和 `cordis.patch.yml` 后，通过 Harness 的 profile bundle 机制安装。优先使用 npm 版本，它有固定版本号、完整性校验和更可靠的更新路径。

## 插件市场收录

Harness 社区市场 `dshmarket` 使用 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 的精选目录。完整发布流程是：

1. 将本仓库公开发布到 GitHub，并添加 `dsh-plugin` topic。
2. 将同版本包发布到 npm。
3. 确认 npm 包中的 `dsh.bundle.patch` 可以正常安装和挂载。
4. 向 `awesome-dsh-plugin/awesome-dsh-plugin` 提交一个收录 PR。
5. 目录 CI 通过后，市场通常会在一天内同步。

这不是 DeepSeek 官方背书或安全认证；市场收录是社区精选目录审核。

## 开发与验证

需要 Node.js 20 或更高版本。

```bash
npm test
npm run check
npm run pack:check
```

代码结构：

```text
assets/background.mp4  默认背景视频
lib/index.js           Harness 宿主插件、页面注入和媒体路由
lib/client.js          工作区与开屏状态检测、视频生命周期
lib/style.css          背景层和半透明界面样式
cordis.patch.yml       profile bundle 挂载入口
```

## 兼容性说明

当前版本针对 DeepSeek Harness Desktop `0.2.0-rc.1` 及以上设计，并在带 `dsh-550c-boot` 的环境中验证过避让逻辑。Harness 某些界面使用构建生成的 CSS 类名，本插件同时保留稳定属性选择器和降级选择器；Harness 大版本更新后仍建议重新做一次界面检查。

## 许可与素材

插件代码采用 [MIT License](LICENSE)。`assets/background.mp4` 是独立媒体素材，不因代码使用 MIT License 而自动获得相同授权。公开发布或再分发仓库前，维护者必须确认自己拥有该视频的版权或明确再分发许可。
