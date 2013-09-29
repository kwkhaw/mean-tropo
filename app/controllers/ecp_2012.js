
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
exports.postalConsumptionx = function(req, res, next) {
    console.log(req.params.postalId);
    ECP.findByPostal(req.params.postalId, function(err, consumptions) {
      if (err) return next(err);
      if (!consumptions) return next(new Error('Failed to load consumption ' + req.params.postalId));
      req.consumptions = consumptions;
      next();
    });

    //   ECP.findbyPostal(id, function(err, consumption) {
    //     if (err) return next(err);
    //     if (!consumption) return next(new Error('Failed to load consumption ' + id));
    //     console.log(consumption);
    //     req.consumption = consumption;
    //     next();
    // });

  //  next();

};


/**
 * show the consumption
 */
exports.postalConsumption = function(req, res) {
    console.log('Postal Code: ' + req.params.postalId);
    ECP.find({POSTAL_CD_FINAL: req.params.postalId}).exec(function(err, consumptions) {
      if (err) {
          res.render('error', {
              status: 500
          });
      } else {
          var consumptionStats = { "consumptions" : consumptions};
          res.jsonp(consumptionStats);
      }
    });
};

exports.showx = function(req, res) {
   console.log("postalConsumption");
};


