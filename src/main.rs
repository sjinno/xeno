use std::collections::HashMap;

use rand::Rng;

const MAX_NUM_OF_PLAYERS: usize = 4;

fn main() {
    let mut game = Game::new();
    eprintln!("SHOHEI@main.rs:13 ##### VAR: game = {:#?}", game);
}

#[rustfmt::skip]
#[allow(dead_code)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum Card {
    Boy           = 1,
    Soldier       = 2,
    FortuneTeller = 3,
    Girl          = 4,
    GrimReaper    = 5,
    Nobility      = 6,
    Sage          = 7,
    Spirit        = 8,
    Emperor       = 9,
    Hero          = 10,
    Nil
}

impl Default for Card {
    fn default() -> Self {
        Card::Nil
    }
}

impl From<u8> for Card {
    fn from(rank: u8) -> Self {
        match rank {
            1 => Card::Boy,
            2 => Card::Soldier,
            3 => Card::FortuneTeller,
            4 => Card::Girl,
            5 => Card::GrimReaper,
            6 => Card::Nobility,
            7 => Card::Sage,
            8 => Card::Spirit,
            9 => Card::Emperor,
            10 => Card::Hero,
            _ => Card::Nil,
        }
    }
}

// #[derive(Debug)]
// struct Deck {
//     cards: [Card; DECK_SIZE],
// }

// struct DeckBuilder {
//     cards: [Card; DECK_SIZE],
// }

// impl DeckBuilder {
//     fn build() -> Deck {
//         let mut deck = DeckBuilder {
//             cards: [Card::Nil; DECK_SIZE],
//         };

//         let mut map = HashMap::<u8, u8>::new();
//         let mut rng = rand::thread_rng();
//         let mut i = 0; // index, also plays a role as counter
//         while i != DECK_SIZE {
//             let num: u8 = rng.gen_range(1..=10);
//             deck.stack_or_continue(&mut i, num, &mut map);
//         }

//         Deck { cards: deck.cards }
//     }

//     fn stack_or_continue(&mut self, i: &mut usize, num: u8, map: &mut HashMap<u8, u8>) {
//         let card: Card = num.into();
//         match num {
//             (1..=8) => {
//                 if let Some(c) = map.get_mut(&num) {
//                     if *c != 1 && &self.cards[*i - 1] != &card {
//                         *c += 1;
//                         self.cards[*i] = card;
//                         *i += 1;
//                     }
//                 } else {
//                     map.insert(num, 0);
//                     self.cards[*i] = card;
//                     *i += 1;
//                 }
//             }
//             9 | 10 => {
//                 map.entry(num).or_insert_with(|| {
//                     self.cards[*i] = card;
//                     *i += 1;
//                     0
//                 });
//             }
//             _ => {}
//         }
//     }
// }

#[derive(Debug)]
enum Status {
    Win,
    Loss,
    Draw,
    Pending,
}

#[derive(Debug)]
struct Player {
    name: String,
    hands: (Card, Card), // 2 hands at most only when your turn arrives and you draw a hand from the deck
    turn: bool,
    status: Status,
}

#[derive(Debug)]
enum Direction {
    Clockwise,
    Counterclockwise,
}

impl Default for Direction {
    fn default() -> Self {
        Direction::Clockwise
    }
}

#[derive(Debug, Default)]
struct Game {
    // deck: Deck,
    cards_drawn: HashMap<Card, u8>, // <rank, counter>
    num_of_cards_left: u8,
    reincarnation_card: Card,
    direction: Direction,
    players: [Option<Player>; MAX_NUM_OF_PLAYERS],
    current_player: usize,
}

trait GameSteps {
    fn new() -> Game;
    fn setup() -> Game;
    // fn choose_direction();
    // fn choose_initial_player();
    // fn begin();
    // fn restart();
}

impl GameSteps for Game {
    fn new() -> Self {
        Game::setup()
    }

    fn setup() -> Self {
        // 0.
        let mut num_of_cards_left = 17; // max - 1(reincardnation_card)

        // 1. Initialize `cards_drawn`
        let mut cards_drawn = HashMap::<Card, u8>::new();

        // 2. Set `reincarnation_card`
        let reincarnation_card: Card = rand::thread_rng().gen_range(1..=10).into();
        cards_drawn.insert(reincarnation_card, 0);

        // 3. Set `direction`
        //    Process user input or default(clockwise)

        // 4. Set `players`
        //     - name: String,
        //     - hands: (Card, Card),
        //     - turn: bool,
        //     - status: Status,
        let mut players: [Option<Player>; MAX_NUM_OF_PLAYERS] = Default::default();
        for i in 0..MAX_NUM_OF_PLAYERS {
            // register_user();
            // players[i] = Some(player);
        }

        // 5. Set the player to start from
        let current_player = rand::thread_rng().gen_range(
            0..=players.iter().fold(
                0,
                |acc, player| {
                    if let Some(_) = player {
                        acc + 1
                    } else {
                        acc
                    }
                },
            ),
        );

        Self {
            cards_drawn,
            num_of_cards_left,
            reincarnation_card,
            current_player,
            ..Default::default()
        }
    }

    // fn direction() {}
}

// [x] 0. Create a deck of 18 cards
// Oh, come to think of it, probably I don't even need to create a deck
// I'll just have to keep track of which card was drawn in a map to make sure
// that each draw, decrement the count total.

// [x] 1. Create cards Rank 1-8 x 2, Rank 9, 10 x 1 --- totaling 18 cards
// [x] 2. Shuffle cards
// [ ] 3. Coose clockwise or counterclockwise (default clockwise)
// [ ] 4. Choose the player to start from
// [ ] 5. start()
// [ ] 6. Implement each card's skill
// [ ] 7.
