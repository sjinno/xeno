#[derive(Debug)]
pub enum Direction {
    Clockwise,
    Counterclockwise,
}

impl Default for Direction {
    fn default() -> Self {
        Direction::Clockwise
    }
}
