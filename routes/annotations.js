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
router.patch('/:id', async (req, res, next) => {
  try {
    let annotation = await Annotation.findById(req.params.id);
    if (req.body.comment != null) {
      annotation.comment = req.body.comment;
    }
    annotation.save();
    res.json(annotation);
  } catch (error) {
    createError(error);
  }
});

/**
 * Delete an annotation
 */
router.delete('/:id', async(req, res, next) => {
  try {
    let annotation = await Annotation.findById(req.params.id);
    annotation.remove();

    res.status(204)
  } catch (error) {
    createError(error);
  }
});

module.exports = router;
