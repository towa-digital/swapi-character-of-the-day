import { SwapiPeopleGender } from "@types";
import FemaleCharacter from "@/components/characters/FemaleCharacter";
import MaleCharacter from "@/components/characters/MaleCharacter";

export type CharacterProps = {
  colors?: {
    skin?: string;
    pants?: string;
    shoes?: string;
    hair?: string;
    shirt?: string;
    eyes?: string;
    mouth?: string;
  };
  scaleXFactor?: number;
  className?: string;
  gender: SwapiPeopleGender;
};

export default function CharacterWrapper({
  colors = {},
  className = "",
  scaleXFactor = 1,
  gender,
}: CharacterProps) {
  const skinColor = colors.skin || "#F0D9DE";
  const hairColor =
    !colors.hair || colors.hair === "transparent" ? skinColor : colors.hair;

  return (
    <figure
      style={{
        "--skin-color": skinColor,
        "--pants-color": colors.pants || "#667a8c",
        "--shoes-color": colors.shoes || "#2452da",
        "--hair-color": hairColor,
        "--shirt-color": colors.shirt || "#5F666F",
        "--eyes-color": colors.eyes || "#5F666F",
        "--mouth-color": colors.mouth || "#A2112A",
        "--scale-factor": scaleXFactor,
      }}
      className={className}
    >
      {gender === "male" && <MaleCharacter />}
      {gender === "female" && <FemaleCharacter />}
    </figure>
  );
}
