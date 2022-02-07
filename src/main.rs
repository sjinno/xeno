mod game;
use game::{Game, GameSteps};

mod types;

fn main() {
    let game = Game::new();
    dbg!(game);
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
