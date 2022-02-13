use super::card::Card;
use super::status::Status;

use std::{
    collections::{hash_map::Entry, HashMap},
    io::{self, Write},
};

use rand::Rng;

#[allow(dead_code)]
#[derive(Debug, Default)]
pub struct Player {
    pub name: String,
    hands: [Card; 2], // 2 hands at most only when your turn arrives and you draw a hand from the deck
    status: Status,
}

pub trait PlayerBuilder {
    fn new() -> Player;
    fn get_name() -> String;
}

impl PlayerBuilder for Player {
    fn new() -> Self {
        Player {
            name: Player::get_name(),
            ..Default::default()
        }
    }

    fn get_name() -> String {
        print!("name: ");
        io::stdout().flush().unwrap();

        let mut name = String::new();
        io::stdin()
            .read_line(&mut name)
            .expect("Failed to read line");

        name.pop();
        name
    }
}

impl Player {
    pub fn draw(&mut self, cards_drawn: &mut HashMap<Card, u8>) {
        let mut is_set = false;
        while !is_set {
            let card: Card = rand::thread_rng().gen_range(1..=10).into();

            match card as u8 {
                (1..=8) => {
                    if let Some(c) = cards_drawn.get_mut(&card) {
                        if *c != 1 {
                            *c += 1;
                            is_set = true;
                        }
                    } else {
                        cards_drawn.insert(card, 0);
                        is_set = true;
                    }
                }
                9 | 10 => {
                    if let Entry::Vacant(e) = cards_drawn.entry(card) {
                        e.insert(0);
                        is_set = true;
                    }
                }
                _ => unreachable!("Should not ever reach here"),
            }

            if is_set {
                if self.hands[0] == Card::Nil {
                    self.hands[0] = card;
                } else {
                    self.hands[1] = card;
                }
            }
        }
    }
}
