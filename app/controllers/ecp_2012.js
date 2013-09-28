
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    ECP = mongoose.model('ecp_2012'),
    _ = require('underscore');


/**
 * Find article by postal
 */
exports.postalConsumption = function(req, res) {
    console.log(req.params.postalId);
    ECP.findByPostal(req.params.postalId);

    //   ECP.findbyPostal(id, function(err, consumption) {
    //     if (err) return next(err);
    //     if (!consumption) return next(new Error('Failed to load consumption ' + id));
    //     console.log(consumption);
    //     req.consumption = consumption;
    //     next();
    // });

  //  next();

};


exports.show = function(req, res) {
   console.log("postalConsumption");
};


