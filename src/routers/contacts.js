// // // тут тоже вроде норм, а вроде ошибка тут и в контакт сервисес
// // import { Router } from 'express';
// // import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// // import { validateBody } from '../middlewares/validateBody.js';
// // import { createContactSchema } from '../validation/createContactSchema.js';
// // import { updateContactSchema } from '../validation/updateContactSchema.js';

// // import {
// //   createContactController,
// //   deleteContactByIdController,
// //   getContactByIdController,
// //   getContactsController,
// //   patchContactController,
// //   // putContactController,
// // } from '../controllers/contacts.js';

// // const contactsRouter = Router();

// // contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

// // contactsRouter.get(
// //   '/contacts/:contactId',
// //   ctrlWrapper(getContactByIdController),
// // );

// // contactsRouter.post(
// //   '/contacts',
// //   validateBody(createContactSchema),
// //   ctrlWrapper(createContactController),
// // );

// // contactsRouter.put(
// //   '/contacts/:contactId',
// //   validateBody(createContactSchema),
// //   // ctrlWrapper(putContactController),
// // );

// // contactsRouter.patch(
// //   '/contacts/:contactId',
// //   validateBody(updateContactSchema),
// //   ctrlWrapper(patchContactController),
// // );


// // contactsRouter.delete(
// //   '/contacts/:contactId',
// //   ctrlWrapper(deleteContactByIdController),
// // );

// // export default contactsRouter;


// import express from "express";
// import {
//     getContactsController,
//     getContactByIdController,
//     createContactController,
//     patchContactController,
//     deleteContactByIdController
// } from "../controllers/contacts.js";
// import { createContactSchema } from '../validation/createContactSchema.js';
// import { updateContactSchema } from '../validation/updateContactSchema.js';
// import { validateBody } from "../middlewares/validateBody.js";
// import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// import { authenticate } from "../middlewares/authenticate.js";
// import { isValidContactId } from "../middlewares/isValidContactId.js";



// const router = express.Router();

// const jsonParser = express.json();

// router.use(authenticate);

// router.get("/", ctrlWrapper(getContactsController));

// router.get("/:contactId", isValidContactId, ctrlWrapper(getContactByIdController));

// router.post("/", jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

// router.patch("/:contactId", isValidContactId, jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

// router.delete("/:contactId", isValidContactId, ctrlWrapper(deleteContactByIdController));

// export default router;
// // тоже не менять пока

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
import { validateBody } from '../middleware/validateBody.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
// import { ROLES } from '../constants/constants.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidContactId } from '../middleware/isValidContactId.js';
import { upload } from '../middlewares/multerUpload.js';

const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.use('./:contactId', isValidContactId('contactId'));

contactsRouter.get(
  '/',
  //   checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

contactsRouter.get(
  '/:contactId',
  //   checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  //   checkRoles(ROLES.ADMIN),
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.put(
  '/:contactId',
  //   checkRoles(ROLES.ADMIN),
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  //   checkRoles(ROLES.ADMIN, ROLES.USER),
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  //   checkRoles(ROLES.ADMIN),
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;
