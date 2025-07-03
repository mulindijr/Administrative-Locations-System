import Location from '../models/Location.js';

export default async (req,res,next) => {
    const { parent } = req.body;
    const id = req.params.id;
    if (!parent) return next();
    if (parent === id)
        return res.status(400).json({ error:'Cannot be own parent' });
    let cur = await Location.findById(parent);
    while (cur) {
        if (!cur.parent) break;
        if (cur.parent.toString() === id)
            return res.status(400).json({ error:'Circular ref detected' });
        cur = await Location.findById(cur.parent);
    }
    next();
};