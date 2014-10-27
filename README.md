gulp-p4
=======

perforce plugin for gulp

## Install

```sh
npm install gulp-p4 --save-dev
```

## Example

```js
var p4 = require('gulp-p4');

gulp.task('task', function () {
  return gulp.src(['files for add'])
    .pipe(p4('add', {force: false, filetype: 'binary', changelist: 1000))
    .pipe(gulp.dest('./dist'));
});
```

## Commands
* add
* edit
* revert
