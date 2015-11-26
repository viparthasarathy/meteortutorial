playersList = new Mongo.Collection('players');

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return playersList.find();
		}
	});

	Template.leaderboard.events({

		'click': function(){
			console.log("You clicked something");

		}

	});
}

if(Meteor.isServer){
	
}