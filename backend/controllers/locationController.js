import Location from '../models/Location.js';
import { getChildren, getPath, getByLevel, countDescendants } from '../models/locationHelpers.js';

// Get all locations with optional filtering by level and parent
export const getLocations = async (req, res, next) => {
    try {
        const { level, parent } = req.query;
        const filter = {};
        if (level !== undefined) filter.level = +level;
        if (parent) filter.parent = parent;
        const locations = await Location.find(filter).sort('name');
        res.json(locations);
    } catch (e) {
        next(e);
    }
};