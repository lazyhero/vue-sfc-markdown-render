'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var upperFirst = _interopDefault(require('lodash/upperFirst'));

class BaseRender {
    constructor(node) {
        this.node = {};
        this.result = {
            title: '',
            header: '',
            body: '',
        };
        this.node = node;
    }
    renderTitle(titleLevel) {
        return `${''.padStart(titleLevel, '#')} ${this.node.name}\n`;
    }
    renderDescriptors(descriptorLocals) {
        const descriptors = this.localDescriptors(descriptorLocals);
        return `${this.renderTabelRow(descriptors)}${this.renderSplitLine(descriptors.length)}\n`;
    }
    renderTabelRow(row) {
        return row.map((n) => `|${n}`).join('') + '|\n';
    }
    renderSplitLine(num) {
        let line = '';
        for (let i = 0; i < num; i++) {
            line += '|---';
        }
        return line + '|';
    }
    localDescriptors(descriptorLocals) {
        return descriptorLocals
            ? this.node.descriptors.map((descriptor) => descriptorLocals[descriptor])
            : this.node.descriptors;
    }
}

class ComputedRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((computed) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Computed') {
                    row.push(computed.name);
                }
                else if (head === 'Description') {
                    if (computed.describe) {
                        row.push(computed.describe.join(''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

class EventsRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((event) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Event Name') {
                    row.push(event.name);
                }
                else if (head === 'Description') {
                    if (event.describe && event.describe.length) {
                        row.push(event.describe.join(''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else if (head === 'Parameters') {
                    if (event.argumentsDesc) {
                        row.push(event.argumentsDesc.join(''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

class MethodsRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((method) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Method') {
                    row.push(method.name);
                }
                else if (head === 'Description') {
                    if (method.describe) {
                        row.push(method.describe.join(''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else if (head === 'Parameters') {
                    if (method.argumentsDesc) {
                        row.push(method.argumentsDesc.join(''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

class MixinsRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((mixIn) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'MixIn') {
                    row.push(mixIn.mixIn);
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

class PropsRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((prop) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Name') {
                    row.push(prop.name);
                }
                else if (head === 'Description') {
                    let desc = ['-'];
                    if (prop.describe && prop.describe.length) {
                        desc = prop.describe;
                        if (prop.validatorDesc) {
                            desc = prop.describe.concat(prop.validatorDesc);
                        }
                    }
                    row.push(desc.join(''));
                }
                else if (head === 'Type') {
                    if (prop.typeDesc) {
                        row.push(prop.typeDesc.join(''));
                    }
                    else if (!prop.type) {
                        row.push('—');
                    }
                    else if (typeof prop.type === 'string') {
                        row.push(`\`${prop.type}\``);
                    }
                    else if (Array.isArray(prop.type)) {
                        row.push(prop.type
                            .map((t) => `\`${t}\` / `)
                            .join('')
                            .slice(0, -3));
                    }
                    else {
                        row.push('-');
                    }
                }
                else if (head === 'Required') {
                    if (typeof prop.required === 'undefined') {
                        row.push('`false`');
                    }
                    else if (typeof prop.required === 'boolean') {
                        row.push(`\`${String(prop.required)}\``);
                    }
                    else {
                        row.push('-');
                    }
                }
                else if (head === 'Default') {
                    if (prop.defaultDesc) {
                        row.push(prop.defaultDesc.join(''));
                    }
                    else if (prop.default) {
                        row.push(prop.default.replace(/\n/g, ''));
                    }
                    else {
                        row.push('-');
                    }
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

class SlotsRender extends BaseRender {
    constructor(node) {
        super(node);
    }
    renderBody(parserResult) {
        let content = '';
        parserResult.forEach((slot) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Name') {
                    row.push(slot.name);
                }
                else if (head === 'Description') {
                    if (slot.describe) {
                        row.push(slot.describe);
                    }
                    else {
                        row.push('-');
                    }
                }
                else if (head === 'Default Slot Content') {
                    if (slot.backerDesc) {
                        row.push(slot.backerDesc);
                    }
                    else {
                        row.push('-');
                    }
                }
                else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}

/**
 * markdown-render
 */
const defaultNodeDescriptors = {
    props: ['Name', 'Description', 'Type', 'Required', 'Default'],
    events: ['Event Name', 'Description', 'Parameters'],
    slots: ['Name', 'Description', 'Default Slot Content'],
    computed: ['Computed', 'Description'],
    mixIns: ['Mixin'],
    methods: ['Method', 'Description', 'Parameters'],
};
class VueSFCMarkdownRender {
    constructor(options) {
        this.options = {
            nodes: ['props', 'events', 'slots', 'computed', 'mixIns', 'methods'],
            topTitleLevel: 1,
            descriptorLocals: null,
        };
        this.renderMap = {
            ComputedRender,
            EventsRender,
            MethodsRender,
            MixinsRender,
            PropsRender,
            SlotsRender,
        };
        this.options = { ...this.options, ...options };
    }
    getRenderInstance(node) {
        // tslint:disable-next-line: variable-name
        let Constructor = BaseRender;
        Constructor = this.renderMap[`${upperFirst(node.name.toLocaleLowerCase())}Render`];
        const renderInstance = new Constructor(node);
        return renderInstance;
    }
    render(cmptName, parserResult) {
        const titleLevel = this.options.topTitleLevel || 1;
        let result = `${''.padStart(titleLevel, '#')} ${cmptName}\n`;
        // @ts-ignore
        result += this.options.nodes.reduce((content, node) => {
            if (parserResult[node]) {
                const r = this.getRenderInstance({
                    name: node,
                    descriptors: defaultNodeDescriptors[node],
                });
                content += r.renderTitle(titleLevel + 1);
                content += r.renderDescriptors(this.options.descriptorLocals);
                content += r.renderBody(parserResult[node]);
            }
            return content;
        }, '');
        return result;
    }
    // tslint:disable-next-line: variable-name
    setCustomRender(nodeName, Constructor) {
        this.renderMap[nodeName] = Constructor;
    }
}

exports.BaseRender = BaseRender;
exports.VueSFCMarkdownRender = VueSFCMarkdownRender;
