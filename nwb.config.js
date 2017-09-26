module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    define: {
      __NAME__: JSON.stringify(require('./package.json').name),
      __VERSION__: JSON.stringify(require('./package.json').version),
    },
  },
}
