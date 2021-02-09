import express from 'express';
import { render } from '../controllers/client.controller';

const router = express.Router();

router.route('*')
  .get(render);

export default router;
