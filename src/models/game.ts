import { GameState } from '@/types';

export class Game {
  state: GameState;

  constructor(code: string) {
    this.state = {
      admin: null,
      code,
      deck: [],
      discardPiles: {},
      gameResult: { winners: [], drawers: [], losers: [] },
      gameStatus: 'waiting',
      handVisibility: {},
      logs: [],
      players: {},
      reincarnationCard: null,
      shuffleTriggered: false,
      turns: [],
    };
  }
}
