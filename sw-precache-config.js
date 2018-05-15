/* eslint-env node */

module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'src/**/*',
    'images/item-bg.jpg'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    }
  ]
};
