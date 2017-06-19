module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      clean: {
          build: {
              src: [ 'dist','.sass-cache' ]
          },
      },

      concat: {
        // options: {
        //   separator: ';',
        // },
        dist: {
          src: ['src/js/vendor/plugin.js','src/js/main.js'],
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
        watch: {
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['clean','concat','sass','postcss','pug']);

   // Development task(s).
  grunt.registerTask('dev', ['default', 'watch']);

};
