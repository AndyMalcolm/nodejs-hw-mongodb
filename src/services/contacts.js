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
    return Contact.findOne({_id: contactId, userId });
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
