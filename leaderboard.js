playersList = new Mongo.Collection('players');

if(Meteor.isClient){

	Meteor.subscribe('thePlayers');

	Template.leaderboard.helpers({
		'player': function(){
			var currentUserId = Meteor.userId();
			return playersList.find({}, {sort: {score: -1, name: 1} });
		},

		'selectedClass': function(){
			var playerId = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if(playerId == selectedPlayer) {
				return "selected";
			}
		},


		'showSelectedPlayer': function(){
			var selectedPlayer = Session.get('selectedPlayer'); 
			return playersList.findOne(selectedPlayer)
		}	


	});

	Template.leaderboard.events({

		'click .player': function(){
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);

		},

		'click .increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			playersList.update(selectedPlayer, {$inc: {score: 5} });
		},

		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			playersList.update(selectedPlayer, {$inc: {score: -5} });
		},

		'click .remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			Meteor.call('removePlayerData', selectedPlayer);
			
		}
	});

	Template.addPlayerForm.events({

		'submit form': function(){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			event.target.playerName.value = "";

			Meteor.call('insertPlayerData', playerNameVar);
		}


	});

}

if(Meteor.isServer){

	Meteor.publish('thePlayers', function(){
		var currentUserId = this.userId;
		return playersList.find({createdBy: currentUserId});


	});

	Meteor.methods({

		'insertPlayerData': function(playerNameVar){
			var currentUserId = Meteor.userId();
			playersList.insert({
				name: playerNameVar,
				score: 0,
				createdBy: currentUserId
			});
		},

		'removePlayerData': function(selectedPlayer){

			var currentUserId = Meteor.userId();
			playersList.remove({_id: selectedPlayer, createdBy: currentUserId});

		}


	});
	
}