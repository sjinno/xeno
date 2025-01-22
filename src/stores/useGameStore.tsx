import { Game } from '@/models';
import { GameState, Uid } from '@/types';
import { create } from 'zustand';

interface GameActions {
  setAdmin: (uid: Uid) => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>((set) => {
  const gameState = new Game('himitsu123');
  return { ...gameState.state, setAdmin: (uid: Uid) => set({ admin: uid }) };
});
