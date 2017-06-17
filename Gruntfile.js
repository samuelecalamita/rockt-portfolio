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
          dest: 'dist/js/main.js',
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
        }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');

  // Default task(s).
  grunt.registerTask('default', ['clean','concat','sass','pug']);

};
