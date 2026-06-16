import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "watchful-hull-sdckx",
  appId: "1:299998060479:web:4ba0a5956623d0457d4b0a",
  apiKey: "AIzaSyDhOv3oj53KOlLNCMTuImxPiEnhmC2lN7I",
  authDomain: "watchful-hull-sdckx.firebaseapp.com",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-a6c1d698-5fb1-4ab0-b5aa-22dc01e7ab8f");

export interface Expense {
  id?: string;
  name: string;
  amount: number;
  currency: 'EUR' | 'GBP' | 'TWD';
  date: string;
  category: 'Food' | 'Transport' | 'Shopping' | 'Accommodation' | 'Other';
}

export const addExpense = async (expense: Omit<Expense, 'id'>) => {
  return await addDoc(collection(db, 'expenses'), expense);
};

export const deleteExpense = async (id: string) => {
  return await deleteDoc(doc(db, 'expenses', id));
};

export const subscribeToExpenses = (callback: (expenses: Expense[]) => void) => {
  const q = query(collection(db, 'expenses'), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Expense));
  });
};
