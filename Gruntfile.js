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
                src: 'app/app.js',
                dest: 'build/app/app.min.js'
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
                    'build/app.css': 'app/styles/app.less',
                    'build/application.css': 'app/assets/styles/appliaction.less'
                }
            }
        },
        cssmin: {
            main: {
                src: 'build/app.css',
                dest: 'build/app.min.css'
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: 'fasit',
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
            src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>']
        },





    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('build', ['clean:before', 'build-css', 'build-js', 'build-html', 'copy']);
    grunt.registerTask('build-css', ['less', 'cssmin']);
    grunt.registerTask('build-js', ['jshint', 'ngtemplates', 'concat', 'uglify']);
    grunt.registerTask('build-html', [
        'dom_munger:removecss', 'dom_munger:addcss',
        'dom_munger:readscripts', 'dom_munger:removescripts', 'dom_munger:addscript', 'htmlmin:main'])
}