'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username : {
        type : String
    },
    commentContent :{
        type : String 
    }

});
var PostSchema = new Schema({
    name: {
        type: String,
        trim: true,
        index:true
    },
    screenName: {
        type: String,
        trim: true
    },
    postContent: {
        type: String
    },
    postTime: {
        type: Date,
        default: Date.now
    },
    postType: {
        type: String,
        trim: true,
        index:true
    },
    postCat: {
        type: String,
        trim: true,
        index:true
    },
    postSubject: { 
        type: String,
        trim: true,
        index:true
    },
    rating: {
        type: Number,
        trim: true
    } ,
    favouriteUser: {
        type: [{
            type: String,
        index:true
        }],
        
    },
    comment : [CommentSchema]
});

mongoose.model('Post', PostSchema);