const mongoose = require('mongoose');
const Schema = mongoose.Schema

const providerSchema = new Schema({
    provider: String,
})

const ProviderSchema = mongoose.model('provider', providerSchema)
module.exports = ProviderSchema