import { renderTableTitle, renderTabelHeader, renderTabelRow } from '../utils';
import { RenderPluginOption } from '../../typings/render';
import { ParserResult } from '@vuese/parser';

export default class MixinsRenderPlugin {
    options: RenderPluginOption = {
        heads: ['Mixin'],
    };
    constructor(options: RenderPluginOption) {
        this.options = {...this.options, ...options};
    }
    render(parserResult: ParserResult, topTitleLevel: number) {
        let content = '';
        if (parserResult.mixIns && this.options.heads) {
            content += renderTableTitle(topTitleLevel + 1, 'Mixin');
            content += renderTabelHeader(this.options.heads);
            parserResult.mixIns.forEach((mixIn) => {
                const row = [];
                // @ts-ignore
                for (const head of this.options.heads) {
                    if (head === 'MixIn') {
                        row.push(mixIn.mixIn);
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
