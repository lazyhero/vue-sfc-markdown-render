import { BaseRender } from './BaseRender';

export default class SlotsRender extends BaseRender {
    constructor(node: any) {
        super(node);
    }
    renderBody(parserResult: any) {
        let content = '';
        parserResult.forEach((slot: any) => {
            const row = [];
            // @ts-ignore
            for (const head of this.options.descriptors) {
                if (head === 'Name') {
                    row.push(slot.name);
                } else if (head === 'Description') {
                    if (slot.describe) {
                        row.push(slot.describe);
                    } else {
                        row.push('-');
                    }
                } else if (head === 'Default Slot Content') {
                    if (slot.backerDesc) {
                        row.push(slot.backerDesc);
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
