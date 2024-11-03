import { Router } from 'express';
import { getUsers, createUser } from './controllers';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);

export default router;