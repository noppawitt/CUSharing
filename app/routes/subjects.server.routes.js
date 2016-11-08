'use strict';

module.exports = function(app) {
    var subjects = require('../controllers/subjects.server.controller');

    app.route('/subjects/update').post(subjects.update);
     app.route('/subjects/allsubject').get(subjects.showall);
     app.route('/subjects/onesubject/:subject').get(subjects.showone);
};