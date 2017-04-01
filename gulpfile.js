//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),  
    uglify = require('gulp-uglify'),  
    changed = require('gulp-changed'),
    debug = require('gulp-debug'),
    tiny = require('gulp-tinypng-nokey'),
    rename = require('gulp-rename');
//var pump = require('pump');
var base64 = require('gulp-base64');



gulp.task('base64',function(){
	gulp.src('public/css/wesetting.css')
		.pipe(base64({
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize:200*1024,
            debug:true
        }))
        .pipe(debug({title: '编译:'}))
        .pipe(gulp.dest('public/css/min'));
});

//testCleanCss 把css给min化
gulp.task('tCleanCss', function () {
    gulp.src('css/*.css') //该任务针对的文件
        //该任务调用的模块
        .pipe(changed('css/min',{extension:'-min.css'}))
        .pipe(debug({title: '编译:'}))
        .pipe(cleancss())
        .pipe(gulp.dest('css/min')); //将会在src/css下生成index.css
});

//tinyImg 把图片Tiny压缩 保存到 images/min 然后在覆盖回去
gulp.task('tinyImg', function (cb) {
    gulp.src('src/assets/images/*') //该任务针对的文件
       .pipe(changed('src/assets/images/min'))
       .pipe(tiny())
       .pipe(debug({title: '编译:'}))
       .pipe(gulp.dest('src/assets/images/min')); //将会在src/css下生成index.css
});

//css 兼容前缀自动添加
gulp.task('cssHack', function () {
    gulp.src('css/walkman/main.css') //该任务针对的文件
       .pipe(changed('css/walkman/min/min',{extension:'.css'}))
       .pipe(autoprefixer())
       .pipe(debug({title: '编译:'}))
       .pipe(gulp.dest('css/walkman/min')); 
});

//js 压缩处理
gulp.task('uglifyJS', function (cb) {
	pump([
        gulp.src('js/walkman/mainapp.js'),
        uglify(),
        gulp.dest('js/min')
    ],
    cb
  );
});




// 默认任务
gulp.task('default', function(){
    //gulp.run('tCleanCss');
    //gulp.run('tinyImg');
    //gulp.run('uglifyJS');
    gulp.run('base64');
    // 监听文件变化
    //gulp.watch('styles/klxt2016/*.css', ['testCleanCss']);
    //gulp.watch('images/klxt2016/*/*', ['tinyImg']);
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径pt Document













