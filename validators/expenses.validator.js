import Joi from "joi";

export const validateExpenses = (data) => {
  const ExpensesValidationSchema = Joi.object({
    amount: Joi.number().min(0).required(),
    description: Joi.string(),
  });

  const { error, value } = ExpensesValidationSchema.validate(data);
  return { error, value };
};
