const path = require('path')

const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const getStyleLoaders = require('./scripts/getStyleLoaders')
const getLocalIdent = require('./scripts/getLocalIdent')

const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'components.css'
  })
]

if (process.env.SHOW_BUNDLE === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  entry: './src/export.ts',
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        oneOf: [
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: false
              },
              'sass-loader',
              true
            )
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: false,
                modules: {
                  getLocalIdent
                }
              },
              'sass-loader',
              true
            )
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              'file-loader',
              {
                loader: 'image-webpack-loader'
              }
            ]
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx|scss)$/, /\.html$/, /\.json$/],
            options: {
              name: '[name].[ext]',
              publicPath: './'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'components.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'components',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()]
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: ['react', 'react-dom', 'classnames']
}
