import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Game } from '@/models';

export async function createGame() {
  const gameDocRef = await addDoc(
    collection(db, 'games'),
    new Game('himitsu123')
  );
}
