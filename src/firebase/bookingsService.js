import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

const bookingsCollection = collection(db, "bookings");

/**
 * Saves a booking to Firestore. Call this once the rider has paid the
 * advance (or chosen to pay later), so every booking — paid or not — is
 * recorded and visible to the admin.
 */
export async function createBooking(bookingData) {
  return addDoc(bookingsCollection, {
    ...bookingData,
    createdAt: serverTimestamp(),
  });
}
