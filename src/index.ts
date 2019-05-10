/**
 * markdown-render
 */
import upperFirst from 'lodash/upperFirst';
import {
    BaseRender,
    ComputedRender,
    EventsRender,
    MethodsRender,
    MixinsRender,
    PropsRender,
    SlotsRender,
    RenderConstructor,
} from './render/index';

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
    nodes?: string[] | VueSFCNode[];
    topTitleLevel?: number;
    descriptorLocals?: null | { [key: string]: string };
    firstUpper?: boolean;
}

const defaultNodeDescriptors: { [key: string]: string[] } = {
    props: ['Name', 'Description', 'Type', 'Required', 'Default'],
    events: ['Event Name', 'Description', 'Parameters'],
    slots: ['Name', 'Description', 'Default Slot Content'],
    computed: ['Computed', 'Description'],
    mixIns: ['Mixin'],
    methods: ['Method', 'Description', 'Parameters'],
};

class VueSFCMarkdownRender {
    options: VueSFCMarkdownRenderOption = {
        nodes: ['props', 'events', 'slots', 'computed', 'mixIns', 'methods'],
        topTitleLevel: 1,
        descriptorLocals: null,
        firstUpper: true,
    };
    renderMap: { [key: string]: any } = {
        ComputedRender,
        EventsRender,
        MethodsRender,
        MixinsRender,
        PropsRender,
        SlotsRender,
    };
    constructor(options?: VueSFCMarkdownRenderOption) {
        this.options = { ...this.options, ...options };
    }
    private getRenderInstance(node: any) {
        // tslint:disable-next-line: variable-name
        let Constructor: any = BaseRender;
        Constructor = this.renderMap[`${upperFirst(node.name.toLocaleLowerCase())}Render`];
        const renderInstance = new Constructor(node);
        return renderInstance;
    }
    render(cmptName: string, parserResult: any) {
        const titleLevel = this.options.topTitleLevel || 1;
        let result = `${''.padStart(titleLevel, '#')} ${cmptName}\n`;
        // @ts-ignore
        result += this.options.nodes.reduce((content, node) => {
            if (parserResult[node]) {
                const r = this.getRenderInstance({
                    name: node,
                    titleLevel,
                    descriptors: defaultNodeDescriptors[node],
                    descriptorLocals: this.options.descriptorLocals,
                    firstUpper: this.options.firstUpper,
                });
                content += r.renderTitle();
                content += r.renderDescriptors();
                content += r.renderBody(parserResult[node]);
            }
            return content;
        }, '');
        return result;
    }
    // tslint:disable-next-line: variable-name
    setCustomRender(nodeName: string, Constructor: RenderConstructor) {
        this.renderMap[nodeName] = Constructor;
    }
}

export {
    BaseRender,
    VueSFCMarkdownRender,
};
