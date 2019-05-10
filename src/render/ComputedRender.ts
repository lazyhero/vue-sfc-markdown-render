import { BaseRender } from './BaseRender';

export default class ComputedRender extends BaseRender {
    constructor(node: any) {
        super(node);
    }
    renderBody(parserResult: any) {
        let content = '';
        parserResult.forEach((computed: any) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Computed') {
                    row.push(computed.name);
                } else if (head === 'Description') {
                    if (computed.describe) {
                        row.push(computed.describe.join(''));
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
