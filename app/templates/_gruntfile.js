// Generated on 2014-07-30 using generator-angular-require 0.2.6
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  //Load node packageFile main info.
  var packageFile = require('./package.json');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //Specify an ENV configuration for future tasks in the chain
  grunt.loadNpmTasks('grunt-env');

  grunt.loadNpmTasks('grunt-preprocess');

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    env: {
      options: {
        /* Shared Options Hash */
        //globalOption : 'foo'
      },
      dev: {
        NODE_ENV: 'DEVELOPMENT'
      },
      dist: {
        NODE_ENV: 'PRODUCTION'
      }
    },
    // Project settings
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
          '<%= appConfig.app %>/scripts/{,*/}*.js',
          '<%= appConfig.app %>/scripts/modules/{,*/}*.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['app/styles/{,*/}*.{css,less}'],
        tasks: ['less:dev','newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= appConfig.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9001,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                      '/bower_components',
                      connect.static('./bower_components')
                      ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                      '/bower_components',
                      connect.static('./bower_components')
                      ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= appConfig.dist %>'
        }
      }
    },
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appConfig.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= appConfig.dist %>/{,*/}*',
              '!<%= appConfig.dist %>/.git*'
            ]
          }]
      },
      server: '.tmp'
    },
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }]
      }
    },
    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: '<%= appConfig.app %>'
      },
      app: {
        src: ['<%= appConfig.app %>/index.template.html'],
        ignorePath: /\.\.\//
      }
    },
    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= appConfig.dist %>/scripts/{,*/}*.js',
          '<%= appConfig.dist %>/styles/{,*/}*.css',
          '<%= appConfig.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= appConfig.dist %>/styles/fonts/*'
        ]
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= appConfig.app %>/index.template.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/images']
      }
    },
    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= appConfig.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= appConfig.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= appConfig.dist %>/scripts/scripts.js': [
    //         '<%= appConfig.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
            expand: true,
            cwd: '<%= appConfig.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg,gif}',
            dest: '<%= appConfig.dist %>/images'
          }]
      }
    },
    svgmin: {
      dist: {
        files: [{
            expand: true,
            cwd: '<%= appConfig.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= appConfig.dist %>/images'
          }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
            expand: true,
            cwd: '<%= appConfig.dist %>',
            src: ['*.html', 'views/{,*/}*.html'],
            dest: '<%= appConfig.dist %>'
          }]
      }
    },
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts'
          }]
      }
    },
    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= appConfig.dist %>/*.html']
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= appConfig.app %>',
            dest: '<%= appConfig.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              '*.html',
              'views/{,*/}*.html',
              'bower_components/**/*',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          }, {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= appConfig.dist %>/images',
            src: ['generated/*']
          }, {
            expand: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= appConfig.dist %>'
          }, {
            expand: true,
            cwd: 'bower_components/requirejs',
            src: 'require.js',
            dest: '<%= appConfig.dist %>/libs'
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= appConfig.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    // Settings for grunt-bower-requirejs
    bower: {
      app: {
        rjsConfig: '<%= appConfig.app %>/scripts/main.js',
        options: {
          exclude: ['requirejs', 'json3', 'es5-shim', 'requirejs-text']
        }
      }
    },
    replace: {
      test: {
        src: '<%= appConfig.app %>/../test/test-main.js',
        overwrite: true,
        replacements: [{
            from: /paths: {[^}]+}/,
            to: function() {
              return require('fs').readFileSync(grunt.template.process('<%= appConfig.app %>') + '/scripts/main.js').toString().match(/paths: {[^}]+}/);
            }
          }]
      }
    },
    // r.js compile config
    requirejs: {
      dist: {
        options: {
          dir: '<%= appConfig.dist %>/scripts/',
          modules: [{
              name: 'main'
            }],
          preserveLicenseComments: false, // remove all comments
          removeCombined: true,
          baseUrl: '<%= appConfig.app %>/scripts',
          mainConfigFile: '<%= appConfig.app %>/scripts/main.js',
          optimize: 'uglify2',
          uglify2: {
            mangle: false
          }
        }
      }
    },
    // Preprocess index.template.html
    preprocess: {
      dev: {
        src: '<%= appConfig.app %>/index.template.html',
        dest: '<%= appConfig.app %>/index.html',
        options: {
          context: {
          }
        }
      },
      dist: {
        src: '<%= appConfig.app %>/index.template.html',
        dest: '<%= appConfig.dist %>/index.html'
      }
    },<% if (less) { %>
    less: {
      dev: {
        options: {
          paths: ['<%= appConfig.app %>/styles']
        },
        files: {'<%= appConfig.app %>/styles/main.css': '<%= appConfig.app %>/styles/main.less'}
      },
      dist: {
        options: {
          paths: ['<%= appConfig.app %>/styles'],
          cleancss: true
        },
        files: {'<%= appConfig.app %>/styles/main.css': '<%= appConfig.app %>/styles/main.less'}
      }
    },<% } %>
    ngconstant: {
      // Options for all targets
      //https://sourcegraph.com/github.com/werk85/grunt-ng-constant
      options: {
        wrap: '"use strict";\n\n define(["angular"], function(angular) {{%= __ngModule %}});',
        name: 'AppModule.configuration',
        constants: {
          APP_INFO: {
            'name': packageFile.name,
            'version': packageFile.version
          },
          APP: grunt.file.readJSON('app/config/constants.json')
        }
      },
      // Environment targets
      dev: {
        options: {
          dest: '<%= appConfig.app %>/scripts/configuration.js'
        },
        constants: {
          APP: grunt.file.readJSON('app/config/dev.json')
        }
      },
      dist: {
        options: {
          dest: '<%= appConfig.app %>/scripts/configuration.js'
        },
        constants: {
          APP: grunt.file.readJSON('app/config/dist.json')
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'ngconstant:dev',
      'clean:server',
      'env:dev',
      'preprocess:dev',<% if (less) { %>
      'styles:dev',<% } %>
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'bower:app',
    'replace:test',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'bower:app',
    'replace:test',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'ngconstant:dist',<% if (less) { %>
    'styles:dist',<% } %>
    'copy:dist',
    'cdnify',
    'cssmin',
    // Below task commented out as r.js (via grunt-contrib-requirejs) will take care of this
    // 'uglify',
//    'filerev',
    'usemin',
    'requirejs:dist',
    'htmlmin'
  ]);

  grunt.registerTask('dist', ['build', 'env:dist', 'preprocess:dist']);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  <% if (less) { %>
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('styles', ['less']);
  <% } %>
};
