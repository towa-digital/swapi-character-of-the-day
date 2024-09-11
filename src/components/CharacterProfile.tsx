import {
  Collection,
  Header,
  ListBox,
  ListBoxItem,
  Section,
  Text,
} from "react-aria-components";
import { SwapiPeople } from "@types";

export default function CharacterProfile({
  character,
}: {
  character: SwapiPeople;
}) {
  const details = [
    {
      name: "Basic information",
      children: [
        { id: 2, label: "Height", value: character.height },
        { id: 3, label: "Mass", value: character.mass },
      ],
    },
    {
      name: "Appreance",
      children: [
        { id: 4, label: "Hair color", value: character.hair_color },
        { id: 5, label: "Skin color", value: character.skin_color },
        { id: 6, label: "Eye color", value: character.eye_color },
      ],
    },
  ];

  return (
    <article className="w-full lg:w-96">
      <Header className="flex flex-col p-4 bg-neutral-900 backdrop-blur-sm border border-neutral-500 rounded shadow">
        <Text className="text-2xl font-bold mb-2">{character.name}</Text>
        <Text className="text-lg">{character.gender}</Text>
      </Header>

      <ListBox
        aria-label="Character profil"
        items={details}
        className="flex flex-col gap-4 mt-6"
      >
        {(section) => (
          <Section
            id={section.name}
            className="p-4 bg-neutral-900 backdrop-blur-sm rounded"
          >
            <Header className="uppercase text-sm text-neutral-400 border-b border-neutral-500 pb-3">
              {section.name}
            </Header>
            <Collection items={section.children}>
              {(item) => (
                <ListBoxItem
                  className="flex py-2 justify-between items-end"
                  textValue={item.label}
                >
                  <Text slot="label" className="font-bold text-md">
                    {item.label}
                  </Text>
                  <Text slot="description" className="text-lg">
                    {item.value}
                  </Text>
                </ListBoxItem>
              )}
            </Collection>
          </Section>
        )}
      </ListBox>
    </article>
  );
}
