import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "watchful-hull-sdckx",
  appId: "1:299998060479:web:4ba0a5956623d0457d4b0a",
  apiKey: "AIzaSyDhOv3oj53KOlLNCMTuImxPiEnhmC2lN7I",
  authDomain: "watchful-hull-sdckx.firebaseapp.com",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-a6c1d698-5fb1-4ab0-b5aa-22dc01e7ab8f");

export interface CustomImageDoc {
  spotName: string;
  imageUrl: string;
  updatedAt: string;
}

export interface Expense {
  id?: string;
  name: string;
  amount: number;
  currency: 'EUR' | 'GBP' | 'TWD';
  date: string;
  category: 'Food' | 'Transport' | 'Shopping' | 'Accommodation' | 'Other';
  createdAt?: string;
}

export const addExpense = async (expense: Omit<Expense, 'id'>) => {
  return await addDoc(collection(db, 'expenses'), expense);
};

export const deleteExpense = async (id: string) => {
  return await deleteDoc(doc(db, 'expenses', id));
};

export const subscribeToExpenses = (
  callback: (expenses: Expense[]) => void,
  onError?: (error: any) => void
) => {
  const q = collection(db, 'expenses');
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expense);
      // Sort client-side dynamically by createdAt or date to avoid requiring any custom indexes
      items.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0);
        return timeB - timeA;
      });
      callback(items);
    },
    (error) => {
      console.error("Firestore onSnapshot error:", error);
      if (onError) onError(error);
    }
  );
};

const getSafeDocId = (name: string) => {
  return encodeURIComponent(name).replace(/\./g, '%2E');
};

export const saveCustomImage = async (spotName: string, imageUrl: string) => {
  const docId = getSafeDocId(spotName);
  const docRef = doc(db, 'custom_images', docId);
  return await setDoc(docRef, {
    spotName,
    imageUrl,
    updatedAt: new Date().toISOString()
  });
};

export const deleteCustomImage = async (spotName: string) => {
  const docId = getSafeDocId(spotName);
  const docRef = doc(db, 'custom_images', docId);
  return await deleteDoc(docRef);
};

export const subscribeToCustomImages = (
  callback: (images: Record<string, string>) => void,
  onError?: (error: any) => void
) => {
  const colRef = collection(db, 'custom_images');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const images: Record<string, string> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data() as CustomImageDoc;
        if (data && data.spotName && data.imageUrl) {
          images[data.spotName] = data.imageUrl;
        }
      });
      callback(images);
    },
    (error) => {
      console.error("Firestore custom_images error:", error);
      if (onError) onError(error);
    }
  );
};

