import Render from '../src/render';
import { ParserResult } from '@vuese/parser';

test('Proper rendering of the table header', () => {
    const res: ParserResult = {
        name: 'MyComponent',
        componentDesc: {
            default: ['This is a description of the component'],
            group: ['My Group'],
        },
        props: [
            {
                name: 'someProp',
                type: ['String'],
                typeDesc: ['`TOP` / `BOTTOM`'],
                required: true,
                defaultDesc: ['`TOP`'],
                describe: ['Represents the direction of the arrow'],
            },
        ],
        events: [
            {
                name: 'click',
                isSync: false,
                syncProp: '',
                describe: ['Triggered when clicked'],
                argumentsDesc: ['a boolean value'],
            },
        ],
        slots: [
            {
                name: 'header',
                describe: 'Table header',
                backerDesc: '`<th>{{title}}</th>`',
                bindings: {},
                scoped: false,
            },
        ],
        methods: [
            {
                name: 'clear',
                describe: ['Clear form'],
                argumentsDesc: ['a boolean value'],
            },
        ],
    };
    const render = new Render();
    const result: string = render.render(res.name || 'unkonw', res);
    // tslint:disable-next-line: no-console
    console.log(result);
    // expect(renderRes).toMatchSnapshot();
});
