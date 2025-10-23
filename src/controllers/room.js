import Room from '../models/room.js';

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRoom = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newRoom = new Room({ name, description });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};