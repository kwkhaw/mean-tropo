/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */

// "CONTRACT_ACCOUNT_NO_MASKED", "PLN_AREA_C", "POSTAL_CD_FINAL", "PREMISE_TYPE", "MONTH", "PERTURBATED_CONSUMPTION", "PERTURBATED_AMT"

var EcpSchema = new Schema({

    CONTRACT_ACCOUNT_NO_MASKED: {
        type: Number,
        default: 0
    },
    PLN_AREA_C: {
        type: String,
        default: ''
    },
    POSTAL_CD_FINAL: {
        type: Number,
        default: 0
    },
    PREMISE_TYPE: {
        type: String,
        default: ''
    },
    MONTH: {
        type: Number,
        default: 0
    },
    PERTURBATED_CONSUMPTION: {
        type: Number,
        default: 0
    },
    PERTURBATED_AMT: {
        type: Number,
        default: 0
    }

});

/**
 * Validations
 */

// // assign a function to the "statics" object of our animalSchema
// animalSchema.statics.findByName = function (name, cb) {
//   this.find({ name: new RegExp(name, 'i') }, cb);
// }



/**
 * Statics
 */
EcpSchema.statics = {

    findByPostal : function(postalId, cb){

        console.log(postalId);
        var postalIdInt = parseInt(postalId,10);
        var query = this.find({POSTAL_CD_FINAL: postalIdInt}).exec(cb);



        /*
        console.log(query);
        var promise = query.exec();
        promise.addBack(function (err, docs) {
            console.log(docs);
        });
        */

    }


};

mongoose.model('ecp_2012', EcpSchema, 'ecp_2012');
