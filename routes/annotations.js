let express = require('express');
let router  = express.Router();
let createError  = require('http-errors');
let mongooseClient = require('mongoose');

try {
  let db = mongooseClient.connect('mongodb+srv://admin:secret@mongo:27017/smart_annotations', {useNewUrlParser: true});
} catch (error) {
  createError(error);
}


/**
 * Get all annotations
 */
router.get('/', (req, res, next) => {
  res.json([{name: 'Annotation 1'}, {name: 'Annotation 2'}]);
});

/**
 * Create new annotation
 */
router.post('/', (req, res, next) => {
  res.status(201).json({message: 'Successfully created.'});
});

/**
 * Get single annotation
 */
router.get('/:id', (req, res, next) => {
  res.json({message: 'Return annotation with id: ' + req.params.id});
});

/**
 * Update single annotation
 */
router.put('/:id', (req, res, next) => {
  res.json({message: 'Updated annotation with id: ' + req.params.id});
});

/**
 * Soft delete an annotation
 */
router.delete('/:id', (req, res, next) => {
  res.json({message: 'Deleted annotation with id: ' + req.params.id});
});

module.exports = router;
