use std::{
    collections::HashMap,
    io::{self, Write},
};

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

#[allow(dead_code)]
#[derive(Debug)]
enum Status {
    Win,
    Loss,
    Draw,
    Playing,
}

impl Default for Status {
    fn default() -> Self {
        Status::Playing
    }
}

#[allow(dead_code)]
#[derive(Debug, Default)]
struct Player {
    name: String,
    hands: (Card, Card), // 2 hands at most only when your turn arrives and you draw a hand from the deck
    status: Status,
}

trait PlayerBuilder {
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
    fn set_initial_hand(&mut self, cards_drawn: &mut HashMap<Card, u8>) {
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

#[allow(dead_code)]
#[derive(Debug, Default)]
struct Game {
    // deck: Deck,
    cards_drawn: HashMap<Card, u8>, // <rank, counter>
    reincarnation_card: Card,
    players: [Option<Player>; MAX_NUM_OF_PLAYERS],
    num_of_cards_left: u8,
    direction: Direction,
    current_player: usize,
}

trait GameSteps {
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
