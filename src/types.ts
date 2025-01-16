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

type Uid = string;
type Card = string;
type TargetUid = string;

export interface Turn {
  [key: Uid]: {
    currentEffect: string | null; // TODO: give enum CardEffect
    remainingDraws: number;
  };
}

export interface GameState {
  players: {
    [key: Uid]: {
      name: string;
      isReady: boolean;
    };
  };
  gameStatus: GameStatus;
  deck: Card[];
  reincarnationCard: Card | null;
  shuffleTriggered: boolean;
  gameResult: {
    winners: Uid[];
    drawers: Uid[];
    losers: Uid[];
  };
  turns: Turn[];
  // Split discard piles into separate object
  discardPiles: {
    [key: Uid]: Card[];
  };
  // Consider moving logs to subcollection
  logs: [];
  // Restructure view grants
  handVisibility: {
    [key: TargetUid]: {
      viewers: Uid[];
      expiresAt: Timestamp;
      type: 'individual' | 'all';
    };
  };
}
