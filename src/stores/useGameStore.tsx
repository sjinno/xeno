import { GameState } from '@/types';
import { create } from 'zustand';

export const useGameStore = create<GameState>((set) => ({
  players: {},
  gameStatus: 'waiting',
  deck: [],
  discardPiles: {},
  gameResult: { winners: [], drawers: [], losers: [] },
  handVisibility: {},
  logs: [],
  reincarnationCard: null,
  shuffleTriggered: false,
  turns: [],
}));
