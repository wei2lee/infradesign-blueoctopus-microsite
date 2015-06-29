module.exports = function (grunt) {
    var TEMP_DIR = './temp/';
    var BUILD_DIR = './build/';
    var SRC_DIR = './';
    var BOWER_DIR = SRC_DIR + 'js/bower_components/'

    var SRC_CSS_DIR = SRC_DIR + 'css/';
    var SRC_MAIN_CSS = SRC_CSS_DIR + 'main.css';
    var SRC_CSS = [
        BOWER_DIR + 'fancybox/source/jquery.fancybox.css',
        SRC_MAIN_CSS,
        BOWER_DIR + 'bootstrapvalidator/dist/css/bootstrapValidator.min.css'
    ];
    var SRC_CSS_FONT_DIR = SRC_CSS_DIR + 'fonts/';

    var SRC_IMAGE_DIR = SRC_DIR + 'images/';
    var SRC_IMAGE = grunt.file.expand(SRC_IMAGE_DIR + '*.{png,jpg,gif}');

    var SRC_MAIN_JS = SRC_DIR + 'js/main.js';
    var SRC_JS_DIR = SRC_DIR + 'js/';
    var SRC_JS = grunt.file.expand(SRC_JS_DIR + '*.js');
    //the order of javascript must follow as dependency order
    var SRC_EXTRA_JS = [
        BOWER_DIR + 'jquery/dist/jquery.min.js',
        BOWER_DIR + 'jquery-nicescroll/jquery.nicescroll.min.js',
        BOWER_DIR + 'bootstrap/dist/js/bootstrap.min.js',
        BOWER_DIR + 'fancybox/source/jquery.fancybox.pack.js',
        BOWER_DIR + 'bootstrapvalidator/dist/js/bootstrapValidator.min.js',
        BOWER_DIR + 'bootbox/bootbox.js',
        BOWER_DIR + 'sprintf/dist/sprintf.min.js',
        BOWER_DIR + 'bouncefix.js/dist/bouncefix.min.js'
    ];
    SRC_JS = SRC_EXTRA_JS.concat(SRC_JS);

    var SRC_HTML = grunt.file.expand(SRC_DIR + '*.html');

    var SRC_OTHER = [
        'apple-touch-icon.png',
        'browserconfig.xml',
        'crossdomain.xml',
        'favicon.ico',
        'humans.txt',
        'robots.txt',
        'tile-wide.png',
        'tile.png',
        'assets/'
    ];
    
    
    var DEST_CSS_DIR = BUILD_DIR + 'css/';
    var DEST_MAIN_JS = BUILD_DIR + 'js/main.js';
    var DEST_MAIN_CSS = BUILD_DIR + 'css/main.css';
    var DEST_IMAGE_DIR = BUILD_DIR + 'images';





    //var mozjpeg = require('imagemin-mozjpeg');


    //uglify javascripts
    var uglifyobj = {
        my_target: {
            files: {}
        }
    };
    uglifyobj.my_target.files[DEST_MAIN_JS] = SRC_JS;
    grunt.config('uglify', uglifyobj);

    //minify css
    var cssminobj = {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {

            }
        }
    }
    cssminobj.target.files[DEST_MAIN_CSS] = SRC_CSS;
    grunt.config('cssmin', cssminobj);

    //copy css font
    copyobj = {
        main: {
            files: [
                {
                    expand: true,
                    cwd: 'css/fonts/',
                    src: ['Aileron-Regular'],
                    dest: 'build/fonts/'
                }
            ],
        }
//        other: {
//            files: [
//                {
//                    expand: false,
//                    cwd: SRC_DIR,
//                    src: ['*.txt'],
//                    dest: BUILD_DIR
//                }
//            ]
//        }
    };
    grunt.config('copy', copyobj);

    //    critcal css path inline 
    var criticalobj = {};
    for (var k in SRC_HTML) {
        var html = SRC_HTML[k];
        criticalobj[html] = {
            options: {
                pathPrefix: 'abc',
                inlineImages: false,
                base: '',
                css: [
                    DEST_MAIN_CSS
                ],
                width: 1024,
                height: 768
            },
            src: BUILD_DIR + html,
            dest: BUILD_DIR + html
        }
    }
    grunt.config('critical', criticalobj);
    //replace js block in html to uglified main.js
    var processhtmlobj = {
        options: {
            data: {}
        },
        dist: {
            files: {
                
            }
        }
    };
    var processhtmlTargets = {};
    for (var k in SRC_HTML) {
        var html =  SRC_HTML[k];
        processhtmlTargets[BUILD_DIR + html] = [html];
    }
    processhtmlobj.dist.files = processhtmlTargets;
    grunt.config('processhtml', processhtmlobj);


    //minify image
    var imageminobj = { // Task
        all: { // Another target
            options: { // Target options
                optimizationLevel: 0,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                //use: [mozjpeg()]
            },
            files: [{
                expand: true, // Enable dynamic expansion
                cwd: SRC_IMAGE_DIR, // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                dest: DEST_IMAGE_DIR // Destination path prefix
                }]
        }
    };
    //console.log(imageminobj.all.files[0].src);
    grunt.config('imagemin', imageminobj);

    //watch
    grunt.config('watch', {
        all: {
            files: SRC_JS,
            tasks: ['newer:concat:js', 'newer:uglify:js']
        }
    });


    //grunt.loadNpmTasks('grunt-ftp-deploy');
    //grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    grunt.loadNpmTasks('grunt-newer');
//    grunt.loadNpmTasks('grunt-watch');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-critical');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    

    
//    npm install grunt-contrib-copy --save-dev
//    npm install grunt-contrib-cssmin --save-dev
//    npm install grunt-contrib-uglify --save-dev
//    npm install grunt-contrib-jshint --save-devls
//    npm install grunt-contrib-cssmin --save-dev
//    npm install grunt-contrib-imagemin --save-dev
//    npm install grunt-contrib-watch --save-dev
//    npm install grunt-contrib-concat --save-dev
//    npm install grunt-penthouse --save-dev
//    npm install grunt-contrib-clean --save-dev
//    npm install grunt-processhtml --save-dev
//    npm install grunt-contrib-watch --save-dev
//    npm install grunt-critical --save-dev
//    npm install grunt-newer --save-dev
//    npm install --save imagemin-mozjpeg
//    npm install grunt-autoprefixer --save-dev

    // Default task(s).
    //    grunt.registerTask('default', ['concat', 'uglify', 'critical', 'processhtml', 'clean:js']);
    //    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('css', ['cssmin']);
    grunt.registerTask('image', ['imagemin']);
    grunt.registerTask('cssfont', ['copy:cssfont']);
    grunt.registerTask('html', ['processhtml']);
    grunt.registerTask('copy', ['copy:other']);
    grunt.registerTask('testcritical', ['cssmin', 'processhtml', 'critical']);
    grunt.registerTask('default', ['imagemin', 'uglify', 'cssmin', 'processhtml', 'critical']);
};