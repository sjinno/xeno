import { create } from 'zustand';

interface GameState {
  players: string[];
  join: (name: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  players: [],
  join: (name: string) =>
    set((state) => ({
      players: [...state.players, name],
    })),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));
