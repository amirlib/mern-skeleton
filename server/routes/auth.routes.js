import express from 'express';
import * as authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/login')
  .post(authCtrl.login);

router.route('/auth/logout')
  .get(authCtrl.requireLogin, authCtrl.logout);

router.route('/auth/logoutAll')
  .get(authCtrl.requireLogin, authCtrl.logoutAll);

router.route('/auth/verify')
  .post(authCtrl.verify);

export default router;
