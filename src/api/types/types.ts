export type Location = {
  lat: string;
  long: string;
  id: string;
  name: string;
  avalability: Avalability;
};

type Avalability = {
  Wheelchair: Score;
  Perfume: Score;
  Volume: Score;
  Languages: Score;
  ElevationDiffrence: Score;
  Nuts: Score;
  AuditoryLoop: Score;
  SignLanguage: Score;
  Smoke: Score;
  DogFriendly: Score;
  Carpet: Score;
};

enum Score {
  zero = "gray",
  one = "red",
  two = "orange",
  three = "green"
}
