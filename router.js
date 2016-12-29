Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('landing');
});

Router.route('/projects', function() {
  this.render('projects');
});
