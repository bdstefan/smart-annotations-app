let express = require('express');
let router  = express.Router();
let createError     = require('http-errors');
let mongooseClient  = require('mongoose');
const Annotation = require('../models/annotation');

try {
  let db = mongooseClient.connect('mongodb://admin:secret@0.0.0.0:27017/smart_annotations', {useNewUrlParser: true});
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
router.post('/', async (req, res, next) => {
  const annotation = new Annotation({
    comment: req.body.comment
  });

  try {
    const annotationModel = await annotation.save();
    res.status(201).json({message: annotationModel});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
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
