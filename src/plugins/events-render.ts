import { renderTableTitle, renderTabelHeader, renderTabelRow } from '../utils';
import { RenderPluginOption } from '../../typings/render';
import { ParserResult } from '@vuese/parser';

export default class EventsRenderPlugin {
    options: RenderPluginOption = {
        heads: ['Event Name', 'Description', 'Parameters'],
    };
    constructor(options: RenderPluginOption) {
        this.options = {...this.options, ...options};
    }
    render(parserResult: ParserResult, topTitleLevel: number) {
        let content = '';
        if (parserResult.events && this.options.heads) {
            content += renderTableTitle(topTitleLevel + 1, 'Events');
            content += renderTabelHeader(this.options.heads);
            parserResult.events.forEach((event) => {
                const row = [];
                // @ts-ignore
                for (const head of this.options.heads) {
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
                content += renderTabelRow(row);
            });
        }
        return content;
    }
}
