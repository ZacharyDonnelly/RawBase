const loaderUtils = require('loader-utils')

module.exports = (context, localIdentName, localName, options) => {
  // Create a hash based on a the file location and class name. Will be unique across a project, and close to globally unique.
  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    'md5',
    'base64',
    7
  )
  // Use loaderUtils to find the file or folder name
  const className = loaderUtils.interpolateName(
    context,
    localName + '_' + hash.replace(/[^a-zA-Z0-9]/g, ''),
    options
  )

  // remove the .module that appears in every classname when based on the file.
  return className.replace('.module_', '_')
}
