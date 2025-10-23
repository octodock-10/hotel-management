import { v4 as uuidv4 } from 'uuid';

/**
 * Booking model representing a dock reservation.
 */
export default class Booking {
  /**
   * @param {Object} params
   * @param {string} [params.id]
   * @param {string} params.userId - Identifier of the user who made the booking.
   * @param {string} params.dockId - Identifier of the dock being booked.
   * @param {Date|string} params.startTime - Start time of the booking.
   * @param {Date|string} params.endTime - End time of the booking.
   * @param {string} [params.status='PENDING'] - Current status (PENDING, CONFIRMED, CANCELLED).
   */
  constructor({ id, userId, dockId, startTime, endTime, status = 'PENDING' }) {
    if (!userId) throw new Error('userId is required');
    if (!dockId) throw new Error('dockId is required');
    if (!startTime) throw new Error('startTime is required');
    if (!endTime) throw new Error('endTime is required');
    this.id = id || uuidv4();
    this.userId = userId;
    this.dockId = dockId;
    this.startTime = new Date(startTime);
    this.endTime = new Date(endTime);
    if (this.endTime <= this.startTime) {
      throw new Error('endTime must be after startTime');
    }
    this.status = status;
  }

  /**
   * Validate the booking data.
   * @returns {boolean}
   */
  isValid() {
    return (
      typeof this.userId === 'string' &&
      typeof this.dockId === 'string' &&
      this.startTime instanceof Date &&
      this.endTime instanceof Date &&
      this.endTime > this.startTime &&
      ['PENDING', 'CONFIRMED', 'CANCELLED'].includes(this.status)
    );
  }

  /**
   * Determine if this booking overlaps with another booking.
   * @param {Booking} other
   * @returns {boolean}
   */
  overlaps(other) {
    if (this.dockId !== other.dockId) return false;
    return this.startTime < other.endTime && other.startTime < this.endTime;
  }

  /**
   * Convert the booking to a plain object suitable for JSON serialization.
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      dockId: this.dockId,
      startTime: this.startTime.toISOString(),
      endTime: this.endTime.toISOString(),
      status: this.status,
    };
  }
}
