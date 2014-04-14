module.exports = function(grunt) {

  grunt.initConfig({


      pkg: require('./package.json'),

      concat: {
        all: {
          files: {
            'dist/<%= pkg.name %>-<%= pkg.version %>-lib-dev.js': [
              'bower_components/jquery/dist/jquery.js',
              'bower_components/physicsjs/dist/physicsjs-full-0.5.3.js'              
            ],
            'dist/<%= pkg.name %>-<%= pkg.version %>-lib-dist.js': [
              'bower_components/jquery/dist/jquery.min.js',
              'bower_components/physicsjs/dist/physicsjs-full-0.5.3.min.js'              
            ]
          }
        },
        dynamic: {
          files: {           
            'dist/<%= pkg.name %>-<%= pkg.version %>.js': [
              'src/js/*.js',
              'src/js/**/*.js'
            ],
            'dist/engine-<%= pkg.version %>.js': [
              'src/engine/**/*.js'
            ],
            'dist/<%= pkg.name %>-<%= pkg.version %>.css': [
              'src/css/*.css',
              'src/css/**/*.css'
            ]
          }
        },
      },

      processhtml: {
        dev: {
          options: {
            process: true,
            data: {
              title: '<%= pkg.name %>-<%= pkg.version %>',
              library: '<%= pkg.name %>-<%= pkg.version %>' + '-lib-dev',
              engine : 'engine-<%= pkg.version %>'
            }
          },
          files: {
            'dist/index.html': ['src/index.html']
          }
        },
        dist: {
          options: {
            process: true,
            data: {
              title: '<%= pkg.name %>-<%= pkg.version %>',
              library: '<%= pkg.name %>-<%= pkg.version %>' + '-lib-dist',
              engine : 'engine-<%= pkg.version %>'
            }
          },
          files: {
            'dist/index.html': ['src/index.html']
          }
        }
      },

      watch: {
        scripts: {
          files: [
              'src/index.html',
              'src/css/*.css',
              'src/css/**/*.css',
              'src/js/*.js',
              'src/js/**/*.js',
              'src/engine/*.js',
              'src/engine/**/*.js',
              'src/image/*.{png,jpg,gif}',
              'src/image/**/*.{png,jpg,gif}'
          ],
          tasks: ['concat:dynamic','processhtml:dev','newer:imagemin'],
          options: {
            spawn: false,
          },
        },
      },
   
      imagemin: {
        dynamic: {
          options: {
            optimizationLevel: 3
          },
          files: [{
            expand: true,
            cwd: 'src/image/',
            src: [
              '*.{png,jpg,gif}',
              '**/*.{png,jpg,gif}'
            ],
            dest: 'dist/image/'
          }]
        }
      },

      copy: {
        main: {
          files: [
            {expand: true, cwd: 'src/audio/', src: ['**/*.{wav,ogg,mp3,txt}'], dest: 'dist/audio/'}
          ]
        }
      },

      'gh-pages': {
        options: {
          base: 'dist'
        },
        src: ['**']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');


  grunt.registerTask('page', ['gh-pages']);
  grunt.registerTask('dev', ['watch:scripts']);
  grunt.registerTask('build-dist', ['concat', 'processhtml:dist', 'imagemin', 'copy:main']);
  grunt.registerTask('build-dev', ['concat', 'processhtml:dev', 'imagemin', 'copy:main']);

};