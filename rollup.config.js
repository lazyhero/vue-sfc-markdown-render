import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'lib',
        format: 'cjs',
        entryFileNames: '[name].js',
        exports: 'named'
    },
    external(id) {
        return pkg.dependencies && !!pkg.dependencies[id]
    },
    plugins: [
        typescript({
            cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache')
        })
    ],
}