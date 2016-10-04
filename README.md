# Frontend Init

A boilerplate that is easily extendible to incorporate most modern Frontend Frameworks.

## Demo

[https://cusxio.github.io/frontend-init/](https://cusxio.github.io/frontend-init/)

## Features

- Completely unopinionated
    - Choose your own Frontend Framework/ JavaScript Templating Engine
- [Gulp](http://gulpjs.com/)
- [Webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)
    - [JavaScript Tree-Shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)
    - [Hot Module Replacement](https://medium.com/@rajaraodv/webpack-hot-module-replacement-hmr-e756a726a07#.uex3hxmt8)
- [Babel 6](https://babeljs.io/)
- [BrowserSync](https://www.browsersync.io/)
- [Sass](http://sass-lang.com/)
- [PostCSS](http://postcss.org/)
    - [Autoprefixer](https://github.com/postcss/autoprefixer)
    - [cssnano](http://cssnano.co/)
- [Imagemin](https://github.com/imagemin/imagemin)
- [Rev](https://github.com/sindresorhus/gulp-rev) assets for cache busting
- Aggressive minification of [HTML](https://github.com/kangax/html-minifier), [CSS](http://cssnano.co/), and [JS](https://github.com/mishoo/UglifyJS).

## Get Started

```bash
#  Step 1
$ git clone git@github.com:cusxio/frontend-init.git

# Step 2
$ npm install
```

## Development

```bash
$ npm run start
```

## Production

```bash
# Bundling and Optmizing Files
$ npm run production

# For Github Pages
$ npm run deploy:gh-pages
```

## Built with Frontend Init

- [Frontend Init Landing Page](https://cusxio.github.io/frontend-init/)
- [md-portfolio](https://github.com/cusxio/moderndeveloper-portfolio)

## License

MIT © Jonathan Chan
