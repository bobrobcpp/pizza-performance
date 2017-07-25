/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.

      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },

    //Task to inline critical CSS
      critical: {
        dist: {
          options: {
            base: './'
          },
        // The source file
        src: 'src/index.html',
        // The destination file: In temp folder to be manually checked and incorporated in index.html
        dest: 'src/temp/result.html'
        }
      },

//minify javascript task
    uglify: {
      options: {
      compress: {},
      },
      dist: {
        src: 'src/views/js/main.js',
        dest: 'dist/views/js/main.min.js'
      }
    },

//minify HTML task
        minifyHtml: {
        options: {
            cdata: true
        },
        dist: {
            files: {
                'dist/index.html': 'src/index.html',
                'dist/views/pizza.html': 'src/views/pizza.html'
            }
        }
    },

//grunt responsive images task
        responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{

            suffix: '',
            rename: false,
            width: '100%',
            quality:70

          }]
        },

        files: [{
          expand: true,
          src: ['*.{gif,jpg,png,svg}'],
          cwd: 'src/img/',
          dest: 'dist/img/'
        }]
      }
    },


//minify css task
    cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'src/css',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/css',
      ext: '.min.css'
    }]
  }
},

//watch for changes in js and css source files and minify accordingly
    watch: {
      jsmin: {
        files: ['src/**/*.js'],
        tasks: ['uglify']
      },
      cssmin: {
        files: ['src/**/*.css'],
        tasks: ['cssmin']
      },
      minifyHtml: {
        files: ['src/**/*.html'],
        tasks: ['minifyHtml']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-critical');
  grunt.loadNpmTasks('grunt-minify-html');


  // Default task.
  grunt.registerTask('default', ['watch']);

};
