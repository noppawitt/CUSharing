'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    name: {
        type: String,
        trim: true
    } 
});

mongoose.model('Subject', SubjectSchema);