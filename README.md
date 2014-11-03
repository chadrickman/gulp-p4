gulp-p4
=======

perforce plugin for gulp

## Install

```sh
npm install gulp-p4 --save-dev
```

## Example

```js
var p4 = require('node-perforce');
var gulp = require('gulp');
var gulpP4 = require('gulp-p4');

gulp.task('default', function(callback) {
  p4.changelist.create({description: 'hello world'}, function(err, cl) {
    if (err) return callback(err);
    gulp.src('*.js')
      .pipe(gulpP4('add', {changelist:cl}))
      .pipe(gulp.dest('./dist'));
    callback();
  });
});
```
