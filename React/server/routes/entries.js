import express from 'express';

import { getEntries, createEntry, getEntry, deleteEntry, updateEntry, createUser } from '../controllers/entries.js';

const router = express.Router();

router.get('/:user', getEntries);

router.post('/:user', createEntry);

router.get('/:user/:id', getEntry);

router.delete('/:user/:id', deleteEntry);

router.patch('/:user/:id', updateEntry);

router.post('/user', createUser);
export default router;
