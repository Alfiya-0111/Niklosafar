import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const carsCollection = collection(db, "cars");

/**
 * Subscribes to live updates of all cars. Calls `callback` with the full
 * array every time anything changes in Firestore (e.g. admin adds a car).
 * Returns an unsubscribe function — call it on component unmount.
 */
export function subscribeToCars(callback, onError) {
  return onSnapshot(
    carsCollection,
    (snapshot) => {
      const cars = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(cars);
    },
    (error) => {
      console.error("Error listening to cars:", error);
      if (onError) onError(error);
    }
  );
}

export async function addCar(carData) {
  return addDoc(carsCollection, {
    ...carData,
    createdAt: serverTimestamp(),
  });
}

export async function updateCar(carId, carData) {
  const carRef = doc(db, "cars", carId);
  return updateDoc(carRef, carData);
}

export async function deleteCar(carId) {
  const carRef = doc(db, "cars", carId);
  return deleteDoc(carRef);
}
