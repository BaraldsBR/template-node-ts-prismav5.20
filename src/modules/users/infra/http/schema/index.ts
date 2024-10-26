import createUserSchema from './createUserSchema';
import updateUserSchema from './updateUserSchema';

const userSchemas = {
  create: createUserSchema,
  update: updateUserSchema,
};

export default userSchemas;
