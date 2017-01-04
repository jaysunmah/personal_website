Template.project_item.events({
  'click #joinGame' (event) {
    Session.set('joiningGame', true);
  },
});

Template.project_item.helpers({
  itemIndex: function() {
    return 'projectItem' + (getIndexOf(this) % 3);
  },
  notRendered: function() {
    return !(Session.get('renderedProjects'));
  }
});

function getIndexOf(obj) {
  var projects = Meteor.Projects.find({}).fetch();
  for (var i = 0; i < projects.length; i++) {
    if (projects[i]._id._str == obj._id._str) {
      return i;
    }
  }
  return -1;
}

Template.project_item.onRendered(function() {
  console.log(getIndexOf(this.data));
  // var itemIndex = getIndexOf(this.data);
  // Session.set(this.data._id._str, itemIndex);
  // console.log(this.data);
  // console.log(Meteor.Projects.find({}).fetch().indexOf(this.data));
});
