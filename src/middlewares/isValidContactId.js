// import { isValidObjectId } from 'mongoose';
// import createHttpError from 'http-errors';

// export const isValidContactId = (req, res, next) => {
//   const { contactId } = req.params;
//   if (!isValidObjectId(contactId)) {
//     throw createHttpError(400, 'Bad Request');
//   }

//   next();
// };
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidContactId =
  (contactId = 'id') =>
  (req, res, next) => {
    const id = req.params[contactId];

    if (!id) throw Error('Contact with id ${id} is not valid');

    if (!isValidObjectId(id)) {
      return next(
        createHttpError(
          400,
          'Wrong id. Contact id has to be of 24 alphanumerical symbols length',
        ),
      );
    }
    return next();
  };
