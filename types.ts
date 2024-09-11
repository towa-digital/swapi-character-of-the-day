export type SwapiUnknown = "unknown";

export type SwapiNotApplicable = "n/a";

export type SwapiPeopleGender =
  | "male"
  | "female"
  | SwapiUnknown
  | SwapiNotApplicable;

export type SwapiPeople = {
  name: string;
  height: string;
  mass: string;
  hair_color: string | SwapiUnknown | SwapiNotApplicable;
  skin_color: string;
  eye_color: string | SwapiUnknown | SwapiNotApplicable;
  birth_year: string;
  gender: SwapiPeopleGender;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};
