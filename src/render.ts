/**
 * markdown-render
 */
import { ParserResult } from '@vuese/parser';

interface Descriptor {
    name: string;
    label: string;
    render: () => string;
}

// eg: props, events, methods, computeds, mixins, slots
interface VueSFCNode {
    name: string;
    descriptors: string[] | Descriptor[];
}
interface VueSFCMarkdownRenderOption {
    nodes: string[] | VueSFCNode[];
    topTitleLevel?: number;
    ignoreEmpty?: boolean;
}

const NodeRenderHandleMap = {
    props() {

    },
}

export default class VueSFCMarkdownRender {
    options: VueSFCMarkdownRenderOption = {
        nodes: ['props', 'events', 'slots', 'computed', 'mixIns', 'methods'],
        topTitleLevel: 1,
        ignoreEmpty: false,
    };
    constructor(options: VueSFCMarkdownRenderOption) {
        this.options = { ...this.options, ...options };
    }
    render(cmptName: string, parserResult: ParserResult) {
        let content = `${''.padStart(this.options.topTitleLevel || 1, '#')} ${cmptName}\n`;
        // @ts-ignore
        this.options.nodes.reduce((content, node) => {
            if (typeof node === 'object') {
                if (typeof node.render === 'function') {
                    node.render.call(this, {
                        name: node.name,
                    });
                }
            }
            return content;
        }, ''); 
    }
}

// export default class Render {
//     options: RenderOption = {
//         plugins: [],
//         topTitleLevel: 1,
//     };
//     parserResult: ParserResult;
//     constructor(parserResult: ParserResult, options: RenderOption) {
//         this.parserResult = parserResult;
//         this.options = {...this.options, ...options};
//     }
//     render() {
//         const renderResult = [];
//         if (this.options.plugins && Array.isArray(this.options.plugins)) {
//             for (const plugin of this.options.plugins) {
//                 renderResult.push(
//                     (plugin as RenderPlugin).render(
//                         this.parserResult,
//                         this.options.topTitleLevel || 1,
//                     ),
//                 );
//             }
//         }
//         const cmptName = this.parserResult.name || 'unkonwn';
//         let content = `${''.padStart(this.options.topTitleLevel || 1, '#')} ${cmptName}\n`;
//         content = renderResult.reduce((content, curResult) => {
//             return `${content}${curResult}\n`;
//         }, content);
//         return content;
//     }
// }
