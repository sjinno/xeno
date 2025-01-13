import { GAME_PUBLIC_ID } from '@/constants';
import { db } from '@/firebase';
import { PublicGameData } from '@/types';
import { doc, onSnapshot } from 'firebase/firestore';
import { create } from 'zustand';

interface PrivateGameData {}

interface GameActions {
  subscribeToPublicData: () => void;
  unsubscribeFromPublicData: () => void;
}

type GameState = PublicGameData & PrivateGameData & GameActions;

let unsubscribe: (() => void) | null = null;

export const useGameStore = create<GameState>((set) => ({
  players: [],
  status: null,

  subscribeToPublicData: () => {
    // Unsubscribe from any existing listener
    if (unsubscribe) {
      unsubscribe();
    }

    // Set up a new Firestore listener
    const publicDocRef = doc(db, 'game', GAME_PUBLIC_ID);
    unsubscribe = onSnapshot(publicDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const { players, status } = docSnapshot.data() as PublicGameData;
        console.log('shohei - players', players.toString());
        set({ players, status }); // Update Zustand state
      } else {
        console.error('Document does not exist!');
        set({ players: [], status: null }); // Reset state if document doesn't exist
      }
    });
  },

  unsubscribeFromPublicData: () => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null; // Clear the unsubscribe function
    }
  },
}));
