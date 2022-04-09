import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const external = Object.keys(pkg.peerDependencies || {})

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'es',
      globals: {
        react: 'React',
      }
    },
    external,
    plugins: [
      resolve(),
      commonjs(),
      esbuild({
        // All options are optional
        include: /\.[jt]sx?$/, // default, inferred from `loaders` option
        minify: process.env.NODE_ENV === 'production',
        jsx: 'transform', // default, or 'preserve'
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: '"x.y.z"',
        },
        // Add extra loaders
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          '.json': 'json',
          // Enable JSX in .js files too
          '.js': 'jsx',
        },
      }),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/the-hooks.d.ts',
      format: 'es'
    },
    plugins: [
      dts()
    ]
  }
];
