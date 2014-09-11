'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    execute: {
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'src',
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    },

    watch: {
      options: {
      nospawn: true,
      livereload: reloadPort
      },
      html: {
        files: ['src/*.html', 'src/**/*.html'],
        options: {
          livereload: reloadPort
        }
      },
      js: {
        files: ['src/scripts/**/*.js', 'src/scripts/*.js', 'bin/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      json: {
        files: ['src/data/**/*.json'],
        options: {
          livereload: reloadPort
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      css: {
        files: ['src/styles/**/*.css', 'src/styles/*.css'],
        options: {
          livereload: reloadPort
        }
      },
    },

    useminPrepare: {
      html: ['src/index.html'],
      options: {
        dest: 'public'
      }
    },

    usemin: {
      html: ['public/index.html']
    },

    copy: {
      html: {
        files: [
          { src: 'src/index.html', dest: 'public/index.html' },
          { cwd: 'src/styles/fonts/', src: '**', dest: 'public/styles/fonts/', expand: true},
          { cwd: 'src/views/', src: '**', dest: 'public/views/', expand: true},
          { cwd: 'src/partials/', src: '**', dest: 'public/partials/', expand: true},
          { cwd: 'src/data/', src: '**', dest: 'public/data/', expand: true}
        ]
      },
      images: {
        files: [
          { expand: true, cwd: 'src/', src: 'images/jerseys/*.svg', dest: 'public/' },
          { expand: true, cwd: 'src/', src: 'images/**/*.png', dest: 'public/' },
          { expand: true, cwd: 'src/', src: 'images/**/*.jpg', dest: 'public/' }
        ]
      }
    },

    smash: {
      your_target: {
        // Target-specific file lists go here.
      },
    }
  });


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-smash');


  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', ['execute', 'connect', 'watch']);

  grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();
    // Run some sync stuff.
    grunt.log.writeln('Processing task...');
    // And some async stuff.
    setTimeout(function() {
      grunt.log.writeln('All done!asdfasdf');
      done();
    }, 1000);
  });

};