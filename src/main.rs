use std::collections::HashMap;

use rand::Rng;

const DECK_SIZE: usize = 18;

fn main() {
    let mut deck = DeckBuilder::build();
    println!("{:?}", deck.cards);
    println!("{}", deck.cards.len());
}

#[rustfmt::skip]
#[allow(dead_code)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

impl From<i32> for Card {
    fn from(rank: i32) -> Self {
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

#[derive(Debug)]
struct Deck {
    cards: [Card; DECK_SIZE],
}

struct DeckBuilder {
    cards: [Card; DECK_SIZE],
}

impl DeckBuilder {
    fn build() -> Deck {
        let mut deck = DeckBuilder {
            cards: [Card::Nil; DECK_SIZE],
        };

        let mut map = HashMap::<i32, u8>::new();
        let mut rng = rand::thread_rng();
        let mut i = 0; // index, also plays a role as counter
        while i != DECK_SIZE {
            let num = rng.gen_range(1..11);
            deck.stack_or_continue(&mut i, num, &mut map);
        }

        Deck { cards: deck.cards }
    }

    fn stack_or_continue(&mut self, i: &mut usize, num: i32, map: &mut HashMap<i32, u8>) {
        match num {
            (1..=8) => {
                if let Some(c) = map.get_mut(&num) {
                    if *c != 1 {
                        *c += 1;
                        self.cards[*i] = num.into();
                        *i += 1;
                    }
                } else {
                    map.insert(num, 0);
                    self.cards[*i] = num.into();
                    *i += 1;
                }
            }
            9 | 10 => {
                map.entry(num).or_insert_with(|| {
                    self.cards[*i] = num.into();
                    *i += 1;
                    0
                });
            }
            _ => {}
        }
    }
}

struct Player {
    name: String,
    hands: (Card, Card), // 2 hands at most only when your turn arrives and you draw a hand from the deck
    turn: bool
}

struct Game {
    deck: Deck,
    players: Vec<Player>
}

impl Game {
    fn direction() {}
}

// [x] 0. Create a deck of 18 cards
// [x] 1. Create cards Rank 1-8 x 2, Rank 9, 10 x 1 --- totaling 18 cards
// [x] 2. Shuffle cards
// [ ] 3. Coose clockwise or counterclockwise (default clockwise)
// [ ] 4. Choose the player to start from
// [ ] 5. start()
// [ ] 6. Implement each card's skill
// [ ] 7.
