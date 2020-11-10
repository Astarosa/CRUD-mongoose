"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WilderSchema = new Schema({
    name: { type: String, unique: true },
    city: { type: String },
    skills: [{ title: String, count: Number }]
});
const Wilder = mongoose.model('Wilder', WilderSchema);
module.exports = { Wilder };
//# sourceMappingURL=wilder.js.map