const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// common function to get style loaders
// ** NOTE ** Taken from Create React App
module.exports = (cssOptions, preProcessor, isProd) => {
  const loaders = [
    !isProd && require.resolve('style-loader'),
    isProd && {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign({}, { publicPath: '../../' })
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3
          })
        ],
        sourceMap: isProd
      }
    }
  ].filter(Boolean)

  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: isProd
      }
    })
  }

  return loaders
}
