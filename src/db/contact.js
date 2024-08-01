import { Schema } from "mongoose";

import { model } from 'mongoose';
import { Contact } from './contact';

export const ContactsCollection = model('contacts', Contact);

export const Contacts = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },

  phoneNumber: {
    type: String,
    required: [true, 'Set phone number for contact'],
  },

  email: {
    type: String,
    optional: true,
  },

  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: ['work', 'personal', 'home'],
    default: 'personal',
  },
},
  {
    timestamps: true,
    versionKey: false,
  }
);
