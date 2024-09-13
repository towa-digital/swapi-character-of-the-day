import CharacterOfTheDay from "@/components/CharacterOfTheDay";
import { fetchCharacterOfTheDay } from "@/app/characterOfTheDayActions";

export default async function Home() {
  const character = await fetchCharacterOfTheDay();

  return (
    <div className="w-full h-screen">
      <CharacterOfTheDay character={character} />
    </div>
  );
}
