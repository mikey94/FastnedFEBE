import mongoose from 'mongoose';
const {Schema, model} = mongoose;

export const chargerSchema = new Schema({
  id: Number,
  type: String,
  serialNumber: String,
  status: String,
  lastUpdated: String,
});

model('Charger', chargerSchema);
