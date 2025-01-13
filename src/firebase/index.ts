import { GameStatus } from '@/types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { GAME_PATH, GAME_PUBLIC_ID } from '@/constants';

export * from './firebase';

export async function updateStatus(status: GameStatus) {
  const gamePublicRef = doc(db, GAME_PATH, GAME_PUBLIC_ID);
  try {
    await updateDoc(gamePublicRef, { status });
    console.log('Document updated successfully!');
  } catch (error) {
    console.error('Error updating document:', error);
  }
}
