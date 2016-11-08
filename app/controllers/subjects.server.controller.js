'use strict';

var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');
var errorHandler = require('./errors.server.controller');

exports.update = function(req, res, next) {
    if (req.user) {
        var subject = new Subject(req.body);

        subject.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(subject);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};


exports.showall = function(req, res, next) {
    if (req.user) {
        var subname = req.user.name;

        Subject.find({
            
        }, function(err, subjects) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(subjects);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.showone = function(req, res, next) {
    if (req.user) {
        var subject = req.params.subject;

        Subject.findOne({
            name : { $regex: subject }
            
        }, function(err, subject) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(subject);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};