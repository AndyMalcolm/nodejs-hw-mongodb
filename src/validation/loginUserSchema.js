import Joi from 'joi';

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
  password: Joi.string().required().messages({
    'any.required': '{{#label}} Is Required!',
  }),
});



// import Joi from 'joi'; предположительно это

// export const loginUserSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'any.required': 'Поле "Электронная почта" обязательно для заполнения.',
//     'string.email': 'Введите корректный адрес электронной почты.',
//   }),
//   password: Joi.string().required().messages({
//     'any.required': 'Поле "Пароль" обязательно для заполнения.',
//   }),
// });
