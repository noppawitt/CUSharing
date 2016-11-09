'use strict';

module.exports = function(app) {
    var posts = require('../controllers/posts.server.controller');

    app.route('/statuses/update').post(posts.update);
    app.route('/statuses/me_timeline').get(posts.me_timeline);
    //app.route('/statuses/me_timeline').get(posts.liked_timeline);
    app.route('/statuses/feed_timeline').get(posts.feed_timeline);
    app.route('/statuses/user_timeline/:username').get(posts.user_timeline);
    app.route('/statuses/subject_timeline/:subject').get(posts.one_subject);
    app.route('/statuses/delete_post').post(posts.delete_post); 
    app.route('/statuses/like_post').post(posts.like_post); 
    app.route('/statuses/unlike_post').post(posts.unlike_post); 
    app.route('/statuses/is_liked_post').get(posts.is_liked_post);

    
};