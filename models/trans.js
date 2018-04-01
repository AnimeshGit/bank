const mongoose = require('mongoose')
var plugin = require('mongoose-createdat-updatedat');

const TranSchema = mongoose.Schema({
    trans_amount:{
        type:Number
    },
    card_number:{
        type:Number
    }
})

TranSchema.plugin(plugin)
module.exports = mongoose.model('Trans',TranSchema)