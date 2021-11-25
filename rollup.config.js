import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/code/main.ts',
  output: {
    file: './public/build/code.js',
    format: 'es',
  },
  plugins: [resolve(), typescript(), production && terser()],
  watch: {
    clearScreen: true,
  },
};
