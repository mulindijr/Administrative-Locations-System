import express from 'express';
import * as C from '../controllers/locationController.js'
import preventCircular from '../middleware/preventCircular.js';

const router = express.Router();

router.get('/stats', C.getLocationStats);
router.get('/', C.getLocations);
router.get('/level/:level', C.getLocationsByLevel);
router.get('/:id/children', C.getLocationChildren);
router.get('/:id/path', C.getLocationPath);
router.get('/:id', C.getLocation);

router.post('/', preventCircular, C.createLocation);
router.put('/:id', preventCircular, C.updateLocation);
router.delete('/:id', C.deleteLocation);

export default router;