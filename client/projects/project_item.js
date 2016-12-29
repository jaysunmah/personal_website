Template.project_item.events({
  'click #joinGame' (event) {
    Session.set('joiningGame', true);
  },
});

Template.project_item.helpers({
  projects: function() {
    return Meteor.Projects.find({}).fetch().map(function(val) {
      return val.title;
    });
  },
});

Template.project_item.onRendered(function() {
  console.log(this.data);
});
