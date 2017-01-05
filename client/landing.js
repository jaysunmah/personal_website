Template.landing.events({
  'click #goToProjects' (event) {
    var cb = function() {
      Router.go('/projects');
    }
    $('#landingContainer').transition({
      animation: 'fade right',
      duration: transitionDelay,
      onHide: cb
    });
  },
});

Template.landing.helpers({
  joiningGame: function() {
    return Session.get('joiningGame');
  },
});

Template.landing.onRendered(function() {
  if (Session.get('renderedLanding')) {
    $('#landingContainer').transition({
  		animation: 'fade right',
  		duration: transitionDelay,
  	});
  } else {
    Session.set('renderedLanding', true);
  	$('#landingContainer').transition({
  		animation: 'fade left',
  		duration: transitionDelay,
  	});
  }
});
