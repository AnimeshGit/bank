const mongoose = require('mongoose')
var plugin = require('mongoose-createdat-updatedat');

const atmSchema = mongoose.Schema({
    currency_denomination:{
        type:Number,
        unique:true
    },
    count:{
        type:Number
    }   
})

atmSchema.plugin(plugin)
module.exports = mongoose.model('Atms',atmSchema)