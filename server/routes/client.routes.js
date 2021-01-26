import express from 'express';
import { render } from '../controllers/client.controller';

const router = express.Router();

router.route('/login')
  .get(render);

router.route('*')
  .get(render);

export default router;
