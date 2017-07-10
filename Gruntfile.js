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
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
      compress: {},
      },
      dist: {
        src: 'src/perfmatters.js',
        dest: 'dist/perfmatters.js'
      }
    },


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
          cwd: 'img_src/',
          dest: 'img/'
        }]
      }
    },

      critical: {
    dist: {
      options: {
        base: './'
      },
      // The source file
      src: 'index.html',
      // The destination file
      dest: 'result.html'
      }
    },

    pagespeed: {
  options: {
    nokey: true,
    url: "http://3ff1c2a9.ngrok.io/"
  },
  prod: {
    options: {
      url: "http://3ff1c2a9.ngrok.io/",
      locale: "en_GB",
      strategy: "desktop",
      threshold: 80
    }
  },
  paths: {
    options: {
      paths: ["http://3ff1c2a9.ngrok.io/"],
      locale: "en_GB",
      strategy: "desktop",
      threshold: 80
    }
  }
},
  htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      },
      dev: {
        files: {
          'dist/index.html': 'src/index.html',

        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-critical');


  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);

};
