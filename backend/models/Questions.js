const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        question: { type: String, required: true },
        solution: { type: String, required: true } // Add a solution field
    },
    {
      collection: "questions",
    }
);

module.exports = mongoose.model('questions', QuestionSchema);
