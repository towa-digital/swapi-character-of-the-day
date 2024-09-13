"use client";

import Character from "@/components/Character";
import Dropdown from "@/components/Dropdown";
import ColorPicker from "@/components/ColorPicker";
import { calcAverageRgb } from "@/utils/colors";
import { SwapiPeople } from "@types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Color,
  parseColor,
  Toolbar,
  Text,
  type Selection,
} from "react-aria-components";
import { getScaleXFactor } from "@/utils/scaling";
import {
  refetchCharacter,
  validateCookie,
} from "@/app/characterOfTheDayActions";
import ImageSquare from "@/icons/ImageSquare";
import Button from "@/components/Button";
import UserSwitch from "@/icons/UserSwitch";
import Image from "next/image";
import Card from "./Card";

export default function CharacterOfTheDay({
  character,
}: {
  character: SwapiPeople;
}) {
  useEffect(() => {
    validateCookie();
  }, []);

  const getColor = (color: string) => {
    if (color === "unknown" || color === "n/a" || color === "none") {
      return "transparent";
    }
    return calcAverageRgb(color);
  };

  // TODO: Refine the details
  const details = [
    {
      name: "Basic information",
      children: [
        { id: 1, label: "Gender", value: character.gender },
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

  const backgrounds = {
    galaxy: "bg-planet-1",
    starships: "bg-planet-2",
    planet: "bg-landscape-1",
    landscape: "bg-landscape-2",
  };

  const [selectedBg, setSelectedBg] = useState<Selection>(
    new Set([backgrounds.galaxy])
  );

  const [colorShirt, setColorShirt] = useState<Color>(parseColor("#994f37"));
  const [colorShoes, setColorShoes] = useState<Color>(parseColor("#2452da"));
  const [colorPants, setColorPants] = useState<Color>(parseColor("#667a8c"));

  return (
    <div
      className={clsx(
        "app-layout p-8 bg-planet-1 size-full bg-cover bg-center",
        Array.from(selectedBg)?.[0] ?? ""
      )}
    >
      <div className="[grid-area:header]">
        <Image
          src="/images/logo.svg"
          height={28}
          width={167}
          alt="StarWars Character of the day Logo"
        />
      </div>

      <h1 className="[grid-area:title] hyphens-auto break-words text-primary my-auto text-start text-[8.75rem] font-light leading-[0.9] tracking-[-0.6125rem]">
        {character.name}
      </h1>

      <div className="[grid-area:info] flex flex-col items-start w-96 gap-1">
        {details.map((detail) => (
          <Card key={detail.name} header={detail.name} className="w-full">
            <ul className="flex flex-col mt-[0.375rem] gap-[0.375rem]">
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

        <Card header="Customize" className="w-full">
          <Toolbar
            aria-label="Tools"
            className="flex gap-[0.625rem] items-center mt-2"
          >
            <ColorPicker
              color={colorShirt}
              onChange={setColorShirt}
              label="Shirt"
            />
            <ColorPicker
              color={colorShoes}
              onChange={setColorShoes}
              label="Shoes"
            />
            <ColorPicker
              color={colorPants}
              onChange={setColorPants}
              label="Pants"
            />
          </Toolbar>
        </Card>
      </div>

      <div className="[grid-area:character] flex items-end justify-end">
        <Character
          colors={{
            skin: getColor(character.skin_color),
            eyes: getColor(character.eye_color),
            hair: getColor(character.hair_color),
            shirt: colorShirt.toString(),
            shoes: colorShoes.toString(),
            pants: colorPants.toString(),
          }}
          gender={character.gender}
          className="w-full h-80"
          scaleXFactor={getScaleXFactor(character.height, character.mass)}
        />
      </div>

      <div className="[grid-area:actions] flex flex-col justify-end gap-4">
        <Dropdown
          label="Change Background"
          selected={selectedBg}
          onChange={setSelectedBg}
          items={Object.entries(backgrounds).map(([label, value]) => ({
            key: value,
            label,
          }))}
          icon={<ImageSquare width={16} height={16} />}
        />

        <Button
          label="Re-generate Character"
          icon={<UserSwitch width={16} height={16} />}
          onPress={() => refetchCharacter()}
        />
      </div>
    </div>
  );
}
