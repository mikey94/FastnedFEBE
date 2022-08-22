import mongoose from 'mongoose';
import {chargerSchema} from './charger.js';
const {Schema, model} = mongoose;

const locationSchema = new Schema({
  id: Number,
  name: String,
  location: Number,
  chargers: {type: [chargerSchema]},
  postalCode: String,
  lastUpdated: String,
  country: String,
});

export default model('Locations', locationSchema);
