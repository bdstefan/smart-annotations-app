let mongoose = require('mongoose');

let AnnotationSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Annotation', AnnotationSchema)
