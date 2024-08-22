import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  putContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { ROLES } from '../constants/constants.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidContactId } from '../middlewares/isValidContactId.js';

const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.use('./:contactId', isValidContactId('contactId'));

contactsRouter.get(
  '/',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.put(
  '/:contactId',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;
