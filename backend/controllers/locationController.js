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

// Get a single location by ID
export const getLocation = async (req, res, next) => {
    try {
        const loc = await Location.findById(req.params.id);
        if (!loc) return res.status(404).json({ error: 'Location not found' });
        res.json(loc);
    } catch (e) {
        next(e);
    }
};

// Get direct children of a location
export const getLocationChildren = async (req, res, next) => {
    try {
        const children = await getChildren(req.params.id);
        res.json(children);
    } catch (e) {
        next(e);
    }
};

// Get all locations by level
export const getLocationsByLevel = async (req, res, next) => {
    try {
        const level = +req.params.level;
        if (![0, 1, 2, 3].includes(level)) {
            return res.status(400).json({ error: 'Invalid level' });
        }
        const locations = await getByLevel(level);
        res.json(locations);
    } catch (e) {
        next(e);
    }
};