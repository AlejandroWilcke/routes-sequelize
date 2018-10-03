var express = require('express');
var router = express.Router();

var Article = require('../models/article');

router.get('/articles/:id', (req, res) => {
	var id = Number(req.params.id);
	Article.findById(id).then(function(data){
		data ? res.send(data) : res.send(404);
	})
});

router.get('/articles', (req, res) => {
	var arr = Article.findAll({}).then(function(data){
		res.send(data);
	});
});

router.post('/articles', (req, res) => {
	Article.build({
		title: req.body.title,
		content: req.body.content,
	}).save().then(data => {
		res.status(201).json({
			message: 'Created successfully',
			 article: data});

	}).catch(e =>{
		res.send(500);
	})
});

router.put('/articles/:id', (req, res) => {
	var id = Number(req.params.id);
	Article.findById(id).then(data => {
		data.title = req.body.title;
		data.save()
		.then(data => res.json({
			message: 'Updated successfully',
			 article: data}))
		.catch(e => {
			res.send(500);
		});		
	});
});

module.exports = router;
