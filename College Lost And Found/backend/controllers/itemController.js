import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, user: req.user.id });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
