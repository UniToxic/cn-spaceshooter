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
              'src/js/objects/*.js',
              'src/js/**/*.js'         
            ],
            'dist/<%= pkg.name %>-<%= pkg.version %>.css': [
              'src/css/*.css',
              'src/css/**/*.css'
            ]
          }
        }
      },

      processhtml: {
        dev: {
          options: {
            process: true,
            data: {
              title: '<%= pkg.name %>-<%= pkg.version %>',
              library: '<%= pkg.name %>-<%= pkg.version %>' + '-lib-dev'
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
              library: '<%= pkg.name %>-<%= pkg.version %>' + '-lib-dist'
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
              'index.html',
              'src/css/*.css',
              'src/css/**/*.css',
              'src/js/*.js',
              'src/js/objects/*.js',
              'src/js/**/*.js'
          ],
          tasks: ['concat:dynamic','processhtml:dev'],
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
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/image/'
          }]
        }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');


  grunt.registerTask('dev', ['watch:scripts', 'newer:imagemin']);
  grunt.registerTask('build-dist', ['concat', 'processhtml:dist', 'imagemin']);
  grunt.registerTask('build-dev', ['concat', 'processhtml:dev', 'imagemin']);

};