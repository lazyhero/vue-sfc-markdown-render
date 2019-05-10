import { BaseRender } from './BaseRender';

export default class EventsRender extends BaseRender {
    constructor(node: any) {
        super(node);
    }
    renderBody(parserResult: any) {
        let content = '';
        parserResult.forEach((event: any) => {
            const row = [];
            // @ts-ignore
            for (const head of this.node.descriptors) {
                if (head === 'Event Name') {
                    row.push(event.name);
                } else if (head === 'Description') {
                    if (event.describe && event.describe.length) {
                        row.push(event.describe.join(''));
                    } else {
                        row.push('-');
                    }
                } else if (head === 'Parameters') {
                    if (event.argumentsDesc) {
                        row.push(event.argumentsDesc.join(''));
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
