import express from 'express';
import contactController from '../controllers/contactController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/submit')
  .post(contactController.createContact);
 
router.route('/bug-report/submit')
  .post(contactController.createContact);

router.use(authMiddleware.protect);
router.use(authMiddleware.authorize('admin'));

router.route('/')
   .get(contactController.getAllContacts)
   .delete(contactController.deleteAllContacts);

router.route('/:id')
  .get(contactController.getContactById)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

export default router;