import Joi from "joi";

interface User {
  email: string;
  password: string;
  roleId?: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

export const validateCreateUser = (user: User): ValidationResult => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roleId: Joi.string().hex().length(24).optional(),
  });

  const { error } = schema.validate(user);

  if (error) {
    return { valid: false, message: error.details[0].message };
  }

  return { valid: true, message: "Valid User!" };
};

export const isEmpty = (obj: Record<string, unknown>): boolean => {
  for (let x in obj) {
    return false;
  }
  return true;
};
