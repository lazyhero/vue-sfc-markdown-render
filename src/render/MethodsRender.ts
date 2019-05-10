import { BaseRender } from './BaseRender';

export default class MethodsRender extends BaseRender {
    constructor(node: any) {
        super(node);
    }
    renderBody(parserResult: any) {
        let content = '';
        parserResult.forEach((method: any) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Method') {
                    row.push(method.name);
                } else if (head === 'Description') {
                    if (method.describe) {
                        row.push(method.describe.join(''));
                    } else {
                        row.push('-');
                    }
                } else if (head === 'Parameters') {
                    if (method.argumentsDesc) {
                        row.push(method.argumentsDesc.join(''));
                    } else {
                        row.push('-');
                    }
                } else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}
