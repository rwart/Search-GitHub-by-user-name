module.exports = function (grunt) {
  // Project configuration.

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'dest/**/*.js'],
    },
    watch: {
      scripts: {
          files: ['Gruntfile.js', 'dest/**/*.js'],
          tasks: ['jshint'],
          options: {
            spawn: false,
          },
        },
    },
    browserSync: {
        dev: {
            bsFiles: {
              src: ['index.html', 'css/**/*.css', 'dest/**/*.js', 'src/**/*.js'],
            },
            options: {
              watchTask: false, //true for running together with watch
              server: true, // server: true for baseDir: "./" Default - port: 3000
            },
          },
      },
    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015', 'babel-preset-react'],
        plugins: ['transform-remove-strict-mode', 'transform-class-properties'],
      },
      dist: {
          files: [{
              expand: true,
              cwd: 'src',
              src: ['**/*.jsx', '**/*.es6', '**/*.babel', '**/*.js'],
              dest: 'dest',
              ext: '.js',
            }, ],
        },
    },
  });

  // Load the plugins tasks

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-babel');

  // 'npm run watch" runs task watch for jshint and browserSync
  grunt.registerTask('sync', ['browserSync']);
  grunt.registerTask('wait', ['watch']);

  // "npm test" runs these task(s)
  grunt.registerTask('test', ['jshint']);

  // Default task(s).
  grunt.registerTask('default', ['wait']);

  // grunt.registerTask('babel', ['babel']); is not allowed => causes infinite loop
};
