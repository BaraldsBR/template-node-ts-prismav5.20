import { body } from 'express-validator';

const createUserSchema = [
  body('name').isString().isLength({ min: 1 }),
  body('email').isString().isEmail().normalizeEmail(),
  body('cpf').isString().isLength({ min: 1 }),
  body('phone').isString().isLength({ min: 1 }),
  body('password').isString().isLength({ min: 1 }),
];

export default createUserSchema;
