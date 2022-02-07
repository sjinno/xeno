#[allow(dead_code)]
#[derive(Debug)]
pub enum Status {
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
