# VUE-SFC-MARKDOWN-RENDER

## 1.目标
将单文件vue组件使用markdown描述，当然目前只做到基础的结构描述

## 2.使用方法

```code
npm install vue-sfc-markdown-render
or
yarn add vue-sfc-markdown-render --dev
```

```typescript
import {VueSFCMarkdownRender} from '../src';

const render = new Render();
// res: 暂时支持 @vuese/parser 输出的parserResult结构
const result: string = render.render(res.name || 'unkonw', res);
```

## 3.ROADMAP
- [ ] 去掉对@vuese/parser的结果依赖 https://vuese.org/parser/
- [ ] 加入ignore配置
- [ ] 尽快搞下vue-sfc-parser
