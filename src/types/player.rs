use super::card::Card;
use super::status::Status;

use std::{
    collections::HashMap,
    io::{self, Write},
};

use rand::Rng;

#[allow(dead_code)]
#[derive(Debug, Default)]
pub struct Player {
    pub name: String,
    hands: (Card, Card), // 2 hands at most only when your turn arrives and you draw a hand from the deck
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
    pub fn set_initial_hand(&mut self, cards_drawn: &mut HashMap<Card, u8>) {
        loop {
            let card: Card = rand::thread_rng().gen_range(1..=10).into();
            let mut is_set = false;
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
                    cards_drawn.entry(card).or_insert(0);
                    is_set = true;
                }
                _ => {}
            }
            if is_set {
                self.hands.0 = card;
                break;
            }
        }
    }

    // fn draw_card(&mut self, cards_drawn: &mut HashMap<Card, u8>) -> Card {
    //     rand::thread_rng().gen_range(1..=10).into()
    // }
}
