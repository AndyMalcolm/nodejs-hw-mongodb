// // тут тоже вроде норм, а вроде ошибка тут и в контакт сервисес
// import { Router } from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { createContactSchema } from '../validation/createContactSchema.js';
// import { updateContactSchema } from '../validation/updateContactSchema.js';

// import {
//   createContactController,
//   deleteContactByIdController,
//   getContactByIdController,
//   getContactsController,
//   patchContactController,
//   // putContactController,
// } from '../controllers/contacts.js';

// const contactsRouter = Router();

// contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

// contactsRouter.get(
//   '/contacts/:contactId',
//   ctrlWrapper(getContactByIdController),
// );

// contactsRouter.post(
//   '/contacts',
//   validateBody(createContactSchema),
//   ctrlWrapper(createContactController),
// );

// contactsRouter.put(
//   '/contacts/:contactId',
//   validateBody(createContactSchema),
//   // ctrlWrapper(putContactController),
// );

// contactsRouter.patch(
//   '/contacts/:contactId',
//   validateBody(updateContactSchema),
//   ctrlWrapper(patchContactController),
// );


// contactsRouter.delete(
//   '/contacts/:contactId',
//   ctrlWrapper(deleteContactByIdController),
// );

// export default contactsRouter;


import express from "express";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import {
    createContactSchema,
    updateContactSchema
} from "../db/validation/contact.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";



const router = express.Router();

const jsonParser = express.json();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId("contactId"), ctrlWrapper(getContactByIdController));

router.post("/", jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:contactId", isValidId("contactId"), jsonParser, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete("/:contactId", isValidId("contactId"), ctrlWrapper(deleteContactController));

export default router;
