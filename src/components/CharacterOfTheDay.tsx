"use client";

import Character from "@/components/Character";
import CharacterProfile from "@/components/CharacterProfile";
import Dropdown from "@/components/Dropdown";
import ColorPicker from "@/components/ColorPicker";
import { calcAverageRgb } from "@/utils/colors";
import { SwapiPeople } from "@types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  Button,
  Color,
  parseColor,
  Toolbar,
  type Selection,
} from "react-aria-components";
import { getScaleXFactor } from "@/utils/scaling";
import {
  refetchCharacter,
  validateCookie,
} from "@/app/characterOfTheDayActions";

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

  const backgrounds = {
    galaxy: "bg-galaxy",
    starships: "bg-starships",
    planet: "bg-planet",
    landscape: "bg-landscape",
  };

  const [selectedBg, setSelectedBg] = useState<Selection>(
    new Set([backgrounds.galaxy])
  );

  const [colorShirt, setColorShirt] = useState<Color>(parseColor("#994f37"));
  const [colorShoes, setColorShoes] = useState<Color>(parseColor("#2452da"));
  const [colorPants, setColorPants] = useState<Color>(parseColor("#667a8c"));

  return (
    <>
      <div className="mx-auto flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4">
          <Toolbar
            aria-label="Tools"
            className="flex gap-4 items-center justify-center lg:justify-end flex-wrap"
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
            <Dropdown
              label="Background"
              selected={selectedBg}
              onChange={setSelectedBg}
              items={Object.entries(backgrounds).map(([label, value]) => ({
                key: value,
                label,
              }))}
            />
          </Toolbar>

          <div
            className={clsx(
              "flex items-center justify-center p-2 border border-neutral-500 rounded flex-1 bg-center bg-cover",
              Array.from(selectedBg)?.[0] ?? ""
            )}
          >
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
        </div>

        <CharacterProfile character={character} />
      </div>

      <div className="flex flex-col gap-2">
        <span>Don&apos;t like this character?</span>
        <Button
          className="hover:cursor-pointer p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-all hover:shadow-xl font-bold"
          onPress={() => refetchCharacter()}
        >
          Get new one!
        </Button>
      </div>
    </>
  );
}
