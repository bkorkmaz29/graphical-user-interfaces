import express from 'express';

import { getEntries, createEntry, deleteEntry, updateEntry } from '../controllers/entries.js';

const router = express.Router();

router.get('/:user/:month', getEntries);

router.post('/:user/:month', createEntry);

router.delete('/:user/:month/:id', deleteEntry);

router.patch('/:user/:month/:id', updateEntry);

export default router;
