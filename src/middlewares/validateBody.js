import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false, convert: false });
    next();
  } catch (error) {
    const err = createHttpError(400, 'Bad request!', { errors: error.details });
    next(err);
  }
};



// import createHttpError from 'http-errors'; предположительно это

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, { abortEarly: false, convert: false });
//     next();
//   } catch (error) {
//     const errors = error.details.map((detail) => detail.message);
//     const err = createHttpError(400, 'Ошибка валидации данных', { errors });
//     next(err);
//   }
// };
