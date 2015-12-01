playersList = new Mongo.Collection('players');

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			var currentUserId = Meteor.userId();
			return playersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1} });
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
			playersList.remove(selectedPlayer);
		}
	});

	Template.addPlayerForm.events({

		'submit form': function(){
			event.preventDefault();
			var playerNameVar = event.target.playerName.value;
			var currentUserId = Meteor.userId();
			event.target.playerName.value = "";

			playersList.insert({
				name: playerNameVar,
				score: 0,
				createdBy: currentUserId
			});
		}


	});

}

if(Meteor.isServer){
	
}