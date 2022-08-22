import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();
import Locations from '../models/locations.js';

// / Get all
router.get('/get-locations', async (req, res) => {
  try {
    const locations = await Locations.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Create location
router.post('/add-locations', async (req, res) => {
  const locations = new Locations({
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    postalCode: req.body.postalCode,
    lastUpdated: req.body.lastUpdated,
    country: req.body.country,
    chargers: req.body.chargers,
  });
  try {
    const newLocation = await locations.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Delete location
router.delete('/delete-location', getLocation, async (req, res) => {
  try {
    await res.location.remove();
    res.json({message: 'Location deleted successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Edit location
router.patch('/edit-location', getLocation, async (req, res) => {
  const {name, location, postalCode, country, chargers} = req.body;
  if (name !== null) {
    res.location.name = name;
  }
  if (location !== null) {
    res.location.location = location;
  }
  if (postalCode !== null) {
    res.location.postalCode = postalCode;
  }
  if (country !== null) {
    res.location.country = country;
  }
  if (typeof chargers !== 'undefined') {
    res.location.chargers = chargers;
  }
  try {
    const updatedLocation = await res.location.save();
    res.json(updatedLocation);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

async function getLocation(req, res, next) {
  const {id} = req.body;
  let location;
  try {
    const locations = await Locations.find();
    location = locations.find((loc) => loc.id === id);
    if (location === null) {
      return res.status(404).json({message: 'Cannot find the Location'});
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
  res.location = location;
  next();
}

export default router;
