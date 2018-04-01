const mongoose = require('mongoose')
var plugin = require('mongoose-createdat-updatedat');

const CardsSchema = mongoose.Schema({
    card_number:{
        type:Number,
        unique:true
    },
    pin:{
        type:Number,
        unique:true
    },
    balance:{
        type:Number
    }   
})

CardsSchema.plugin(plugin)
module.exports = mongoose.model('Cards',CardsSchema)