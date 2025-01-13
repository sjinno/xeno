import { PublicGameData } from '@/types';
import { create } from 'zustand';

interface PrivateGameData {}

interface GameActions {
  load: (publicGameData: PublicGameData) => void;
  join: (name: string) => void;
}

type GameState = PublicGameData & PrivateGameData & GameActions;

export const useGameStore = create<GameState>((set) => ({
  players: [],
  status: null,
  load: ({ players, status }: PublicGameData) => set({ players, status }),
  join: (name: string) =>
    set((state) => ({
      players: [...state.players, name],
    })),
}));
