Template.landing.events({
  'click #joinGame' (event) {
    Session.set('joiningGame', true);
  },
});

Template.landing.helpers({
  joiningGame: function() {
    return Session.get('joiningGame');
  },
});

Template.landing.onRendered(function() {
	$('#landingContents').transition({
		animation: 'fade left',
		duration: 750,
	});
});
