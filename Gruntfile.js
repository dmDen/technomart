module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	
	grunt.initConfig({
		less:{
			style:{
				files:{
					"build/css/style.css": ["source/less/style.less"]
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ["last 2 versions", "ie 10"]
			},
			style: {
				src: "build/css/style.css"
			}
		},
		cmq:{
			style: {
				file: {
					"build/css/style.css": ["build/css/style.css"]
				}
			}
		},
		cssmin: {
			style: {
				options: {
					keepSpecialComments: 0,
					report: "gzip"					
				},
				files: {
					"build/css/style.min.css": ["build/css/style.css"]
				}
			}
		},
		csscomb: {
			style: {
				expand: true,
				src: ["source/less/**/*.less"]
			}
			
		},
		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					src: ["build/img/**/*.{png,jpg,jpeg,gif,svg}"]
				}]
			}
		},
		htmlmin: {
			options:{
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				caseSensitive: true,
				keepClosingSlash: false
			},
			html: {
				files: {
					"build/index.min.html": "build/index.html"
				}
			}
		},
		copy: {
			build: {
				files: [
				{
					expand: true,
					cwd: "source",
					src: [
						"img/**",
						"js/**",
						"font/**"
					],
					dest: "build"
				}]
			}
		},
		clean: {
			build: ["build"]
		},
		replace: {
			build:{
				options: {
					patterns: [{
						match: /[\"\']img\//g,
						replacement: '".static/img'
					},
					{
						match: /[\"\']css\//g,
						replacement: '"static/css/'
					},
					{
						match: /[\"\']js\//g,
						replacement: '"/static/js'
					}]
				},
				files: [{
					expand: true,
					src: [
						"build/css/style*.css",
						"build/index*.html"
					]
				}]
			}
		},
		watch:{
			less: {
				files: ["source/less/**/*.less"],
				tasks: ["less", "autoprefixer", "cmq", "cssmin"],
				options: {
					spawn: false,
				},
			},
			html: {
				files: ["source/html/**/*.html"],
				tasks: ["copy"],
				options: {
					spawn: false,
				},
			}			
		},
		includereplace: {
			build: {
				expand: true,
				cwd: "source",
				flatten: true,
				src: "html/*.html",
				dest: "build/"
			}
		}
	});
	
	grunt.registerTask("build", [
		"clean",
		"includereplace",
		"copy",
		"less",
		"autoprefixer",
		"cmq",
		"cssmin",
		"imagemin",
		"htmlmin"
	]);
	
};