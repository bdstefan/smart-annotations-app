let mongoose = require('mongoose');

let AnnotationSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Annotation', AnnotationSchema)
