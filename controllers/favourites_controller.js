var models = require('../models/models.js');

// MW que permite acciones solamente si el usuario objeto corresponde con el usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){
	var objUser = req.user.id;
	var logUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;

	if (isAdmin || objUser === logUser) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.like = function(req, res){
	
};

exports.delete = function(req, res){
	
}

exports.list = function(req, res){
};