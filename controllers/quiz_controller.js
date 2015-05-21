var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
		where: {
			id: Number(quizId)
		},
		include: [{
			model: models.Comment
		}]
	}).then(function(quiz) {
 		if (quiz) {
 			req.quiz = quiz;
 			next();
 		} else { next(new Error('No existe quizId=' + quizId))}
 	}).catch(function(error) { next(error)});
};

// GET /quizes/question
exports.index = function(req, res) {
	if (req.query.search) {
		models.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search + '%']}).then(
 		function(quizes) {res.render('quizes/index.ejs', { quizes: quizes, errors: []});}).catch(function(error) { next(error);})
	}
	else{
		models.Quiz.findAll().then(
 		function(quizes) {res.render('quizes/index.ejs', { quizes: quizes, errors: []});}).catch(function(error) { next(error)});
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
 	if (req.query.respuesta === req.quiz.respuesta) {
 		resultado = 'Correcto';
 	}
 	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz, errors: []});
};

//GET /quizes/statistics
//exports.statistics = function(req, res) {
//	var numero_preguntas = models.Quiz.count();
//	res.render('quizes/statistics', {num_preg: numero_preguntas, errors: []});
//}
exports.statistics = function(req,res){
models.Comment.findAll().then(function(comment){
models.Quiz.findAll().then(function(quizes){
res.render('quizes/statistics',{quiz: req.quiz, quizes: quizes, comment: comment, errors: []});
})
}).catch(function(error) { next(error)});
};


// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build( req.body.quiz );
	quiz.validate().then(function(err){
		if (err) {
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		} else {
			quiz // save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta"]})
			.then( function(){ res.redirect('/quizes')})
		} // res.redirect: Redirección HTTP a lista de preguntas
	}).catch(function(error){next(error)});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
 var quiz = req.quiz; // req.quiz: autoload de instancia de quiz

 res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
req.quiz.pregunta = req.body.quiz.pregunta;
req.quiz.respuesta = req.body.quiz.respuesta;

req.quiz.validate().then(function(err){
	if (err) {
		res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
	} else {
		req.quiz // save: guarda campos pregunta y respuesta en DB
		.save( {fields: ["pregunta", "respuesta"]})
		.then( function(){ res.redirect('/quizes');});
	} // Redirección HTTP a lista de preguntas (URL relativo)
}).catch(function(error){next(error)});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then( function() {
	res.redirect('/quizes');
}).catch(function(error){next(error)});
};

// console.log("req.quiz.id: " + req.quiz.id);