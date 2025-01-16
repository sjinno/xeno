import { GameStatus } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { GAMES_COLLECTION, GAME_DOCUMENT } from '@/constants';

export * from './firebase';

export async function updateStatus(status: GameStatus) {
  const gameDocRef = doc(db, GAMES_COLLECTION, GAME_DOCUMENT);
  try {
    await updateDoc(gameDocRef, { status });
    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document:', error);
  }
}
