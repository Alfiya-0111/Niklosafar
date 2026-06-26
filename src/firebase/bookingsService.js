import { ref, push, set, serverTimestamp } from "firebase/database";
import { db } from "./config";

/**
 * Saves a booking to Realtime Database.
 */
export async function createBooking(bookingData) {
  const bookingsRef = ref(db, "bookings");
  const newBookingRef = push(bookingsRef);
  await set(newBookingRef, {
    ...bookingData,
    createdAt: serverTimestamp(),
  });
  return newBookingRef.key;
}