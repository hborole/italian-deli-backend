const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');

const productController = require('../controllers/product.controller');

const router = require('express').Router();

// Create Product
router.post(
  '/',
  requireAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price')
      .isNumeric()
      .withMessage('Price is required and must be greater than 0'),
    body('category_id').notEmpty().withMessage('Category Id is required'),
  ],
  validateRequest,
  productController.createProduct
);

// Get Products
router.get('/', productController.getProducts);

// Get Product
router.get('/:id', productController.getProduct);

// Update Product
router.put(
  '/',
  requireAuth,
  [
    body('id').notEmpty().withMessage('ID is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price')
      .isNumeric()
      .withMessage('Price is required and must be greater than 0'),
    body('category_id').notEmpty().withMessage('Category Id is required'),
  ],
  validateRequest,
  productController.updateProduct
);

// Delete Product
router.delete(
  '/',
  requireAuth,
  [body('id').notEmpty().withMessage('ID is required')],
  validateRequest,
  productController.deleteProduct
);

module.exports = router;