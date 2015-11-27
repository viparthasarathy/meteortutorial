playersList = new Mongo.Collection('players');

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return playersList.find();
		}
	});

	Template.leaderboard.events({

		'click .player': function(){
			console.log("You clicked an .player element");
			Session.set('SelectedPlayer', 'session value test');
			var selectedPlayer = Session.get('selectedPlayer');

		}
	});
}

if(Meteor.isServer){
	
}