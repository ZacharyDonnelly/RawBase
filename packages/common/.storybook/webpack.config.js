const getStyleLoaders = require('../scripts/getStyleLoaders')
const getLocalIdent = require('../scripts/getLocalIdent')

const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader')
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  })

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: require.resolve('@storybook/addon-storysource/loader'),
    options: { parser: 'typescript' },
    enforce: 'pre'
  })

  config.module.rules.push({
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: true
      },
      'sass-loader',
      false
    )
  })

  config.module.rules.push({
    test: sassModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: true,
        modules: {
          getLocalIdent
        }
      },
      'sass-loader',
      false
    )
  })

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
