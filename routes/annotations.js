let express      = require('express');
let router       = express.Router();
let createError  = require('http-errors');
let Annotation   = require('../models/annotation');

/**
 * Get all annotations
 */
router.get('/', async (req, res, next) => {
  try {
    const annotations = await Annotation.find();
    res.json(annotations);
  } catch (error) {
    createError(error);
  }
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
router.get('/:id', async (req, res, next) => {
  try {
    const annotation = await Annotation.findById(req.params.id);
    res.json(annotation);
  } catch (error) {
    createError(error);
  }
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
