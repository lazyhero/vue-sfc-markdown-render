# VUE-SFC-MARKDOWN-RENDER

## 0.为什么

已经有[@vuese/markdown-render](https://github.com/vuese/vuese/tree/monorepo/packages/markdown-render)，为什么还有再搞一个呢？

1. @vuese/markdown-render不支持表格头本地化
2. @vuese/markdown-render无法新增自定义的render
3. @vuese/markdown-render为什么 ```mixins``` 要写成 ```mixIns```

## 1.目标
将单文件vue组件使用markdown描述，当然目前只做到基础的结构描述

## 2.使用

### 一般使用

目前可以结合[@vuese/parser](https://vuese.org/parser/)来使用，后面会抹平解析出来的结构节点key，可以由使用者自行映射。

```code
npm install vue-sfc-markdown-render
or
yarn add vue-sfc-markdown-render --dev
```

```typescript
import {VueSFCMarkdownRender} from 'vue-sfc-markdown-render';

// 此处为直接copy的类型定义 | VueSFCNode[]后续支持
const render = new Render({
    // 节点名称 props, methods, events ...
    nodes?: string[] | VueSFCNode[];
    // 顶级标题层级 1-># ComponentName 2-> ## ...表格title会递加为###
    topTitleLevel?: number;
    //表格头中的描述符名称本地化 name->名称 ...
    descriptorLocals?: null | { [key: string]: string };
    // 是否节点名称大写 比如props -> Props 默认true
    firstUpper?: boolean;
});
// res: 暂时支持 @vuese/parser 输出的parserResult结构
const result: string = render.render(res.name || 'unkonw', res);
```

### 内置Render

> 可参考源码查看```renderBody```方法

RenderName | Desc
------------ | ------------- |
ComputedRender | 渲染计算属性 |
EventsRender | 渲染事件 |
MethodsRender | 渲染方法 |
MixinsRender | 渲染混入属性 |
PropsRender | 渲染组件属性 |
SlotsRender | 渲染slot |

### 定制Render

提供```BaseRender```用于定制自己的Render

```typescript
import {BaseRender} from 'vue-sfc-markdown-render';

class CustomRender extends BaseRender {
    // 实现renderBody方法
    renderBody(nodeParserResult) {
        let content;
        // ...处理nodeParserResult
        return content;
    }
}

// 使用CustomRender
const render = new Render({...);
// 注意:如果nodeName同已有node名称一致 则会覆盖默认render
// eg: 传入'PropsRender'会替换内置的PropsRender
// 一定在render前注册自定义Render
render.setCustomRender(nodeName: 'CustomRender', CustomRender);
render.render();
```


## 3.ROADMAP
- [ ] 去掉对@vuese/parser的结果依赖 https://vuese.org/parser/
- [ ] 加入ignore配置
- [ ] 尽快搞下vue-sfc-parser
