import { renderTableTitle, renderTabelHeader, renderTabelRow } from '../utils';
import { RenderPluginOption } from '../../typings/render';
import { ParserResult } from '@vuese/parser';

export default class ComputedRenderPlugin {
    options: RenderPluginOption = {
        heads: ['Computed', 'Description'],
    };
    constructor(options: RenderPluginOption) {
        this.options = {...this.options, ...options};
    }
    render(parserResult: ParserResult, topTitleLevel: number) {
        let content = '';
        if (parserResult.computed && this.options.heads) {
            content += renderTableTitle(topTitleLevel + 1, 'Computed');
            content += renderTabelHeader(this.options.heads);
            parserResult.computed.forEach((computed) => {
                const row = [];
                // @ts-ignore
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}
