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

//pagespeed task .requires site to be loaded with ngrok
    pagespeed: {
  options: {
    nokey: true,
    // Change  urls within pagespeed to your ngrok site url
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
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task.
  grunt.registerTask('default', ['uglify']);

};
