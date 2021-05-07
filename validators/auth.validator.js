import Joi from 'joi';

export const validateRegistration = data => {
    const RegistrationValidationSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().max(11).required()
    });

    const  {error, value} = RegistrationValidationSchema.validate(data);
    return {error, value};
};

export const validateLoginData = data => {
    const LoginValidationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const {error, value} = LoginValidationSchema.validate(data);
    return { error, value};
}