import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.publish("projects", function () {
    return Meteor.Projects.find({});
  });
});

function decreaseTime(lobbyID) {
	var lobby = Meteor.Games.findOne({lobbyID: lobbyID});
	if (lobby) {
		var timeLeft = lobby.timeRemaining - 1;
		Meteor.Games.update({lobbyID: lobbyID}, {$set: {timeRemaining: timeLeft}});
		if (timeLeft == 0) {
			Meteor.clearInterval(lobby.intervalID);
		}
	}
}
function runRound(length, lobbyID) {
	var intervalID = Meteor.setInterval(function() {decreaseTime(lobbyID)}, 1000);
	Meteor.setTimeout(function() { Meteor.clearInterval(intervalID)}, 1000 * length + 1000);
}

Meteor.methods({
    'makeLobby': function(lobbyID, host) {
		Meteor.Games.insert({
			lobbyID: lobbyID,
			host: host,
			players: [host],
			started_game: false,
			finished_game: false,
		});
    },
	'joinLobby': function(lobbyID, player) {
		this.unblock();
		var lobby = Meteor.Games.findOne({lobbyID: lobbyID});
		if (lobby) {
			var currentPlayers = lobby.players;
			currentPlayers.push(player);
			Meteor.Games.update({lobbyID: lobbyID}, {$set: {players: currentPlayers}});
			return true;
		}
		return false;
	},
	'setTimeRound': function(timeRounds, lobbyID) {
		this.unblock();
		Meteor.Games.update({lobbyID: lobbyID}, {$set: {timePerRound: timeRounds}});
		return true;
	},
	'startGame': function(timeRounds, lobbyID) {
		this.unblock();
		var lobby = Meteor.Games.findOne({lobbyID: lobbyID});
		if (lobby) {
			var placeholders = [];
			var guesses = [];
			var currentPositions = [];
			for (var i = 0; i < lobby.players.length; i++) {
				placeholders.push(i);
				currentPositions.push(i);
			}

			var updates = {
				timePerRound: timeRounds,
				round: 1,
				placeholders: placeholders,
				currentPositions: currentPositions,
				startedGame: true,
				timeRemaining: timeRounds,
				guesses: guesses
			}
			Meteor.Games.update({lobbyID: lobbyID}, {$set: updates});

			runRound(timeRounds, lobbyID);

			return true;
		}
		return false;
	},
});
