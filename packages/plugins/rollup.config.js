import babel from '@rollup/plugin-babel'
// import eslint from '@rollup/plugin-eslint'
// import image from '@rollup/plugin-image'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
// import typescriptRollup from '@rollup/plugin-typescript'
// import url from '@rollup/plugin-url'
import commonjs from '@rollup/plugin-commonjs'
import styles from 'rollup-plugin-styles'

// import { createBasicConfig } from '@open-wc/building-rollup'
// import merge from 'deepmerge'

import pkg from './package.json'

// const baseConfig = createBasicConfig({
//   developmentMode: process.env.ROLLUP_WATCH === 'true',
// })

export default {
  input: 'src/export.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['react'],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.jsx'],
      moduleDirectories: ['node_modules', './../../node_modules']
    }),
    commonjs({}),
    babel({ include: ['node_modules/**', './../../node_modules/**'] }),
    styles({
      modules: true
    }),
    typescript({
      output: 'dist/',
      tsconfig: 'tsconfig.json',
      tsconfigOverride: { compilerOptions: { module: 'es2015' } }
    })
  ]
}
