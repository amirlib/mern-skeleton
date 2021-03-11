import express from 'express';
import multer from 'multer';
import { multerConfig } from '../config/multer.config';
import { hasAuthorization, requireLogin } from '../controllers/auth.controller';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();
const upload = multer(multerConfig);

router.route('/api/users')
  .get(
    requireLogin,
    userCtrl.list,
  )
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .delete(
    requireLogin,
    hasAuthorization,
    userCtrl.remove,
  )
  .get(
    requireLogin,
    userCtrl.read,
  )
  .patch(
    requireLogin,
    hasAuthorization,
    upload.single('profilePicture'),
    userCtrl.update,
  );

router.param('userId', userCtrl.userById);

export default router;
