var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gulpClean = require('gulp-clean');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')


/*
  Styles Task
*/

gulp.task('styles',function() {
  // move over fonts
    gulp.src('css/fonts/**.*')
    .pipe(gulp.dest('build/css/fonts'))
    //move over vendor specific files to css/vendor
    gulp.src('./scss/vendor/**/*').pipe(gulp.dest('./build/css/vendor/')) 
    
});
  

/*
  Images
*/
gulp.task('images',function(){
  gulp.src('css/images/**')
    .pipe(gulp.dest('./build/css/images'))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {},
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./js/' + file],
    debug : true,
    cache: {},
    packageCache: {}
  };
   
  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
      
    //copy JS in the vendor folder over to the build folder so it gets included
    gulp.src(['./js/**/*']).pipe(gulp.dest('./build/js/'));   

    /*
    gulp.src('index.html')
    .pipe(usemin({
      vendorjs: []
    })
    .pipe(gulp.dest('build/')));*/

    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/js/'))
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('cleanScripts', function() {
  return gulp.src('./build/js/', {read: false})
    .pipe(gulpClean());
});

gulp.task('scripts', function() { 

  return buildScript('main.js', false); // this will run once because we set watch to false
});

gulp.task('sass', function() {
    
//move over vendor specific files to css/vendor
gulp.src('./scss/vendor/**/*').pipe(gulp.dest('./build/css/vendor/'))  
    
 return gulp.src('./scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', handleErrors))
   .pipe(gulp.dest('./build/css/'));   
})

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images','styles','scripts','browser-sync'], function() {
    gulp.watch('css/**/*', ['styles']); // gulp watch for stylus changes
    gulp.watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload); //gulp watch for Sass changes
    gulp.watch('js/**/*', ['scripts']);        
    gulp.watch('index.html').on('change', browserSync.reload);
    buildScript('main.js', true); // browserify watch for JS changes
});
