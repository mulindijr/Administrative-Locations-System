import Location from './Location.js';

// Get all direct children of a location
export async function getChildren(parentId) {
    return Location.find({ parent: parentId }).sort('name');
}

//Get full path from root to this location
export async function getPath(id) {
    const path = [];
    let cur = await Location.findById(id);
    while (cur) {
        path.unshift({ id: cur._id, name: cur.name, level: cur.level });
        cur = cur.parent ? await Location.findById(cur.parent) : null;
    }
    return path;
}

// Get all locations at a specific level
export async function getByLevel(level) {
    return Location.find({ level }).sort('name');
}

// Count all children, grandchildren, etc.
export async function countDescendants(parentId) {
    let cnt = 0;
    async function go(id) {
        const kids = await Location.find({ parent: id }, '_id');
        cnt += kids.length;
        for (let k of kids) await go(k._id);
    }
    await go(parentId);
    return cnt;
}