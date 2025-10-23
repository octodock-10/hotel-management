import asyncHandler from '../middlewares/asyncHandler.js';
import { createBooking as createBookingService, getBookingById, updateBooking as updateBookingService, deleteBooking as deleteBookingService, getAllBookings } from '../services/bookingService.js';

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body);
  res.status(201).json({ success: true, data: booking });
});

export const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await getBookingById(id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  res.json({ success: true, data: booking });
});

export const listBookings = asyncHandler(async (req, res) => {
  const bookings = await getAllBookings();
  res.json({ success: true, count: bookings.length, data: bookings });
});

export const updateBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await updateBookingService(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  res.json({ success: true, data: updated });
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteBookingService(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  res.status(204).send();
});