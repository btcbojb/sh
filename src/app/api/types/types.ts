export type Location = {
  lat?: string;
  long?: string;
  id: string;
  name: string;
  availability: Availability;
};

export type Availability = {
  Wheelchair?: Score;
  Perfume?: Score;
  Volume?: Score;
  Languages?: Score;
  ElevationDiffrence?: Score;
  Nuts?: Score;
  AuditoryLoop?: Score;
  SignLanguage?: Score;
  Smoke?: Score;
  DogFriendly?: Score;
};

enum Score {
  zero = "gray",
  one = "red",
  two = "orange",
  three = "green"
}
