// import {
//   createContact,
//   deleteContactById,
//   getAllContacts,
//   getContactById,
//   upsertsContact,
// } from '../services/contacts.js';
// import createHttpError from 'http-errors';
// import { isValidContactId } from '../middlewares/isValidContactId.js';
// import { parsePaginationPrams } from '../utils/parsePaginationParams.js';
// import { parseSortParams } from '../utils/parseSortParams.js';
// import { parseFilterParams } from '../utils/parseFilterParams.js';

// export const getContactsController = async (req, res) => {
//   const { page, perPage } = parsePaginationPrams(req.query);
//   const { sortBy, sortOrder } = parseSortParams(req.query);
//   const filter = parseFilterParams(req.query);

//   const contacts = await getAllContacts({
//     page,
//     perPage,
//     sortBy,
//     sortOrder,
//     filter,
//     userId: req.user._id,
//   });

//   res.json({
//     status: 200,
//     message: 'Successfully found contacts!',
//     data: contacts,
//   });
// };

// export const getContactByIdController = async (req, res) => {
//   const {
//     params: { contactId },
//     user: { _id: userId },
//   } = req;

//   const contact = await getContactById(contactId, userId);

//   if (!contact) {
//     throw createHttpError(404, { message: 'Contact not found' });
//   }

//   res.json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// export const createContactController = async (req, res) => {
//   const { body, user } = req;
//   const contact = await createContact(body, user._id);

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: contact,
//   });
// };

// export const patchContactController = async (req, res) => {
//   const { body, user } = req;
//   const contactId = isValidContactId(req, res);

//   const contact = await upsertsContact(contactId, user._id, body);

//   if (!contact.result) {
//     throw createHttpError(404, { message: 'Contact not found' });
//   }

//   const status = contact.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: 'Successfully patched a contact!',
//     data: contact.result,
//   });
// };

// export const putContactController = async (req, res) => {
//   const { body, user } = req;
//   const contactId = isValidContactId(req, res);

//   const contact = await upsertsContact(contactId, user._id, body, {
//     upsert: true,
//   });

//   if (!contact.result) {
//     throw createHttpError(404, { message: 'Contact not found' });
//   }

//   const status = contact.isNew ? 201 : 200;

//   res.status(status).json({
//     status,
//     message: 'Successfully upserted contact!',
//     data: contact.result,
//   });
// };

// export const deleteContactByIdController = async (req, res) => {
//   const {
//     params: { contactId },
//     user: { _id: userId },
//   } = req;

//   const contact = await deleteContactById(contactId, userId);

//   if (!contact) {
//     throw createHttpError(404, { message: 'Contact not found' });
//   }

//   res.status(204).send();
// };

// // в роутерс странно что-то с файлами, может я не то создал
// // походу с роутерами всё ок. из сервера можно удалить старый код, errorHandler и validateBody походу не трогать
import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContactById,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    userId: req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (contact === null) {
    return next(createHttpError.NotFound(404, 'Contact not found'));
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError.NotFound('Contact not found'));
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
    userId: req.user._id,
  };

  const createdContact = await createContact(contact);

  res.send({
    status: 201,
    message: `Successfully created a contact!`,
    data: createdContact,
  });
}

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await updateContact(contactId, req.body, req.user._id);

    if (result === null) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContactById(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).end();
};
