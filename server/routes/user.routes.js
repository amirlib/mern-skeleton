import express from 'express';
import { hasAuthorization, requireLogin } from '../controllers/auth.controller';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/users')
  .get(requireLogin, userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(requireLogin, userCtrl.read)
  .patch(requireLogin, hasAuthorization, userCtrl.update)
  .delete(requireLogin, hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userById);

export default router;
