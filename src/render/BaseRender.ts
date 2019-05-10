import upperFirst from 'lodash/upperFirst';

export type RenderConstructor = new (...args: any[]) => BaseRender;

export abstract class BaseRender {
    options: any = {
        name: '',
        titleLevel: 1,
        descriptors: [],
        descriptorLocals: null,
        firstUpper: true,
    };
    constructor(options: any) {
        this.options = options;
    }
    renderTitle() {
        const name = this.options.firstUpper
            ? upperFirst(this.options.name)
            : this.options.name;
        return `${''.padStart(this.options.titleLevel, '#')} ${name}\n`;
    }
    renderDescriptors() {
        const descriptors = this.localDescriptors();
        return `${this.renderTabelRow(descriptors)}${this.renderSplitLine(descriptors.length)}\n`;
    }
    renderTabelRow(row: string[]) {
        return row.map((n) => `|${n}`).join('') + '|\n';
    }
    renderSplitLine(num: number) {
        let line = '';
        for (let i = 0; i < num; i++) {
            line += '|---';
        }
        return line + '|';
    }
    abstract renderBody(parserResult: any): string;
    private localDescriptors() {
        return this.options.descriptorLocals
        ? this.options.descriptors.map((descriptor: string) => this.options.descriptorLocals[descriptor])
        : this.options.descriptors;
    }
}
