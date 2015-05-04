var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Proyecto Quiz' });
});

/* GET home page. */
router.get('/credit', function(req, res) {
  res.render('credit');
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);


module.exports = router;
