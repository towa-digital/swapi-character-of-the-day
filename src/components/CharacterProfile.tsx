import {
  Collection,
  Header,
  ListBox,
  ListBoxItem,
  Section,
  Text,
} from "react-aria-components";
import { SwapiPeople } from "@types";
import Card from "./Card";

export default function CharacterProfile({
  character,
}: {
  character: SwapiPeople;
}) {
  

  return (
    <>
      {details.map((detail) => (
        <Card key={detail.name} header={detail.name} className="w-96">
          <ul className="flex flex-col gap-[0.375rem]">
            {detail.children.map((item) => (
              <li key={item.id} className="flex text-sm  justify-between">
                <Text className="tracking-[-0.035rem] opacity-70">
                  {item.label}
                </Text>
                <Text slot="description" className="tracking-[-0.0175rem]">
                  {item.value}
                </Text>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
