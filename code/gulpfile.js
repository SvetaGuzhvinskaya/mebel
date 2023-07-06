const {src, dest, series, watch} = require('gulp')
const argv = require('yargs').argv;
const concat = require('gulp-concat')
const rigger = require('gulp-rigger')
const htmlMin = require('gulp-htmlmin')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite');
const img = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const gulpIf = require('gulp-if')
const browserSync = require('browser-sync').create()
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const postcss = require('gulp-postcss')
const plumber = require('gulp-plumber')

let errorHandler;

if (argv.throwErrors) {
	errorHandler = false;
} else {
	errorHandler = argv.notify ? notify.onError('<%= error.message %>') : null;
}

const isDev = function(){
  return !argv.prod;
}

const isProd = function(){
  return !!argv.prod;
}

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const styles = () => {
  return src('src/scss/**/*.scss')
  .pipe(gulpIf(isDev, sourcemaps.init()))
  .pipe(sass())
  .pipe(plumber({
    errorHandler,
  }))
  .pipe(gulpIf(isProd, autoprefixer({
      grid: true
  })))
  .pipe(gulpIf(isProd, gcmq()))
  .pipe(gulpIf(isDev, sourcemaps.write()))
  .pipe(gulpIf(isProd, dest('dist/css')))
  .pipe(gulpIf(isProd, csso()))
  .pipe(rename({ suffix: '.min' }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
};

// const htmlMinify = () => {
//   return src('src/**/*.html')
//     .pipe(gulpIf(isProd, htmlMin({
//       collapseWhitespace: true,
//     })))
//     .pipe(dest('dist'))
//     .pipe(browserSync.stream())
// }

const htmlMinify = () => {
  return src('src/**/*.pug')
    .pipe(
      pug(gulpIf(isProd, htmlMin({
        collapseWhitespace: true,
      })))
    )
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
};

const svgSprites = () => {
	return src('src/images/svg/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
    .pipe(replace('&gt;', '>'))
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
				}
			}
		}))
		.pipe(dest('dist/images'));
}
// const svgSprites = () => {
//   return src('src/images/svg/**/*.svg')
//   .pipe(svgSprite({
//     mode: {
//       stack: {
//         sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('dist/images'))
// }

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
    'src/images/*.ico',
    'src/images/*.svg'
  ])
  .pipe(img({
    mozjpeg: false,
  }))
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
  .pipe(gulpIf(isDev, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(gulpIf(isProd, uglify(
    {
      toplevel: true
    }
  ).on('error', notify.onError)))
  .pipe(gulpIf(isDev, sourcemaps.write()))
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream())
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
  });

  watch('src/**/*.pug', htmlMinify)
  watch('src/scss/**/*.scss', styles);
  watch([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/**/*.jpeg',
    'src/images/*.ico',
    'src/images/*.svg'
  ], images)
  watch('src/images/svg/**/*.svg', svgSprites)
  watch('src/js/**/*.js', scripts)
  watch('src/resources/**', resources)
  watch('src/fonts/**', fonts)
}

exports.styles = styles
exports.htmlMinify = htmlMinify
exports.scripts = scripts
exports.svgSprites = svgSprites
exports.images = images
exports.default = series(clean, htmlMinify, styles, svgSprites, images, scripts, resources, fonts, watchFiles)

