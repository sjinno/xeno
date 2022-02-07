#[rustfmt::skip]
#[allow(dead_code)]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Card {
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
