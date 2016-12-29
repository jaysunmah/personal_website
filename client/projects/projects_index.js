Template.projects.events({
  'click #joinGame' (event) {
    Session.set('joiningGame', true);
  },
});

function filterIndices(index) {
  var projects = Meteor.Projects.find({}).fetch();
  var result = [];
  projects.forEach(function(val, i) {
    if (i % 3 == index) {
      result.push(val);
    }
  });
  return result;
}

Template.projects.helpers({
  projects: function(i) {
    return filterIndices(i)
  },
});

// Template.projects.render

function wei() {
  $('.project.container').transition({
    animation : 'scale',
    reverse   : 'auto', // default setting
    interval  : 100
  });
}

Template.projects.onRendered(function() {
  $('.ui.menu')
  .on('click', '.item', function() {
    if(!$(this).hasClass('dropdown')) {
      $(this)
        .addClass('active')
        .siblings('.item')
        .removeClass('active');
    }
  });
  Meteor.setTimeout(wei, 100);
});
