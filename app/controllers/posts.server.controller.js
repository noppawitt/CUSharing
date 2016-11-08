'use strict';

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var errorHandler = require('./errors.server.controller');

exports.update = function(req, res, next) {
    if (req.user) {
        var post = new Post(req.body);

        post.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(post);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.me_timeline = function(req, res, next) {
    if (req.user) {
        var username = req.user.username;

        Post.find({
            screenName: username
        }, function(err, posts) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(posts);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
exports.feed_timeline = function(req, res, next) {
    if (req.user) {
       

        Post.find({
            
        }, function(err, posts) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(posts);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
exports.user_timeline = function(req, res, next) {
    if (req.user) {
        var username = req.params.username;

        Post.find({
            screenName: username
        }, function(err, posts) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(posts);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.one_subject = function(req, res, next) {
    if (req.user) {
        var subject = req.params.subject;
        var abc = "/^"+subject+"/i";
        

        Post.find({
            postSubject: { $regex: subject }

        }, function(err, posts) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(posts);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.delete_post = function(req,res,next){
    if(req.user){
        var _id = req.body._id;
        console.log(_id);
        Post.remove({
            _id:_id
            //name:name
        },function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                res.json(posts);
            }
        });
    } else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
/*
exports.delete_post = function(req,res,next){
    console.log("delete");
};
*/