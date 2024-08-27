// import mongoose from 'mongoose';
// import { SORT_ORDER } from '../constants/constants.js';
// import { Contact } from '../db/models/contact.js';
// import { createPaginationData } from '../utils/createPaginationData.js';

// const { ObjectId } = mongoose.Types;

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

//   const contactQuery = Contact.find({ userId: ObjectId(userId) });

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
//   const contact = Contact.findOne({ _id: ObjectId(_id), userId: ObjectId(userId) });
//   return contact;
// };

// export const createContact = (payload, userId) => {
//   const contact = Contact.create({ ...payload, userId: ObjectId(userId) });
//   return contact;
// };

// export const upsertsContact = async (_id, userId, payload, options = {}) => {
//   const result = await Contact.findOneAndUpdate({ _id: ObjectId(_id), userId: ObjectId(userId) }, payload, {
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
//   const result = await Contact.findOneAndDelete({ _id: ObjectId(contactId), userId: ObjectId(userId) });
//   return result;
// };OLD OLD OLD
import mongoose from 'mongoose';
import { SORT_ORDER } from '../constants/constants.js';
import { Contact } from '../db/models/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

const { ObjectId } = mongoose.Types;

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

  const contactQuery = Contact.find({ userId: new ObjectId(userId) });

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = createPaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (_id, userId) => {
  const contact = Contact.findOne({ _id: new ObjectId(_id), userId: new ObjectId(userId) });
  return contact;
};

export const createContact = (payload, userId) => {
  const contact = Contact.create({ ...payload, userId: new ObjectId(userId) });
  return contact;
};

export const upsertsContact = async (_id, userId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate({ _id: new ObjectId(_id), userId: new ObjectId(userId) }, payload, {
    new: true,
    includesResultMetadata: true,
    ...options,
  });

  return {
    result,
    isNew: !result?.lastErrorObject?.updatedExisting,
  };
};

export const deleteContactById = async (contactId, userId) => {
  const result = await Contact.findOneAndDelete({ _id: new ObjectId(contactId), userId: new ObjectId(userId) });
  return result;
};
