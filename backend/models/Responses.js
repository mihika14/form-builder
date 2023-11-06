const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    questionId: { type: String, required: true },
    response: { type: String, required: true },
});

module.exports = mongoose.model('responses', ResponseSchema);
