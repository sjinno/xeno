export type GameStatus = 'waiting' | 'ongoing' | 'finished' | null;

export interface PublicGameData {
  players: string[];
  status: GameStatus;
}
