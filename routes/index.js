var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', ensureAuthenticated,function(req, res, next) {

  res.render('index', { title: 'Members' });
});

router.get('/profile', ensureAuthenticated, function(req, res, next){
	User.find(function(err, todos) {
            if (err){
                res.send(err)
            }
            res.json(todos); // return in JSON 
        });
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
