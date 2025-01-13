export type GameStatus = 'waiting' | 'ongoing' | 'finished';

export interface PublicGameData {
  players: string[];
  status: GameStatus;
}
