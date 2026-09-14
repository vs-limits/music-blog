# 🎵 Musicplate - 音乐博客与唱片画廊公开站点 (music-blog)

> 专辑杂志风格的音乐专栏与乐评分享平台公开端。以唱片封面为视觉锚点，点击封面翻开深度音乐故事。

---

## 🌟 核心视觉与特性

- 💿 **全通栏沉浸式黑胶唱机 (Turntable Hero)**：
  - 拟物黑胶唱盘与同心圆纹理光泽，支持旋转/暂停联动；
  - 真实联动金属唱臂与唱针 (Tonearm & Stylus)，伴随动态音频 EQ 律动柱；
  - 纯前端 Web Audio API 模拟温暖黑胶豆坑底噪 (Vinyl Crackle)。
  - 从深邃黑胶暗夜舞台自然柔和过渡到下方的浅白唱片陈列架。
- 🎨 **3D Vinyl Hover 唱片动效**：
  - 鼠标悬停卡片，黑胶唱片向右上方丝滑探出 40%，呈现弥散阴影与立体感。
- 🌈 **自适应氛围光晕 (Ambient Glow)**：
  - 乐评详情页自动提取封面主色调，渲染沉浸式光晕背景。
- 🔍 **多维快速筛选 (Filter Bar)**：
  - 支持歌手 (Artist)、流派 (Genre)、年代 (Release Year) 快速组合筛选。
- ⚡ **现代前端技术栈**：
  - Vue 3 + TypeScript + Vite + Tailwind CSS + Pinia。

---

## 🚀 本地开发与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

默认运行在：`http://localhost:5173`

### 3. 构建生产包

```bash
npm run build
```

构建产物将输出在 `dist/` 目录中。

---

## 📁 目录结构

```text
src/
├── api/          # 接口请求封装 (Axios)
├── assets/       # 全局样式与 3D 黑胶动效定义
├── components/   # 核心组件 (TurntableHero, AlbumCard, FilterBar, Navbar...)
├── router/       # 前端路由 (HomeView, PostDetailView)
├── types/        # TypeScript 类型定义
├── utils/        # 自适应色彩提取与工具函数
└── views/        # 页面视图 (首页唱片架、乐评详情页)
```

---

## 📄 License

MIT
