'use strict';

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
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

exports.me_timeline = function(req,res,next){
    if(req.user){
        Post.find({
            //_id:{$in:likedPostId}
            $or:[{screenName:req.user.username},{_id:{$in:req.user.savedPost}}]
        },function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            }
            else{
                    res.json(posts);
                }
        });        
    }
    else{
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
        Post.remove({
            _id:_id
        },function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                res.send('delete success');
            }
        });
    } else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.like_post = function(req,res,next){
    if(req.user){
        var _id = req.body._id;
        var username = req.user.username;

        Post.findOneAndUpdate(
        {
            _id:_id
        },{
            $inc:{likeCount:1}
        }
        ,function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                User.findOneAndUpdate(
                    {
                        username:username
                    },{
                        $addToSet:{likedPost:_id}
                     }
                    ,function(err,posts){
                        if(err){
                            return res.status(400).send({
                                message:errorHandler.getErrorMessage(err)
                            });
                        } else{
                             res.send('like success');
                            }
                     });
            }
        });

    } 
    else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.unlike_post = function(req,res,next){
    if(req.user){
        // post id
        var _id = req.body._id;
        // user id
        var username = req.user.username;
        // like count - 1
        Post.findOneAndUpdate(
        {
            _id:_id
        },{
            $inc:{likeCount:-1}
        }
        ,function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                // remove post_id in user's likedPost
                User.findOneAndUpdate(
                    {
                        username:username
                    },{
                        $pull:{likedPost:_id}
                     }
                    ,function(err,posts){
                        if(err){
                            return res.status(400).send({
                                message:errorHandler.getErrorMessage(err)
                            });
                        } else{
                             res.send('like success');
                            }
                     });
            }
        });

    } 
    else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.is_liked_post = function(req,res,next){
    if(req.user){
        var likedPostId = [];
        for(var i = 0;i<req.user.likedPost.length;i++){
            var temp = "";
            var temp2 = req.user.likedPost[i].toObject();
            for(var j = 0;j<24;j++){
                temp = temp + temp2[j];
            }
            likedPostId.push(temp);
        }
        res.json(likedPostId);
    }
    else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.save_post = function(req,res,next){
    if(req.user){
        User.findOneAndUpdate({
            username:req.user.username
        },{
            $addToSet:{savedPost:req.body._id}
        },function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                res.end();
            }
        });
    }
    else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};


exports.remove_post = function(req,res,next){
    if(req.user){
        User.findOneAndUpdate({
            username:req.user.username
        },{
            $pull:{savedPost:req.body._id}
        },function(err,posts){
            if(err){
                return res.status(400).send({
                    message:errorHandler.getErrorMessage(err)
                });
            } else{
                res.end();
            }
        });
    }
    else{
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};