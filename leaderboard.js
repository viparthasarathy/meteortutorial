playersList = new Mongo.Collection('players');

if(Meteor.isClient){
	Template.leaderboard.helpers({
		'player': function(){
			return playersList.find();
		}
	});
}

if(Meteor.isServer){
	
}