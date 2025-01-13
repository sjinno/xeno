import { arrayUnion, doc, getDoc, writeBatch } from 'firebase/firestore';
import { auth, db } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import { GAME_PATH, GAME_PRIVATE_ID, GAME_PUBLIC_ID } from '@/constants';

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

  const gamePrivateRef = doc(db, GAME_PATH, GAME_PRIVATE_ID);
  const gamePrivateSnap = await getDoc(gamePrivateRef);

  const gamePublicRef = doc(db, GAME_PATH, GAME_PUBLIC_ID);

  if (gamePrivateSnap.exists()) {
    const groupData = gamePrivateSnap.data();

    // Validate code
    if (groupData.code === code) {
      const uid = auth.currentUser.uid;

      const playerDetail = {
        name,
        uid,
      };

      // Add operations to the batch
      {
        batch.update(gamePublicRef, {
          players: arrayUnion(name),
        });

        // Add user to game playerDetails
        batch.update(gamePrivateRef, {
          playerDetails: arrayUnion(playerDetail),
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
