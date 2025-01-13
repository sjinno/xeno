import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { GAME_PATH, GAME_PUBLIC_ID } from '@/constants';
import { PublicGameData } from '@/types';

export * from './firebase';

export async function loadPublicGameData(): Promise<PublicGameData> {
  try {
    const gamePublicRef = doc(db, GAME_PATH, GAME_PUBLIC_ID);
    const gamePublicSnap = await getDoc(gamePublicRef);

    if (gamePublicSnap.exists()) {
      const gamePublicData = gamePublicSnap.data() as PublicGameData;
      return gamePublicData;
    } else {
      throw new Error('Game does not exist.');
    }
  } catch (error) {
    throw new Error(`Error joining game: ${error}`);
  }
}
