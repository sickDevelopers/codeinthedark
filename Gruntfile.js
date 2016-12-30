 var env = require('node-env-file');
 env(__dirname + '/.env');

module.exports = function(grunt) {

  console.log('LOAD USER: ', process.env.USERNAME);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['index.html'],
        tasks: ['http_upload'],
        options: {
          spawn: false,
        },
      },
    },

    http_upload: {
      default: {
        options: {
          url: process.env.SERVER +'/upload',
          method: 'POST',
          rejectUnauthorized: false,
          headers: {
            // 'Authorization': 'Token <%= your_token_here %>'
          },
          data: {
            user: process.env.USERNAME
          },
          onComplete: function(data) {
              console.log('Response: ' + data);
          }
        },
        src: 'index.html',
        dest: 'code'
      },
    }

  });

  grunt.loadNpmTasks('grunt-http-upload');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};
