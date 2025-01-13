import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { signInAnonymously } from 'firebase/auth';
import { GAME_PATH, GAME_PRIVATE_ID } from '@/constants';

export async function signInUser() {
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

  try {
    const gamePrivateRef = doc(db, GAME_PATH, GAME_PRIVATE_ID);
    const gamePrivateSnap = await getDoc(gamePrivateRef);

    if (gamePrivateSnap.exists()) {
      const groupData = gamePrivateSnap.data();

      // Validate code
      if (groupData.code === code) {
        const uid = auth.currentUser.uid;

        const playerDetail = {
          name,
          uid,
        };

        // Add user to group players
        await updateDoc(gamePrivateRef, {
          players: arrayUnion(playerDetail),
        });

        console.log('Successfully joined the group!');
      } else {
        throw new Error('Incorrect code!');
      }
    } else {
      throw new Error('Group does not exist.');
    }
  } catch (error) {
    throw new Error(`Error joining group: ${error}`);
  }
}
