module.exports = function (grunt) {
  // Project configuration.

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js'],
    },
    watch: {
      scripts: {
          files: ['Gruntfile.js'],
          tasks: ['jshint'],
          options: {
            spawn: false,
          },
        },
    },
    browserSync: { // path to files can not contain "(" nor ")" !!!
        dev: {
            bsFiles: {
              src: ['index.html', 'css/styles.css', 'css/**/*.css', 'dest/**/*.js', 'src/**/*.js'],
            },
            options: {
              watchTask: true, //true for running together with watch
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

  // "npm run sync" runs task watch for browserSync

  grunt.registerTask('wait', ['browserSync', 'watch']);

  // "npm test" runs these task(s)
  grunt.registerTask('test', ['jshint']);

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // "grunt.registerTask('babel', ['babel']);" is not allowed => causes infinite loop
};
