import { Timestamp } from 'firebase/firestore';

export type GameStatus = 'waiting' | 'ongoing' | 'finished';

export interface PublicGameData {
  players: string[];
  status: GameStatus;
}

export interface PrivateGameData {}

export interface GameActions {
  subscribeToPublicData: () => void;
  unsubscribeFromPublicData: () => void;
}

export type Uid = string;
type Card = string;
type TargetUid = string;

export interface Turn {
  [key: Uid]: {
    currentEffect: string | null; // TODO: give enum CardEffect
    remainingDraws: number;
  };
}

export interface GameState {
  admin: Uid | null;
  code: string;
  deck: Card[];
  discardPiles: {
    [key: Uid]: Card[];
  };
  gameResult: {
    winners: Uid[];
    drawers: Uid[];
    losers: Uid[];
  };
  gameStatus: GameStatus;
  handVisibility: {
    [key: TargetUid]: {
      viewers: Uid[];
      expiresAt: Timestamp;
      type: 'individual' | 'all';
    };
  };
  logs: [];
  players: {
    [key: Uid]: {
      name: string;
      isReady: boolean;
    };
  };
  reincarnationCard: Card | null;
  shuffleTriggered: boolean;
  turns: Turn[];
}
