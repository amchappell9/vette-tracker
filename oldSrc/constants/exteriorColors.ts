const exteriorColors = [
  {
    colorName: "Arctic White",
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  {
    colorName: "Torch Red",
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  {
    colorName: "Black",
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  { colorName: "Cyber Grey", years: ["2014"] },
  { colorName: "Laguna Blue", years: ["2014", "2015", "2016"] },
  { colorName: "Crystal Red", years: ["2014", "2015"] },
  { colorName: "Velocity Yellow", years: ["2014", "2015"] },
  {
    colorName: "Blade Silver",
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
  },
  { colorName: "Night Race Blue", years: ["2014", "2015", "2016"] },
  { colorName: "Lime Rock Green", years: ["2014"] },
  { colorName: "Daytona Sunrise Orange", years: ["2015", "2016"] },
  { colorName: "Shark Grey", years: ["2015", "2016"] },
  { colorName: "Admiral Blue", years: ["2016", "2017", "2018", "2019"] },
  {
    colorName: "Corvette Racing Yellow",
    years: ["2016", "2017", "2018", "2019"],
  },
  { colorName: "Long Beach Red", years: ["2016", "2017", "2018", "2019"] },
  { colorName: "Watkins Glen Grey", years: ["2017", "2018", "2019"] },
  { colorName: "Sterling Blue", years: ["2017"] },
  { colorName: "Black Rose", years: ["2017", "2018"] },
  { colorName: "Ceramic Matrix Gray", years: ["2018", "2019"] },
  { colorName: "Sebring Orange", years: ["2018", "2019"] },
  { colorName: "Shadow Gray", years: ["2019"] },
  { colorName: "Elkhart Lake Blue", years: ["2019"] },
];

// Make a type "ExteriorColor" that is a union of all the color names
export type ExteriorColors = typeof exteriorColors[number]["colorName"];

export type ExteriorColorOption = typeof exteriorColors[number];

export default exteriorColors;
