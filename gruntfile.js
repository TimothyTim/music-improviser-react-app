'use strict';

module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    './dist/styles.css': './src/sass/styles.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'dist/styles.css': 'dist/styles.css'
                }
            }
        },
        watch: {
            scripts: {
                files: ['./public/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('buildsass', ['sass', 'autoprefixer']);
};
