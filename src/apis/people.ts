import { SwapiPeople } from "@types";

const swapiBaseURL = "https://swapi.dev/api";

export const fetchPeople = async ({
  id,
}: {
  id: string;
}): Promise<SwapiPeople> => {
  console.log("fetchPeople", id);
  try {
    const response = await fetch(`${swapiBaseURL}/people/${id}`);
    return (await response.json()) as SwapiPeople;
  } catch (error) {
    throw error;
  }
};

export const fetchPeopleTotal = async (): Promise<number> => {
  try {
    const response = await fetch(`${swapiBaseURL}/people`);
    return (await response.json()).count;
  } catch (error) {
    throw error;
  }
};
