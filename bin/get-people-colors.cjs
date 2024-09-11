const fs = require("fs");
const path = require("path");

const colors = new Set();

async function fetchAndProcessColors(url) {
  try {
    while (url) {
      console.log("Fetching:", url);

      const response = await fetch(url);
      const data = await response.json();

      data.results.forEach((item) => {
        colors.add(item.hair_color);
        colors.add(item.skin_color);
        colors.add(item.eye_color);
      });

      url = data.next;
    }

    // Convert sets to arrays for JSON serialization
    const finalResult = {
      colors: Array.from(colors),
    };

    const filePath = path.join(__dirname, "../data/colors.json");

    fs.writeFileSync(filePath, JSON.stringify(finalResult, null, 2));
    console.log("Results saved to colors.json");
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Example usage
fetchAndProcessColors("https://swapi.dev/api/people");
