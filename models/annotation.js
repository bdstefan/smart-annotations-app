const mongoose = require('mongoose');

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

AnnotationSchema.pre('save', function(next) {
    this.increment();
    this.modified = new Date();
    return next();
});

module.exports = mongoose.model('Annotation', AnnotationSchema)
