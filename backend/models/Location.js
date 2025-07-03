import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    level: { type: Number, required: true, enum: [0, 1, 2, 3] },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null },
    population: Number,
    area: Number,
    coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }
    }
}, { timestamps: true });

locationSchema.index({ coordinates: '2dsphere' });

// Parent-child level validation
locationSchema.pre('validate', async function (next) {
    if (this.level === 0 && this.parent) this.invalidate('parent', 'Country cannot have a parent');
    if (this.level > 0 && !this.parent) this.invalidate('parent', 'Parent required for non-country locations');
    if (this.parent) {
      const parent = await mongoose.model('Location').findById(this.parent);
      if (parent && parent.level !== this.level - 1) this.invalidate('parent', `Parent must be level ${this.level - 1}`);
    }
    next();
});

const Location = mongoose.model('Location', locationSchema);
export default Location;