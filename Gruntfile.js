module.exports = function (grunt) {
    grunt.initConfig({
        meta: {
            package: grunt.file.readJSON('package.json'),
            src: {
                main: 'src/main',
                test: 'src/test'
            },
            bin: {
                coverage: 'bin/coverage'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',//<%= concat.main.dest &>
                dest: 'build/app.min.js'
            }
        },
        jshint: {
            main: {
                options: {
                    //jshintrc: '.jshintrc'
                },
                src: ['app/*.js', 'app/scopes/*.js', 'app/services/*.js', 'app/filters/*.js', 'app/directives/*.js']
            }
        },
        clean: {
            before: {
                src: ['build']
            },
        },
        less: {
            production: {
                options: {},
                files: {
                    //'build/app.css': 'app/styles/app.less',
                    'build/application.css': 'app/assets/styles/application.less'
                }
            }
        },
        cssmin: {
            main: {
                src: 'build/application.css',
                dest: 'build/application.min.css'
            }
        },
         dom_munger: {
            readscripts: {
                options: {
                    read: [
                        { selector: 'script[data-build!="exclude"]', attribute: 'src', writeto: 'appjs' }
                    ]
                },
                src: 'index.html'
            },
            removescripts: {
                options: {
                    remove: 'script[data-remove!="exclude"]',
                    //append: { selector: 'head', html: '<script src="app.full.min.js"></script>' }
                },
                src: 'build/index.html'
            },
            addscript: {
                options: {
                    append: [
                        { selector: 'body', html: '<script src="app.min.js"></script>' },
                    ]
                },
                src: 'build/index.html'
            },
            removecss: {
                options: {
                    remove: 'link[data-remove!="exclude"]',
                    //append: { selector: 'head', html: '<link rel="stylesheet" href="app/Styles/app.full.min.css">' }
                },
                src: 'build/index.html'
            },
            addcss: {
                options: {
                    append: { selector: 'head', html: '<link rel="stylesheet" href="app/Styles/app.full.min.css">' }
                },
                src: 'build/index.html'
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: 'komFramISLApp',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: false,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                src: ['app/scopes/*.html', 'app/directives/*.html'],
                dest: 'temp/templates.js'
            }
        },
        concat: {
             main:{
            src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
            dest: 'temp/app.full.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: false,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            },
        },
        copy:{
            html:{
                files:[
                     { src: ['index.html'], dest: 'build/' },
                ]
            },
            final:{
                files:[

                ]

            }
        }





    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('build', ['clean:before', 'build-css', 'build-js', 'build-html', 'copy:final']);
    grunt.registerTask('build-css', ['less', 'cssmin']);
    grunt.registerTask('build-js', ['jshint', 'dom_munger:readscripts', 'ngtemplates', 'concat', 'uglify']);
    grunt.registerTask('build-html', ['copy:html', 'dom_munger:removecss', 'dom_munger:addcss', 
        'dom_munger:removescripts', 'dom_munger:addscript', 'htmlmin:main'])
}