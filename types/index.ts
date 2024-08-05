type WithId = {
  id: number;
};

export type Room = {
  name: string;
  rows: number;
  seats_per_row: number;
} & WithId;

export type Movie = {
  title: string;
  poster: string;
  duration: number;
  start_time: string;
} & WithId;

export type Booking = {
  movie_id: number;
  row: number;
  seat: number;
} & WithId;
