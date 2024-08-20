// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, { abortEarly: false, convert: false });
//     next();
//   } catch (err) {
//     const error = createHttpError(400, 'Bad request', {
//       errors: err.dateils,
//     });
//     next(error);
//   }
// }; старая

// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, {
//       abortEarly: false, 
//       convert: false,
//     });
//     next();
//   } catch (err) {
//     const errorMessages = err.details.map(detail => detail.message);
//     const error = createHttpError(400, 'Validation error', {
//       errors: errorMessages,
//     });
//     next(error);
//   }
// };
// вроде тут тоже гуд

import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { 
      abortEarly: false, 
      convert: false 
    });
    next();
  } catch (err) {
    const errorMessages = err.details.map(detail => detail.message);
    const error = createHttpError(400, 'Validation error', {
      errors: errorMessages,
    });
    if (req.accepts('json')) {
      res.status(400).json({ 
        message: 'Validation error',
        errors: errorMessages 
      });
    } else {
      next(error);
    }
  }
};
