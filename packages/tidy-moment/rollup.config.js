import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import dtsPlugin from 'rollup-plugin-dts';
import path from 'path';

const root = process.platform === 'win32' ? path.resolve('/') : '/';
const external = (id) => !id.startsWith('.') && !id.startsWith(root);

const cjs = {
  input: 'src/index.ts',
  output: {
    dir: 'dist/lib',
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external,
  plugins: [
    resolve(),
    commonjs(),
    esbuild({
      target: 'es2018',
      tsconfig: 'tsconfig.build.json',
    }),
  ],
};

const esm = {
  input: 'src/index.ts',
  output: {
    dir: 'dist/es',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  external,
  plugins: [
    resolve(),
    commonjs(),
    esbuild({
      target: 'es2018',
      tsconfig: 'tsconfig.build.json',
    }),
  ],
};

const globals = { '@tidyjs/tidy': 'Tidy', moment: 'moment' };
const umd = {
  input: 'src/index.ts',
  output: {
    file: 'dist/umd/tidy-moment.js',
    name: 'TidyMoment',
    format: 'umd',
    sourcemap: true,
    globals,
  },
  external,
  plugins: [
    resolve(),
    commonjs({ include: /node_modules/ }),
    esbuild({
      target: 'es2018',
      tsconfig: 'tsconfig.build.json',
    }),
  ],
};

const umdMin = {
  input: 'src/index.ts',
  output: {
    file: 'dist/umd/tidy-moment.min.js',
    name: 'TidyMoment',
    format: 'umd',
    sourcemap: true,
    globals,
  },
  external,
  plugins: [
    resolve(),
    commonjs({ include: /node_modules/ }),
    esbuild({
      target: 'es2018',
      tsconfig: 'tsconfig.build.json',
      minify: true,
    }),
  ],
};

const dts = {
  input: 'src/index.ts',
  output: {
    file: 'dist/tidy-moment.d.ts',
    format: 'es',
  },
  external,
  plugins: [dtsPlugin({ respectExternal: true })],
};

const config = [cjs, esm, umd, umdMin, dts];
export default config;
