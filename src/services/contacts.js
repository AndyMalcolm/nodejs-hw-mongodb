// // import mongoose from 'mongoose';
// import { SORT_ORDER } from '../constants/constants.js';
// import { Contact } from '../db/models/contact.js';
// import { createPaginationData } from '../utils/createPaginationData.js';

// // const { ObjectId } = mongoose.Types;

// export const getAllContacts = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   const contactQuery = Contact.find({ userId: (userId) });

//   if (filter.contactType) {
//     contactQuery.where('contactType').equals(filter.contactType);
//   }

//   if (filter.isFavourite) {
//     contactQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const [contactCount, contacts] = await Promise.all([
//     Contact.find().merge(contactQuery).countDocuments(),
//     contactQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//   const paginationData = createPaginationData(contactCount, perPage, page);

//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = (_id, userId) => {
//   const contact = Contact.findOne({ _id: (_id), userId: (userId) });
//   return contact;
// };

// export const createContact = (payload, userId) => {
//   const contact = Contact.create({ ...payload, userId: (userId) });
//   return contact;
// };

// export const upsertsContact = async (_id, userId, payload, options = {}) => {
//   console.log('Received _id:', _id);
//   console.log('Received userId:', userId);
//   const result = await Contact.findOneAndUpdate({ _id: (_id), userId: (userId) }, payload, {
//     new: true,
//     includesResultMetadata: true,
//     ...options,
//   });

//   return {
//     result,
//     isNew: !result?.lastErrorObject?.updatedExisting,
//   };
// };

// export const deleteContactById = async (contactId, userId) => {
//   const result = await Contact.findOneAndDelete({ _id: (contactId), userId: (userId) });
//   return result;
// };
// OLD CODE


// MAYBE THIS IS GOOD
import { SORT_ORDER } from '../constants/constants.js';
import { Contact } from '../db/models/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await Contact.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = createPaginationData(contactsCount, page, perPage);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await Contact.create(payload);
  return newContact;
};

export const upsertsContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const updateContact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      userId,
    },
    payload,
    {
      new: true,
      ...options,
    },
  );
  return updateContact;
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
