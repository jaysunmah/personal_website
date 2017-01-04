var renderDelay = 300;

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
    console.log('bye');
    return filterIndices(i);
  },
  isCollapsed: function() {
    return Session.get('collapsedProjects');
  },
  allProjects: function() {
    return Meteor.Projects.find({}).fetch();
  },
});

function showContainers() {
  // $('.project.container').addClass('transition hidden');
  var count = 0;
  var cb = function() {
    count ++;
    if (count == Meteor.Projects.find({}).fetch().length) {
      Session.set('renderedProjects', true);
    }
  }
  function animateContainers(i) {
    $('.project.container.projectItem' + i).transition({
      animation : 'scale',
      reverse   : 'auto', // default setting
      interval  : renderDelay,
      onShow  : cb
    });
  }
  animateContainers('0');
  animateContainers('1');
  animateContainers('2');
}

function checkCollapsedProjects() {
  if ($(window).width() <= 767) {
    Session.set('collapsedProjects', true);
  } else {
    Session.set('collapsedProjects', false);
  }
}

Template.projects.onRendered(function() {
  Session.set('renderedProjects', false)

  window.onresize = function(event) {
    checkCollapsedProjects();
  };

  checkCollapsedProjects();
  $('.ui.menu')
  .on('click', '.item', function() {
    if(!$(this).hasClass('dropdown')) {
      $(this)
        .addClass('active')
        .siblings('.item')
        .removeClass('active');
    }
  });
  if (!(Session.get('renderedProjects'))) {
    Meteor.setTimeout(showContainers, renderDelay);
  }
});
