import { renderTableTitle, renderTabelHeader, renderTabelRow } from '../utils';
import { RenderPluginOption } from '../../typings/render';
import { ParserResult } from '@vuese/parser';

export default class MethodsRenderPlugin {
    options: RenderPluginOption = {
        heads: ['Method', 'Description', 'Parameters'],
    };
    constructor(options: RenderPluginOption) {
        this.options = {...this.options, ...options};
    }
    render(parserResult: ParserResult, topTitleLevel: number) {
        let content = '';
        if (parserResult.methods && this.options.heads) {
            content += renderTableTitle(topTitleLevel + 1, 'Methods');
            content += renderTabelHeader(this.options.heads);
            parserResult.methods.forEach((method) => {
                const row = [];
                // @ts-ignore
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}
