module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      clean: {
          build: {
              src: [ 'dist','.sass-cache' ]
          },
      },

      copy: {
        main: {
          expand: true,
          cwd: 'src',
          src: 'svg/**',
          dest: 'dist/',
        },
      },

      concat: {
        // options: {
        //   separator: ';',
        // },
        dist: {
          src: ['src/js/vendor/parallax.js','src/js/main.js'],
          dest: 'dist/js/main-combined.js',
        },
      },

      sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            'dist/css/main.css': 'src/sass/main.sass'       // 'destination': 'source'
          }
        }
      },

       postcss: {
        options: {
          map: true, // inline sourcemaps

          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
          ]
        },
        dist: {
          src: 'dist/css/*.css'
        }
      },

      pug: {
        compile: {
            options: {
              pretty: true
            },
            files: [{
                expand: true,
                cwd: 'src/pug',
                src: [ '**/*.pug' ],
                dest: 'dist',
                ext: '.html'
            }]
          }
        },

        connect: {
          server: {
            options: {
              hostname: 'localhost',
              port: 80,
              base: 'dist/',
              livereload: true
            }
          }
        },

        watch: {
          options: {
            livereload: true
          },
          css: {
            files: 'src/sass/**/*.sass',
            tasks: ['sass']
          },
          pug: {
            files: 'src/pug/**/*.pug',
            tasks: ['pug']
          },
          scripts: {
            files: 'src/js/**/*.js',
            tasks: ['concat']
          }
        }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean','copy','concat','sass','postcss','pug','connect']);

  // Development task(s).
  grunt.registerTask('dev', ['default', 'watch']);

};
