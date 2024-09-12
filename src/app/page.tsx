import CharacterOfTheDay from "@/components/CharacterOfTheDay";

export default async function Home() {
  const character = await (
    await fetch("http://localhost:3000/api/character")
  ).json();

  return (
    <div className="w-full h-screen overflow-y-auto bg-center bg-cover flex items-center flex-col px-4 py-10 lg:py-0 lg:justify-center gap-4 bg-gradient-to-r from-neutral-700 to-neutral-800">
      <CharacterOfTheDay character={character} />
    </div>
  );
}
