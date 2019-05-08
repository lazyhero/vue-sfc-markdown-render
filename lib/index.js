'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Render {
    constructor(parserResult, options) {
        this.options = {
            plugins: [],
            topTitleLevel: 1,
        };
        this.parserResult = parserResult;
        this.options = { ...this.options, ...options };
    }
    render() {
        const renderResult = [];
        if (this.options.plugins && Array.isArray(this.options.plugins)) {
            for (const plugin of this.options.plugins) {
                renderResult.push(plugin.render(this.parserResult, this.options.topTitleLevel));
            }
        }
        const cmptName = this.parserResult.name || 'unkonwn';
        let content = `${''.padStart(this.options.topTitleLevel, '#')} ${cmptName}\n`;
        content = renderResult.reduce((content, curResult) => {
            return `${content}${curResult}\n`;
        }, content);
        return content;
    }
}

function renderTableTitle(n, title) {
    return `${''.padStart(n, '#')} ${title}\n`;
}
function renderTabelHeader(header) {
    const headerString = renderTabelRow(header);
    const splitLine = renderSplitLine(header.length);
    return `${headerString}${splitLine}\n`;
}
function renderTabelRow(row) {
    return row.map((n) => `|${n}`).join('') + '|\n';
}
function renderSplitLine(num) {
    let line = '';
    for (let i = 0; i < num; i++) {
        line += '|---';
    }
    return line + '|';
}

class ComputedRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Computed', 'Description'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.computed) {
            content += renderTableTitle(topTitleLevel + 1, 'Computed');
            content += renderTabelHeader(this.options.heads);
            parserResult.computed.forEach((computed) => {
                const row = [];
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

class PropsRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Name', 'Description', 'Type', 'Required', 'Default'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.props) {
            content += renderTableTitle(topTitleLevel + 1, 'Props');
            content += renderTabelHeader(this.options.heads);
            parserResult.props.forEach((prop) => {
                // 沿用的原库代码
                const row = [];
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

class MethodsRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Method', 'Description', 'Parameters'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.methods) {
            content += renderTableTitle(topTitleLevel + 1, 'Methods');
            content += renderTabelHeader(this.options.heads);
            parserResult.methods.forEach((method) => {
                const row = [];
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

class EventsRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Event Name', 'Description', 'Parameters'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.events) {
            content += renderTableTitle(topTitleLevel + 1, 'Events');
            content += renderTabelHeader(this.options.heads);
            parserResult.events.forEach((event) => {
                const row = [];
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

class SlotsRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Name', 'Description', 'Default Slot Content'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.slots) {
            content += renderTableTitle(topTitleLevel + 1, 'Slots');
            content += renderTabelHeader(this.options.heads);
            parserResult.slots.forEach((slot) => {
                const row = [];
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

class MixinsRenderPlugin {
    constructor(options) {
        this.options = {
            heads: ['Mixin'],
        };
        this.options = { ...this.options, ...options };
    }
    render(parserResult, topTitleLevel) {
        let content = '';
        if (parserResult.mixIns) {
            content += renderTableTitle(topTitleLevel + 1, 'Mixin');
            content += renderTabelHeader(this.options.heads);
            parserResult.mixIns.forEach((mixIn) => {
                const row = [];
                for (const head of this.options.heads) {
                    if (head === 'MixIn') {
                        row.push(mixIn.mixIn);
                    }
                    else {
                        row.push('-');
                    }
                }
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}

exports.ComputedRenderPlugin = ComputedRenderPlugin;
exports.EventsRenderPlugin = EventsRenderPlugin;
exports.MethodsRenderPlugin = MethodsRenderPlugin;
exports.MixinsRenderPlugin = MixinsRenderPlugin;
exports.PropsRenderPlugin = PropsRenderPlugin;
exports.Render = Render;
exports.SlotsRenderPlugin = SlotsRenderPlugin;
