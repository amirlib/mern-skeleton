import express from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { userByCredentials } from '../controllers/user.controller';

const router = express.Router();

router.route('/auth/login')
  .post(authCtrl.login);

router.route('/auth/logout')
  .get(authCtrl.requireLogin, userByCredentials, authCtrl.logout);

router.route('/auth/logoutAll')
  .get(authCtrl.requireLogin, userByCredentials, authCtrl.logoutAll);

export default router;
