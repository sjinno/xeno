import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { signInAnonymously } from 'firebase/auth';

export async function signInUser(name: string): Promise<string> {
  // TODO: check if the same name already exists in players

  try {
    await signInAnonymously(auth);
    return name;
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
export async function joinGroup(code: string) {
  if (!auth.currentUser) {
    throw new Error('No user is signed in.');
  }

  try {
    const groupRef = doc(
      db,
      import.meta.env.VITE_GROUP_PATH,
      import.meta.env.VITE_GROUP_ID
    );
    const groupSnap = await getDoc(groupRef);

    if (groupSnap.exists()) {
      const groupData = groupSnap.data();

      // Validate code
      if (groupData.code === code) {
        const userId = auth.currentUser.uid;

        // Add user to group players
        await updateDoc(groupRef, {
          players: arrayUnion(userId),
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
