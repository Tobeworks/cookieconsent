// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss'
import { babel } from '@rollup/plugin-babel';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const dist = 'public/dist/';

export default {
    input: 'src/app.js',
    output: {
        name:'gdpr',
        file: `${dist}bundle.umd.js`,
        format: 'umd', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true
    },
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        terser(),
        scss({ output: `${dist}/styles/bundle.css`, sourceMap: true, outputStyle: 'compressed'})
    ]
};
