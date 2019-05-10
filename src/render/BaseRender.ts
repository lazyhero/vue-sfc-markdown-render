import { ParserResult } from '@vuese/parser';

export type RenderConstructor = new (...args: any[]) => BaseRender;

export abstract class BaseRender {
    node: any = {};
    result: any = {
        title: '',
        header: '',
        body: '',
    };
    constructor(node: any) {
        this.node = node;
    }
    renderTitle(titleLevel: number) {
        return `${''.padStart(titleLevel, '#')} ${this.node.name}\n`;
    }
    renderDescriptors(descriptorLocals: any) {
        const descriptors = this.localDescriptors(descriptorLocals);
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
    abstract renderBody(parserResult: ParserResult): string;
    private localDescriptors(descriptorLocals: any) {
        return descriptorLocals
        ? this.node.descriptors.map((descriptor: string) => descriptorLocals[descriptor])
        : this.node.descriptors;
    }
}
