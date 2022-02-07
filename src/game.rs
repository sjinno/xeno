use crate::types::{
    card::Card,
    direction::Direction,
    player::{Player, PlayerBuilder},
};

use std::{
    collections::HashMap,
    io::{self, Write},
};

use rand::Rng;

const MAX_NUM_OF_PLAYERS: usize = 4;

#[allow(dead_code)]
#[derive(Debug, Default)]
pub struct Game {
    // deck: Deck,
    cards_drawn: HashMap<Card, u8>, // <rank, counter>
    reincarnation_card: Card,
    players: [Option<Player>; MAX_NUM_OF_PLAYERS],
    num_of_cards_left: u8,
    direction: Direction,
    current_player: usize,
}

pub trait GameSteps {
    fn new() -> Game;
    fn setup() -> Game;
    fn set_direction(num_of_players: usize) -> Direction;
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

        // 4. Set `players`
        let mut players: [Option<Player>; MAX_NUM_OF_PLAYERS] = Default::default();
        let mut player_count = 0;
        loop {
            let mut player_builder = Player::new();

            if player_builder.name.is_empty()
                && player_count > 1
                && player_count < MAX_NUM_OF_PLAYERS
            {
                break;
            }

            player_builder.set_initial_hand(&mut cards_drawn);
            num_of_cards_left -= 1;

            players[player_count] = Some(player_builder);
            player_count += 1;
        }

        // 3. Set `direction`
        //    Process user input or default(clockwise)
        //    If two players, default is fine.
        //    -  true: clockwise
        //    - false: counterclockwise
        let direction = Game::set_direction(players.len());

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

        Game {
            cards_drawn,
            num_of_cards_left,
            reincarnation_card,
            players,
            direction,
            current_player,
        }
    }

    fn set_direction(num_of_players: usize) -> Direction {
        if num_of_players > 2 {
            print!("Type \"c\" for clockwise, \"cc\" for counterclockwise: ");
            io::stdout().flush().unwrap();

            let mut inp = String::new();
            io::stdin()
                .read_line(&mut inp)
                .expect("Failed to read line");

            if inp.as_str() == "c" {
                Direction::Clockwise
            } else {
                Direction::Counterclockwise
            }
        } else {
            Direction::Clockwise
        }
    }
}
