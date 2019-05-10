import { BaseRender } from './BaseRender';

export default class MixinsRender extends BaseRender {
    constructor(node: any) {
        super(node);
    }
    renderBody(parserResult: any) {
        let content = '';
        parserResult.forEach((mixIn: any) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'MixIn') {
                    row.push(mixIn.mixIn);
                } else {
                    row.push('-');
                }
            }
            content += this.renderTabelRow(row);
        });
        return content;
    }
}
