module.exports = function(grunt) {

	var path = require("path")

	grunt.initConfig({
		sass: {
			options: {
				outputStyle: 'expanded',
				sourceMap: true,
				includePaths: [path.join(__dirname, 'node_modules', 'include-media', 'dist')]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/sass',
					src: '**/*.scss',
					dest: 'assets/css/',
					ext: '.css'
				}]
			}
		},
		watch: {
			files: 'assets/sass/**/*.scss',
			tasks: 'sass'
		}

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'watch']);

};