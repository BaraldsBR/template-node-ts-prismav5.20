import { body } from 'express-validator';

const updateUserSchema = [
  body('name').optional().isString().isLength({ min: 1 }),
  body('email').optional().isString().isEmail()
    .normalizeEmail(),
  body('cpf').optional().isString().isLength({ min: 1 }),
  body('phone').optional().isString().isLength({ min: 1 }),
  body('password').optional().isString().isLength({ min: 1 }),
];

export default updateUserSchema;
