import { model } from 'mongoose';
import { Contact } from './contact';

export const ContactsCollection = model('contacts', Contact);
