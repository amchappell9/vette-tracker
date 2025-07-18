import { http, HttpResponse } from "msw";
import { VetteObject } from "../../src/types";

// Sample mock vette data for testing
const mockVettes: VetteObject[] = [
  {
    id: 1,
    year: 2020,
    miles: 15000,
    cost: 65000,
    transmissionType: "Manual",
    exteriorColor: "Torch Red",
    interiorColor: "Jet Black",
    submodel: "Stingray",
    trim: "3LT",
    packages: ["MRC", "NPP"],
    link: "https://example.com/vette1",
    createdDate: "2024-01-15T00:00:00Z",
    updatedDate: "2024-01-15T00:00:00Z",
    userId: "user1",
  },
  {
    id: 2,
    year: 2019,
    miles: 25000,
    cost: 58000,
    transmissionType: "Automatic",
    exteriorColor: "Shadow Gray Metallic",
    interiorColor: "Jet Black",
    submodel: "Z06",
    trim: "2LT",
    packages: ["MRC", "PDR"],
    link: "https://example.com/vette2",
    createdDate: "2024-02-20T00:00:00Z",
    updatedDate: "2024-02-20T00:00:00Z",
    userId: "user2",
  },
  {
    id: 3,
    year: 2021,
    miles: 8000,
    cost: 75000,
    transmissionType: "Manual",
    exteriorColor: "Arctic White",
    interiorColor: "Adrenaline Red",
    submodel: "Stingray",
    trim: "1LT",
    packages: ["NPP"],
    link: "https://example.com/vette3",
    createdDate: "2024-03-10T00:00:00Z",
    updatedDate: "2024-03-10T00:00:00Z",
    userId: "user3",
  },
  {
    id: 4,
    year: 2018,
    miles: 32000,
    cost: 52000,
    transmissionType: "Automatic",
    exteriorColor: "Elkhart Lake Blue Metallic",
    interiorColor: "Jet Black",
    submodel: "Grand Sport",
    trim: "3LT",
    packages: ["MRC", "NPP", "PDR"],
    link: "https://example.com/vette4",
    createdDate: "2024-04-05T00:00:00Z",
    updatedDate: "2024-04-05T00:00:00Z",
    userId: "user4",
  },
  {
    id: 5,
    year: 2022,
    miles: 5000,
    cost: 85000,
    transmissionType: "Manual",
    exteriorColor: "Hypersonic Gray",
    interiorColor: "Sky Cool Gray",
    submodel: "Z06",
    trim: "3LT",
    packages: ["PDR", "MRC"],
    link: "https://example.com/vette5",
    createdDate: "2024-05-15T00:00:00Z",
    updatedDate: "2024-05-15T00:00:00Z",
    userId: "user5",
  },
  {
    id: 6,
    year: 2017,
    miles: 45000,
    cost: 48000,
    transmissionType: "Manual",
    exteriorColor: "Laguna Blue Tintcoat",
    interiorColor: "Tension Blue",
    submodel: "Grand Sport",
    trim: "2LT",
    packages: ["NPP"],
    link: "https://example.com/vette6",
    createdDate: "2024-06-20T00:00:00Z",
    updatedDate: "2024-06-20T00:00:00Z",
    userId: "user6",
  },
];

export const handlers = [
  // Mock GET /api/services/vettes
  http.get("/api/services/vettes", () => {
    return HttpResponse.json(mockVettes);
  }),

  // Mock GET /api/services/vettes/:id
  http.get("/api/services/vettes/:id", ({ params }) => {
    const vetteId = parseInt(params.id as string);
    const vette = mockVettes.find((v) => v.id === vetteId);

    if (!vette) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(vette);
  }),

  // Mock POST /api/services/vettes
  http.post("/api/services/vettes", async ({ request }) => {
    const newVette = (await request.json()) as Omit<
      VetteObject,
      "id" | "createdDate" | "updatedDate"
    >;
    const createdVette: VetteObject = {
      ...newVette,
      id: mockVettes.length + 1,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    return HttpResponse.json(createdVette, { status: 201 });
  }),

  // Mock PUT /api/services/vettes/:id
  http.put("/api/services/vettes/:id", async ({ params, request }) => {
    const vetteId = parseInt(params.id as string);
    const updatedData = (await request.json()) as Partial<VetteObject>;
    const existingVette = mockVettes.find((v) => v.id === vetteId);

    if (!existingVette) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedVette: VetteObject = {
      ...existingVette,
      ...updatedData,
      id: vetteId,
      updatedDate: new Date().toISOString(),
    };

    return HttpResponse.json(updatedVette);
  }),

  // Mock DELETE /api/services/vettes/:id
  http.delete("/api/services/vettes/:id", ({ params }) => {
    const vetteId = parseInt(params.id as string);
    const vetteIndex = mockVettes.findIndex((v) => v.id === vetteId);

    if (vetteIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ msg: "Vette deleted successfully" });
  }),
];

// Export mock data for use in tests
export { mockVettes };
