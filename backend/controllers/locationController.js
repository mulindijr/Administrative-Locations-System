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

// Get breadcrumb path from root to location
export const getLocationPath = async (req, res, next) => {
    try {
        const path = await getPath(req.params.id);
        res.json(path);
    } catch (e) {
        next(e);
    }
};

// Create a new location
export const createLocation = async (req, res, next) => {
    try {
        const loc = new Location(req.body);
        await loc.save();
        res.status(201).json(loc);
    } catch (e) {
        next(e);
    }
};

// Update an existing location
export const updateLocation = async (req, res, next) => {
    try {
        const loc = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!loc) return res.status(404).json({ error: 'Location not found' });
        res.json(loc);
    } catch (e) {
        next(e);
    }
};

// Delete a location (only if it has no descendants)
export const deleteLocation = async (req, res, next) => {
    try {
        const descendantCount = await countDescendants(req.params.id);
        if (descendantCount > 0) {
            return res.status(400).json({ error: `${descendantCount} descendant(s) exist` });
        }

        const deleted = await Location.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Location not found' });

        res.json({ message: 'Location deleted successfully' });
    } catch (e) {
        next(e);
    }
};

// Get counts of countries, states, cities, and districts
export const getLocationStats = async (req, res, next) => {
    try {
        const [countries, states, cities, districts] = await Promise.all([
            Location.countDocuments({ level: 0 }),
            Location.countDocuments({ level: 1 }),
            Location.countDocuments({ level: 2 }),
            Location.countDocuments({ level: 3 })
        ]);
        res.json({ countries, states, cities, districts });
    } catch (e) {
        next(e);
    }
};