var path = require("path");

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-bower-install-simple");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'gh-pages': {
            options: {
                base: '_book'
            },
            src: ['**']
        },
        'clean': {
            files: '.grunt'
        },
        'bower-install-simple': {
            options: {
                color:       true,
                production:  false,
                directory:   "theme/vendors"
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "theme/assets/style.css": "theme/stylesheets/website.less",
                    "theme/assets/print.css": "theme/stylesheets/ebook.less"
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: "gitbook",
                    baseUrl: "theme/javascript/",
                    out: "theme/assets/app.js",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    include: ["requireLib"],
                    paths: {
                        "jQuery": '../vendors/jquery/dist/jquery',
                        "lodash": '../vendors/lodash/dist/lodash',
                        "requireLib": '../vendors/requirejs/require',
                        "Mousetrap": '../vendors/mousetrap/mousetrap',
                        "lunr": '../vendors/lunr.js/lunr',
                        "URIjs": '../vendors/URIjs/src/',
                        "ace": '../vendors/ace-builds/src-noconflict/'
                    },
                    shim: {
                        'jQuery': {
                            exports: '$'
                        },
                        'lodash': {
                            exports: '_'
                        },
                        'Mousetrap': {
                            exports: 'Mousetrap'
                        },
                        'lunr': {
                            exports: 'lunr'
                        }
                    }
                }
            }
        },
        copy: {
            vendors: {
                files: [
                    {
                        expand: true,
                        cwd: 'theme/vendors/fontawesome/fonts/',
                        src: ['**'],
                        dest: 'theme/assets/fonts/fontawesome/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.registerTask("bower-install", [ "bower-install-simple" ]);

    // Build
    grunt.registerTask('build', [
        'bower-install',
        'less',
        'requirejs',
        'copy:vendors'
    ]);

    grunt.registerTask('publish', [
        'gitbook',
        'gh-pages',
        'clean'
    ]);
    grunt.registerTask('default', 'gitbook');
};