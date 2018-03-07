const wbBuild = require('workbox-build');

wbBuild.injectManifest({
  swSrc: 'src/workbox/sw.js',
  swDest: 'build/service-worker.js',
  globDirectory: 'build',
  staticFileGlobs: [
    'static/css/*.css',
    'index.html',
    'static/css/*.css',
    'static/js/*',
    'static/media/**/*.*',
    'favicon.ico',
    'asset-manifest.json',
    'manifest.json'
  ],
  templatedUrls: {
    '/': ['index.html']
  }
}).catch((err) => {
  console.log('[ERROR] This happened: ' + err);
});