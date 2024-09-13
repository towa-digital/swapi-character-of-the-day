import colorToHex from "@/data/colors-hex.json";

type ColorDict = { [key: string]: string };

function hexToRgb(hex: string): [number, number, number] {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const rawHex = hex.replace("#", "");

  return [
    parseInt(rawHex.substring(0, 2), 16),
    parseInt(rawHex.substring(2, 4), 16),
    parseInt(rawHex.substring(4, 6), 16),
  ];
}

function rgbToHex(rgb: [number, number, number]): string {
  if (rgb.length !== 3 || rgb.some((value) => value < 0 || value > 255)) {
    throw new Error(`Invalid RGB value: ${rgb}`);
  }

  return (
    "#" +
    rgb
      .map((value: number) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function calcAverageRgb(colors: string): string {
  try {
    const rgbValues = colors?.split(",").map((color) => {
      const trimmedColor = color.trim();
      if (!(trimmedColor in colorToHex)) {
        throw new Error(`Color not found in dictionary: ${trimmedColor}`);
      }
      return hexToRgb((colorToHex as ColorDict)[trimmedColor]);
    });

    if (!rgbValues?.length) {
      throw new Error("No valid colors provided");
    }

    const avgRgb = rgbValues[0].map((_, i) =>
      Math.round(
        rgbValues.reduce((sum, rgb) => sum + rgb[i], 0) / rgbValues.length
      )
    ) as [number, number, number];

    return rgbToHex(avgRgb);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An error occurred while calculating the average color");
      }
    }
    return "black";
  }
}
