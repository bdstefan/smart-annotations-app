var express = require('express');
var router = express.Router();

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
  res.status(201).json({message: 'Successfully created'});
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
