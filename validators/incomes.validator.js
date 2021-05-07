import Joi from "joi";

export const validateIncomes = (data) => {
  const IncomeValidationSchema = Joi.object({
    amount: Joi.number().min(0).required(),
    description: Joi.string(),
  });

  const { error, value } = IncomeValidationSchema.validate(data);
  return { error, value };
};
