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


// // MAYBE THIS IS GOOD
// import { SORT_ORDER } from '../constants/constants.js'; // в первом видео 1:30 про токены
// import { Contact } from '../db/models/contact.js';
// import { createPaginationData } from '../utils/createPaginationData.js';

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

//   const contactsQuery = Contact.find({ userId });

//   if (filter.contactType) {
//     contactsQuery.where('contactType').equals(filter.contactType);
//   }
//   if (filter.isFavourite) {
//     contactsQuery.where('isFavourite').equals(filter.isFavourite);
//   }

//   const contactsCount = await Contact.find({ userId })
//     .merge(contactsQuery)
//     .countDocuments();

//   const contacts = await contactsQuery
//     .skip(skip)
//     .limit(limit)
//     .sort({ [sortBy]: sortOrder })
//     .exec();

//   const paginationData = createPaginationData(contactsCount, page, perPage);
//   return {
//     data: contacts,
//     ...paginationData,
//   };
// };

// export const getContactById = async (contactId, userId) => {
//   const contact = await Contact.findOne({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };

// export const createContact = async (payload) => {
//   const newContact = await Contact.create(payload);
//   return newContact;
// };

// export const upsertsContact = async (
//   contactId,
//   payload,
//   userId,
//   options = {},
// ) => {
//   const updateContact = await Contact.findOneAndUpdate(
//     {
//       _id: contactId,
//       userId,
//     },
//     payload,
//     {
//       new: true,
//       ...options,
//     },
//   );
//   return updateContact;
// };

// export const deleteContactById = async (contactId, userId) => {
//   const contact = await Contact.findOneAndDelete({
//     _id: contactId,
//     userId,
//   });
//   return contact;
// };

// // MAYBE ADD THIS
// // export const patchContactById = async (contactId, userId, payload) => {
// //   const updatedContact = await Contact.findOneAndUpdate(
// //     { _id: contactId, userId },
// //     payload,
// //     { new: true }
// //   );

// //   if (!updatedContact) {
// //     throw new Error('Contact not found or unauthorized to update');
// //   }

// //   return updatedContact;
// // };



// TRY TO CHANGE TO THIS
import { Contact } from '../db/models/contact.js';

export async function getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
}) {
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();


   if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

   if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

    contactQuery.where("userId").equals(userId);

    const [count, contacts] = await Promise.all([
        Contact.countDocuments(contactQuery),
        contactQuery
            .sort({[sortBy]: sortOrder})
            .skip(skip)
            .limit(perPage),

    ]);

    const totalPages = Math.ceil(count / perPage);

    return {
        data: contacts,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: totalPages - page > 0,
    };
}

export function getContactById(contactId, userId) {
    return Contact.findById({_id: contactId, userId });
}

export function createContact(payload) {
    return Contact.create(payload);
}

export function updateContact(contactId, userId, updateData){
    return Contact.findOneAndUpdate({ _id: contactId, userId }, updateData, {
        new: true,
        runValidators: true,
    });
}
export const upsertsContact = async (_id, userId, payload, options = {}) => {
  console.log('Received _id:', _id);
  console.log('Received userId:', userId);
  const result = await Contact.findOneAndUpdate({ _id: (_id), userId: (userId) }, payload, {
    new: true,
    includesResultMetadata: true,
    ...options,
  });

  return {
    result,
    isNew: !result?.lastErrorObject?.updatedExisting,
  };
};
export function deleteContactById(contactId, userId) {
    return Contact.findOneAndDelete({_id: contactId, userId});
}
