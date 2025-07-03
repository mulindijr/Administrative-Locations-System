import Location from './Location.js';

// Get all direct children of a location
export async function getChildren(parentId) {
    return Location.find({ parent: parentId }).sort('name');
}