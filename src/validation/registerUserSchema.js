import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    'any.required': '{{#label}} Is Required!',
    'string.min': 'Min string length is not achieved!',
    'string.max': 'Maximum string length exceeded!',
  }),
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});


// import Joi from 'joi'; предположительно это

// export const registerUserSchema = Joi.object({
//   name: Joi.string().required().min(3).max(30).messages({
//     'any.required': 'Поле "Имя" обязательно для заполнения.',
//     'string.min': 'Поле "Имя" должно содержать минимум 3 символа.',
//     'string.max': 'Поле "Имя" должно содержать не более 30 символов.',
//   }),
//   email: Joi.string().email().required().messages({
//     'any.required': 'Поле "Электронная почта" обязательно для заполнения.',
//     'string.email': 'Введите корректный адрес электронной почты.',
//   }),
//   password: Joi.string().required().min(8).messages({
//     'any.required': 'Поле "Пароль" обязательно для заполнения.',
//     'string.min': 'Пароль должен содержать минимум 8 символов.',
//   }),
// });
