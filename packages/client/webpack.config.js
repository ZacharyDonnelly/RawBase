/* eslint-disable no-undef */
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CheckerPlugin } = require('awesome-typescript-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const presetConfig = require('./build/loadPresets')
// TODO Re-add mode change
// const modeConfig = (env) => require(`./build/webpack.${env}`)(env)

module.exports = ({ mode, presets } = { mode: 'development', presets: [] }) =>
  merge(
    {
      entry: './src/index.tsx',
      devServer: {
        historyApiFallback: true,
        port: 3000
      },
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|ico|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: '[path][name].[ext]',
                  limit: 8192,
                  fallback: require.resolve('file-loader'),
                  quality: 85
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2)$/,
            use: ['file-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader?modules']
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader'
            ]
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      },
      resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.json', '.jsx']
      },
      output: {
        publicPath: '/',
        clean: true,
        filename: '[name].hash.js',
        chunkFilename: '[name].lazy-chunk.js'
      },
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          title: 'RawBase Loader',
          template: './public/index.html',
          filename: 'index.html'
        }),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new CheckerPlugin(),
        new webpack.WatchIgnorePlugin({ paths: [/css?.d.ts$/] })
      ],
      cacheDirectory: true,
      cacheCompression: true,
      compact: true
    },
    // modeConfig(mode),
    presetConfig({ mode, presets })
  )
