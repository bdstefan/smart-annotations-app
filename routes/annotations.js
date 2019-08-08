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
router.get('/:id', getAnnotation, async (req, res) => {
  res.json(res.annotation);
});

/**
 * Update single annotation
 */
router.patch('/:id', getAnnotation, async (req, res) => {
  try {
    if (req.body.comment != null) {
      res.annotation.comment = req.body.comment;
    }

    res.annotation.save();
    res.json(res.annotation);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

/**
 * Delete an annotation
 */
router.delete('/:id', getAnnotation, async (req, res) => {
  try {
    await res.annotation.remove();
    res.status(204).json();
  } catch (error) {
    createError(error);
  }
});

/**
 * Middelware - get single annotation object
 */
async function getAnnotation(req, res, next) {
  try {
    annotation = await Annotation.findById(req.params.id)
    if (annotation == null) {
      return res.status(404).json({message: "Annotation not found"})
    }
  } catch (error) {
    return createError(error)
  }
  
  res.annotation = annotation
  next()
}


module.exports = router;
