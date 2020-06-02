require("dotenv").config()
const path = require("path")
// const withCSS = require('@zeit/next-css')

module.exports = {
  env: {
    appName: 'Dotcodex',
    isProd: true,
    cookieDomain: '.now.sh'
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    config.resolve.alias['~'] = path.resolve('./')
    config.resolve.alias['@components'] = path.join(__dirname, 'components')
    config.resolve.alias['@constants'] = path.join(__dirname, 'constants')
    config.resolve.alias['@layouts'] = path.join(__dirname, 'layouts')
    config.resolve.alias['@helpers'] = path.join(__dirname, 'helpers')
    return config
  }
}

