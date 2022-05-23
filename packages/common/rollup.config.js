import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import styles from 'rollup-plugin-styles'

import pkg from './package.json'

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      inlineSourceMap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      inlineSourceMap: true
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
