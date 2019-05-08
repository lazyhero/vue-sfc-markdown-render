import { renderTableTitle, renderTabelHeader, renderTabelRow } from '../utils';
import { RenderPluginOption } from '../../typings/render';
import { ParserResult } from '@vuese/parser';

export default class SlotsRenderPlugin {
    options: RenderPluginOption = {
        heads: ['Name', 'Description', 'Default Slot Content'],
    };
    constructor(options: RenderPluginOption) {
        this.options = {...this.options, ...options};
    }
    render(parserResult: ParserResult, topTitleLevel: number) {
        let content = '';
        if (parserResult.slots && this.options.heads) {
            content += renderTableTitle(topTitleLevel + 1, 'Slots');
            content += renderTabelHeader(this.options.heads);
            parserResult.slots.forEach((slot) => {
                const row = [];
                // @ts-ignore
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}
