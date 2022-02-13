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
    players: Vec<Player>,
    num_of_cards_left: u8,
    direction: Direction,
    current_player: usize,
}

pub trait GameSteps {
    fn new() -> Game;
    fn setup() -> Game;
    fn set_direction(num_of_players: &usize) -> Direction;
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
        let mut players = Vec::<Player>::new();
        let mut player_count = 0;
        loop {
            let mut player = Player::new();

            if player.name.is_empty() && player_count > 1 && player_count < MAX_NUM_OF_PLAYERS {
                break;
            }

            player.draw(&mut cards_drawn);
            players.push(player);
            num_of_cards_left -= 1;

            if player_count == 3 {
                break;
            }

            player_count += 1;
        }

        // 3. Set `direction`
        //    Process user input or default(clockwise)
        //    If two players, default is fine.
        //    -  true: clockwise
        //    - false: counterclockwise
        let direction = Game::set_direction(&players.len());

        // 5. Set the player to start from
        let current_player = rand::thread_rng().gen_range(0..players.len());

        Game {
            cards_drawn,
            num_of_cards_left,
            reincarnation_card,
            players,
            direction,
            current_player,
        }
    }

    fn set_direction(num_of_players: &usize) -> Direction {
        if *num_of_players > 2 {
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

impl Game {
    pub fn begin(&mut self) {
        // Destructuring `Game` fields
        match self {
            Game {
                cards_drawn: cd,
                reincarnation_card: rc,
                players,
                num_of_cards_left: num,
                direction: dir,
                current_player: cp,
            } => {
                let bound = players.len() - 1;

                while *num > 0 {
                    println!("{}'s turn", players[*cp].name);

                    let card_drawn = players[*cp].draw(cd).unwrap();
                    *num -= 1;

                    // Choose your card
                    Game::show_cards(&players[*cp].hand, &card_drawn);
                    let mut chosen_card = String::new();
                    print!(
                        "Choose between {:?} and {:?} to play: ",
                        players[*cp].hand, card_drawn
                    );
                    io::stdout().flush().unwrap();
                    io::stdin()
                        .read_line(&mut chosen_card)
                        .expect("Faild to read line");

                    match chosen_card.trim().parse::<usize>() {
                        _ => {}
                    }

                    // Choose the player you want to make a move against
                    Game::show_players(players, cp, &bound);
                    let mut chosen_player = String::new();
                    println!(
                        "\"{:?}\" was played on \"{}\"",
                        players[*cp].hand, players[0].name
                    );
                    io::stdout().flush().unwrap();
                    io::stdin()
                        .read_line(&mut chosen_player)
                        .expect("Faild to read line");

                    match chosen_player.trim().parse::<usize>() {
                        _ => {}
                    }

                    players[*cp].hand = card_drawn;
                    println!("{:?}", players[*cp]);

                    println!("==========");

                    Game::set_next_player(dir, cp, &bound);
                }
            }
        }

        println!("Game over");
        // x 1. Start from the player with the current player number
        // x 2. Loop -
        // 3. Game ends when there are no cards left and no winner
        // 4. Player draws a card
        // 5. Player makes a move (the card's skill activates)
        // 6. Next player?
    }

    fn set_next_player(dir: &Direction, cp: &mut usize, bound: &usize) {
        match *dir {
            Direction::Clockwise => {
                if *cp < *bound {
                    *cp += 1;
                } else {
                    *cp = 0;
                }
            }
            Direction::Counterclockwise => {
                if *cp > 0 {
                    *cp -= 1;
                } else {
                    *cp = *bound;
                }
            }
        }
    }

    fn show_cards(hand1: &Card, hand2: &Card) {
        println!("1: {:?}", hand1);
        println!("2: {:?}", hand2);
    }

    fn show_players(players: &[Player], cp: &usize, bound: &usize) {
        let mut c = 1;
        for i in 0..=*bound {
            if i == *cp {
                continue;
            }
            println!("{}: {}", c, players[i].name);
            c += 1;
        }
    }
}
