"use client";

import Character from "@/components/characters/Character";
import Dropdown from "@/components/ui/Dropdown";
import ColorPicker from "@/components/ui/ColorPicker";
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
import Button from "@/components/ui/Button";
import UserSwitch from "@/icons/UserSwitch";
import Image from "next/image";
import Card from "@/components/ui/Card";
import GenderMale from "@/icons/GenderMake";
import GenderFemale from "@/icons/GenderFemale";

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

  const basicInformations = [
    { label: "Gender", value: character.gender },
    { label: "Height", value: `${character.height} cm` },
    { label: "Mass", value: `${character.mass} kg` },
  ];

  const appreance = [
    { label: "Hair color", value: character.hair_color },
    { label: "Skin color", value: character.skin_color },
    { label: "Eye color", value: character.eye_color },
  ];

  const backgrounds = [
    { name: "Desert", class: "bg-desert" },
    { name: "Landscape", class: "bg-landscape" },
    { name: "Planet Small", class: "bg-planet-small" },
    { name: "Planet", class: "bg-planet" },
  ];

  const [selectedBg, setSelectedBg] = useState<Selection>(
    new Set([backgrounds[0].class])
  );

  const [colorShirt, setColorShirt] = useState<Color>(parseColor("#994f37"));
  const [colorShoes, setColorShoes] = useState<Color>(parseColor("#2452da"));
  const [colorPants, setColorPants] = useState<Color>(parseColor("#667a8c"));

  return (
    <div className="app-layout p-8 size-full">
      <div
        className={clsx(
          "fixed inset-1 bottom-[35%] lg:bottom-0 bg-cover bg-center z-[-1]",
          Array.from(selectedBg)?.[0] ?? ""
        )}
      />

      <div
        className={clsx(
          "fixed inset-1 top-[30%] lg:top-[50%] lg:from-50% bg-gradient-to-t from-black from-70% to-transparent z-[-1]"
        )}
      />

      <div className="[grid-area:header] gap-4 flex justify-center lg:justify-start items-center flex-col lg:gap-20 lg:flex-row">
        <Image
          src="/images/logo.svg"
          height={28}
          width={167}
          alt="StarWars Character of the day Logo"
        />

        <span className="w-full h-px bg-gradient-to-r from-transparent via-primary to to-transparent" />
      </div>

      <h1 className="[grid-area:character] lg:[grid-area:title] hyphens-auto text-center text-[6.5rem] [word-break:break-word] text-primary my-auto lg:text-start lg:text-[8.75rem] font-light leading-[0.9] lg:tracking-[-0.6125rem]">
        {character.name}
      </h1>

      <div className="[grid-area:info] mt-4 lg:mt-0 flex flex-col items-start lg:w-80 gap-1">
        <Card header="Basic Informations" className="w-full">
          <ul className="flex flex-col mt-[0.375rem] gap-[0.375rem]">
            {basicInformations.map((item, index) => (
              <li
                key={`basicInformations_${index}`}
                className="flex text-sm justify-between"
              >
                <Text className="tracking-[-0.035rem] opacity-70">
                  {item.label}
                </Text>
                <Text
                  slot="description"
                  className={clsx(
                    "tracking-[-0.0175rem] flex items-center",
                    item.label === "Gender" && "capitalize"
                  )}
                >
                  {item.value}
                  {item.label === "Gender" &&
                    ["male", "female"].includes(item.value) &&
                    (item.value === "male" ? (
                      <GenderMale
                        width={14}
                        height={14}
                        className="text-white ms-1"
                      />
                    ) : (
                      <GenderFemale
                        width={14}
                        height={14}
                        className="text-white ms-1"
                      />
                    ))}
                </Text>
              </li>
            ))}
          </ul>
        </Card>

        <Card header="Appreance" className="w-full">
          <ul className="flex flex-col mt-[0.375rem] gap-[0.375rem]">
            {appreance.map((item, index) => (
              <li
                key={`appreance_${index}`}
                className="flex text-sm justify-between"
              >
                <Text className="tracking-[-0.035rem] opacity-70">
                  {item.label}
                </Text>
                <Text
                  slot="description"
                  className="tracking-[-0.0175rem] capitalize"
                >
                  {item.value}
                </Text>
              </li>
            ))}
          </ul>
        </Card>

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

      <div className="[grid-area:character] flex items-end justify-center">
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
          scaleXFactor={getScaleXFactor(character.height, character.mass)}
          className="[&>svg]:h-[20rem] [&>svg]:w-[15rem] lg:[&>svg]:h-[40rem]"
        />
      </div>

      <div className="[grid-area:character] items-end lg:[grid-area:actions] flex gap-3 lg:flex-col justify-end lg:gap-4">
        <Dropdown
          label="Change Background"
          selected={selectedBg}
          onChange={setSelectedBg}
          items={backgrounds.map((background) => ({
            key: background.class,
            label: background.name,
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
