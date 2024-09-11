export const getScaleXFactor = (height: string, mass: string) => {
  try {
    const parsedHeight = parseFloat(height);
    const parsedMass = parseFloat(mass);

    if (isNaN(parsedHeight) || isNaN(parsedMass) || parsedMass === 0) {
      return 1;
    }

    return parsedHeight / (parsedMass * 2); // TODO: Find a better formula
  } catch (error) {
    return 1;
  }
};
