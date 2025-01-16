import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import {
  GAME_DOCUMENT,
  GAMES_COLLECTION,
  PLAYERS_COLLECTION,
} from '@/constants';

export async function signInUser() {
  if (auth.currentUser !== null) {
    throw new Error("You're already signed in!");
  }

  try {
    await signInAnonymously(auth);
  } catch (error) {
    throw new Error(
      `Failed to sign in anonymously: ${(error as Error).message}`
    );
  }
}

/**
 * Joins a group if the correct passphrase is provided.
 * @param {string} code - The code entered by the user.
 */
export async function joinGroup(name: string, code: string) {
  if (!auth.currentUser) {
    throw new Error('No user is signed in.');
  }

  // Initialize the batch
  const batch = writeBatch(db);

  const gameRef = doc(db, GAMES_COLLECTION, GAME_DOCUMENT);
  const gameSnap = await getDoc(gameRef);

  if (gameSnap.exists()) {
    const gameData = gameSnap.data();

    // Validate code
    if (gameData.code === code) {
      const uid = auth.currentUser.uid;

      // TODO: subscribe to this!
      const playerDocRef = await addDoc(collection(db, PLAYERS_COLLECTION), {
        hand: [],
        visibleTo: [],
      });

      // Add operations to the batch
      {
        batch.update(gameRef, {
          players: {
            [uid]: {
              name,
              isReady: false,
            },
          },
        });
      }

      console.log('Successfully joined the group!');
    } else {
      throw new Error('Incorrect code!');
    }
  } else {
    throw new Error('Group does not exist.');
  }

  try {
    await batch.commit();
  } catch (error) {
    throw new Error(`Failed to join group: ${error}`);
  }
}
