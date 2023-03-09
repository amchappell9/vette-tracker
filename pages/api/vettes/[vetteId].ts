import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { vetteId } = req.query;

  console.log(vetteId);

  const exampleDetail = {
    year: "2019",
    miles: "18000",
    cost: "75000",
    transmissionType: "Manual",
    exteriorColor: "Torch Red",
    interiorColor: "Red",
    submodel: "Z06",
    trim: "1LT",
    packages: ["MRC", "NPP", "PDR"],
    link: "https://www.corvetteforum.com/forums/c7-corvettes-for-sale/4685292-2019-z06-torch-red-manual.html",
    id: "352058809052561999",
    date: "12-25-2022",
    userId: "35467dac-767d-48b2-ac3c-e1e08e30b581",
  };

  res.status(200).json(exampleDetail);
}
