const findScaleFatorByBMI = (bmi: number) => {
  if (bmi < 18.5) {
    return 0.5;
  }

  if (bmi >= 18.5 && bmi < 24.9) {
    return 1;
  }

  if (bmi >= 24.9 && bmi < 29.9) {
    return 1.5;
  }

  if (bmi >= 29.9 && bmi < 34.9) {
    return 2;
  }

  if (bmi >= 34.9 && bmi < 39.9) {
    return 2.5;
  }

  if (bmi >= 40) {
    return 3;
  }

  return 1;
};

export const getScaleXFactor = (height: string, mass: string) => {
  try {
    const parsedHeight = parseFloat(height);
    const parsedMass = parseFloat(mass);

    if (isNaN(parsedHeight) || isNaN(parsedMass) || parsedMass === 0) {
      return 1;
    }

    console.log((parsedMass / ((parsedHeight * parsedHeight) / 100)) * 100);

    return findScaleFatorByBMI(
      (parsedMass / ((parsedHeight * parsedHeight) / 100)) * 100
    );
  } catch (error) {
    return 1;
  }
};
