var models = require('../models/models.js');

// GET /users/:userId/favourites
exports.index = function(req, res, next) {  
  models.Favourites.findAll({
		where: {UserId: Number(req.session.user.id)}
  }).then(function(favs){
  var options = [];
  var i;
  for (i=0; i<favs.length; i++){
	options[i] = favs[i].QuizId;
  };
  models.Quiz.findAll({
	where: {id: options}
  }).then(function(quizes) {
       res.render('favourites/index', {quizes: quizes, errors: []});
  }).catch(function(error){next(error);});
 }).catch(function(error){next(error);});
};

// DELETE
exports.delete = function(req, res){
	models.Favourites.destroy({where:{ UserId: req.session.user.id, QuizId: req.params.quizId}});
	res.redirect("/quizes");
};

//FAV
exports.fav = function(req, res){
	var fav = models.Favourites.build(	//crea objeto fav
    	{UserId: req.session.user.id, QuizId:req.params.quizId}
        );
     fav.save().then( function(){res.redirect('/quizes')});
};